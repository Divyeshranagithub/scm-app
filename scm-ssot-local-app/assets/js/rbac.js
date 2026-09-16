// RBAC gate — no SSO, or an SSO email not registered in our users table, means full lockout screen
(function(){
  var LOCKOUT_TIMEOUT_MS = 17000; // longer than dronahq-sso.js's own 15s SSO wait
  var settled = false;

  function apiBase(){ return (window.SCM_API && window.SCM_API.base) || ''; }
  function apiKey(){ return (window.SCM_API && window.SCM_API.key) || ''; }
  function authHeaders(extra){ return Object.assign({'X-API-Key': apiKey()}, extra||{}); }

  function ensureOverlay(){
    var ov = document.getElementById('rbacOverlay');
    if(!ov){
      ov = document.createElement('div');
      ov.id = 'rbacOverlay';
      ov.style.cssText = 'position:fixed;inset:0;z-index:99999;display:flex;align-items:center;'+
        'justify-content:center;background:#faf7f2;font-family:inherit;text-align:center;padding:24px;';
      document.body.appendChild(ov);
    }
    return ov;
  }
  var bootStart = Date.now();
  function diagLine(){
    var secs = ((Date.now()-bootStart)/1000).toFixed(1);
    var hasDrona = !!window.DronaHQ;
    var isReady = !!(window.DronaHQ && window.DronaHQ.IsReady);
    return secs+'s elapsed &middot; window.DronaHQ: '+(hasDrona?'present':'absent')+
      (hasDrona ? (' &middot; IsReady: '+(isReady?'true':'false')) : '');
  }
  var diagTimer = null;
  function showLoading(){
    ensureOverlay().innerHTML =
      '<div><img src="assets/img/algihaz-logo.webp" alt="Algihaz Holding" style="width:150px;height:auto">'+
      '<div id="rbacDiag" style="margin-top:14px;font-size:12px;color:#a99;font-family:monospace">'+diagLine()+'</div></div>';
    if(diagTimer) clearInterval(diagTimer);
    diagTimer = setInterval(function(){
      var el = document.getElementById('rbacDiag');
      if(el) el.innerHTML = diagLine();
    }, 500);
  }
  function showDenied(msg){
    if(diagTimer){ clearInterval(diagTimer); diagTimer=null; }
    ensureOverlay().innerHTML =
      '<div style="max-width:460px">'+
        '<div style="font-size:20px;font-weight:700;color:#7a1620;margin-bottom:8px">Access restricted</div>'+
        '<div style="font-size:14px;color:#6b5b4d;line-height:1.5">'+msg+'</div>'+
        '<div style="margin-top:14px;font-size:12px;color:#a99;font-family:monospace">'+diagLine()+'</div>'+
      '</div>';
  }
  function hideOverlay(){
    if(diagTimer){ clearInterval(diagTimer); diagTimer=null; }
    var ov=document.getElementById('rbacOverlay'); if(ov) ov.remove();
  }

  showLoading();

  function hideNavItem(el){ el.style.setProperty('display','none','important'); }
  function showNavItem(el){ el.style.removeProperty('display'); }

  // hide a nav__group once every data-page item inside it is hidden, so no dead group header remains
  function syncGroupVisibility(){
    document.querySelectorAll('.nav__group').forEach(function(g){
      var anyVisible = Array.prototype.some.call(g.querySelectorAll('.nav__item[data-page]'), function(el){
        return getComputedStyle(el).display !== 'none';
      });
      if(anyVisible) g.style.removeProperty('display');
      else g.style.setProperty('display','none','important');
    });
  }

  function showSignedInBadge(data){
    var b = document.getElementById('rbacBadge');
    if(!b){
      b = document.createElement('div');
      b.id = 'rbacBadge';
      b.style.cssText = 'position:fixed;top:8px;right:12px;z-index:9000;background:#fff;'+
        'border:1px solid #eee1d3;border-radius:20px;padding:5px 12px;font-size:12px;'+
        'color:#6b5b4d;box-shadow:0 2px 6px rgba(0,0,0,.08)';
      document.body.appendChild(b);
    }
    var who = data.username || data.email || 'Unknown';
    b.textContent = 'Signed in as '+who+' · '+(data.roleName||data.roleKey||'');
  }

  function lockout(msg){
    settled = true;
    document.querySelectorAll('.nav__item[data-page]').forEach(hideNavItem);
    syncGroupVisibility();
    showDenied(msg);
  }

  function applyAccess(data){
    var allowed = new Set(data.modules||[]);
    // Content Administration is role-gated (editor+admin), not part of the module list
    var contentAdminAllowed = data.roleKey === 'editor' || data.roleKey === 'administrator';
    if(contentAdminAllowed) allowed.add('content-admin');
    // cfp-detail is the shared drill-down page for every categoryfactpacks card, not its own nav item
    if(allowed.has('categoryfactpacks')) allowed.add('cfp-detail');

    window.SCM_USER = Object.assign(window.SCM_USER||{}, data);
    window.SCM_RBAC = { modules: data.modules||[], roleKey: data.roleKey };
    // lets app.js's data loaders wait for this instead of racing window.SCM_USER.email at boot
    document.dispatchEvent(new CustomEvent('scm:rbac-ready', {detail: data}));

    document.querySelectorAll('.nav__item[data-page]').forEach(function(el){
      if(allowed.has(el.dataset.page)) showNavItem(el); else hideNavItem(el);
    });
    syncGroupVisibility();

    var firstAllowed = (data.modules && data.modules[0]) || null;
    function enforce(){
      var active = document.querySelector('.page.is-active');
      if(!active) return;
      var p = active.dataset.page;
      if(p && !allowed.has(p) && firstAllowed && window.SCM && typeof window.SCM.go==='function'){
        window.SCM.go(firstAllowed);
      }
    }
    enforce();
    new MutationObserver(enforce).observe(document.body, {subtree:true, attributes:true, attributeFilter:['class']});

    if(allowed.has('admin')) renderAdminPage(data.email);
    if(contentAdminAllowed && window.renderContentAdminPage) window.renderContentAdminPage(data);
    showSignedInBadge(data);
    hideOverlay();
  }

  async function checkAccess(email){
    try{
      var res = await fetch(apiBase()+'/api/auth/me?email='+encodeURIComponent(email), {headers: authHeaders()});
      if(res.status===404){
        lockout('Your account ('+escapeHtml(email)+') is not registered for this app yet. Contact your administrator to be added.');
        return;
      }
      if(!res.ok) throw new Error('auth/me '+res.status);
      var data = await res.json();
      settled = true;
      applyAccess(data);
    }catch(err){
      console.warn('[RBAC] access check failed:', err);
      lockout('Could not verify your access right now. Please refresh the page, or contact your administrator if this continues.');
    }
  }

  function onProfile(profile){
    profile = profile || {};
    if(!profile.email){ lockout('No email was returned by your login session. Contact your administrator.'); return; }
    checkAccess(profile.email);
  }

  document.addEventListener('scm:sso-ready', function(ev){ onProfile(ev.detail); });

  // fallback in case dronahq-sso.js already set window.SCM_USER before our listener attached
  if(window.SCM_USER && window.SCM_USER.email) onProfile(window.SCM_USER);

  setTimeout(function(){
    if(!settled) lockout('This app must be opened through the company portal (single sign-on). Direct access is not permitted.');
  }, LOCKOUT_TIMEOUT_MS);

  /* ============================== ADMIN PAGE ============================== */
  function escapeHtml(s){
    return String(s==null?'':s).replace(/[&<>"']/g, function(c){
      return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];
    });
  }

  async function renderAdminPage(adminEmail){
    var host = document.getElementById('adminHost');
    if(!host) return;
    host.innerHTML = 'Loading…';

    var roles, modules, users;
    try{
      var hdr = authHeaders({'X-User-Email': adminEmail});
      var [rolesRes, modsRes, usersRes] = await Promise.all([
        fetch(apiBase()+'/api/admin/roles', {headers: hdr}),
        fetch(apiBase()+'/api/admin/modules', {headers: hdr}),
        fetch(apiBase()+'/api/admin/users', {headers: hdr})
      ]);
      if(!rolesRes.ok || !modsRes.ok || !usersRes.ok) throw new Error('admin fetch failed');
      roles = await rolesRes.json();
      modules = await modsRes.json();
      users = await usersRes.json();
    }catch(err){
      host.innerHTML = '<p style="color:#7a1620">Could not load user management data. '+escapeHtml(err.message)+'</p>';
      return;
    }

    function roleOptions(selected){
      return roles.map(function(r){
        return '<option value="'+escapeHtml(r.roleKey)+'"'+(r.roleKey===selected?' selected':'')+'>'+
          escapeHtml(r.roleName)+'</option>';
      }).join('');
    }

    function moduleTable(){
      var rows = modules.map(function(m){
        var k = escapeHtml(m.moduleKey);
        return '<tr data-module="'+k+'">'+
          '<td class="ummodtable__name">'+escapeHtml(m.moduleName)+'</td>'+
          '<td class="ummodtable__cb"><label><input type="checkbox" name="viewModuleKeys" value="'+k+'"><span></span></label></td>'+
          '<td class="ummodtable__cb"><label><input type="checkbox" name="editModuleKeys" value="'+k+'"><span></span></label></td>'+
        '</tr>';
      }).join('');
      return '<div class="ummodbox">'+
        '<p class="ummodhint" id="ummodHint"></p>'+
        '<table class="ummodtable"><thead><tr>'+
          '<th>Page</th>'+
          '<th class="ummodtable__cb">Can view<button type="button" class="ummodall" data-col="view">all</button></th>'+
          '<th class="ummodtable__cb">Can edit<button type="button" class="ummodall" data-col="edit">all</button></th>'+
        '</tr></thead><tbody>'+rows+'</tbody></table>'+
        '<p class="ummodsum" id="ummodSummary"></p>'+
      '</div>';
    }
    var ROLE_HINT = {
      administrator: 'Administrators always have full access to every page — the list below is ignored for them.',
      editor: 'Tick <b>Can view</b> for pages they should see on the site, and <b>Can edit</b> for pages they can change in Content Administration. The two are independent — a page can be view-only, edit-only (e.g. a data-entry role that updates a page without seeing the live dashboard), or both.',
      viewer: 'Viewers can only look, never change. Tick <b>Can view</b> for the pages they should see — the Edit column does not apply.'
    };

    function wireModuleTable(form){
      var box = form.querySelector('.ummodbox');
      var hint = form.querySelector('#ummodHint');
      var summary = form.querySelector('#ummodSummary');

      function syncRow(mod){
        var row = form.querySelector('tr[data-module="'+mod+'"]'); if(!row) return;
        var v = form.querySelector('input[name="viewModuleKeys"][value="'+mod+'"]');
        var e = form.querySelector('input[name="editModuleKeys"][value="'+mod+'"]');
        row.classList.toggle('is-view', !!(v && v.checked));
        row.classList.toggle('is-edit', !!(e && e.checked));
      }
      function refresh(){
        var role = form.roleKey.value;
        box.className = 'ummodbox role-'+role;
        hint.innerHTML = ROLE_HINT[role] || '';
        var views = form.querySelectorAll('input[name="viewModuleKeys"]:checked').length;
        var edits = form.querySelectorAll('input[name="editModuleKeys"]:checked').length;
        var total = modules.length;
        summary.textContent = role === 'administrator'
          ? 'Full access to all '+total+' pages'
          : (role === 'viewer'
              ? views+' of '+total+' pages visible'
              : views+' of '+total+' pages visible · '+edits+' editable');
        form.querySelectorAll('tr[data-module]').forEach(function(r){ syncRow(r.dataset.module); });
      }

      form.addEventListener('change', function(ev){
        var t = ev.target;
        if(t === form.roleKey){
          // a viewer can never edit — drop any edit ticks carried over from a previous role choice
          if(t.value === 'viewer'){
            form.querySelectorAll('input[name="editModuleKeys"]').forEach(function(cb){ cb.checked = false; });
          }
          refresh(); return;
        }
        if(!t.matches || !t.matches('input[type=checkbox]')) return;
        if(t.name !== 'viewModuleKeys' && t.name !== 'editModuleKeys') return;
        // View and Edit are independent — a page can be view-only, edit-only, or both
        refresh();
      });

      form.addEventListener('click', function(ev){
        var btn = ev.target.closest && ev.target.closest('.ummodall');
        if(!btn) return;
        ev.preventDefault();
        var col = btn.dataset.col;
        var name = col === 'view' ? 'viewModuleKeys' : 'editModuleKeys';
        var boxes = form.querySelectorAll('input[name="'+name+'"]');
        var allOn = Array.prototype.every.call(boxes, function(cb){ return cb.checked; });
        boxes.forEach(function(cb){ cb.checked = !allOn; });
        refresh();
      });

      form.refreshModuleTable = refresh;
      refresh();
    }

    function userRow(u){
      var viewText = (u.viewModuleNames||[]).join(', ') || '—';
      var editText = (u.editModuleNames||[]).join(', ') || '—';
      return '<tr>'+
        '<td>'+escapeHtml(u.email)+'</td>'+
        '<td>'+escapeHtml(u.username||'')+'</td>'+
        '<td><span class="umrole umrole--'+escapeHtml(u.roleKey)+'">'+escapeHtml(u.roleName)+'</span></td>'+
        '<td class="umtable__mods">'+escapeHtml(viewText)+'</td>'+
        '<td class="umtable__mods">'+escapeHtml(editText)+'</td>'+
        '<td class="umtable__date">'+escapeHtml((u.createdAt||'').slice(0,10))+'</td>'+
        '<td class="umtable__actions">'+
          '<button type="button" class="admin-edit umiconbtn umiconbtn--edit" data-email="'+escapeHtml(u.email)+'">Edit</button>'+
          '<button type="button" class="admin-remove umiconbtn umiconbtn--remove" data-email="'+escapeHtml(u.email)+'">Remove</button>'+
        '</td>'+
      '</tr>';
    }

    host.innerHTML =
      '<div class="umcard">'+
        '<h3 id="adminFormHeading" class="umcard__h">Add user</h3>'+
        '<p class="umcard__sub">Register a new user and choose which pages they can access.</p>'+
        '<form id="adminAddForm">'+
          '<div class="umform__row">'+
            '<input name="email" type="email" required placeholder="name@algihaz.com">'+
            '<input name="username" type="text" placeholder="Display name">'+
            '<select name="roleKey" required>'+roleOptions()+'</select>'+
          '</div>'+
          '<label class="umlabel">Page access</label>'+
          moduleTable()+
          '<button type="submit" id="adminFormSubmitBtn" class="umbtn umbtn--go">Add</button>'+
          '<button type="button" id="adminFormCancelBtn" class="umbtn" hidden style="margin-left:8px">Cancel</button>'+
        '</form>'+
        '<p id="adminAddMsg" class="ummsg"></p>'+
      '</div>'+
      '<div class="umtablewrap">'+
        '<table class="umtable">'+
          '<thead><tr>'+
            '<th>Email</th><th>Name</th>'+
            '<th>Role</th><th>View</th><th>Edit</th>'+
            '<th>Added</th><th></th>'+
          '</tr></thead>'+
          '<tbody id="adminUserRows">'+users.map(userRow).join('')+'</tbody>'+
        '</table>'+
      '</div>';

    wireModuleTable(document.getElementById('adminAddForm'));

    var editingEmail = null;   // set while the form is pre-filled to edit an existing user

    function enterEditMode(u){
      editingEmail = u.email;
      var form = document.getElementById('adminAddForm');
      form.email.value = u.email;
      form.email.readOnly = true;
      form.username.value = u.username || '';
      form.roleKey.value = u.roleKey;
      var canView = new Set(u.viewModuleKeys || []);
      var canEdit = new Set(u.editModuleKeys || []);
      form.querySelectorAll('input[name="viewModuleKeys"]').forEach(function(cb){ cb.checked = canView.has(cb.value); });
      form.querySelectorAll('input[name="editModuleKeys"]').forEach(function(cb){ cb.checked = canEdit.has(cb.value); });
      if(form.refreshModuleTable) form.refreshModuleTable();
      document.getElementById('adminFormHeading').textContent = 'Edit user — '+u.email;
      document.getElementById('adminFormSubmitBtn').textContent = 'Save changes';
      document.getElementById('adminFormCancelBtn').hidden = false;
      form.scrollIntoView({behavior:'smooth', block:'start'});
    }
    function exitEditMode(){
      editingEmail = null;
      var form = document.getElementById('adminAddForm');
      form.reset();
      form.email.readOnly = false;
      if(form.refreshModuleTable) form.refreshModuleTable();
      document.getElementById('adminFormHeading').textContent = 'Add user';
      document.getElementById('adminFormSubmitBtn').textContent = 'Add';
      document.getElementById('adminFormCancelBtn').hidden = true;
    }
    document.getElementById('adminFormCancelBtn').addEventListener('click', exitEditMode);

    document.getElementById('adminAddForm').addEventListener('submit', async function(e){
      e.preventDefault();
      var msg = document.getElementById('adminAddMsg');
      var fd = new FormData(e.target);
      var body = {
        email: fd.get('email'),
        username: fd.get('username')||null,
        roleKey: fd.get('roleKey'),
        viewModuleKeys: fd.getAll('viewModuleKeys'),
        editModuleKeys: fd.getAll('editModuleKeys')
      };
      var wasEditing = !!editingEmail;
      msg.textContent = wasEditing ? 'Saving…' : 'Adding…'; msg.style.color = '#6b5b4d';
      try{
        var res = await fetch(apiBase()+'/api/admin/users', {
          method:'POST',
          headers: authHeaders({'X-User-Email': adminEmail, 'Content-Type':'application/json'}),
          body: JSON.stringify(body)
        });
        if(!res.ok){ var t = await res.text(); throw new Error(t); }
        msg.textContent = wasEditing ? 'Saved.' : 'Added.'; msg.style.color = '#2e7d32';
        e.target.reset();
        renderAdminPage(adminEmail);
      }catch(err){
        msg.textContent = 'Failed: '+err.message; msg.style.color = '#c9463a';
      }
    });

    function bindEditButtons(){
      var byEmail = {}; users.forEach(function(u){ byEmail[u.email] = u; });
      host.querySelectorAll('.admin-edit').forEach(function(btn){
        btn.addEventListener('click', function(){
          var u = byEmail[btn.dataset.email];
          if(u) enterEditMode(u);
        });
      });
    }
    bindEditButtons();

    function bindRemoveButtons(){
      host.querySelectorAll('.admin-remove').forEach(function(btn){
        btn.addEventListener('click', async function(){
          if(!confirm('Remove '+btn.dataset.email+'?')) return;
          try{
            var res = await fetch(apiBase()+'/api/admin/users/'+encodeURIComponent(btn.dataset.email), {
              method:'DELETE',
              headers: authHeaders({'X-User-Email': adminEmail})
            });
            if(!res.ok){ var t = await res.text(); throw new Error(t); }
            renderAdminPage(adminEmail);
          }catch(err){ alert('Could not remove user: '+err.message); }
        });
      });
    }
    bindRemoveButtons();
  }
})();
