/* =====================================================================
   DASHBOARD COORDINATION CAMEROUN
   Données : data/submissions.json  (généré par GitHub Actions)
   Aucun appel API depuis le navigateur → pas de problème CORS
   ===================================================================== */
'use strict';

// ─── Constantes ─────────────────────────────────────────────────────────
const PAGE_TITLES = {
  overview : "Vue d'ensemble",
  map      : 'Carte géographique',
  charts   : 'Statistiques détaillées',
  data     : 'Données brutes',
  about    : 'À propos'
};

const COLORS = [
  '#2563eb','#16a34a','#d97706','#dc2626','#7c3aed',
  '#0891b2','#db2777','#65a30d','#ea580c','#0284c7',
  '#a16207','#4f46e5','#059669','#be123c','#0369a1'
];

// ─── État ────────────────────────────────────────────────────────────────
let allData      = [];
let formSchema   = null;
let mapInstance  = null;
let mapMarkers   = null;
let chartRefs    = {};
let dataTableRef = null;

// ─── Démarrage ───────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  bindUI();
  splash('Chargement des données…');
  start();
});

async function start() {
  try {
    // Chargement parallèle des deux fichiers JSON statiques
    splash('Lecture des données locales…');
    const [schemaResp, dataResp] = await Promise.all([
      fetch('./data/schema.json'),
      fetch('./data/submissions.json')
    ]);

    if (!schemaResp.ok) throw new Error(
      schemaResp.status === 404
        ? 'Fichier data/schema.json introuvable.\nLancez le workflow GitHub Actions une première fois.'
        : `Erreur schéma HTTP ${schemaResp.status}`
    );
    if (!dataResp.ok) throw new Error(
      dataResp.status === 404
        ? 'Fichier data/submissions.json introuvable.\nLancez le workflow GitHub Actions une première fois.'
        : `Erreur données HTTP ${dataResp.status}`
    );

    splash('Traitement…');
    formSchema = await schemaResp.json();
    const dataJson = await dataResp.json();

    allData = dataJson.results || [];

    // Affichage de la date de dernière synchronisation
    if (dataJson.fetched_at) {
      const d = new Date(dataJson.fetched_at);
      const label = d.toLocaleDateString('fr-FR', { day:'2-digit', month:'short', year:'numeric' })
                  + ' ' + d.toLocaleTimeString('fr-FR', { hour:'2-digit', minute:'2-digit' })
                  + ' UTC';
      byId('lastSyncLabel').textContent = `Sync : ${label}`;
    }

    byId('totalBadge').textContent = `${allData.length.toLocaleString('fr-FR')} enregistrements`;
    setStatus('online');

    buildFieldSelector();
    renderAll();
    renderFormInfo();
    renderDataSummary(dataJson);

    hideSplash();

  } catch (err) {
    splashError(err.message);
  }
}

// ─── Rechargement ────────────────────────────────────────────────────────
async function reloadData() {
  showBar(true);
  byId('refreshBtn').disabled = true;
  setStatus('loading');
  try {
    const resp = await fetch('./data/submissions.json?t=' + Date.now());
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
    const json  = await resp.json();
    allData = json.results || [];

    byId('totalBadge').textContent = `${allData.length.toLocaleString('fr-FR')} enregistrements`;

    if (json.fetched_at) {
      const d = new Date(json.fetched_at);
      byId('lastSyncLabel').textContent = 'Sync : '
        + d.toLocaleDateString('fr-FR', { day:'2-digit', month:'short' })
        + ' ' + d.toLocaleTimeString('fr-FR', { hour:'2-digit', minute:'2-digit' });
    }

    buildFieldSelector();
    renderAll();
    renderDataSummary(json);
    setStatus('online');
  } catch (err) {
    setStatus('error');
    alert('Erreur rechargement : ' + err.message);
  } finally {
    showBar(false);
    byId('refreshBtn').disabled = false;
  }
}

