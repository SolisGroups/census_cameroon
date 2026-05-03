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

const REGION_NAMES = {
  '01':'Adamaoua','02':'Centre','03':'Est','04':'Extrême-Nord',
  '05':'Littoral','06':'Nord','07':'Nord-Ouest','08':'Ouest',
  '09':'Sud','10':'Sud-Ouest'
};

const DEPT_NAMES = {
  // Adamaoua (01)
  '0101':'Djérem','0102':'Faro-et-Déo','0103':'Mayo-Banyo','0104':'Mbéré','0105':'Vina',
  // Centre (02)
  '0201':'Haute-Sanaga','0202':'Lekié','0203':'Mbam-et-Inoubou','0204':'Mbam-et-Kim',
  '0205':'Méfou-et-Afamba','0206':'Méfou-et-Akono','0207':'Mfoundi (Yaoundé)',
  '0208':'Nyong-et-Kéllé','0209':'Nyong-et-Mfoumou','0210':'Nyong-et-So\'o',
  // Est (03)
  '0301':'Boumba-et-Ngoko','0302':'Haut-Nyong','0303':'Kadéï','0304':'Lom-et-Djerem',
  // Extrême-Nord (04)
  '0401':'Diamaré (Maroua)','0402':'Logone-et-Chari','0403':'Mayo-Danay',
  '0404':'Mayo-Kani','0405':'Mayo-Sava','0406':'Mayo-Tsanaga',
  // Littoral (05)
  '0501':'Moungo','0502':'Nkam','0503':'Sanaga-Maritime','0504':'Wouri (Douala)',
  // Nord (06)
  '0601':'Bénoué (Ngaoundéré)','0602':'Faro','0603':'Mayo-Louti','0604':'Mayo-Rey',
  // Nord-Ouest (07)
  '0701':'Boyo','0702':'Bui','0703':'Donga-Mantung','0704':'Menchum',
  '0705':'Mezam (Bamenda)','0706':'Momo','0707':'Ngo-Ketunjia',
  // Ouest (08)
  '0801':'Bamboutos','0802':'Haut-Nkam','0803':'Hauts-Plateaux',
  '0804':'Koupé-Manengouba','0805':'Menoua','0806':'Mifi (Bafoussam)',
  '0807':'Ndé','0808':'Noun (Foumban)',
  // Sud (09)
  '0901':'Dja-et-Lobo','0902':'Mvila (Ebolowa)','0903':'Océan','0904':'Vallée-du-Ntem',
  // Sud-Ouest (10)
  '1001':'Fako (Buea)','1002':'Koupé-Manengouba','1003':'Lebialem',
  '1004':'Manyu','1005':'Meme','1006':'Ndian'
};

const ARR_NAMES = {
  // Mfoundi / Yaoundé
  '0207001':'Yaoundé I','0207002':'Yaoundé II','0207003':'Yaoundé III',
  '0207004':'Yaoundé IV','0207005':'Yaoundé V','0207006':'Yaoundé VI','0207007':'Yaoundé VII',
  // Wouri / Douala
  '0504001':'Douala I','0504002':'Douala II','0504003':'Douala III',
  '0504004':'Douala IV','0504005':'Douala V','0504006':'Douala VI'
};

const FIELD_LABELS = {
  'identification/region':'Région','identification/departement':'Département',
  'identification/arrondissement':'Arrondissement','identification/controleur':'Contrôleur',
  'identification/superviseur':'Superviseur','identification/n_zc':'Zone de Contrôle',
  'identification/date_saisie':'Date de saisie','bilan/appreciation_globale':'Appréciation globale',
  'suivi_zd/presence/presence_ce':'Présence Chef d\'Équipe',
  'suivi_zd/presence/presence_ar':'Présence Agent Recenseur',
  'suivi_zd/presence/zd_observee':'ZD Observée (terrain)',
  'suivi_zd/etat_avancement/maj_achevee':'Mise à jour achevée',
  'suivi_zd/etat_avancement/zd_segmentee':'ZD Segmentée',
  'suivi_zd/etat_avancement/zd_regroupee':'ZD Regroupée',
  'suivi_zd/etat_avancement/croquis_valides':'Croquis validés',
  'suivi_zd/etat_avancement/croquis_num':'Croquis numérisés',
  'suivi_zd/etat_avancement/donnees_synchro':'Données synchronisées',
  'suivi_zd/difficultes/diff_4a/diff_mapit':'Difficulté MapIt',
  'suivi_zd/difficultes/diff_4a/diff_gps':'Difficulté GPS',
  'suivi_zd/difficultes/diff_4a/diff_reseau':'Problème réseau',
  'suivi_zd/difficultes/diff_4a/diff_batterie':'Problème batterie',
  'suivi_zd/difficultes/diff_4a/diff_electricite':'Problème électricité',
  'suivi_zd/difficultes/diff_4b/diff_acces_phys':'Accès physique difficile',
  'suivi_zd/difficultes/diff_4b/diff_adhesion':'Problème d\'adhésion population',
  'suivi_zd/difficultes/diff_4b/diff_menages_absents':'Ménages absents',
  'suivi_zd/difficultes/diff_4b/diff_refus':'Refus de participation',
  'suivi_zd/difficultes/diff_4b/diff_rumeurs':'Rumeurs négatives',
  'suivi_zd/difficultes/diff_4b/diff_langue':'Barrière linguistique',
  'suivi_zd/difficultes/diff_4b/diff_leaders':'Problème leaders communautaires',
  'suivi_zd/difficultes/diff_4c/diff_zone_dang':'Zone dangereuse',
  'suivi_zd/difficultes/diff_4c/diff_menaces':'Menaces reçues',
  'suivi_zd/difficultes/diff_4c/diff_incident':'Incident sécuritaire',
  'suivi_zd/difficultes/diff_4c/diff_deplacement':'Problème déplacement',
  'suivi_zd/difficultes/diff_4d/frais_verses':'Frais versés aux agents',
  'suivi_zd/difficultes/diff_4d/retard_formation':'Retard paiement formation',
  'suivi_zd/difficultes/diff_4d/retard_transport':'Retard paiement transport',
  'suivi_zd/difficultes/diff_4d/retard_salaire':'Retard salaire / perdiem',
  'suivi_zd/difficultes/diff_4d/impact_retard':'Impact du retard de paiement',
  'suivi_zd/difficultes/diff_4d/desistement_paiem':'Désistement lié au paiement',
  'suivi_zd/difficultes/diff_4d/maladie_sans_remplac':'Maladie sans remplacement',
  'suivi_zd/difficultes/diff_4d/insuffisance_reserv':'Insuffisance de réservistes',
  'suivi_zd/difficultes/diff_4e/diff_materiel':'Matériel insuffisant',
  'suivi_zd/difficultes/diff_4e/diff_transport_zd':'Transport vers ZD difficile',
  'suivi_zd/difficultes/diff_4e/diff_voie':'Mauvais état des voies',
  'suivi_zd/difficultes/diff_4e/diff_autre':'Autre difficulté',
  '_validation_status':'Statut de validation'
};

