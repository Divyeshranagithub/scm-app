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

    var roles, modules, users = [];
    try{
      var hdr = authHeaders({'X-User-Email': adminEmail});
      var [rolesRes, modsRes] = await Promise.all([
        fetch(apiBase()+'/api/admin/roles', {headers: hdr}),
        fetch(apiBase()+'/api/admin/modules', {headers: hdr})
      ]);
      if(!rolesRes.ok || !modsRes.ok) throw new Error('admin fetch failed');
      roles = await rolesRes.json();
      modules = await modsRes.json();
    }catch(err){
      host.innerHTML = '<p style="color:#7a1620">Could not load user management data. '+escapeHtml(err.message)+'</p>';
      return;
    }

    var PAGE_SIZE_USERS = 20, PAGE_SIZE_AUDIT = 50;
    var userState = {q:'', offset:0, total:0};
    var auditState = {actor:'', from:'', to:'', offset:0, total:0};

    function pagerHtml(idPrefix, state, pageSize){
      var page = Math.floor(state.offset/pageSize)+1;
      var pages = Math.max(1, Math.ceil(state.total/pageSize));
      return '<button type="button" class="umbtn" data-act="'+idPrefix+'Prev"'+(state.offset<=0?' disabled':'')+'>&#8249; Prev</button>'+
        '<span class="umpager__info">Page '+page+' of '+pages+' &middot; '+state.total+' total</span>'+
        '<button type="button" class="umbtn" data-act="'+idPrefix+'Next"'+(state.offset+pageSize>=state.total?' disabled':'')+'>Next &#8250;</button>';
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

    var ACTION_LABEL = {
      'login': 'Signed in',
      'dataset.update': 'Published content',
      'user.add': 'Added/updated user',
      'user.remove': 'Removed user'
    };
    function auditRow(a){
      var when = (a.occurredAt||'').replace('T',' ').slice(0,19);
      return '<tr>'+
        '<td class="umtable__date">'+escapeHtml(when)+'</td>'+
        '<td>'+escapeHtml(a.actorEmail)+'</td>'+
        '<td>'+escapeHtml(ACTION_LABEL[a.action]||a.action)+'</td>'+
        '<td>'+escapeHtml(a.target||'—')+'</td>'+
      '</tr>';
    }
    async function loadAuditLog(){
      var elHost = document.getElementById('auditLogHost');
      var pagerBox = document.getElementById('auditPagerBox');
      if(!elHost) return;
      elHost.innerHTML = 'Loading…';
      try{
        var qs = 'limit='+PAGE_SIZE_AUDIT+'&offset='+auditState.offset;
        if(auditState.actor) qs += '&actor='+encodeURIComponent(auditState.actor);
        if(auditState.from) qs += '&from_date='+encodeURIComponent(auditState.from);
        if(auditState.to) qs += '&to_date='+encodeURIComponent(auditState.to);
        var res = await fetch(apiBase()+'/api/admin/audit-log?'+qs, {
          headers: authHeaders({'X-User-Email': adminEmail})
        });
        if(!res.ok) throw new Error('HTTP '+res.status);
        var data = await res.json();
        auditState.total = data.total;
        elHost.innerHTML = !data.items.length
          ? '<p class="adm__hint">No activity matches these filters.</p>'
          : '<div class="umtablewrap"><table class="umtable"><thead><tr>'+
              '<th>When</th><th>Who</th><th>Action</th><th>Target</th>'+
            '</tr></thead><tbody>'+data.items.map(auditRow).join('')+'</tbody></table></div>';
        if(pagerBox) pagerBox.innerHTML = pagerHtml('audit', auditState, PAGE_SIZE_AUDIT);
      }catch(err){
        elHost.innerHTML = '<p style="color:#7a1620">Could not load the activity log. '+escapeHtml(err.message)+'</p>';
        if(pagerBox) pagerBox.innerHTML = '';
      }
    }
    async function loadAuditActors(){
      var sel = document.getElementById('auditActorSelect');
      if(!sel) return;
      try{
        var res = await fetch(apiBase()+'/api/admin/audit-log/actors', {headers: authHeaders({'X-User-Email': adminEmail})});
        if(!res.ok) return;
        var actors = await res.json();
        sel.innerHTML = '<option value="">All users</option>'+actors.map(function(a){
          return '<option value="'+escapeHtml(a)+'">'+escapeHtml(a)+'</option>';
        }).join('');
      }catch(err){ /* dropdown just stays "All users" */ }
    }
    async function loadUsers(){
      var tbody = document.getElementById('adminUserRows');
      var pagerBox = document.getElementById('userPagerBox');
      if(!tbody) return;
      tbody.innerHTML = '<tr><td colspan="7" class="adm__hint">Loading…</td></tr>';
      try{
        var qs = 'limit='+PAGE_SIZE_USERS+'&offset='+userState.offset;
        if(userState.q) qs += '&q='+encodeURIComponent(userState.q);
        var res = await fetch(apiBase()+'/api/admin/users?'+qs, {headers: authHeaders({'X-User-Email': adminEmail})});
        if(!res.ok) throw new Error('HTTP '+res.status);
        var data = await res.json();
        users = data.items; userState.total = data.total;
        tbody.innerHTML = users.length
          ? users.map(userRow).join('')
          : '<tr><td colspan="7" class="adm__hint">No users match.</td></tr>';
        if(pagerBox) pagerBox.innerHTML = pagerHtml('user', userState, PAGE_SIZE_USERS);
        bindEditButtons();
        bindRemoveButtons();
      }catch(err){
        tbody.innerHTML = '<tr><td colspan="7" style="color:#7a1620">Could not load users. '+escapeHtml(err.message)+'</td></tr>';
        if(pagerBox) pagerBox.innerHTML = '';
      }
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
      '<div class="umcard" style="margin-top:24px">'+
        '<h3 class="umcard__h">All users</h3>'+
        '<form id="userSearchForm" class="umsearch">'+
          '<input type="search" name="q" class="expsearch" placeholder="Search by email or name…">'+
          '<button type="submit" class="umbtn">Search</button>'+
        '</form>'+
        '<div class="umtablewrap">'+
          '<table class="umtable">'+
            '<thead><tr>'+
              '<th>Email</th><th>Name</th>'+
              '<th>Role</th><th>View</th><th>Edit</th>'+
              '<th>Added</th><th></th>'+
            '</tr></thead>'+
            '<tbody id="adminUserRows">Loading…</tbody>'+
          '</table>'+
        '</div>'+
        '<div class="umpager" id="userPagerBox"></div>'+
      '</div>'+
      '<div class="umcard" style="margin-top:24px">'+
        '<h3 class="umcard__h">Activity log</h3>'+
        '<p class="umcard__sub">Who signed in, and who last changed which page or user — newest first.</p>'+
        '<div class="umfilters">'+
          '<select id="auditActorSelect"><option value="">All users</option></select>'+
          '<label>From <input type="date" id="auditFromDate"></label>'+
          '<label>To <input type="date" id="auditToDate"></label>'+
          '<button type="button" class="umbtn" data-act="auditClear">Clear filters</button>'+
          '<button type="button" class="umbtn" data-act="auditRefresh">Refresh</button>'+
        '</div>'+
        '<div id="auditLogHost">Loading…</div>'+
        '<div class="umpager" id="auditPagerBox"></div>'+
      '</div>';

    wireModuleTable(document.getElementById('adminAddForm'));
    loadUsers();
    loadAuditActors();
    loadAuditLog();

    host.addEventListener('click', function(ev){
      var b = ev.target.closest && ev.target.closest('[data-act]');
      if(!b) return;
      var act = b.dataset.act;
      if(act === 'userPrev'){ userState.offset = Math.max(0, userState.offset - PAGE_SIZE_USERS); loadUsers(); }
      else if(act === 'userNext'){ userState.offset += PAGE_SIZE_USERS; loadUsers(); }
      else if(act === 'auditPrev'){ auditState.offset = Math.max(0, auditState.offset - PAGE_SIZE_AUDIT); loadAuditLog(); }
      else if(act === 'auditNext'){ auditState.offset += PAGE_SIZE_AUDIT; loadAuditLog(); }
      else if(act === 'auditRefresh'){ loadAuditLog(); }
      else if(act === 'auditClear'){
        auditState.actor = ''; auditState.from = ''; auditState.to = ''; auditState.offset = 0;
        document.getElementById('auditActorSelect').value = '';
        document.getElementById('auditFromDate').value = '';
        document.getElementById('auditToDate').value = '';
        loadAuditLog();
      }
    });
    host.addEventListener('submit', function(ev){
      if(ev.target && ev.target.id === 'userSearchForm'){
        ev.preventDefault();
        userState.q = ev.target.q.value.trim();
        userState.offset = 0;
        loadUsers();
      }
    });
    host.addEventListener('change', function(ev){
      if(ev.target && ev.target.id === 'auditActorSelect'){
        auditState.actor = ev.target.value; auditState.offset = 0; loadAuditLog();
      }
      if(ev.target && (ev.target.id === 'auditFromDate' || ev.target.id === 'auditToDate')){
        auditState.from = document.getElementById('auditFromDate').value;
        auditState.to = document.getElementById('auditToDate').value;
        auditState.offset = 0;
        loadAuditLog();
      }
    });

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
        exitEditMode();
        loadUsers();
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
            loadUsers();
          }catch(err){ alert('Could not remove user: '+err.message); }
        });
      });
    }
  }
})();