// ─── Rendu global ────────────────────────────────────────────────────────
function renderAll() {
  if (!allData.length) return;
  renderKPIs();
  renderTrendChart();
  renderStatusChart();
  renderOverviewFields();
  renderMap();
  renderTable();
  renderStatsForField();
}

// ─── KPI Cards ───────────────────────────────────────────────────────────
function renderKPIs() {
  const n        = allData.length;
  const approved = allData.filter(d =>
    d._validation_status?.uid === 'validation_status_approved'
  ).length;
  const pct = n ? Math.round(approved / n * 100) : 0;

  const geoField = detectGeoLabel();
  const zones = geoField
    ? new Set(allData.map(d => d[geoField]).filter(Boolean)).size
    : '—';

  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);
  const recent = allData.filter(d => new Date(d._submission_time) >= weekAgo).length;

  setText('kpi-total',         n.toLocaleString('fr-FR'));
  setText('kpi-total-sub',     'Depuis le début');
  setText('kpi-validated',     approved.toLocaleString('fr-FR'));
  setText('kpi-validated-sub', `${pct}% du total`);
  setText('kpi-zones',  typeof zones === 'number' ? zones.toLocaleString('fr-FR') : zones);
  setText('kpi-zones-sub',     geoField ? friendlyLabel(geoField) : '');
  setText('kpi-recent',        recent.toLocaleString('fr-FR'));
  setText('kpi-recent-sub',    `${n ? Math.round(recent / n * 100) : 0}% du total`);
}

// ─── Graphique tendance ──────────────────────────────────────────────────
function renderTrendChart() {
  const byDate = {};
  allData.forEach(d => {
    const dt = d._submission_time?.split('T')[0];
    if (dt) byDate[dt] = (byDate[dt] || 0) + 1;
  });

  const sorted = Object.entries(byDate).sort((a, b) => a[0].localeCompare(b[0]));
  let cum = 0;
  const cumVals = sorted.map(([, v]) => { cum += v; return cum; });
  const labels  = sorted.map(([d]) =>
    new Date(d + 'T00:00:00').toLocaleDateString('fr-FR', { day:'numeric', month:'short' })
  );

  destroyChart('chartTrend');
  chartRefs.chartTrend = new Chart(byId('chartTrend'), {
    data: {
      labels,
      datasets: [
        {
          type: 'bar',
          label: 'Soumissions/jour',
          data: sorted.map(([, v]) => v),
          backgroundColor: 'rgba(37,99,235,0.18)',
          borderColor: 'rgba(37,99,235,0.5)',
          borderWidth: 1,
          borderRadius: 3,
          yAxisID: 'y'
        },
        {
          type: 'line',
          label: 'Cumul',
          data: cumVals,
          borderColor: '#2563eb',
          backgroundColor: 'transparent',
          borderWidth: 2.5,
          pointRadius: 0,
          tension: 0.4,
          yAxisID: 'y2'
        }
      ]
    },
    options: {
      responsive: true,
      interaction: { mode: 'index', intersect: false },
      plugins: { legend: { labels: { font: { size: 11 }, boxWidth: 14 } } },
      scales: {
        x:  { grid: { display: false }, ticks: { maxTicksLimit: 12, font: { size: 10 } } },
        y:  { position: 'left',  beginAtZero: true, grid: { color: 'rgba(0,0,0,0.05)' }, ticks: { font: { size: 10 } } },
        y2: { position: 'right', beginAtZero: true, grid: { display: false },             ticks: { font: { size: 10 } } }
      }
    }
  });
}

// ─── Graphique statut validation ─────────────────────────────────────────
function renderStatusChart() {
  const counts = {};
  allData.forEach(d => {
    const s = d._validation_status?.label || 'Non défini';
    counts[s] = (counts[s] || 0) + 1;
  });

  destroyChart('chartStatus');
  chartRefs.chartStatus = new Chart(byId('chartStatus'), {
    type: 'doughnut',
    data: {
      labels: Object.keys(counts),
      datasets: [{
        data: Object.values(counts),
        backgroundColor: ['#16a34a','#d97706','#dc2626','#94a3b8','#7c3aed'],
        borderWidth: 2, borderColor: '#fff', hoverOffset: 6
      }]
    },
    options: {
      responsive: true,
      cutout: '68%',
      plugins: {
        legend: { position: 'bottom', labels: { font: { size: 11 }, boxWidth: 12, padding: 10 } }
      }
    }
  });
}

