/* =============================================================================
   CONTENT ADMINISTRATION — editor for the datasets the site renders from.

   Adapted from the business-supplied reference (scm-vibecode/_src/js/page-admin.js).
   Differences from that reference, both because we have no Dataverse tables:
     - No "Publish to Dataverse" / Data source tab.
     - Every dataset here has moved off static files (see RESOURCES[].apiKey)
       and publishes straight to the backend (PUT /api/data/{key}, RBAC-
       gated) via the "Publish" button — the live page picks it up
       immediately, no file upload. "Download .json" is kept as a manual
       backup/export route, not the primary save path.
     - Visible only to editor/administrator (gated in rbac.js, not here).
       Which datasets an *editor* sees is further scoped to their assigned
       permissions; an administrator sees all of them.
   ============================================================================= */
(function () {
  'use strict';

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function el(id) { return document.getElementById(id); }
  var E = esc;

  var RESOURCES = [
    {
      key: 'overview', label: 'Overview KPIs', moduleKey: 'overview',
      file: 'scm-overview.json', apiKey: 'overview',
      desc: 'The executive summary: overall score, value captured, and every KPI group on the Overview page.',
      editor: 'overview'
    },
    {
      key: 'masterdata', label: 'Master data progress', moduleKey: 'masterdata',
      file: 'scm-masterdata.json', apiKey: 'masterdata',
      desc: 'Item-code cleansing: headline figures, batch progress, and the taxonomy-mapping section.',
      editor: 'masterdata'
    },
    {
      key: 'coststructure', label: 'Cost structure', moduleKey: 'coststructure',
      file: 'cost-structure.json', apiKey: 'coststructure',
      desc: 'Commodity cost breakdowns behind the Should-Cost reference library. Edit as JSON or replace the whole document from a file.',
      editor: 'json'
    },
    {
      key: 'avl', label: 'AGC vendor list', moduleKey: 'avl',
      file: 'avl.json', apiKey: 'avl',
      desc: 'The approved vendor extract behind the AGC AVL dashboard. Large and machine-generated — replace the whole document rather than hand-editing rows.',
      editor: 'json'
    },
    {
      key: 'sec', label: 'SEC sole-source data', moduleKey: 'secsole',
      file: 'sec-sole-source.json', apiKey: 'sec-sole-source',
      desc: 'Vendor records behind the SEC sole-source risk analysis. Replace as a whole document.',
      editor: 'json'
    },
    {
      key: 'secdetails', label: 'SEC record details', moduleKey: 'secsole',
      file: 'sec-avl-details.json', apiKey: 'sec-avl-details',
      desc: 'The long free-text fields shown in the SEC record drawer. Loaded only when a record is opened, so it is kept in its own file.',
      editor: 'json'
    },
    {
      key: 'monthly', label: 'Monthly reports', moduleKey: 'monthly',
      file: 'scm-monthly.json', apiKey: 'monthly',
      desc: 'The month picker on Monthly Intelligence. Add a month here to publish its report; leave the URL empty to show "not published yet".',
      editor: 'monthly'
    },
    {
      key: 'embed-scmkpi', label: 'SCM KPIs — Power BI link', moduleKey: 'scmkpi',
      file: 'scm-embed-scmkpi.json', apiKey: 'embed-scmkpi',
      desc: 'The Power BI report embedded on the SCM KPIs page.',
      editor: 'embed'
    },
    {
      key: 'embed-secavl', label: 'SEC Approved Vendor List — Power BI link', moduleKey: 'secavl',
      file: 'scm-embed-secavl.json', apiKey: 'embed-secavl',
      desc: 'The Power BI report embedded on the SEC Approved Vendor List page.',
      editor: 'embed'
    },
    {
      key: 'embed-riskregister', label: 'Risk Register — Power BI link', moduleKey: 'riskregister',
      file: 'scm-embed-riskregister.json', apiKey: 'embed-riskregister',
      desc: 'The Power BI report embedded on the Risk Register page.',
      editor: 'embed'
    },
    {
      key: 'embed-cfpPt', label: 'Power Transformers Fact Pack — SharePoint link', moduleKey: 'categoryfactpacks',
      file: 'scm-embed-cfp-powertransformers.json', apiKey: 'embed-cfpPt',
      desc: 'The SharePoint document embedded on the Power Transformers fact pack page.',
      editor: 'embed'
    }
  ];
  var byKey = {}; RESOURCES.forEach(function (r) { byKey[r.key] = r; });

  var ST = { key: null, view: 'form', data: {}, orig: {}, src: {}, dirty: {}, loaded: {}, allowedKeys: [] };
  var clone = function (o) { return JSON.parse(JSON.stringify(o)); };
  var cur = function () { return byKey[ST.key]; };

  function getPath(obj, path) {
    return String(path).split('.').reduce(function (o, k) { return (o == null) ? undefined : o[k]; }, obj);
  }
  function setPath(obj, path, val) {
    var parts = String(path).split('.'), last = parts.pop(), node = obj;
    parts.forEach(function (k) {
      if (node[k] == null || typeof node[k] !== 'object') node[k] = /^\d+$/.test(k) ? [] : {};
      node = node[k];
    });
    if (val === '' || val === undefined) delete node[last]; else node[last] = val;
  }
  function markDirty() {
    ST.dirty[ST.key] = true;
    var d = el('admDirty'); if (d) d.hidden = false;
    renderRail();
  }

  function field(path, label, opts) {
    opts = opts || {};
    var v = getPath(ST.data[ST.key], path);
    if (v === undefined || v === null) v = '';
    var hint = opts.hint ? '<em>' + E(opts.hint) + '</em>' : '';
    var cls = 'admf' + (opts.wide ? ' admf--wide' : '');
    var attrs = 'data-path="' + E(path) + '" data-kind="' + (opts.type || 'text') + '"';
    var control;
    if (opts.type === 'textarea') {
      control = '<textarea ' + attrs + ' rows="3">' + E(v) + '</textarea>';
    } else if (opts.type === 'select') {
      control = '<select ' + attrs + '>' + (opts.options || []).map(function (o) {
        var val = (typeof o === 'string') ? o : o.v, lab = (typeof o === 'string') ? o : o.l;
        return '<option value="' + E(val) + '"' + (String(v) === String(val) ? ' selected' : '') + '>' + E(lab) + '</option>';
      }).join('') + '</select>';
    } else if (opts.type === 'number') {
      control = '<input type="number" ' + attrs + ' value="' + E(v) + '"' + (opts.step ? ' step="' + E(opts.step) + '"' : ' step="any"') + '>';
    } else {
      control = '<input type="text" ' + attrs + ' value="' + E(v) + '">';
    }
    return '<label class="' + cls + '"><span class="admf__l">' + E(label) + hint + '</span>' + control + '</label>';
  }
  function group(title, note, body) {
    return '<div class="admgrp"><div class="admgrp__h"><b>' + E(title) + '</b>' +
      (note ? '<em>' + E(note) + '</em>' : '') + '</div><div class="admgrp__b">' + body + '</div></div>';
  }
  function list(path, opts) {
    var arr = getPath(ST.data[ST.key], path) || [];
    var rows = arr.map(function (item, i) {
      var last = i === arr.length - 1;
      return '<div class="admitem">' +
        '<div class="admitem__h"><span class="admitem__n">' + (i + 1) + '</span>' +
        '<span class="admitem__t">' + E(opts.title(item, i)) + '</span>' +
        '<button type="button" class="admicon" title="Move up" data-act="admList" data-a1="up" data-a2="' + E(path) + '" data-a3="' + i + '"' + (i === 0 ? ' disabled' : '') + '>&#9650;</button>' +
        '<button type="button" class="admicon" title="Move down" data-act="admList" data-a1="down" data-a2="' + E(path) + '" data-a3="' + i + '"' + (last ? ' disabled' : '') + '>&#9660;</button>' +
        '<button type="button" class="admicon admicon--del" title="Remove" data-act="admList" data-a1="del" data-a2="' + E(path) + '" data-a3="' + i + '">&#10005;</button></div>' +
        '<div class="admitem__b">' + opts.render(path + '.' + i, item, i) + '</div></div>';
    }).join('');
    return '<div class="admlist">' + rows +
      '<button type="button" class="admadd" data-act="admList" data-a1="add" data-a2="' + E(path) + '">+ ' + E(opts.addLabel || 'Add') + '</button></div>';
  }

  window.admList = function (op, path, index) {
    var arr = getPath(ST.data[ST.key], path);
    if (!Array.isArray(arr)) { arr = []; setPath(ST.data[ST.key], path, arr); }
    if (op === 'add') arr.push(clone(blankFor(ST.key, path)));
    else if (op === 'del') arr.splice(index, 1);
    else if (op === 'up' && index > 0) arr.splice(index - 1, 0, arr.splice(index, 1)[0]);
    else if (op === 'down' && index < arr.length - 1) arr.splice(index + 1, 0, arr.splice(index, 1)[0]);
    markDirty();
    renderForm();
  };

  function blankFor(key, path) {
    var tail = String(path).split('.').pop();
    if (key === 'overview') {
      if (tail === 'groups') return { name: 'New group', note: '', kpis: [] };
      if (tail === 'kpis') return { cap: 'New KPI', value: 0, disp: '0', unit: '', type: 'stat' };
    }
    if (key === 'masterdata') {
      if (tail === 'headline') return { cap: 'New figure', value: '', sub: '' };
      if (tail === 'completed' || tail === 'remaining') return { n: 'BATCH', value: '', d: '', pct: 0 };
      if (tail === 'kpis') return { cap: '', value: '', sub: '' };
      if (tail === 'steps') return { b: '', p: '' };
    }
    if (key === 'monthly' && tail === 'months') return { key: '', label: '', status: 'updating', src: '' };
    return {};
  }

  function formOverview() {
    var out = group('Header', 'Printed above the KPI groups',
      '<div class="admrow">' + field('title', 'Title', { wide: true }) + field('cutoff', 'Cut-off line') +
      field('cadence', 'Cadence') + field('poDate', 'Period') +
      field('overallScore', 'Overall score', { type: 'number', hint: '0–100' }) + '</div>');
    out += group('Value captured', 'Spend, saving and avoidance shown at the top of the page',
      '<div class="admrow">' + field('value.spend', 'Total spend', { type: 'number' }) + field('value.spendUnit', 'Spend unit') +
      field('value.saving', 'Saving', { type: 'number' }) + field('value.savingUnit', 'Saving unit') +
      field('value.savingPct', 'Saving %', { type: 'number' }) + field('value.avoidance', 'Avoidance', { type: 'number' }) +
      field('value.avoidanceUnit', 'Avoidance unit') + field('value.avoidancePct', 'Avoidance %', { type: 'number' }) + '</div>');
    out += group('KPI groups', 'Each group renders as one band of cards',
      list('groups', {
        addLabel: 'Add KPI group',
        title: function (g) { return (g.name || '(untitled)') + ' · ' + ((g.kpis || []).length) + ' KPIs'; },
        render: function (p) {
          return '<div class="admrow">' + field(p + '.name', 'Group name') + field(p + '.note', 'Group note', { wide: true }) + '</div>' +
            '<div class="admgrp admgrp--nest"><div class="admgrp__h"><b>KPIs</b></div><div class="admgrp__b">' +
            list(p + '.kpis', {
              addLabel: 'Add KPI',
              title: function (k) { return k.cap || '(untitled)'; },
              render: function (kp) {
                return '<div class="admrow">' + field(kp + '.cap', 'Caption', { wide: true }) +
                  field(kp + '.value', 'Value', { type: 'number', hint: 'used for the bar' }) +
                  field(kp + '.disp', 'Displayed as', { hint: 'text shown' }) + field(kp + '.unit', 'Unit') +
                  field(kp + '.type', 'Type', { type: 'select', options: [{ v: '', l: 'bullet (default)' }, { v: 'stat', l: 'stat' }] }) +
                  field(kp + '.min', 'Minimum', { type: 'number' }) + field(kp + '.target', 'Target', { type: 'number' }) +
                  field(kp + '.max', 'Axis max', { type: 'number' }) + field(kp + '.maxAccept', 'Max acceptable', { type: 'number' }) +
                  field(kp + '.dir', 'Better when', { type: 'select', options: [{ v: '', l: '—' }, { v: 'higher', l: 'higher' }, { v: 'lower', l: 'lower' }] }) +
                  field(kp + '.sub', 'Sub-caption', { wide: true }) + field(kp + '.note', 'Note', { wide: true, type: 'textarea' }) + '</div>';
              }
            }) + '</div></div>';
        }
      }));
    return out;
  }

  function formMasterdata() {
    var out = group('Header', null, '<div class="admrow">' + field('title', 'Title', { wide: true }) +
      field('sub', 'Sub-title', { wide: true }) + field('context', 'Context line', { wide: true }) + '</div>');
    out += group('Headline figures', 'The three cards at the top', list('headline', {
      addLabel: 'Add figure', title: function (h) { return h.cap || '(untitled)'; },
      render: function (p) {
        return '<div class="admrow">' + field(p + '.cap', 'Caption') + field(p + '.value', 'Value') + field(p + '.from', 'Was') +
          field(p + '.pct', 'Bar %', { type: 'number' }) +
          field(p + '.accent', 'Accent', { type: 'select', options: [{ v: '', l: '—' }, { v: 'ok', l: 'ok' }, { v: 'warn', l: 'warn' }] }) +
          field(p + '.sub', 'Sub-caption', { wide: true }) + '</div>';
      }
    }));
    var batchRow = function (p) {
      return '<div class="admrow">' + field(p + '.n', 'Batch') + field(p + '.value', 'Value') +
        field(p + '.pct', 'Progress %', { type: 'number' }) + field(p + '.state', 'State') +
        field(p + '.d', 'Description', { wide: true }) + '</div>';
    };
    out += group('Completed batches', null, list('completed', { addLabel: 'Add batch', title: function (b) { return b.n || '(batch)'; }, render: batchRow }));
    out += group('Remaining batches', null, list('remaining', { addLabel: 'Add batch', title: function (b) { return b.n || '(batch)'; }, render: batchRow }) +
      '<div class="admrow admrow--gap">' + field('perBatchNote', 'Per-batch note', { wide: true, hint: '<b> allowed' }) +
      field('remainingNote', 'Remaining note', { wide: true, type: 'textarea' }) + '</div>');
    out += group('Taxonomy mapping', 'The AI classification section',
      '<div class="admrow">' + field('taxonomy.title', 'Title', { wide: true }) + field('taxonomy.sub', 'Sub-title', { wide: true }) +
      field('taxonomy.goal', 'Goal', { wide: true, type: 'textarea' }) + '</div>' +
      '<div class="admgrp admgrp--nest"><div class="admgrp__h"><b>Taxonomy KPIs</b></div><div class="admgrp__b">' +
      list('taxonomy.kpis', {
        addLabel: 'Add KPI', title: function (k) { return k.cap || '(untitled)'; },
        render: function (p) { return '<div class="admrow">' + field(p + '.cap', 'Caption') + field(p + '.value', 'Value') + field(p + '.unit', 'Unit') + field(p + '.sub', 'Sub-caption', { wide: true }) + '</div>'; }
      }) + '</div></div>' +
      '<div class="admgrp admgrp--nest"><div class="admgrp__h"><b>Steps</b></div><div class="admgrp__b">' +
      list('taxonomy.steps', {
        addLabel: 'Add step', title: function (s) { return s.b || '(step)'; },
        render: function (p) { return '<div class="admrow">' + field(p + '.b', 'Step name', { wide: true }) + field(p + '.p', 'Description', { wide: true, type: 'textarea' }) + '</div>'; }
      }) + '</div></div>');
    return out;
  }

  function formJson() {
    var d = ST.data[ST.key];
    var size = JSON.stringify(d).length;
    var top = Object.keys(d || {});
    var shape = Array.isArray(d) ? 'an array of ' + d.length + ' entries' :
      'an object with ' + top.length + ' top-level keys: ' + top.slice(0, 12).join(', ') + (top.length > 12 ? ' …' : '');
    return group('Document', null,
      '<p class="adm__hint">This dataset is machine-generated and has no field-by-field form. It is currently ' +
      E(shape) + ', about <b>' + Math.round(size / 1024) + ' KB</b>. Use the <b>JSON</b> tab to edit it, or ' +
      '<b>Replace from file…</b> there to swap the whole document for a fresh export.</p>' +
      '<button type="button" class="admadd" data-act="admView" data-a1="json">Open the JSON editor</button>');
  }

  function formMonthly() {
    return group('Published months', 'Newest first — the first row is what opens by default',
      list('months', {
        addLabel: 'Add month',
        title: function (m) { return (m.label || m.key || '(month)') + (m.src ? '' : ' · no report'); },
        render: function (p) {
          return '<div class="admrow">' +
            field(p + '.key', 'Key', { hint: 'e.g. 2026-08' }) +
            field(p + '.label', 'Label', { hint: 'e.g. August 2026' }) +
            field(p + '.status', 'Status', { type: 'select', options: [{ v: 'published', l: 'Published' }, { v: 'updating', l: 'Updating' }] }) +
            field(p + '.src', 'Power BI URL', { wide: true, hint: 'leave empty for "not published yet"' }) +
            '</div>';
        }
      }));
  }

  function formEmbed() {
    var r = cur();
    var out = group('Report link', 'Shown on the ' + r.label.split(' — ')[0] + ' page',
      '<div class="admrow">' + field('title', 'Title', { wide: true }) +
      field('src', 'Embed URL', { wide: true, hint: 'https, powerbi.com or sharepoint.com only' }) +
      (getPath(ST.data[ST.key], 'openUrl') !== undefined ? field('openUrl', '"Open in" link', { wide: true }) : '') +
      '</div>');
    return out;
  }

  var FORMS = { overview: formOverview, masterdata: formMasterdata, monthly: formMonthly, embed: formEmbed, json: formJson };

  function msg(kind, title, body) {
    var m = el('admMsg'); if (!m) return;
    m.hidden = false; m.className = 'adm__msg' + (kind ? ' ' + kind : '');
    m.innerHTML = '<b>' + title + '</b>' + (body || '');
  }
  function clearMsg() { var m = el('admMsg'); if (m) { m.hidden = true; m.innerHTML = ''; } }

  function renderRail() {
    var host = el('admRail'); if (!host) return;
    host.innerHTML = '<div class="admrail__h">Datasets</div>' + ST.allowedKeys.map(function (key) {
      var r = byKey[key];
      var state = ST.dirty[key] ? 'dirty' : (ST.loaded[key] ? 'ok' : 'warn');
      return '<button type="button" class="admrail__b ' + state + (key === ST.key ? ' is-on' : '') + '"' +
        ' data-act="admPick" data-a1="' + E(key) + '"><i></i><span>' + E(r.label) + '</span></button>';
    }).join('');
  }
  function renderForm() {
    var r = cur(); var host = el('admForm'); if (!host) return;
    if (!ST.data[r.key]) { host.innerHTML = '<div class="scmload">Loading…</div>'; return; }
    try { host.innerHTML = (FORMS[r.editor] || FORMS.json)(); }
    catch (e) {
      host.innerHTML = '<div class="scmerr"><b>This form could not be drawn</b>The document does not match the expected shape. Edit it on the JSON tab instead.<br><code>' + E(e.message) + '</code></div>';
    }
  }
  function renderJson() { var ta = el('admTa'); if (ta) ta.value = JSON.stringify(ST.data[ST.key], null, 2); }
  function renderHead() {
    var r = cur();
    el('admTitle').textContent = r.label;
    el('admDesc').textContent = r.desc;
    var chip = el('admSrc'); var s = ST.src[r.key];
    chip.textContent = s || 'not loaded';
    chip.className = 'srcchip' + (s && s.indexOf('Built-in') === 0 ? ' is-sample' : (s ? ' is-live' : ''));
    el('admDirty').hidden = !ST.dirty[r.key];
    var pb = el('admPublishBtn'); if (pb) pb.hidden = !r.apiKey;
    var db = el('admDownloadBtn');
    if (db) {
      db.textContent = r.apiKey ? 'Download backup .json' : 'Download .json';
      db.classList.toggle('admbtn--go', !r.apiKey);
    }
  }
  function renderView() {
    var v = ST.view;
    el('admForm').hidden = v !== 'form';
    el('admJson').hidden = v !== 'json';
    [['admTabForm', 'form'], ['admTabJson', 'json']].forEach(function (p) {
      var b = el(p[0]); if (!b) return;
      b.classList.toggle('is-on', v === p[1]);
      b.setAttribute('aria-selected', v === p[1] ? 'true' : 'false');
    });
    if (v === 'json') renderJson();
  }
  function renderAll() { renderRail(); renderHead(); renderForm(); renderView(); }

  window.admView = function (v) { ST.view = v; renderView(); };
  window.admPick = function (key) {
    if (!byKey[key] || ST.allowedKeys.indexOf(key) < 0) return;
    ST.key = key; ST.view = 'form'; clearMsg();
    load(key).then(renderAll);
  };
  window.admApplyJson = function () {
    var ta = el('admTa');
    try {
      ST.data[ST.key] = JSON.parse(ta.value);
      markDirty(); renderForm();
      msg('ok', 'JSON applied', 'The form now reflects this document. Nothing is downloaded yet.');
    } catch (e) { msg('', 'That is not valid JSON', 'The document was left unchanged.<br><code>' + E(e.message) + '</code>'); }
  };
  window.admFormatJson = function () {
    var ta = el('admTa');
    try { ta.value = JSON.stringify(JSON.parse(ta.value), null, 2); clearMsg(); }
    catch (e) { msg('', 'Cannot reformat', '<code>' + E(e.message) + '</code>'); }
  };
  window.admUpload = function () { el('admFile').click(); };
  window.admDownload = function () {
    var r = cur();
    var blob = new Blob([JSON.stringify(ST.data[r.key], null, 1)], { type: 'application/json' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a'); a.href = url; a.download = r.file;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 4000);
    ST.dirty[r.key] = false; ST.orig[r.key] = clone(ST.data[r.key]);
    renderRail(); renderHead();
    msg('ok', 'Downloaded ' + E(r.file),
      'Send this file to whoever deploys the site to replace <code>' + E(r.file) + '</code> at the site root. ' +
      'The live page reads it directly, so the change appears as soon as it is uploaded — no code deployment needed.');
  };
  window.admPublish = function () {
    var r = cur();
    if (!r.apiKey) return;
    var email = window.SCM_USER && window.SCM_USER.email;
    if (!email || !window.SCM_API) { msg('', 'Cannot publish', 'Your sign-in details are not available yet. Refresh the page and try again.'); return; }
    var btn = document.querySelector('[data-act="admPublish"]');
    if (btn) btn.disabled = true;
    fetch(window.SCM_API.base + '/api/data/' + encodeURIComponent(r.apiKey), {
      method: 'PUT', credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json', 'X-API-Key': window.SCM_API.key, 'X-User-Email': email },
      body: JSON.stringify(ST.data[r.key])
    }).then(function (res) {
      if (!res.ok) return res.json().catch(function () { return {}; }).then(function (b) {
        throw new Error(b.detail || ('HTTP ' + res.status));
      });
      return res.json();
    }).then(function () {
      ST.dirty[r.key] = false; ST.orig[r.key] = clone(ST.data[r.key]); ST.src[r.key] = 'Live · API';
      ST.loaded[r.key] = true;
      renderRail(); renderHead();
      msg('ok', 'Published', 'The live site now reads this document from the backend — the change is visible immediately, no file upload needed.');
    }).catch(function (e) {
      msg('', 'Publish failed', E(e.message));
    }).then(function () {
      if (btn) btn.disabled = false;
    });
  };
  window.admPreview = function () {
    if (window.SCM && typeof window.SCM.go === 'function') window.SCM.go(cur().moduleKey);
  };
  window.admRevert = function () {
    var r = cur(); if (!ST.orig[r.key]) return;
    ST.data[r.key] = clone(ST.orig[r.key]); ST.dirty[r.key] = false;
    clearMsg(); renderAll();
    msg('ok', 'Changes discarded', 'Back to the version that was loaded from ' + E(ST.src[r.key] || 'defaults') + '.');
  };

  function load(key) {
    var r = byKey[key];
    if (ST.data[key]) return Promise.resolve();
    var email = window.SCM_USER && window.SCM_USER.email;
    var apiReq = (r.apiKey && email && window.SCM_API)
      ? fetch(window.SCM_API.base + '/api/data/' + encodeURIComponent(r.apiKey) + '?email=' + encodeURIComponent(email),
          { cache: 'no-cache', headers: { 'X-API-Key': window.SCM_API.key } })
          .then(function (res) { if (!res.ok) throw new Error(String(res.status)); return res.json(); })
          .then(function (d) { return { d: d, from: 'Live · API' }; })
      : Promise.reject(new Error('no api for this dataset'));
    var url = '/' + r.file;
    return apiReq
      .catch(function () {
        return fetch(url, { cache: 'no-cache' })
          .then(function (res) { if (!res.ok) throw new Error(String(res.status)); return res.json(); })
          .then(function (d) { return { d: d, from: 'Web File · ' + url }; });
      })
      .catch(function () { return { d: fallback(key), from: 'Built-in default' }; })
      .then(function (res) {
        ST.data[key] = res.d; ST.orig[key] = clone(res.d); ST.src[key] = res.from;
        ST.loaded[key] = res.from.indexOf('Built-in') !== 0;
      });
  }
  function fallback(key) {
    if (key === 'overview') return { title: '', cutoff: '', cadence: 'Monthly', poDate: '', overallScore: 0, value: {}, groups: [] };
    if (key === 'masterdata') return { title: '', sub: '', context: '', headline: [], completed: [], remaining: [], taxonomy: { kpis: [], steps: [] } };
    if (key === 'monthly') return { months: [] };
    if (String(key).indexOf('embed-') === 0) return { title: '', src: '' };
    return {};
  }

  function onEdit(e) {
    var node = e.target;
    if (!node || !node.dataset || node.dataset.path === undefined || !ST.key) return;
    if (!node.closest || !node.closest('#admForm')) return;
    var v = node.value;
    if (node.dataset.kind === 'number') v = (v === '' ? '' : Number(v));
    setPath(ST.data[ST.key], node.dataset.path, v);
    markDirty();
    var item = node.closest('.admitem');
    if (item && /\.(label|name|cap|n|b|key)$/.test(node.dataset.path)) {
      var t = item.querySelector('.admitem__t');
      if (t) t.textContent = node.value || '(untitled)';
    }
  }
  document.addEventListener('input', onEdit);
  document.addEventListener('change', onEdit);
  document.addEventListener('change', function (e) {
    if (!e.target || e.target.id !== 'admFile' || !ST.key) return;
    var f = e.target.files && e.target.files[0]; if (!f) return;
    var fr = new FileReader();
    fr.onload = function () {
      try {
        ST.data[ST.key] = JSON.parse(fr.result);
        markDirty(); renderForm(); renderJson();
        msg('ok', 'Loaded ' + E(f.name), 'It replaced the working copy. Review it, then download.');
      } catch (err) { msg('', 'That file is not valid JSON', '<code>' + E(err.message) + '</code>'); }
    };
    fr.readAsText(f); e.target.value = '';
  });
  window.addEventListener('beforeunload', function (e) {
    if (Object.keys(ST.dirty).some(function (k) { return ST.dirty[k]; })) { e.preventDefault(); e.returnValue = ''; }
  });

  // Called by rbac.js once we know the signed-in user's role + editable modules.
  // Administrators can edit every dataset; editors only the ones covered by
  // their assigned permission(s); this is never called at all for viewers.
  window.renderContentAdminPage = function (userData) {
    if (!el('admRail')) return;
    var canEditAll = userData.roleKey === 'administrator';
    var editable = new Set(userData.editableModules || []);
    ST.allowedKeys = RESOURCES.filter(function (r) { return canEditAll || editable.has(r.moduleKey); }).map(function (r) { return r.key; });

    if (!ST.allowedKeys.length) {
      el('admRail').innerHTML = '<div class="admrail__h">Datasets</div>';
      el('admForm').innerHTML = '<p class="adm__hint">No datasets are covered by your assigned permission(s) yet. Ask your administrator to assign one.</p>';
      el('admTitle').textContent = 'No datasets available';
      el('admDesc').textContent = '';
      return;
    }
    if (!ST.key || ST.allowedKeys.indexOf(ST.key) < 0) ST.key = ST.allowedKeys[0];
    load(ST.key).then(renderAll);
  };
})();