const VALUE_LABELS = {
  'oui':'Oui ✓','non':'Non ✗',
  'bonne':'Bonne journée','difficile':'Difficile','bloquee':'Bloquée',
  'validation_status_approved':'Approuvé','validation_status_not_approved':'Non approuvé',
  'validation_status_on_review':'En révision'
};

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
  renderOperationalDashboard();
  renderTrendChart();
  renderStatusChart();
  renderMap();
  renderTable();
  renderStatsForField();
}

// ─── Dashboard opérationnel ──────────────────────────────────────────────
function renderOperationalDashboard() {
  if (!allData.length) return;

  const isOui = v => v === 'oui' || v === '1' || v === 'yes' || v === true;

  const today = new Date().toISOString().split('T')[0];
  const controleurs = new Set(allData.map(d => d['identification/controleur'] || d['identification/n_controleur']).filter(Boolean));
  const regions     = new Set(allData.map(d => d['identification/region']).filter(Boolean));
  const zcs         = new Set(allData.map(d => d['identification/n_zc']).filter(Boolean));

  const dates = allData.map(d => d['identification/date_saisie'] || d._submission_time?.split('T')[0]).filter(Boolean).sort();
  const dateFirst = dates[0], dateLast = dates[dates.length - 1];

  // ── Compteurs niveau fiche (totaux_zc) ──
  let totalZdVisitees = 0, totalZdAchevees = 0, totalZdAssignees = 0;
  let totalZdSegmentees = 0, totalZdRegroupees = 0, totalZdCroquis = 0;
  let zdAcheveesAuj = 0;
  allData.forEach(d => {
    const isToday = (d['identification/date_saisie'] || d._submission_time?.split('T')[0]) === today;
    totalZdVisitees    += parseInt(d['totaux_zc/total_zd_visitees']   || 0);
    totalZdAchevees    += parseInt(d['totaux_zc/total_zd_achevees']   || 0);
    totalZdAssignees   += parseInt(d['totaux_zc/total_zd_assignees']  || 0);
    totalZdSegmentees  += parseInt(d['totaux_zc/total_zd_segmentees'] || 0);
    totalZdRegroupees  += parseInt(d['totaux_zc/total_zd_regroupees'] || 0);
    totalZdCroquis     += parseInt(d['totaux_zc/total_zd_croquis']    || 0);
    if (isToday) zdAcheveesAuj += parseInt(d['totaux_zc/total_zd_achevees'] || 0);
  });

  // ── Compteurs niveau ZD (suivi_zd) ──
  let totalMenages = 0, totalMenagesAgric = 0;
  let totalAgentsPrevus = 0, totalAgentsPresents = 0, totalAgentsAbsents = 0;
  let totalAgentsMalades = 0, totalDesistements = 0, totalReservistes = 0;
  let totalNonPayes = 0, zdCount = 0;
  let majAchevee = 0, donneesSync = 0, croquis = 0;
  let presenceCE = 0, presenceAR = 0;
  let diffMapIt = 0, diffGPS = 0, diffReseau = 0, diffBatterie = 0, diffElec = 0;
  let diffAcces = 0, diffAdhesion = 0, diffMenagesAbs = 0, diffRefus = 0, diffLangue = 0;

  allData.forEach(d => {
    (d.suivi_zd || []).forEach(zd => {
      zdCount++;
      totalMenages        += parseInt(zd['suivi_zd/menages/nb_menages']                              || 0);
      totalMenagesAgric   += parseInt(zd['suivi_zd/menages/nb_menages_agric']                        || 0);
      totalAgentsPrevus   += parseInt(zd['suivi_zd/agents/agents_prevus']                            || 0);
      totalAgentsPresents += parseInt(zd['suivi_zd/agents/agents_presents']                          || 0);
      totalAgentsAbsents  += parseInt(zd['suivi_zd/agents/agents_absents']                           || 0);
      totalAgentsMalades  += parseInt(zd['suivi_zd/agents/agents_malades']                           || 0);
      totalDesistements   += parseInt(zd['suivi_zd/agents/agents_desistements']                      || 0);
      totalReservistes    += parseInt(zd['suivi_zd/agents/agents_reservistes']                       || 0);
      totalNonPayes       += parseInt(zd['suivi_zd/difficultes/diff_4d/nb_agents_non_payes']         || 0);
      if (isOui(zd['suivi_zd/etat_avancement/maj_achevee']))      majAchevee++;
      if (isOui(zd['suivi_zd/etat_avancement/donnees_synchro']))  donneesSync++;
      if (isOui(zd['suivi_zd/etat_avancement/croquis_valides']))  croquis++;
      if (isOui(zd['suivi_zd/presence/presence_ce']))              presenceCE++;
      if (isOui(zd['suivi_zd/presence/presence_ar']))              presenceAR++;
      if (isOui(zd['suivi_zd/difficultes/diff_4a/diff_mapit']))        diffMapIt++;
      if (isOui(zd['suivi_zd/difficultes/diff_4a/diff_gps']))          diffGPS++;
      if (isOui(zd['suivi_zd/difficultes/diff_4a/diff_reseau']))       diffReseau++;
      if (isOui(zd['suivi_zd/difficultes/diff_4a/diff_batterie']))     diffBatterie++;
      if (isOui(zd['suivi_zd/difficultes/diff_4a/diff_electricite'])) diffElec++;
      if (isOui(zd['suivi_zd/difficultes/diff_4b/diff_acces_phys']))   diffAcces++;
      if (isOui(zd['suivi_zd/difficultes/diff_4b/diff_adhesion']))     diffAdhesion++;
      if (isOui(zd['suivi_zd/difficultes/diff_4b/diff_menages_absents'])) diffMenagesAbs++;
      if (isOui(zd['suivi_zd/difficultes/diff_4b/diff_refus']))        diffRefus++;
      if (isOui(zd['suivi_zd/difficultes/diff_4b/diff_langue']))       diffLangue++;
    });
  });

  // ── Taux calculés ──
  const pctAch    = totalZdAssignees > 0 ? (totalZdAchevees  / totalZdAssignees  * 100).toFixed(1) : 0;
  const pctVis    = totalZdAssignees > 0 ? (totalZdVisitees   / totalZdAssignees  * 100).toFixed(1) : 0;
  const pctAchNum = parseFloat(pctAch);
  const pctMaj    = zdCount > 0 ? (majAchevee   / zdCount * 100).toFixed(0) : 0;
  const pctSync   = zdCount > 0 ? (donneesSync  / zdCount * 100).toFixed(0) : 0;
  const pctPres   = totalAgentsPrevus > 0 ? (totalAgentsPresents / totalAgentsPrevus * 100).toFixed(0) : 0;
  const pctAgric  = totalMenages > 0 ? (totalMenagesAgric / totalMenages * 100).toFixed(1) : 0;

  // ── Per-ZC ──
  const byZC = {};
  allData.forEach(d => {
    const zc = d['identification/n_zc']; if (!zc) return;
    if (!byZC[zc]) byZC[zc] = { visitees:0, achevees:0, assignees:0, nonPayes:0, desistements:0, menages:0, region: d['identification/region'] };
    byZC[zc].visitees  += parseInt(d['totaux_zc/total_zd_visitees']  || 0);
    byZC[zc].achevees  += parseInt(d['totaux_zc/total_zd_achevees']  || 0);
    byZC[zc].assignees += parseInt(d['totaux_zc/total_zd_assignees'] || 0);
    (d.suivi_zd || []).forEach(zd => {
      byZC[zc].nonPayes     += parseInt(zd['suivi_zd/difficultes/diff_4d/nb_agents_non_payes'] || 0);
      byZC[zc].desistements += parseInt(zd['suivi_zd/agents/agents_desistements']             || 0);
      byZC[zc].menages      += parseInt(zd['suivi_zd/menages/nb_menages']                     || 0);
    });
  });

  const sortedZCs = Object.entries(byZC)
    .sort((a, b) => b[1].nonPayes - a[1].nonPayes || b[1].visitees - a[1].visitees)
    .slice(0, 10);

  // ── Appréciation ──
  const apprec = { bonne:0, difficile:0, bloquee:0 };
  allData.forEach(d => { const a = d['bilan/appreciation_globale']; if (a && apprec[a] !== undefined) apprec[a]++; });

  // ── ZC bloquées ──
  const blockedZCs = allData.filter(d => d['bilan/appreciation_globale'] === 'bloquee').map(d => `ZC ${d['identification/n_zc']}`);

  // ── Format helpers ──
  const fmtDate  = s => { if (!s) return '—'; const d = new Date(s + 'T00:00:00'); return d.toLocaleDateString('fr-FR', { day:'numeric', month:'long', year:'numeric' }); };
  const fmtShort = s => { if (!s) return '—'; const d = new Date(s + 'T00:00:00'); return d.toLocaleDateString('fr-FR', { day:'numeric', month:'long' }); };

  // ── Banner ──
  setText('ops-period',      `du ${fmtShort(dateFirst)} au ${fmtDate(dateLast)}`);
  setText('ops-nb-ctrl',     controleurs.size);
  setText('ops-nb-regions',  regions.size);
  setText('hdr-ctrl',        controleurs.size);
  setText('hdr-regions',     regions.size);
  const now = new Date();
  setText('hdr-date',        now.toLocaleDateString('fr-FR', { day:'2-digit', month:'short' }));
  setText('hdr-date-year',   now.getFullYear());
  setText('ops-report-date', now.toLocaleDateString('fr-FR', { day:'2-digit', month:'long', year:'numeric' }));

  // ── 8 KPIs ──
  setText('kpi-o-ctrl',      controleurs.size.toLocaleString('fr-FR'));
  setText('kpi-o-ctrl-sub',  `${regions.size} région${regions.size>1?'s':''} · ${zcs.size} ZC · ${allData.length} fiches`);
  setText('kpi-o-zdvis',     totalZdVisitees.toLocaleString('fr-FR'));
  setText('kpi-o-zdvis-sub', `${pctVis}% des ${totalZdAssignees} ZD assignées`);
  setText('kpi-o-zdach',     totalZdAchevees.toLocaleString('fr-FR'));
  setText('kpi-o-zdach-sub', `${pctAch}% achèvement · ${totalZdAssignees} assignées`);
  setText('kpi-o-zdauj',     zdAcheveesAuj.toLocaleString('fr-FR'));
  setText('kpi-o-zdauj-sub', `MAJ achevée : ${majAchevee}/${zdCount} ZD (${pctMaj}%)`);
  setText('kpi-o-agents',    totalAgentsPresents.toLocaleString('fr-FR'));
  setText('kpi-o-agents-sub',`${pctPres}% présence · ${totalAgentsPrevus} prévus`);
  setText('kpi-o-np',        totalNonPayes.toLocaleString('fr-FR'));
  setText('kpi-o-np-sub',    `agents non payés · ${totalAgentsAbsents} absents · ${totalAgentsMalades} malades`);
  setText('kpi-o-des',       totalDesistements.toLocaleString('fr-FR'));
  setText('kpi-o-des-sub',   `${totalReservistes} réserviste${totalReservistes>1?'s':''} mobilisé${totalReservistes>1?'s':''}`);
  setText('kpi-o-men',       totalMenages.toLocaleString('fr-FR'));
  setText('kpi-o-men-sub',   `dont ${totalMenagesAgric.toLocaleString('fr-FR')} agric. (${pctAgric}%)`);

  // ── Appréciation des journées + avancement ZD ──
  const totalApprec = apprec.bonne + apprec.difficile + apprec.bloquee;
  const apprecCfg = [
    { key:'bonne',    color:'#16a34a', label:'Bonne journée' },
    { key:'difficile',color:'#d97706', label:'Difficile'      },
    { key:'bloquee',  color:'#dc2626', label:'Bloquée'        },
  ];
  let appHtml = '';
  apprecCfg.forEach(({ key, color, label }) => {
    const count = apprec[key] || 0;
    const pct   = totalApprec > 0 ? Math.round(count / totalApprec * 100) : 0;
    appHtml += `
      <div class="apprec-bar-item">
        <div class="apprec-bar-label">
          <span style="color:${color};font-weight:700">${label}</span>
          <span style="color:${color}">${count} (${pct}%)</span>
        </div>
        <div class="apprec-bar-track">
          <div class="apprec-bar-fill" style="width:${pct}%;background:${color}"></div>
        </div>
      </div>`;
  });
  // Avancement ZD inline
  appHtml += `<hr class="my-2">
    <div style="font-size:0.72rem;font-weight:600;color:#374151;margin-bottom:4px">AVANCEMENT ZD (${zdCount} renseignées)</div>`;
  const avancCfg = [
    { label:'MAJ achevée',      val:majAchevee,  color:'#16a34a' },
    { label:'Données synchro',  val:donneesSync, color:'#2563eb' },
    { label:'Croquis validés',  val:croquis,     color:'#7c3aed' },
    { label:'Présence CE',      val:presenceCE,  color:'#0891b2' },
    { label:'Présence AR',      val:presenceAR,  color:'#0891b2' },
  ];
  avancCfg.forEach(({ label, val, color }) => {
    const pct = zdCount > 0 ? Math.round(val / zdCount * 100) : 0;
    appHtml += `
      <div class="apprec-bar-item">
        <div class="apprec-bar-label">
          <span style="color:${color}">${label}</span>
          <span style="color:${color}">${val}/${zdCount} (${pct}%)</span>
        </div>
        <div class="apprec-bar-track">
          <div class="apprec-bar-fill" style="width:${pct}%;background:${color}"></div>
        </div>
      </div>`;
  });
  appHtml += `<div class="text-muted mt-2" style="font-size:0.71rem">${totalApprec} fiches · ZD segmentées: ${totalZdSegmentees} · ZD regroupées: ${totalZdRegroupees}</div>`;
  byId('appreciation-body').innerHTML = appHtml;

  // ── Alertes prioritaires ──
  let alertHtml = '';

  if (totalNonPayes > 0) {
    const topNP = Object.entries(byZC)
      .filter(([, v]) => v.nonPayes > 0)
      .sort((a, b) => b[1].nonPayes - a[1].nonPayes)
      .slice(0, 5)
      .map(([zc, v]) => `ZC ${zc} : ${v.nonPayes}`)
      .join(' &nbsp;|&nbsp; ');
    alertHtml += `
      <div class="alert-item critique">
        <div class="alert-item-header">
          <span class="alert-badge critique">P1 CRITIQUE</span>
          <span class="alert-item-title">${totalNonPayes.toLocaleString('fr-FR')} agents non payés</span>
        </div>
        <div class="alert-item-detail">${topNP}</div>
      </div>`;
  }

  if (blockedZCs.length > 0) {
    alertHtml += `
      <div class="alert-item urgent">
        <div class="alert-item-header">
          <span class="alert-badge urgent">P1 URGENT</span>
          <span class="alert-item-title">${blockedZCs.length} ZC bloquée${blockedZCs.length > 1 ? 's' : ''} — intervention urgente &lt;24h</span>
        </div>
        <div class="alert-item-detail">${blockedZCs.join(' — ')}</div>
      </div>`;
  }

  if (pctAchNum < 30 && totalZdAssignees > 0) {
    const zeroAch = Object.entries(byZC)
      .filter(([, v]) => v.achevees === 0 && v.assignees === 0)
      .slice(0, 5).map(([zc]) => `ZC ${zc}`).join(', ');
    alertHtml += `
      <div class="alert-item urgent">
        <div class="alert-item-header">
          <span class="alert-badge urgent">P1 URGENT</span>
          <span class="alert-item-title">Taux d'achèvement ${pctAch}% (${totalZdAchevees}/${totalZdAssignees} ZD)</span>
        </div>
        <div class="alert-item-detail">${zeroAch ? 'ZC à 0 ZD achevée : ' + zeroAch : ''}</div>
      </div>`;
  }

  // Difficultés techniques
  const totalDiffTech = diffMapIt + diffGPS + diffReseau + diffBatterie + diffElec;
  if (totalDiffTech > 0) {
    const dParts = [];
    if (diffReseau)   dParts.push(`Réseau : ${diffReseau} ZD`);
    if (diffMapIt)    dParts.push(`MapIt : ${diffMapIt} ZD`);
    if (diffBatterie) dParts.push(`Batterie : ${diffBatterie} ZD`);
    if (diffElec)     dParts.push(`Électricité : ${diffElec} ZD`);
    if (diffGPS)      dParts.push(`GPS : ${diffGPS} ZD`);
    alertHtml += `
      <div class="alert-item urgent">
        <div class="alert-item-header">
          <span class="alert-badge urgent">P2 TECHNIQUE</span>
          <span class="alert-item-title">${totalDiffTech} ZD avec difficultés techniques</span>
        </div>
        <div class="alert-item-detail">${dParts.join(' · ')}</div>
      </div>`;
  }

  // Difficultés terrain
  const totalDiffTerrain = diffAcces + diffAdhesion + diffMenagesAbs + diffRefus + diffLangue;
  if (totalDiffTerrain > 0) {
    const tParts = [];
    if (diffMenagesAbs) tParts.push(`Ménages absents : ${diffMenagesAbs}`);
    if (diffAcces)      tParts.push(`Accès : ${diffAcces}`);
    if (diffRefus)      tParts.push(`Refus : ${diffRefus}`);
    if (diffAdhesion)   tParts.push(`Adhésion : ${diffAdhesion}`);
    if (diffLangue)     tParts.push(`Langue : ${diffLangue}`);
    alertHtml += `
      <div class="alert-item excep">
        <div class="alert-item-header">
          <span class="alert-badge excep">P2 TERRAIN</span>
          <span class="alert-item-title">${totalDiffTerrain} ZD avec difficultés terrain</span>
        </div>
        <div class="alert-item-detail">${tParts.join(' · ')}</div>
      </div>`;
  }

  const completedZCs = Object.entries(byZC)
    .filter(([, v]) => v.assignees > 0 && v.achevees >= v.assignees);
  if (completedZCs.length > 0) {
    const label = completedZCs.slice(0, 3).map(([zc, v]) => `ZC ${zc} (${v.achevees}/${v.assignees})`).join(' · ');
    alertHtml += `
      <div class="alert-item excep">
        <div class="alert-item-header">
          <span class="alert-badge excep">EXCEPTIONNEL</span>
          <span class="alert-item-title">${completedZCs.length} ZC à 100% des ZD achevées !</span>
        </div>
        <div class="alert-item-detail">${label}</div>
      </div>`;
  }

  if (!alertHtml) alertHtml = '<div class="text-muted small">Aucune alerte critique détectée.</div>';

  alertHtml += `
    <div class="total-np-note mt-2">
      <i class="fas fa-exclamation-circle me-1"></i>
      <strong>${totalNonPayes.toLocaleString('fr-FR')} agents non payés</strong>
      &nbsp;·&nbsp; ${totalDesistements} désistement${totalDesistements>1?'s':''}
      &nbsp;·&nbsp; ${totalReservistes} réserviste${totalReservistes>1?'s':''} mobilisé${totalReservistes>1?'s':''}
    </div>`;
  byId('alertes-body').innerHTML = alertHtml;

  // ── Avancement par ZC ──
  let zcHtml = `<table class="zc-table">
    <thead><tr>
      <th>Zone de Contrôle</th>
      <th>ZD visitées / achevées</th>
      <th class="text-end">Ménages</th>
      <th class="text-end">Non payés</th>
    </tr></thead><tbody>`;

  sortedZCs.forEach(([zc, v]) => {
    const pct    = v.assignees > 0 ? Math.round(v.visitees / v.assignees * 100) : (v.visitees > 0 ? 100 : 0);
    const barClr = pct >= 100 ? '#16a34a' : pct > 0 ? '#2563eb' : '#94a3b8';
    const npClass = v.nonPayes > 0 ? 'has-np' : 'ok';
    const npText  = v.nonPayes > 0 ? `${v.nonPayes} NP` : 'OK';
    const reg     = REGION_NAMES[v.region] || `R${v.region}`;
    zcHtml += `<tr>
      <td><strong>ZC ${zc}</strong><span class="zc-region-lbl">${reg}</span></td>
      <td>
        <div style="font-size:0.7rem;color:#64748b;margin-bottom:2px">${v.visitees} vis. / ${v.achevees} ach. sur ${v.assignees || '?'}</div>
        <div class="zc-progress">
          <div class="zc-progress-fill" style="width:${Math.max(pct, v.visitees > 0 ? 4 : 0)}%;background:${barClr}"></div>
        </div>
      </td>
      <td class="text-end" style="font-size:0.75rem;color:#374151">${v.menages > 0 ? v.menages.toLocaleString('fr-FR') : '—'}</td>
      <td class="text-end"><span class="zc-np-badge ${npClass}">${npText}</span></td>
    </tr>`;
  });
  zcHtml += '</tbody></table>';
  byId('avancement-body').innerHTML = zcHtml;

  // ── Actions requises ──
  const actions = [];
  if (totalNonPayes > 0)
    actions.push({ num:1, priority:'P1 CRITIQUE', color:'#dc2626',
      title:`PAIEMENT URGENT — ${totalNonPayes.toLocaleString('fr-FR')} agents non payés`,
      desc:'Virement immédiat, dérogation SIM', footer:'Coord. Nat. / 24h' });

  if (blockedZCs.length > 0)
    actions.push({ num:actions.length+1, priority:'P1 URGENT', color:'#d97706',
      title:`DÉBLOQUER ${blockedZCs.slice(0,3).join(', ')}`,
      desc:'Contact superviseur + visite terrain', footer:'Sup. Dép. / 24h' });

  if (pctAchNum < 30 && totalZdAssignees > 0)
    actions.push({ num:actions.length+1, priority:'P1 URGENT', color:'#d97706',
      title:'OBJECTIFS JOURNALIERS PAR ZC',
      desc:`Taux actuel ${pctAch}% — sous les objectifs`, footer:'Coord. Nat. / 48h' });

  if (totalDesistements > 0)
    actions.push({ num:actions.length+1, priority:'P2 ÉLEVÉ', color:'#0891b2',
      title:`REMPLACER ${totalDesistements} DÉSISTEMENT${totalDesistements > 1 ? 'S' : ''}`,
      desc:`${totalReservistes} réserviste${totalReservistes>1?'s':''} disponible${totalReservistes>1?'s':''}`, footer:'Gest. RH / 24h' });

  const totalDiffTechAct = diffMapIt + diffGPS + diffReseau + diffBatterie + diffElec;
  if (totalDiffTechAct > 0 && actions.length < 4)
    actions.push({ num:actions.length+1, priority:'P2 TECHNIQUE', color:'#7c3aed',
      title:`${totalDiffTechAct} ZD AVEC DIFFICULTÉS TECHNIQUES`,
      desc:`Réseau: ${diffReseau} · MapIt: ${diffMapIt} · Batterie: ${diffBatterie}`, footer:'Sup. Tech. / 48h' });

  const totalDiffTerrainAct = diffAcces + diffAdhesion + diffMenagesAbs + diffRefus + diffLangue;
  if (totalDiffTerrainAct > 0 && actions.length < 4)
    actions.push({ num:actions.length+1, priority:'P2 TERRAIN', color:'#ea580c',
      title:`${totalDiffTerrainAct} ZD AVEC DIFFICULTÉS TERRAIN`,
      desc:`Absents: ${diffMenagesAbs} · Accès: ${diffAcces} · Refus: ${diffRefus}`, footer:'Sup. Dép. / 48h' });

  while (actions.length < 4)
    actions.push({ num:actions.length+1, priority:'P2 SUIVI', color:'#64748b',
      title:'SUIVI RÉGULIER DES DONNÉES',
      desc:`Synchro: ${donneesSync}/${zdCount} ZD (${pctSync}%) · Croquis: ${croquis}/${zdCount}`, footer:'Coord. / 72h' });

  byId('actions-body').innerHTML = actions.slice(0,4).map(a => `
    <div class="col-12 col-md-6 col-lg-3">
      <div class="action-card" style="--action-color:${a.color}">
        <div class="action-card-header">
          <div class="action-number">${a.num}</div>
          <span class="action-priority">${a.priority}</span>
        </div>
        <div class="action-title">${a.title}</div>
        <div class="action-desc">${a.desc}</div>
        <div class="action-footer">${a.footer}</div>
      </div>
    </div>`).join('');
}