// ─── 2 graphiques auto – Vue d'ensemble ──────────────────────────────────
function renderOverviewFields() {
  const fields = detectCategoricalFields(2);
  renderBarChart('chartField1', 'chart1Header', fields[0]);
  renderBarChart('chartField2', 'chart2Header', fields[1]);
}

function renderBarChart(canvasId, headerId, fieldName) {
  if (!fieldName) return;
  const sorted = topN(countValues(fieldName), 12);
  byId(headerId).innerHTML =
    `<i class="fas fa-chart-bar text-info me-2"></i>${friendlyLabel(fieldName)}`;
  destroyChart(canvasId);
  chartRefs[canvasId] = new Chart(byId(canvasId), {
    type: 'bar',
    data: {
      labels: sorted.map(([k]) => shortLabel(k)),
      datasets: [{ data: sorted.map(([, v]) => v), backgroundColor: COLORS, borderRadius: 4 }]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: {
        x: { grid: { display: false }, ticks: { maxRotation: 40, font: { size: 10 } } },
        y: { beginAtZero: true, grid: { color: 'rgba(0,0,0,0.05)' } }
      }
    }
  });
}

// ─── Page Statistiques ───────────────────────────────────────────────────
function buildFieldSelector() {
  const sel    = byId('fieldSelector');
  const mapSel = byId('mapFieldSelect');
  sel.innerHTML    = '';
  mapSel.innerHTML = '<option value="">— Couleur par —</option>';

  detectCategoricalFields(60).forEach(f => {
    const lbl = friendlyLabel(f);
    sel.insertAdjacentHTML('beforeend',    `<option value="${f}">${lbl}</option>`);
    mapSel.insertAdjacentHTML('beforeend', `<option value="${f}">${lbl}</option>`);
  });

  byId('fieldSelector').addEventListener('change', renderStatsForField);
  byId('mapFieldSelect').addEventListener('change', function () { renderMap(this.value); });
}

