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

  // Minimal RFC4180-ish CSV parser — handles quoted fields, embedded commas,
  // doubled-quote escaping, and CRLF/LF line endings. Good enough for a
  // template filled in Excel; not meant to handle arbitrary malformed CSV.
  function parseCsv(text){
    var rows = [], row = [], field = '', inQuotes = false;
    for(var i=0;i<text.length;i++){
      var c = text[i];
      if(inQuotes){
        if(c === '"'){
          if(text[i+1] === '"'){ field += '"'; i++; }
          else inQuotes = false;
        } else field += c;
      } else if(c === '"'){
        inQuotes = true;
      } else if(c === ','){
        row.push(field); field = '';
      } else if(c === '\r'){
        // skip; \n (bare or following \r) ends the row
      } else if(c === '\n'){
        row.push(field); field = '';
        if(row.length > 1 || row[0] !== '') rows.push(row);
        row = [];
      } else {
        field += c;
      }
    }
    if(field !== '' || row.length > 0){ row.push(field); rows.push(row); }
    return rows;
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
        '<td style="padding:8px 10px"><button type="button" class="admin-remove" data-email="'+escapeHtml(u.email)+'" '+
          'style="border:1px solid #c9463a;color:#c9463a;background:none;border-radius:6px;padding:4px 10px;cursor:pointer">Remove</button></td>'+
      '</tr>';
    }

    host.innerHTML =
      '<div style="background:#fff;border:1px solid #eee1d3;border-radius:10px;padding:18px;margin-bottom:20px;max-width:640px">'+
        '<h3 style="margin:0 0 12px;font-size:15px">Add user</h3>'+
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
          '<button type="submit" style="background:#7a1620;color:#fff;border:none;border-radius:6px;padding:8px 16px;cursor:pointer">Add</button>'+
        '</form>'+
        '<p id="adminAddMsg" style="margin:10px 0 0;font-size:13px"></p>'+
      '</div>'+
      '<div style="background:#fff;border:1px solid #eee1d3;border-radius:10px;padding:18px;margin-bottom:20px;max-width:640px">'+
        '<h3 style="margin:0 0 8px;font-size:15px">Bulk add users</h3>'+
        '<p class="admbulk__hint">'+
          'Download the template, fill one row per user, then upload it. '+
          'Role must be exactly <code>administrator</code>, <code>editor</code> or <code>viewer</code>. '+
          'Modules is optional — separate multiple with a semicolon, using the exact page names shown above '+
          '(e.g. <code>AGC Approved Vendor List;Risk Register</code>).'+
        '</p>'+
        '<div class="admbulk__steps">'+
          '<div class="admstep">'+
            '<span class="admstep__n">1</span>'+
            '<button type="button" class="admbtn" id="adminDownloadTemplate">Download template (.csv)</button>'+
          '</div>'+
          '<div class="admstep">'+
            '<span class="admstep__n">2</span>'+
            '<label class="admfile" for="adminBulkFile">'+
              '<span class="admfile__btn">Choose file</span>'+
              '<span class="admfile__name" id="adminBulkFileName">No file chosen</span>'+
            '</label>'+
            '<input type="file" id="adminBulkFile" accept=".csv" hidden>'+
            '<button type="button" class="admbtn admbtn--go" id="adminBulkUpload">Upload</button>'+
          '</div>'+
        '</div>'+
        '<div class="admbulk__results" id="adminBulkResults"></div>'+
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
      msg.textContent = 'Adding…'; msg.style.color = '#6b5b4d';
      try{
        var res = await fetch(apiBase()+'/api/admin/users', {
          method:'POST',
          headers: authHeaders({'X-User-Email': adminEmail, 'Content-Type':'application/json'}),
          body: JSON.stringify(body)
        });
        if(!res.ok){ var t = await res.text(); throw new Error(t); }
        msg.textContent = 'Added.'; msg.style.color = '#2e7d32';
        e.target.reset();
        renderAdminPage(adminEmail);
      }catch(err){
        msg.textContent = 'Failed: '+err.message; msg.style.color = '#c9463a';
      }
    });

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

    document.getElementById('adminDownloadTemplate').addEventListener('click', function(){
      var csv = 'Email,Name,Role,Modules\r\n'+
        'jane.doe@algihaz.com,Jane Doe,editor,AGC Approved Vendor List;Risk Register\r\n';
      var blob = new Blob([csv], {type: 'text/csv'});
      var url = URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.href = url; a.download = 'scm-user-upload-template.csv';
      document.body.appendChild(a); a.click(); a.remove();
      URL.revokeObjectURL(url);
    });

    document.getElementById('adminBulkFile').addEventListener('change', function(e){
      var nameEl = document.getElementById('adminBulkFileName');
      var f = e.target.files[0];
      nameEl.textContent = f ? f.name : 'No file chosen';
      nameEl.classList.toggle('has-file', !!f);
    });

    document.getElementById('adminBulkUpload').addEventListener('click', async function(){
      var fileInput = document.getElementById('adminBulkFile');
      var resultsEl = document.getElementById('adminBulkResults');
      var file = fileInput.files[0];
      if(!file){ resultsEl.innerHTML = '<p style="color:#c9463a;font-size:13px">Choose a CSV file first.</p>'; return; }

      var roleByName = {}; roles.forEach(function(r){ roleByName[r.roleKey.toLowerCase()] = r.roleKey; });
      var moduleByName = {}; modules.forEach(function(m){
        moduleByName[m.moduleName.toLowerCase()] = m.moduleKey;
        moduleByName[m.moduleKey.toLowerCase()] = m.moduleKey;
      });

      var text = await file.text();
      var rows = parseCsv(text);
      if(!rows.length){ resultsEl.innerHTML = '<p style="color:#c9463a;font-size:13px">File is empty.</p>'; return; }
      var header = rows[0].map(function(h){ return h.trim().toLowerCase(); });
      var iEmail = header.indexOf('email'), iName = header.indexOf('name'),
          iRole = header.indexOf('role'), iMods = header.indexOf('modules');
      if(iEmail<0 || iRole<0){
        resultsEl.innerHTML = '<p style="color:#c9463a;font-size:13px">Header row must include at least "Email" and "Role" columns.</p>';
        return;
      }

      var users = [], parseErrors = [];
      rows.slice(1).forEach(function(r, idx){
        if(r.every(function(c){ return c.trim()===''; })) return; // skip blank rows
        var email = (r[iEmail]||'').trim();
        var roleRaw = (r[iRole]||'').trim();
        var roleKey = roleByName[roleRaw.toLowerCase()];
        if(!email || !roleKey){
          parseErrors.push({email: email||'(row '+(idx+2)+')', status:'error', detail: !email ? 'missing email' : 'unrecognised role "'+roleRaw+'"'});
          return;
        }
        var modNames = iMods>=0 ? (r[iMods]||'').split(';').map(function(s){return s.trim();}).filter(Boolean) : [];
        var modKeys = [], badMod = null;
        modNames.forEach(function(n){
          var k = moduleByName[n.toLowerCase()];
          if(k) modKeys.push(k); else badMod = n;
        });
        if(badMod){
          parseErrors.push({email: email, status:'error', detail: 'unrecognised module "'+badMod+'"'});
          return;
        }
        users.push({email: email, username: (iName>=0 ? (r[iName]||'').trim() : '') || null, roleKey: roleKey, moduleKeys: modKeys});
      });

      resultsEl.innerHTML = '<p class="admbulk__summary">Uploading '+users.length+' row(s)…</p>';
      var apiResults = [];
      if(users.length){
        try{
          var res = await fetch(apiBase()+'/api/admin/users/bulk', {
            method:'POST',
            headers: authHeaders({'X-User-Email': adminEmail, 'Content-Type':'application/json'}),
            body: JSON.stringify({users: users})
          });
          if(!res.ok){ var t = await res.text(); throw new Error(t); }
          var data = await res.json();
          apiResults = data.results || [];
        }catch(err){
          resultsEl.innerHTML = '<p style="color:#c9463a;font-size:13px">Upload failed: '+escapeHtml(err.message)+'</p>';
          return;
        }
      }

      var all = apiResults.concat(parseErrors);
      var okCount = all.filter(function(r){return r.status==='ok';}).length;
      var allOk = okCount === all.length;
      resultsEl.innerHTML =
        '<p class="admbulk__summary" style="color:'+(allOk?'#2e7d32':'#6b5b4d')+'">'+
          (allOk ? '✓ ' : '') + okCount+' of '+all.length+' row(s) added successfully.'+
        '</p>'+
        '<table>'+
          '<tbody>'+all.map(function(r){
            var ok = r.status==='ok';
            return '<tr><td style="width:20px;color:'+(ok?'#2e7d32':'#c9463a')+';font-weight:700">'+(ok?'✓':'✗')+'</td>'+
              '<td>'+escapeHtml(r.email)+'</td>'+
              '<td style="color:#8a7a6c">'+escapeHtml(r.detail||'')+'</td></tr>';
          }).join('')+
          '</tbody>'+
        '</table>';
      fileInput.value = '';
      var fnEl = document.getElementById('adminBulkFileName');
      fnEl.textContent = 'No file chosen'; fnEl.classList.remove('has-file');
      if(okCount>0){
        try{
          var refreshed = await fetch(apiBase()+'/api/admin/users', {headers: authHeaders({'X-User-Email': adminEmail})});
          if(refreshed.ok){
            var refreshedUsers = await refreshed.json();
            document.getElementById('adminUserRows').innerHTML = refreshedUsers.map(userRow).join('');
            bindRemoveButtons();
          }
        }catch(e){ /* results panel above still shows what happened; list refresh is best-effort */ }
      }
    });
  }
})();