// ─── KPI Cards (legacy — conservé pour compatibilité) ─────────────────────
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
        x:  { grid: { display: false }, ticks: { maxTicksLimit: 12, font: { size: 10 } },
              title: { display: true, text: 'Date de soumission', font: { size: 10 } } },
        y:  { position: 'left',  beginAtZero: true, grid: { color: 'rgba(0,0,0,0.05)' },
              ticks: { font: { size: 10 } },
              title: { display: true, text: 'Fiches / jour', font: { size: 10 } } },
        y2: { position: 'right', beginAtZero: true, grid: { display: false },
              ticks: { font: { size: 10 } },
              title: { display: true, text: 'Total cumulé', font: { size: 10 } } }
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
      labels: sorted.map(([k]) => shortLabel(friendlyValue(fieldName, k))),
      datasets: [{ data: sorted.map(([, v]) => v), backgroundColor: COLORS, borderRadius: 4 }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false },
        tooltip: { callbacks: {
          title: ctx => friendlyValue(fieldName, sorted[ctx[0].dataIndex][0]),
          label: ctx => ` ${ctx.raw.toLocaleString('fr-FR')} soumissions`
        }}
      },
      scales: {
        x: { grid: { display: false }, ticks: { maxRotation: 40, font: { size: 10 } } },
        y: { beginAtZero: true, grid: { color: 'rgba(0,0,0,0.05)' },
             title: { display: true, text: 'Nombre de fiches', font: { size: 10 } } }
      }
    }
  });
}