function renderStatsForField() {
  const field = byId('fieldSelector').value;
  if (!field) return;

  const counts  = countValues(field);
  const entries = topN(counts, 20);
  const total   = entries.reduce((a, [, v]) => a + v, 0);
  const label   = friendlyLabel(field);
  const area    = byId('statsArea');
  area.innerHTML = '';

  // Tableau résumé
  area.insertAdjacentHTML('beforeend', `
    <div class="col-12 col-lg-4">
      <div class="dash-card h-100">
        <div class="dash-card-header"><i class="fas fa-list-ol me-2 text-primary"></i>${label}</div>
        <div class="dash-card-body p-0">
          <table class="table table-sm table-hover mb-0">
            <thead class="table-light">
              <tr><th>Valeur</th><th class="text-end">N</th><th class="text-end">%</th></tr>
            </thead>
            <tbody>
              ${entries.map(([k, v]) => `
                <tr>
                  <td><span title="${k}">${shortLabel(k) || '(vide)'}</span></td>
                  <td class="text-end fw-semibold">${v.toLocaleString('fr-FR')}</td>
                  <td class="text-end text-muted">${Math.round(v / total * 100)}%</td>
                </tr>`).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>`);

  // Barre verticale
  const barId = uid();
  area.insertAdjacentHTML('beforeend', `
    <div class="col-12 col-lg-8">
      <div class="dash-card h-100">
        <div class="dash-card-header"><i class="fas fa-chart-bar me-2 text-info"></i>${label} — Distribution</div>
        <div class="dash-card-body"><canvas id="${barId}"></canvas></div>
      </div>
    </div>`);

  // Donut
  const donutId = uid();
  area.insertAdjacentHTML('beforeend', `
    <div class="col-12 col-md-5">
      <div class="dash-card">
        <div class="dash-card-header"><i class="fas fa-chart-pie me-2 text-success"></i>${label} — Proportions</div>
        <div class="dash-card-body d-flex justify-content-center">
          <canvas id="${donutId}" style="max-height:280px"></canvas>
        </div>
      </div>
    </div>`);

  // Barre horizontale
  const hbarId = uid();
  area.insertAdjacentHTML('beforeend', `
    <div class="col-12 col-md-7">
      <div class="dash-card">
        <div class="dash-card-header"><i class="fas fa-sort-amount-down me-2 text-warning"></i>${label} — Classement</div>
        <div class="dash-card-body"><canvas id="${hbarId}"></canvas></div>
      </div>
    </div>`);

  // Remplissage des graphiques
  const top12 = topN(counts, 12);
  new Chart(byId(barId), {
    type: 'bar',
    data: {
      labels: top12.map(([k]) => shortLabel(k)),
      datasets: [{ data: top12.map(([, v]) => v), backgroundColor: COLORS, borderRadius: 4 }]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: {
        x: { grid: { display: false }, ticks: { maxRotation: 45, font: { size: 10 } } },
        y: { beginAtZero: true, grid: { color: 'rgba(0,0,0,0.05)' } }
      }
    }
  });

  const top8 = topN(counts, 8);
  new Chart(byId(donutId), {
    type: 'doughnut',
    data: {
      labels: top8.map(([k]) => shortLabel(k)),
      datasets: [{ data: top8.map(([, v]) => v), backgroundColor: COLORS,
                   borderWidth: 2, borderColor: '#fff', hoverOffset: 8 }]
    },
    options: {
      responsive: true, cutout: '60%',
      plugins: { legend: { position: 'bottom', labels: { font: { size: 11 }, boxWidth: 12 } } }
    }
  });

  const top10rev = topN(counts, 10).reverse();
  new Chart(byId(hbarId), {
    type: 'bar',
    data: {
      labels: top10rev.map(([k]) => shortLabel(k)),
      datasets: [{ data: top10rev.map(([, v]) => v), backgroundColor: COLORS[0], borderRadius: 4 }]
    },
    options: {
      indexAxis: 'y', responsive: true,
      plugins: { legend: { display: false } },
      scales: {
        x: { beginAtZero: true, grid: { color: 'rgba(0,0,0,0.05)' } },
        y: { grid: { display: false }, ticks: { font: { size: 11 } } }
      }
    }
  });
}

// ─── Carte Leaflet ───────────────────────────────────────────────────────
function renderMap(colorField) {
  if (!mapInstance) {
    mapInstance = L.map('map').setView([5.7, 12.35], 6);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org">OpenStreetMap</a>',
      maxZoom: 18
    }).addTo(mapInstance);
    mapMarkers = L.layerGroup().addTo(mapInstance);
  } else {
    mapMarkers.clearLayers();
  }

  const field      = colorField !== undefined ? colorField : (byId('mapFieldSelect')?.value || '');
  const uniqueVals = field ? [...new Set(allData.map(d => d[field]).filter(Boolean))] : [];
  const colorMap   = {};
  uniqueVals.forEach((v, i) => { colorMap[v] = COLORS[i % COLORS.length]; });

  const textFields = detectTextFields(3);
  let count = 0;

  allData.forEach(item => {
    const geo = item._geolocation;
    if (!Array.isArray(geo) || !geo[0] || geo[0] === 0) return;
    const [lat, lng] = geo;
    if (lat < -5 || lat > 14 || lng < 7.5 || lng > 17) return;

    const color = (field && item[field]) ? (colorMap[item[field]] || '#2563eb') : '#2563eb';
    const date  = item._submission_time
      ? new Date(item._submission_time).toLocaleDateString('fr-FR')
      : 'N/A';

    const extraRows = textFields
      .map(f => item[f]
        ? `<tr><td class="fw-semibold pe-2">${friendlyLabel(f)}</td><td>${item[f]}</td></tr>`
        : '')
      .join('');

    L.circleMarker([lat, lng], {
      radius: 7, fillColor: color, color: '#fff', weight: 1.5, fillOpacity: 0.85
    }).addTo(mapMarkers).bindPopup(`
      <div style="font-size:13px;min-width:190px;">
        <strong style="color:${color}">● Fiche #${item._id}</strong><br>
        <table style="margin-top:5px;border-collapse:collapse;">
          <tr><td class="fw-semibold pe-2">Date</td><td>${date}</td></tr>
          ${extraRows}
          <tr><td class="fw-semibold pe-2">Statut</td><td>${item._validation_status?.label || '—'}</td></tr>
        </table>
      </div>`);
    count++;
  });

  byId('mapCount').textContent = count > 0
    ? `${count} point${count > 1 ? 's' : ''}`
    : 'Aucune coordonnée GPS dans les données';
}

