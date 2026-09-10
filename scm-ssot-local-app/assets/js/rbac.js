/*
 * RBAC gate. Nothing in the app is usable until we know who the user is
 * (via the DronaHQ SSO bridge in dronahq-sso.js) and that their email is
 * registered in our users table with a role. No SSO, or an SSO email that
 * isn't registered -> full lockout screen, no nav, no page content.
 */
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

  // a .nav__group (collapsible parent + its .nav__sub items) should disappear
  // too once every data-page item inside it has been hidden — otherwise you
  // get a dead group header pointing at nothing.
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
    // Content Administration is role-gated (editor + administrator), not
    // part of the module/permission list — never shown to a viewer. Folding
    // it into `allowed` here means the generic show/hide loop and the
    // enforce() guard below both handle it correctly with no special-casing.
    var contentAdminAllowed = data.roleKey === 'editor' || data.roleKey === 'administrator';
    if(contentAdminAllowed) allowed.add('content-admin');

    window.SCM_USER = Object.assign(window.SCM_USER||{}, data);
    window.SCM_RBAC = { modules: data.modules||[], roleKey: data.roleKey };

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

  // dronahq-sso.js may finish (and dispatch scm:sso-ready) before this script's
  // listener above is even attached — it sets window.SCM_USER either way, so
  // check that synchronously too as a fallback against that race.
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

    function moduleCheckboxes(){
      return modules.map(function(m){
        return '<label style="display:flex;align-items:center;gap:6px;font-size:13px;padding:4px 0">'+
          '<input type="checkbox" name="moduleKeys" value="'+escapeHtml(m.moduleKey)+'"> '+
          escapeHtml(m.moduleName)+
        '</label>';
      }).join('');
    }

    function userRow(u){
      var modsText = (u.moduleNames||[]).join(', ') || '—';
      return '<tr>'+
        '<td style="padding:8px 10px">'+escapeHtml(u.email)+'</td>'+
        '<td style="padding:8px 10px">'+escapeHtml(u.username||'')+'</td>'+
        '<td style="padding:8px 10px">'+escapeHtml(u.roleName)+'</td>'+
        '<td style="padding:8px 10px;color:#6b5b4d">'+escapeHtml(modsText)+'</td>'+
        '<td style="padding:8px 10px;color:#8a7a6c">'+escapeHtml((u.createdAt||'').slice(0,10))+'</td>'+
        '<td style="padding:8px 10px;white-space:nowrap">'+
          '<button type="button" class="admin-edit" data-email="'+escapeHtml(u.email)+'" '+
            'style="border:1px solid #7a1620;color:#7a1620;background:none;border-radius:6px;padding:4px 10px;cursor:pointer;margin-right:6px">Edit</button>'+
          '<button type="button" class="admin-remove" data-email="'+escapeHtml(u.email)+'" '+
            'style="border:1px solid #c9463a;color:#c9463a;background:none;border-radius:6px;padding:4px 10px;cursor:pointer">Remove</button>'+
        '</td>'+
      '</tr>';
    }

    host.innerHTML =
      '<div style="background:#fff;border:1px solid #eee1d3;border-radius:10px;padding:18px;margin-bottom:20px;max-width:640px">'+
        '<h3 id="adminFormHeading" style="margin:0 0 12px;font-size:15px">Add user</h3>'+
        '<form id="adminAddForm">'+
          '<div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin-bottom:12px">'+
            '<input name="email" type="email" required placeholder="name@algihaz.com" style="flex:1 1 220px;padding:8px 10px;border:1px solid #ddd;border-radius:6px">'+
            '<input name="username" type="text" placeholder="Display name" style="flex:1 1 160px;padding:8px 10px;border:1px solid #ddd;border-radius:6px">'+
            '<select name="roleKey" required style="padding:8px 10px;border:1px solid #ddd;border-radius:6px">'+roleOptions()+'</select>'+
          '</div>'+
          '<div style="margin-bottom:12px">'+
            '<div style="font-size:12px;color:#8a7a6c;margin-bottom:4px">Modules (Editors see every page but only edit these; Viewers only see these)</div>'+
            moduleCheckboxes()+
          '</div>'+
          '<button type="submit" id="adminFormSubmitBtn" style="background:#7a1620;color:#fff;border:none;border-radius:6px;padding:8px 16px;cursor:pointer">Add</button>'+
          '<button type="button" id="adminFormCancelBtn" hidden style="background:none;border:1px solid #ddd;border-radius:6px;padding:8px 16px;cursor:pointer;margin-left:8px">Cancel</button>'+
        '</form>'+
        '<p id="adminAddMsg" style="margin:10px 0 0;font-size:13px"></p>'+
      '</div>'+
      '<div style="background:#fff;border:1px solid #eee1d3;border-radius:10px;overflow:auto">'+
        '<table style="width:100%;border-collapse:collapse;font-size:13px">'+
          '<thead><tr style="text-align:left;border-bottom:1px solid #eee1d3;color:#8a7a6c">'+
            '<th style="padding:8px 10px">Email</th><th style="padding:8px 10px">Name</th>'+
            '<th style="padding:8px 10px">Role</th><th style="padding:8px 10px">Modules</th>'+
            '<th style="padding:8px 10px">Added</th><th></th>'+
          '</tr></thead>'+
          '<tbody id="adminUserRows">'+users.map(userRow).join('')+'</tbody>'+
        '</table>'+
      '</div>';

    var editingEmail = null;   // set while the form is pre-filled to edit an existing user

    function enterEditMode(u){
      editingEmail = u.email;
      var form = document.getElementById('adminAddForm');
      form.email.value = u.email;
      form.email.readOnly = true;
      form.username.value = u.username || '';
      form.roleKey.value = u.roleKey;
      var have = new Set(u.moduleKeys || []);
      form.querySelectorAll('input[name="moduleKeys"]').forEach(function(cb){ cb.checked = have.has(cb.value); });
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
        moduleKeys: fd.getAll('moduleKeys')
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