// ─── Page Statistiques ───────────────────────────────────────────────────
function buildFieldSelector() {
  const sel    = byId('fieldSelector');
  const mapSel = byId('mapFieldSelect');
  sel.innerHTML    = '<option value="">— Choisissez un indicateur à analyser —</option>';
  mapSel.innerHTML = '<option value="">— Couleur par —</option>';

  // Prioritize known fields first, then auto-detected
  const known = Object.keys(FIELD_LABELS);
  const auto  = detectCategoricalFields(60);
  const ordered = [...new Set([...known.filter(k => auto.includes(k)), ...auto])];

  // Group by category
  const groups = {
    'Géographie':  ['identification/region','identification/departement','identification/arrondissement'],
    'Organisation':['identification/n_zc','identification/controleur','identification/superviseur'],
    'Bilan':       ['bilan/appreciation_globale'],
    'Avancement ZD':  auto.filter(f => f.includes('etat_avancement')),
    'Difficultés':    auto.filter(f => f.includes('difficultes')),
    'Autres':         ordered.filter(f => !f.includes('identification') && !f.includes('bilan') && !f.includes('etat_avancement') && !f.includes('difficultes'))
  };

  Object.entries(groups).forEach(([grpLabel, fields]) => {
    const validFields = fields.filter(f => auto.includes(f));
    if (!validFields.length) return;
    sel.insertAdjacentHTML('beforeend', `<optgroup label="── ${grpLabel} ──">`);
    validFields.forEach(f => {
      const lbl = friendlyLabel(f);
      sel.insertAdjacentHTML('beforeend', `<option value="${f}">${lbl}</option>`);
      mapSel.insertAdjacentHTML('beforeend', `<option value="${f}">${lbl}</option>`);
    });
    sel.insertAdjacentHTML('beforeend', '</optgroup>');
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

  // Description contextuelle du champ
  const fieldDesc = FIELD_LABELS[field]
    ? `Répartition des ${allData.length} fiches selon : <strong>${label}</strong>`
    : `Analyse du champ <strong>${label}</strong> sur ${allData.length} soumissions`;
  area.insertAdjacentHTML('beforeend', `
    <div class="col-12">
      <div class="alert alert-light border py-2 px-3 mb-0" style="font-size:0.82rem">
        <i class="fas fa-info-circle text-primary me-2"></i>${fieldDesc}
        &nbsp;—&nbsp; <span class="text-muted">${Object.keys(counts).length} valeurs distinctes · ${total.toLocaleString('fr-FR')} réponses</span>
      </div>
    </div>`);

  // Tableau résumé
  area.insertAdjacentHTML('beforeend', `
    <div class="col-12 col-lg-4">
      <div class="dash-card h-100">
        <div class="dash-card-header"><i class="fas fa-list-ol me-2 text-primary"></i>${label}</div>
        <div class="dash-card-body p-0">
          <table class="table table-sm table-hover mb-0">
            <thead class="table-light">
              <tr><th>${label}</th><th class="text-end">Fiches</th><th class="text-end">%</th></tr>
            </thead>
            <tbody>
              ${entries.map(([k, v]) => `
                <tr>
                  <td><span title="${k}">${shortLabel(friendlyValue(field, k)) || '(vide)'}</span></td>
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
        <div class="dash-card-header"><i class="fas fa-chart-bar me-2 text-info"></i>Nombre de fiches par ${label}</div>
        <div class="dash-card-body"><canvas id="${barId}"></canvas></div>
      </div>
    </div>`);

  // Donut
  const donutId = uid();
  area.insertAdjacentHTML('beforeend', `
    <div class="col-12 col-md-5">
      <div class="dash-card">
        <div class="dash-card-header"><i class="fas fa-chart-pie me-2 text-success"></i>Proportions — ${label}</div>
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
        <div class="dash-card-header"><i class="fas fa-sort-amount-down me-2 text-warning"></i>Classement — ${label}</div>
        <div class="dash-card-body"><canvas id="${hbarId}"></canvas></div>
      </div>
    </div>`);

  // Remplissage des graphiques
  const top12 = topN(counts, 12);
  const fvShort = k => shortLabel(friendlyValue(field, k));
  new Chart(byId(barId), {
    type: 'bar',
    data: {
      labels: top12.map(([k]) => fvShort(k)),
      datasets: [{ data: top12.map(([, v]) => v), backgroundColor: COLORS, borderRadius: 4 }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false },
        tooltip: { callbacks: {
          title: ctx => friendlyValue(field, top12[ctx[0].dataIndex][0]),
          label: ctx => ` ${ctx.raw.toLocaleString('fr-FR')} fiche(s) — ${Math.round(ctx.raw/total*100)}%`
        }}
      },
      scales: {
        x: { grid: { display: false }, ticks: { maxRotation: 45, font: { size: 10 } } },
        y: { beginAtZero: true, grid: { color: 'rgba(0,0,0,0.05)' },
             title: { display: true, text: 'Nombre de fiches soumises', font: { size: 10 } } }
      }
    }
  });

  const top8 = topN(counts, 8);
  new Chart(byId(donutId), {
    type: 'doughnut',
    data: {
      labels: top8.map(([k]) => fvShort(k)),
      datasets: [{ data: top8.map(([, v]) => v), backgroundColor: COLORS,
                   borderWidth: 2, borderColor: '#fff', hoverOffset: 8 }]
    },
    options: {
      responsive: true, cutout: '60%',
      plugins: {
        legend: { position: 'bottom', labels: { font: { size: 11 }, boxWidth: 12, padding: 8 } },
        tooltip: { callbacks: {
          title: ctx => friendlyValue(field, top8[ctx[0].dataIndex][0]),
          label: ctx => ` ${ctx.raw.toLocaleString('fr-FR')} fiche(s) — ${Math.round(ctx.raw/total*100)}%`
        }}
      }
    }
  });

  const top10rev = topN(counts, 10).reverse();
  new Chart(byId(hbarId), {
    type: 'bar',
    data: {
      labels: top10rev.map(([k]) => fvShort(k)),
      datasets: [{ data: top10rev.map(([, v]) => v), backgroundColor: COLORS[0], borderRadius: 4 }]
    },
    options: {
      indexAxis: 'y', responsive: true,
      plugins: {
        legend: { display: false },
        tooltip: { callbacks: {
          title: ctx => friendlyValue(field, top10rev[ctx[0].dataIndex][0]),
          label: ctx => ` ${ctx.raw.toLocaleString('fr-FR')} fiche(s) — ${Math.round(ctx.raw/total*100)}%`
        }}
      },
      scales: {
        x: { beginAtZero: true, grid: { color: 'rgba(0,0,0,0.05)' },
             title: { display: true, text: 'Nombre de fiches', font: { size: 10 } } },
        y: { grid: { display: false }, ticks: { font: { size: 10 } } }
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
  if (FIELD_LABELS[field]) return FIELD_LABELS[field];
  return field.split('/').pop().replace(/_/g,' ').replace(/\b\w/g, c => c.toUpperCase());
}

function friendlyValue(field, value) {
  if (value == null || value === '') return '(vide)';
  const v = String(value);
  if (VALUE_LABELS[v]) return VALUE_LABELS[v];
  if (field && field.includes('region'))
    return REGION_NAMES[v] ? `${REGION_NAMES[v]}` : `Région ${v}`;
  if (field && field.includes('departement'))
    return DEPT_NAMES[v] || `Département ${v}`;
  if (field && field.includes('arrondissement')) {
    if (ARR_NAMES[v]) return ARR_NAMES[v];
    const dept = DEPT_NAMES[v.slice(0, 4)];
    return dept ? `${dept.split(' (')[0]} – Arr. ${parseInt(v.slice(4))}` : `Arr. ${v}`;
  }
  return v;
}

function shortLabel(str) {
  if (!str) return '(vide)';
  return String(str).length > 26 ? String(str).slice(0, 24) + '…' : String(str);
}