// ─── Tableau DataTable ───────────────────────────────────────────────────
function renderTable() {
  if (dataTableRef) {
    dataTableRef.destroy();
    byId('tableHead').innerHTML = '';
    byId('tableBody').innerHTML = '';
  }
  if (!allData.length) return;

  const SKIP = new Set(['__version__','formhub/uuid','meta/instanceID',
                        '_uuid','_bamboo_dataset_id','_tags','_notes',
                        '_status','_submitted_by']);
  const cols = Object.keys(allData[0]).filter(k => {
    if (k.startsWith('_') && !['_id','_submission_time','_validation_status'].includes(k)) return false;
    return !SKIP.has(k);
  }).slice(0, 25);

  const trH = document.createElement('tr');
  cols.forEach(c => {
    const th = document.createElement('th');
    th.textContent = friendlyLabel(c);
    th.title = c;
    trH.appendChild(th);
  });
  byId('tableHead').appendChild(trH);

  const frag = document.createDocumentFragment();
  allData.forEach(item => {
    const tr = document.createElement('tr');
    cols.forEach(c => {
      const td = document.createElement('td');
      let val = item[c];
      if (c === '_validation_status') val = val?.label || '';
      if (c === '_submission_time')   val = val ? new Date(val).toLocaleDateString('fr-FR') : '';
      if (Array.isArray(val))         val = val.join(', ');
      td.textContent = val ?? '';
      tr.appendChild(td);
    });
    frag.appendChild(tr);
  });
  byId('tableBody').appendChild(frag);
  byId('tableInfo').textContent =
    `${allData.length.toLocaleString('fr-FR')} lignes · ${cols.length} colonnes`;

  dataTableRef = $('#dataTable').DataTable({
    pageLength: 25,
    scrollX: true,
    dom: '<"row align-items-center mb-2"<"col-auto"B><"col"f>>rtip',
    buttons: [
      { extend: 'csv',   text: '<i class="fas fa-file-csv me-1"></i>CSV',    className: 'btn btn-sm btn-outline-success me-1' },
      { extend: 'excel', text: '<i class="fas fa-file-excel me-1"></i>Excel', className: 'btn btn-sm btn-outline-success me-1' },
      { extend: 'print', text: '<i class="fas fa-print me-1"></i>Imprimer',  className: 'btn btn-sm btn-outline-secondary' }
    ],
    language: {
      search: 'Rechercher :', lengthMenu: '_MENU_ lignes par page',
      info: 'Lignes _START_–_END_ sur _TOTAL_',
      paginate: { next: '›', previous: '‹' },
      emptyTable: 'Aucune donnée disponible'
    }
  });
}

// ─── Page À propos ───────────────────────────────────────────────────────
function renderFormInfo() {
  if (!formSchema) return;
  const survey    = formSchema.content?.survey || [];
  const questions = survey.filter(q =>
    !['begin_group','end_group','begin_repeat','end_repeat','note'].includes(q.type)
  ).length;

  byId('formInfoBox').innerHTML = `
    <table class="table table-sm mb-0">
      <tr><th class="text-muted" style="width:45%">Nom</th><td>${formSchema.name || '—'}</td></tr>
      <tr><th class="text-muted">UID</th><td><code class="small">${formSchema.uid || '—'}</code></td></tr>
      <tr><th class="text-muted">Questions</th><td>${questions}</td></tr>
      <tr><th class="text-muted">Propriétaire</th><td>${formSchema.owner__username || '—'}</td></tr>
      <tr><th class="text-muted">Déploiement</th>
          <td><span class="badge bg-success">${formSchema.deployment_status || '—'}</span></td></tr>
    </table>`;
}

function renderDataSummary(json = {}) {
  const n     = allData.length;
  const dates = allData.map(d => d._submission_time).filter(Boolean).sort();
  const first = dates[0]          ? new Date(dates[0]).toLocaleDateString('fr-FR')          : '—';
  const last  = dates.slice(-1)[0] ? new Date(dates.slice(-1)[0]).toLocaleDateString('fr-FR') : '—';
  const withGPS = allData.filter(d =>
    Array.isArray(d._geolocation) && d._geolocation[0] && d._geolocation[0] !== 0
  ).length;
  const nextSync = json.fetched_at
    ? (() => {
        const d = new Date(new Date(json.fetched_at).getTime() + 2 * 3600000);
        return d.toLocaleTimeString('fr-FR', { hour:'2-digit', minute:'2-digit' }) + ' UTC';
      })()
    : '—';

  byId('dataSummaryBox').innerHTML = `
    <table class="table table-sm mb-0">
      <tr><th class="text-muted" style="width:55%">Total enregistrements</th>
          <td><strong>${n.toLocaleString('fr-FR')}</strong></td></tr>
      <tr><th class="text-muted">Première soumission</th><td>${first}</td></tr>
      <tr><th class="text-muted">Dernière soumission</th><td>${last}</td></tr>
      <tr><th class="text-muted">Avec coordonnées GPS</th><td>${withGPS.toLocaleString('fr-FR')}</td></tr>
      <tr><th class="text-muted">Champs analysables</th><td>${detectCategoricalFields(99).length}</td></tr>
      <tr><th class="text-muted">Prochaine sync auto</th><td>≈ ${nextSync}</td></tr>
    </table>`;
}

// ─── Navigation ──────────────────────────────────────────────────────────
function navigateTo(page) {
  document.querySelectorAll('.page-view').forEach(p => p.classList.add('d-none'));
  document.querySelectorAll('[data-page]').forEach(l => l.classList.remove('active'));
  byId(`page-${page}`).classList.remove('d-none');
  document.querySelector(`[data-page="${page}"]`)?.classList.add('active');
  byId('pageTitle').textContent = PAGE_TITLES[page] || page;
  if (page === 'map' && mapInstance) setTimeout(() => mapInstance.invalidateSize(), 150);
  byId('sidebar').classList.remove('show');
}

// ─── Splash ───────────────────────────────────────────────────────────────
function splash(msg) {
  const el = byId('splashMsg');
  if (el) el.textContent = msg;
}

function hideSplash() {
  const s = byId('splashScreen');
  s.style.opacity    = '0';
  s.style.transition = 'opacity 0.5s';
  setTimeout(() => {
    s.classList.add('d-none');
    byId('mainWrapper').classList.remove('d-none');
  }, 500);
}

function splashError(rawMsg) {
  const is404 = rawMsg.includes('introuvable') || rawMsg.includes('404');
  const hint  = is404
    ? `<div class="splash-hint">
         💡 Les données n'ont pas encore été générées.<br>
         Allez dans votre repo GitHub →
         <strong>Actions → "Synchronisation données KoboToolbox" → Run workflow</strong>
         puis attendez ~1 minute.
       </div>`
    : `<div class="splash-hint">
         💡 Vérifiez la connexion internet et rechargez la page.
       </div>`;

  byId('splashScreen').innerHTML = `
    <div class="splash-inner text-center">
      <i class="fas fa-exclamation-triangle text-warning" style="font-size:3rem"></i>
      <h5 class="mt-3 text-white">Erreur de chargement</h5>
      <p class="text-white-50 small px-3">${rawMsg}</p>
      ${hint}
      <button class="btn btn-light mt-3" onclick="location.reload()">
        <i class="fas fa-redo me-1"></i>Réessayer
      </button>
    </div>`;
}

// ─── UI helpers ───────────────────────────────────────────────────────────
function bindUI() {
  byId('refreshBtn').addEventListener('click', reloadData);
  document.querySelectorAll('[data-page]').forEach(link => {
    link.addEventListener('click', e => { e.preventDefault(); navigateTo(link.dataset.page); });
  });
  byId('sidebarToggle').addEventListener('click', () => byId('sidebar').classList.add('show'));
  byId('sidebarClose').addEventListener('click',  () => byId('sidebar').classList.remove('show'));
}

function byId(id)       { return document.getElementById(id); }
function setText(id, t) { const el = byId(id); if (el) el.textContent = t; }
function showBar(s)     { byId('loadingBar').classList.toggle('d-none', !s); }
function destroyChart(id) { if (chartRefs[id]) { chartRefs[id].destroy(); delete chartRefs[id]; } }
function uid()          { return 'c' + Math.random().toString(36).slice(2, 9); }
function setStatus(s)   { byId('statusDot').className = 'status-dot ' + s; }

// ─── Détection automatique des champs ────────────────────────────────────
function detectCategoricalFields(max = 10) {
  if (formSchema?.content?.survey) {
    const fromSchema = formSchema.content.survey
      .filter(q => ['select_one','select_multiple'].includes(q.type))
      .map(q => q.$autoname || q.name)
      .filter(name => allData.some(d => d[name] != null && d[name] !== ''));
    if (fromSchema.length) return fromSchema.slice(0, max);
  }
  if (!allData.length) return [];
  return Object.keys(allData[0])
    .filter(k => {
      if (k.startsWith('_') || k.includes('/uuid') || k.includes('instanceID')) return false;
      const vals = new Set(allData.slice(0, 200).map(d => d[k]).filter(v => v != null && v !== ''));
      return vals.size >= 2 && vals.size <= 40;
    })
    .slice(0, max);
}

function detectGeoLabel() {
  const kw = ['region','province','departement','dept','district','zone','commune','localite'];
  if (!allData.length) return null;
  return Object.keys(allData[0]).find(k =>
    kw.some(g => k.toLowerCase().replace(/_/g,'').includes(g))
  ) || null;
}

function detectTextFields(max = 3) {
  if (!allData.length) return [];
  return Object.keys(allData[0])
    .filter(k => {
      if (k.startsWith('_') || k.includes('/')) return false;
      const v = allData[0][k];
      return v && typeof v === 'string' && v.length < 80;
    })
    .slice(0, max);
}

// ─── Helpers données ──────────────────────────────────────────────────────
function countValues(field) {
  const counts = {};
  allData.forEach(d => {
    const raw = d[field];
    if (raw == null || raw === '') return;
    const vals = (typeof raw === 'string' && raw.includes(' ') && !raw.match(/\d{4}-\d{2}/))
      ? raw.split(' ') : [String(raw)];
    vals.forEach(v => { counts[v] = (counts[v] || 0) + 1; });
  });
  return counts;
}

function topN(counts, n) {
  return Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, n);
}

function friendlyLabel(field) {
  return field.split('/').pop().replace(/_/g,' ').replace(/\b\w/g, c => c.toUpperCase());
}

function shortLabel(str) {
  if (!str) return '(vide)';
  return String(str).length > 22 ? String(str).slice(0, 20) + '…' : String(str);
}
