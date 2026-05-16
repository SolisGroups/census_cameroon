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

// ─── Filtres administratifs globaux ─────────────────────────────────────
let activeRegion = '';
let activeDept   = '';
let activeArr    = '';
let activeZC     = '';

/** Données filtrées selon les filtres administratifs actifs */
function filtered() {
  if (!activeRegion && !activeDept && !activeArr && !activeZC) return allData;
  return allData.filter(d => {
    if (activeRegion && d['identification/region']         !== activeRegion) return false;
    if (activeDept   && d['identification/departement']   !== activeDept)   return false;
    if (activeArr    && d['identification/arrondissement'] !== activeArr)    return false;
    if (activeZC     && d['identification/n_zc']           !== activeZC)    return false;
    return true;
  });
}

/** Déduplique filtered() : une entrée par ZC (dernière soumission) */
function deduplicatedFiltered() {
  const latest = {};
  filtered().forEach(d => {
    const zc = d['identification/n_zc']; if (!zc) return;
    const date = d['identification/date_saisie'] || d._submission_time?.split('T')[0] || '';
    if (!latest[zc] || date >= (latest[zc]._date || '')) {
      latest[zc] = { ...d, _date: date };
    }
  });
  return Object.values(latest);
}

// ─── Gestion des filtres administratifs ──────────────────────────────────
function populateAdminFilters() {
  const fill = (id, vals, labelFn, currentVal, placeholder) => {
    const el = byId(id); if (!el) return;
    el.innerHTML = `<option value="">${placeholder}</option>` +
      vals.map(v => `<option value="${v}"${v === currentVal ? ' selected' : ''}>${labelFn(v)}</option>`).join('');
  };

  const base0 = allData;
  const regions = [...new Set(base0.map(d => d['identification/region']).filter(Boolean))].sort();
  fill('filterRegion', regions, r => REGION_NAMES[r] || `Région ${r}`, activeRegion, 'Toutes régions');

  const base1 = activeRegion ? base0.filter(d => d['identification/region'] === activeRegion) : base0;
  const depts = [...new Set(base1.map(d => d['identification/departement']).filter(Boolean))].sort();
  fill('filterDept', depts, d => DEPT_NAMES[d] || d, activeDept, 'Tous départements');

  const base2 = activeDept ? base1.filter(d => d['identification/departement'] === activeDept) : base1;
  const arrs = [...new Set(base2.map(d => d['identification/arrondissement']).filter(Boolean))].sort();
  fill('filterArr', arrs, a => {
    if (!a) return a;
    if (ARR_NAMES[a]) return ARR_NAMES[a];
    const dept = DEPT_NAMES[a.slice(0, 4)];
    return dept ? `${dept.split(' (')[0]} – Arr. ${parseInt(a.slice(4), 10) || a.slice(4)}` : a;
  }, activeArr, 'Tous arrondissements');

  const base3 = activeArr ? base2.filter(d => d['identification/arrondissement'] === activeArr) : base2;
  const zcs = [...new Set(base3.map(d => d['identification/n_zc']).filter(Boolean))]
    .sort((a, b) => String(a).localeCompare(String(b), undefined, { numeric: true }));
  fill('filterZC', zcs, z => `ZC ${z}`, activeZC, 'Toutes ZC');

  const bar = byId('adminFilterBar');
  if (bar) bar.classList.remove('d-none');
  _updateFilterUI();
}

function onAdminFilter(level) {
  activeRegion = byId('filterRegion')?.value || '';
  if (level === 'region') { activeDept = ''; activeArr = ''; activeZC = ''; }
  if (level === 'dept')   { activeArr = '';  activeZC = ''; }
  if (level === 'arr')    { activeZC = ''; }
  activeDept = byId('filterDept')?.value || '';
  activeArr  = byId('filterArr')?.value  || '';
  activeZC   = byId('filterZC')?.value   || '';
  populateAdminFilters();
  renderAll();
}

function clearAdminFilter() {
  activeRegion = activeDept = activeArr = activeZC = '';
  populateAdminFilters();
  renderAll();
}

function _updateFilterUI() {
  const hasFilter = !!(activeRegion || activeDept || activeArr || activeZC);
  const clearBtn  = byId('clearAdminBtn');
  const badge     = byId('adminFilterBadge');
  if (clearBtn) clearBtn.style.display = hasFilter ? '' : 'none';
  if (badge) {
    const cnt = filtered().length;
    badge.textContent = `${cnt} fiche${cnt > 1 ? 's' : ''}`;
    badge.style.display = hasFilter ? '' : 'none';
  }
}

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
  populateAdminFilters();
  renderOperationalDashboard();
  renderTrendChart();
  renderRegionProgressChart();
  renderTerritorialTable();
  renderMap();
  renderTable();
  renderStatsForField();
}

// ─── Dashboard opérationnel ──────────────────────────────────────────────
function renderOperationalDashboard() {
  if (!allData.length) return;

  const isOui = v => v === 'oui' || v === '1' || v === 'yes' || v === true;
  const toInt = v => parseInt(v || 0) || 0;

  // Appliquer les filtres administratifs actifs
  const data = filtered();

  const controleurs = new Set(data.map(d => d['identification/controleur'] || d['identification/n_controleur']).filter(Boolean));
  const regions     = new Set(data.map(d => d['identification/region']).filter(Boolean));
  const zcs         = new Set(data.map(d => d['identification/n_zc']).filter(Boolean));

  const dates = data.map(d => d['identification/date_saisie'] || d._submission_time?.split('T')[0]).filter(Boolean).sort();
  const dateFirst = dates[0], dateLast = dates[dates.length - 1];

  // ══════════════════════════════════════════════════════════════════════════
  // ÉTAPE 1 — Déduplication par ZC
  // Une ZC peut être soumise plusieurs fois (ZC 022 x3, ZC 100 x2, ZC 047 x2).
  // Pour les totaux ZC (assignées, visitées, achevées), on prend la DERNIÈRE
  // soumission par ZC (évite le double-comptage).
  // Pour les lignes suivi_zd, on CUMULE toutes les soumissions de la ZC car
  // chaque soumission couvre des ZD différentes.
  // ══════════════════════════════════════════════════════════════════════════
  const latestByZC = {};   // dernière soumission par ZC (pour totaux_zc)
  data.forEach(d => {
    const zc   = d['identification/n_zc']; if (!zc) return;
    const date = d['identification/date_saisie'] || d._submission_time?.split('T')[0] || '';
    if (!latestByZC[zc] || date >= (latestByZC[zc]._date || '')) {
      latestByZC[zc] = { ...d, _date: date };
    }
  });
  const dedupedData = Object.values(latestByZC); // une fiche par ZC

  // ── Totaux ZC depuis la dernière soumission par ZC (sans double-comptage) ──
  let totalZdAssignees = 0, totalZdVisitees = 0, totalZdAchevees = 0;
  let totalZdSegmentees = 0, totalZdRegroupees = 0, totalZdCroquis = 0;
  dedupedData.forEach(d => {
    totalZdAssignees  += toInt(d['auto_zd_apres_maj'] || d['identification/nb_zd_assignees_zc'] || d['totaux_zc/total_zd_assignees']);
    totalZdVisitees   += toInt(d['auto_nb_zd_visitees'] || d['totaux_zc/total_zd_visitees']);
    totalZdAchevees   += toInt(d['totaux_zc/tot_cumul/cumul_zd_achevees'] || d['auto_zd_achevees'] || d['totaux_zc/total_zd_achevees']);
    totalZdSegmentees += toInt(d['auto_zd_segmentees'] || d['totaux_zc/total_zd_segmentees']);
    totalZdRegroupees += toInt(d['auto_zd_regroupees'] || d['totaux_zc/total_zd_regroupees']);
    totalZdCroquis    += toInt(d['auto_zd_croquis'] || d['totaux_zc/total_zd_croquis']);
  });

  // ── ZD achevées lors du dernier jour actif (dernière date avec des achèvements) ──
  // BUG CORRIGÉ : ne pas comparer avec "aujourd'hui" (page statique, data figée)
  // → chercher la dernière date avec au moins 1 ZD achevée
  const datesAvecAch = data
    .filter(d => toInt(d['auto_zd_achevees']) > 0 ||
                 toInt(d['totaux_zc/tot_cumul/cumul_zd_achevees']) > 0 ||
                 toInt(d['totaux_zc/total_zd_achevees']) > 0 ||
                 (d.suivi_zd||[]).some(zd => isOui(zd['suivi_zd/etat_avancement/maj_achevee'])))
    .map(d => d['identification/date_saisie'] || d._submission_time?.split('T')[0] || '')
    .filter(Boolean).sort();
  const dateLastActif = datesAvecAch.length ? datesAvecAch[datesAvecAch.length - 1] : dateLast;

  // ZD achevées ce jour — auto_zd_achevees compte uniquement l'ancienne structure
  // (etat_avancement/) ; pour la nouvelle (etat/) on compte manuellement depuis suivi_zd
  let zdAcheveesAuj = 0;
  data.forEach(d => {
    const dateD = d['identification/date_saisie'] || d._submission_time?.split('T')[0] || '';
    if (dateD !== dateLastActif) return;
    const autoAch = toInt(d['auto_zd_achevees']);
    if (autoAch > 0) {
      zdAcheveesAuj += autoAch;
    } else {
      (d.suivi_zd || []).forEach(zd => {
        if (isOui(zd['suivi_zd/etat/maj_achevee']) || isOui(zd['suivi_zd/etat_avancement/maj_achevee']))
          zdAcheveesAuj++;
      });
    }
  });

  // ══════════════════════════════════════════════════════════════════════════
  // ÉTAPE 2 — Comptage depuis suivi_zd (toutes soumissions cumulées)
  // Pour les ZC sans totaux_zc renseignés, on compte les ZD depuis suivi_zd.
  // Pour les ZC avec totaux_zc, on garde ces valeurs (plus fiables).
  // ══════════════════════════════════════════════════════════════════════════
  const zcsAvecTotauxZC = new Set(
    dedupedData.filter(d => toInt(d['auto_nb_zd_visitees']) > 0 ||
                            toInt(d['totaux_zc/tot_cumul/cumul_zd_achevees']) > 0 ||
                            toInt(d['auto_zd_achevees']) > 0 ||
                            toInt(d['totaux_zc/total_zd_visitees']) > 0 ||
                            toInt(d['totaux_zc/total_zd_achevees']) > 0)
               .map(d => d['identification/n_zc'])
  );

  // Pour les ZC SANS totaux_zc : compter depuis suivi_zd (dernière soumission par ZC)
  // Double structure : etat_avancement/ (ancienne, 43 entrées) et etat/ (nouvelle, 915 entrées)
  let zdVisiteesEstim = 0, zdAcheveesEstim = 0;
  dedupedData.forEach(d => {
    const zc = d['identification/n_zc']; if (!zc) return;
    if (!zcsAvecTotauxZC.has(zc)) {
      (d.suivi_zd || []).forEach(zd => {
        if (isOui(zd['suivi_zd/presence/presence_ce']) || isOui(zd['suivi_zd/presence/presence_ar']) ||
            isOui(zd['suivi_zd/etat/zd_observee'])) zdVisiteesEstim++;
        if (isOui(zd['suivi_zd/etat/maj_achevee']) || isOui(zd['suivi_zd/etat_avancement/maj_achevee'])) zdAcheveesEstim++;
      });
    }
  });
  // Totaux combinés (totaux_zc fiables + estimation suivi_zd pour le reste)
  const totalZdVisiteesTot = totalZdVisitees + zdVisiteesEstim;
  const totalZdAcheveesTot = totalZdAchevees + zdAcheveesEstim;

  // ── Compteurs RH / ménages depuis auto_* (niveau ZC, 264/273 fiches, dédupliqué) ──
  // auto_* = valeurs pré-calculées par KoboToolbox pour chaque ZC → pas de double-comptage
  let totalMenages = 0, totalMenagesAgric = 0;
  let totalAgentsPresents = 0, totalAgentsAbsents = 0;
  let totalAgentsMalades = 0, totalDesistements = 0, totalReservistes = 0;
  let totalNonPayes = 0;
  dedupedData.forEach(d => {
    totalAgentsPresents += toInt(d['auto_presents']);
    totalAgentsAbsents  += toInt(d['auto_absents']);
    totalAgentsMalades  += toInt(d['auto_malades']);
    totalDesistements   += toInt(d['auto_desist']);
    totalReservistes    += toInt(d['auto_reserv']);
    totalNonPayes       += toInt(d['auto_non_payes']);
    totalMenages        += toInt(d['auto_menages']);
    totalMenagesAgric   += toInt(d['auto_men_agric']);
  });

  // ── Compteurs ZD depuis suivi_zd (dédupliqué, double structure du formulaire) ──
  // Ancienne version : suivi_zd/etat_avancement/X  (43 entrées / 1 023)
  // Nouvelle version : suivi_zd/etat/X             (915 entrées / 1 023)
  // zdVal() lit les deux versions pour ne perdre aucune donnée
  const zdVal = (zd, f) =>
    isOui(zd['suivi_zd/etat/' + f]) || isOui(zd['suivi_zd/etat_avancement/' + f]);

  let zdCount = 0, majAchevee = 0, donneesSync = 0, croquis = 0;
  let presenceCE = 0, presenceAR = 0, totalAgentsPrevus = 0;
  let diffMapIt = 0, diffGPS = 0, diffReseau = 0, diffBatterie = 0, diffElec = 0;
  let diffAcces = 0, diffAdhesion = 0, diffMenagesAbs = 0, diffRefus = 0, diffLangue = 0;

  dedupedData.forEach(d => {
    (d.suivi_zd || []).forEach(zd => {
      zdCount++;
      totalAgentsPrevus += toInt(zd['suivi_zd/agents/agents_prevus']);
      if (zdVal(zd, 'maj_achevee'))     majAchevee++;
      if (zdVal(zd, 'donnees_synchro')) donneesSync++;
      if (zdVal(zd, 'croquis_valides')) croquis++;
      // Présence : ancienne structure → presence_ce/ar ; nouvelle → zd_observee
      if (isOui(zd['suivi_zd/presence/presence_ce']) || isOui(zd['suivi_zd/etat/zd_observee'])) presenceCE++;
      if (isOui(zd['suivi_zd/presence/presence_ar']) || isOui(zd['suivi_zd/etat/zd_observee'])) presenceAR++;
      if (isOui(zd['suivi_zd/difficultes/diff_4a/diff_mapit']))           diffMapIt++;
      if (isOui(zd['suivi_zd/difficultes/diff_4a/diff_gps']))             diffGPS++;
      if (isOui(zd['suivi_zd/difficultes/diff_4a/diff_reseau']))          diffReseau++;
      if (isOui(zd['suivi_zd/difficultes/diff_4a/diff_batterie']))        diffBatterie++;
      if (isOui(zd['suivi_zd/difficultes/diff_4a/diff_electricite']))     diffElec++;
      if (isOui(zd['suivi_zd/difficultes/diff_4b/diff_acces_phys']))      diffAcces++;
      if (isOui(zd['suivi_zd/difficultes/diff_4b/diff_adhesion']))        diffAdhesion++;
      if (isOui(zd['suivi_zd/difficultes/diff_4b/diff_menages_absents'])) diffMenagesAbs++;
      if (isOui(zd['suivi_zd/difficultes/diff_4b/diff_refus']))           diffRefus++;
      if (isOui(zd['suivi_zd/difficultes/diff_4b/diff_langue']))          diffLangue++;
    });
  });

  // ── Taux calculés ──
  const pctAch    = totalZdAssignees > 0 ? (totalZdAcheveesTot / totalZdAssignees * 100).toFixed(1) : 0;
  const pctVis    = totalZdAssignees > 0 ? (totalZdVisiteesTot / totalZdAssignees * 100).toFixed(1) : 0;
  const pctAchNum = parseFloat(pctAch);
  const pctMaj    = zdCount > 0 ? (majAchevee   / zdCount * 100).toFixed(0) : 0;
  const pctSync   = zdCount > 0 ? (donneesSync  / zdCount * 100).toFixed(0) : 0;
  const pctPres   = totalAgentsPrevus > 0 ? (totalAgentsPresents / totalAgentsPrevus * 100).toFixed(0) : 0;
  const pctAgric  = totalMenages > 0 ? (totalMenagesAgric / totalMenages * 100).toFixed(1) : 0;

  // ══════════════════════════════════════════════════════════════════════════
  // ÉTAPE 3 — Tableau par ZC (déduplication : une entrée par ZC)
  // Totaux_zc = dernière soumission ; suivi_zd = cumulé toutes soumissions
  // ══════════════════════════════════════════════════════════════════════════
  const byZC = {};
  // Initialiser depuis la dernière soumission par ZC
  dedupedData.forEach(d => {
    const zc = d['identification/n_zc']; if (!zc) return;
    byZC[zc] = {
      visitees      : toInt(d['auto_nb_zd_visitees'] || d['totaux_zc/total_zd_visitees']),
      achevees      : toInt(d['totaux_zc/tot_cumul/cumul_zd_achevees'] || d['auto_zd_achevees'] || d['totaux_zc/total_zd_achevees']),
      assignees     : toInt(d['auto_zd_apres_maj'] || d['identification/nb_zd_assignees_zc'] || d['totaux_zc/total_zd_assignees']),
      nonPayes      : 0,
      desistements  : 0,
      menages       : 0,
      presences     : 0,
      region        : d['identification/region'],
    };
  });
  // Agréger les ZD depuis la dernière soumission par ZC (déjà dans dedupedData)
  dedupedData.forEach(d => {
    const zc = d['identification/n_zc']; if (!zc || !byZC[zc]) return;
    (d.suivi_zd || []).forEach(zd => {
      byZC[zc].nonPayes     += toInt(zd['suivi_zd/difficultes/diff_4d/nb_agents_non_payes']);
      byZC[zc].desistements += toInt(zd['suivi_zd/agents/agents_desistements']);
      byZC[zc].menages      += toInt(zd['suivi_zd/menages/nb_menages']);
      // Estimer les ZD visitées / achevées si totaux_zc absent (double structure)
      if (!zcsAvecTotauxZC.has(zc)) {
        if (isOui(zd['suivi_zd/presence/presence_ce']) || isOui(zd['suivi_zd/presence/presence_ar']) ||
            isOui(zd['suivi_zd/etat/zd_observee'])) byZC[zc].visitees++;
        if (isOui(zd['suivi_zd/etat/maj_achevee']) || isOui(zd['suivi_zd/etat_avancement/maj_achevee'])) byZC[zc].achevees++;
      }
    });
  });

  const sortedZCs = Object.entries(byZC)
    .sort((a, b) => b[1].nonPayes - a[1].nonPayes || b[1].visitees - a[1].visitees)
    .slice(0, 10);

  // ── Appréciation ──
  const apprec = { bonne:0, difficile:0, bloquee:0 };
  data.forEach(d => { const a = d['bilan/appreciation_globale']; if (a && apprec[a] !== undefined) apprec[a]++; });

  // ── ZC bloquées ──
  const blockedZCs = data.filter(d => d['bilan/appreciation_globale'] === 'bloquee').map(d => `ZC ${d['identification/n_zc']}`);

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
  setText('kpi-o-zdvis',     totalZdVisiteesTot.toLocaleString('fr-FR'));
  setText('kpi-o-zdvis-sub', `${pctVis}% des ${totalZdAssignees} ZD assignées`);
  setText('kpi-o-zdach',     totalZdAcheveesTot.toLocaleString('fr-FR'));
  setText('kpi-o-zdach-sub', `${pctAch}% achèvement · ${totalZdAssignees} assignées`);
  setText('kpi-o-zdauj',     zdAcheveesAuj.toLocaleString('fr-FR'));
  setText('kpi-o-zdauj-sub', `au ${fmtShort(dateLastActif)} · MAJ achevée cumul : ${majAchevee} ZD`);
  setText('kpi-o-agents',    totalAgentsPresents.toLocaleString('fr-FR'));
  setText('kpi-o-agents-sub',`${pctPres}% présence · ${totalAgentsPrevus} prévus`);
  setText('kpi-o-np',        totalNonPayes.toLocaleString('fr-FR'));
  setText('kpi-o-np-sub',    `agents non payés · ${totalAgentsAbsents} absents · ${totalAgentsMalades} malades`);
  setText('kpi-o-des',       totalDesistements.toLocaleString('fr-FR'));
  setText('kpi-o-des-sub',   `${totalReservistes} réserviste${totalReservistes>1?'s':''} mobilisé${totalReservistes>1?'s':''}`);
  setText('kpi-o-men',       totalMenages.toLocaleString('fr-FR'));
  setText('kpi-o-men-sub',   `dont ${totalMenagesAgric.toLocaleString('fr-FR')} agric. (${pctAgric}%)`);

  // ── Appréciation des journées ──
  const totalApprec = apprec.bonne + apprec.difficile + apprec.bloquee;
  const apprecCfg = [
    { key:'bonne',    color:'#16a34a', label:'Bonne journée' },
    { key:'difficile',color:'#d97706', label:'Difficile'      },
    { key:'bloquee',  color:'#dc2626', label:'Bloquée'        },
  ];
  let appHtml = `<div style="font-size:0.72rem;font-weight:700;color:#374151;margin-bottom:6px;text-transform:uppercase;letter-spacing:.04em">
    Appréciation des journées <span style="font-weight:400;color:#64748b">(${totalApprec} fiches)</span>
  </div>`;
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

  // ── Avancement ZD — section séparée avec titre distinct ──
  appHtml += `<hr class="my-2">
    <div style="font-size:0.72rem;font-weight:700;color:#374151;margin-bottom:6px;text-transform:uppercase;letter-spacing:.04em">
      Avancement ZD <span style="font-weight:400;color:#64748b">(${zdCount} lignes suivi)</span>
    </div>`;
  const avancCfg = [
    { label:'Mise à jour achevée', val:majAchevee,  color:'#16a34a' },
    { label:'Données synchronisées', val:donneesSync, color:'#2563eb' },
    { label:'Croquis validés',     val:croquis,     color:'#7c3aed' },
    { label:'Présence Chef Équipe',val:presenceCE,  color:'#0891b2' },
    { label:'Présence Agent Rec.', val:presenceAR,  color:'#0891b2' },
  ];
  avancCfg.forEach(({ label, val, color }) => {
    const pct = zdCount > 0 ? Math.round(val / zdCount * 100) : 0;
    appHtml += `
      <div class="apprec-bar-item">
        <div class="apprec-bar-label">
          <span style="color:${color}">${label}</span>
          <span style="color:${color};font-weight:600">${val} ZD (${pct}%)</span>
        </div>
        <div class="apprec-bar-track">
          <div class="apprec-bar-fill" style="width:${pct}%;background:${color}"></div>
        </div>
      </div>`;
  });
  appHtml += `<div class="text-muted mt-2" style="font-size:0.71rem">ZD segmentées: ${totalZdSegmentees} · ZD regroupées: ${totalZdRegroupees} · Croquis num.: ${totalZdCroquis}</div>`;
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
          <span class="alert-item-title">Taux d'achèvement ${pctAch}% (${totalZdAcheveesTot}/${totalZdAssignees} ZD)</span>
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
      desc:`Taux actuel ${pctAch}% (${totalZdAcheveesTot}/${totalZdAssignees} ZD) — sous les objectifs`, footer:'Coord. Nat. / 48h' });

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
  filtered().forEach(d => {
    // Utiliser date_saisie (date de terrain) plutôt que _submission_time
    const dt = d['identification/date_saisie'] || d._submission_time?.split('T')[0];
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

// ─── Graphique progression ZD par région (remplace le donut validation) ──
function renderRegionProgressChart() {
  const toInt = v => parseInt(v || 0) || 0;
  const byReg = {};
  deduplicatedFiltered().forEach(d => {
    const reg = d['identification/region'] || '??';
    if (!byReg[reg]) byReg[reg] = { assignees: 0, visitees: 0, achevees: 0 };
    byReg[reg].assignees += toInt(d['auto_zd_apres_maj'] || d['identification/nb_zd_assignees_zc']);
    byReg[reg].visitees  += toInt(d['auto_nb_zd_visitees']);
    byReg[reg].achevees  += toInt(d['totaux_zc/tot_cumul/cumul_zd_achevees'] || d['auto_zd_achevees']);
  });

  const regs   = Object.keys(byReg).sort();
  const labels = regs.map(r => REGION_NAMES[r] || `Rég. ${r}`);

  destroyChart('chartStatus');
  chartRefs.chartStatus = new Chart(byId('chartStatus'), {
    type: 'bar',
    data: {
      labels,
      datasets: [
        {
          label: 'ZD achevées',
          data: regs.map(r => byReg[r].achevees),
          backgroundColor: '#16a34a', borderRadius: 3
        },
        {
          label: 'ZD visitées (en cours)',
          data: regs.map(r => Math.max(0, byReg[r].visitees - byReg[r].achevees)),
          backgroundColor: '#0891b2', borderRadius: 3
        },
        {
          label: 'ZD non encore visitées',
          data: regs.map(r => Math.max(0, byReg[r].assignees - byReg[r].visitees)),
          backgroundColor: '#e2e8f0', borderRadius: 3
        }
      ]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      plugins: {
        legend: { position: 'bottom', labels: { font: { size: 10 }, boxWidth: 12, padding: 6 } },
        tooltip: {
          callbacks: {
            label: ctx => {
              const reg  = regs[ctx.dataIndex];
              const tot  = byReg[reg].assignees;
              const pct  = tot > 0 ? Math.round(ctx.raw / tot * 100) : 0;
              return ` ${ctx.dataset.label} : ${ctx.raw.toLocaleString('fr-FR')} (${pct}%)`;
            }
          }
        }
      },
      scales: {
        x: { stacked: true, beginAtZero: true, grid: { color: 'rgba(0,0,0,0.04)' },
             ticks: { font: { size: 9 } },
             title: { display: true, text: 'Nombre de ZD', font: { size: 9 } } },
        y: { stacked: true, ticks: { font: { size: 10 } } }
      }
    }
  });
}

// Alias pour compatibilité interne
function renderStatusChart() { renderRegionProgressChart(); }

// ─── Tableau d'analyse territoriale ──────────────────────────────────────
function renderTerritorialTable() {
  const tbody = byId('terrTableBody'); if (!tbody) return;
  const level = byId('terrLevel')?.value || 'region';
  const toInt = v => parseInt(v || 0) || 0;

  const KEY_MAP = {
    region : 'identification/region',
    dept   : 'identification/departement',
    arr    : 'identification/arrondissement',
    zc     : 'identification/n_zc',
  };
  const key = KEY_MAP[level];
  const labelFn = (v) => {
    if (level === 'region') return REGION_NAMES[v] || `Région ${v}`;
    if (level === 'dept')   return DEPT_NAMES[v]   || `Dép. ${v}`;
    if (level === 'arr') {
      if (ARR_NAMES[v]) return ARR_NAMES[v];
      const d = DEPT_NAMES[v?.slice(0,4)];
      return d ? `${d.split(' (')[0]} – Arr.${parseInt(v?.slice(4),10)||v?.slice(4)}` : v;
    }
    return `ZC ${v}`;
  };

  const groups = {};
  deduplicatedFiltered().forEach(d => {
    const k = d[key] || '—';
    if (!groups[k]) groups[k] = { assignees:0, visitees:0, achevees:0, presents:0, nonPayes:0, fiches:0 };
    groups[k].assignees += toInt(d['auto_zd_apres_maj'] || d['identification/nb_zd_assignees_zc']);
    groups[k].visitees  += toInt(d['auto_nb_zd_visitees']);
    groups[k].achevees  += toInt(d['totaux_zc/tot_cumul/cumul_zd_achevees'] || d['auto_zd_achevees']);
    groups[k].presents  += toInt(d['auto_presents']);
    groups[k].nonPayes  += toInt(d['auto_non_payes']);
    groups[k].fiches++;
  });

  const rows = Object.entries(groups)
    .sort((a, b) => b[1].assignees - a[1].assignees);

  if (!rows.length) {
    tbody.innerHTML = '<div class="p-3 text-muted small text-center">Aucune donnée pour cette sélection.</div>';
    return;
  }

  const pct = (a, b) => b > 0 ? (a / b * 100).toFixed(1) : '—';
  const barHtml = (val, total, color) => {
    const p = total > 0 ? Math.min(100, Math.round(val / total * 100)) : 0;
    return `<div style="display:flex;align-items:center;gap:4px;min-width:100px">
      <div style="flex:1;height:6px;background:#e2e8f0;border-radius:3px;overflow:hidden">
        <div style="width:${p}%;height:100%;background:${color};border-radius:3px"></div>
      </div>
      <span style="font-size:.7rem;color:${color};font-weight:700;min-width:32px">${p}%</span>
    </div>`;
  };

  let html = `<div class="table-responsive">
  <table class="table table-sm table-hover mb-0" style="font-size:.8rem">
    <thead class="table-dark">
      <tr>
        <th>${level === 'region' ? 'Région' : level === 'dept' ? 'Département' : level === 'arr' ? 'Arrondissement' : 'Zone de Contrôle'}</th>
        <th class="text-end">ZD assignées</th>
        <th>ZD visitées</th>
        <th>ZD achevées</th>
        <th class="text-end">Agents présents</th>
        <th class="text-end">Non payés</th>
        <th class="text-end">Fiches</th>
      </tr>
    </thead><tbody>`;

  rows.forEach(([k, v]) => {
    const npClass = v.nonPayes > 0 ? 'color:#dc2626;font-weight:700' : 'color:#16a34a';
    html += `<tr>
      <td><strong>${labelFn(k)}</strong></td>
      <td class="text-end fw-semibold">${v.assignees.toLocaleString('fr-FR')}</td>
      <td>${barHtml(v.visitees, v.assignees, '#0891b2')} <small class="text-muted">${v.visitees}</small></td>
      <td>${barHtml(v.achevees, v.assignees, '#16a34a')} <small class="text-muted">${v.achevees}</small></td>
      <td class="text-end">${v.presents.toLocaleString('fr-FR')}</td>
      <td class="text-end" style="${npClass}">${v.nonPayes > 0 ? v.nonPayes.toLocaleString('fr-FR') : '—'}</td>
      <td class="text-end text-muted">${v.fiches}</td>
    </tr>`;
  });

  // Ligne totaux
  const tot = rows.reduce((acc, [,v]) => {
    acc.assignees += v.assignees; acc.visitees += v.visitees; acc.achevees += v.achevees;
    acc.presents  += v.presents;  acc.nonPayes += v.nonPayes;
    return acc;
  }, { assignees:0, visitees:0, achevees:0, presents:0, nonPayes:0 });
  html += `<tr class="table-secondary fw-bold">
    <td>TOTAL</td>
    <td class="text-end">${tot.assignees.toLocaleString('fr-FR')}</td>
    <td>${barHtml(tot.visitees, tot.assignees, '#0891b2')} <small>${tot.visitees}</small></td>
    <td>${barHtml(tot.achevees, tot.assignees, '#16a34a')} <small>${tot.achevees}</small></td>
    <td class="text-end">${tot.presents.toLocaleString('fr-FR')}</td>
    <td class="text-end" style="color:${tot.nonPayes > 0 ? '#dc2626' : '#16a34a'}">${tot.nonPayes > 0 ? tot.nonPayes.toLocaleString('fr-FR') : '—'}</td>
    <td class="text-end text-muted">${rows.length} entités</td>
  </tr>`;

  html += '</tbody></table></div>';
  tbody.innerHTML = html;
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
    'Avancement ZD':  auto.filter(f => f.includes('etat_avancement') || f.includes('/etat/')),
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
  const mapData    = filtered();
  const uniqueVals = field ? [...new Set(mapData.map(d => d[field]).filter(Boolean))] : [];
  const colorMap   = {};
  uniqueVals.forEach((v, i) => { colorMap[v] = COLORS[i % COLORS.length]; });

  const textFields = detectTextFields(3);
  let count = 0;

  mapData.forEach(item => {
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
// Colonnes fixes : affiche les noms réels des entités admin, évite [object Object]
const TABLE_COLS = [
  { key: 'identification/date_saisie',            label: 'Date terrain' },
  { key: '_submission_time',                       label: 'Date soumission',
    fmt: v => v ? new Date(v).toLocaleDateString('fr-FR') : '—' },
  { key: 'identification/controleur',             label: 'Contrôleur' },
  { key: 'identification/superviseur',            label: 'Superviseur' },
  { key: 'identification/region',                 label: 'Région',
    fmt: v => v ? (REGION_NAMES[v] || `Région ${v}`) : '—' },
  { key: 'identification/departement',            label: 'Département',
    fmt: v => v ? (DEPT_NAMES[v] || v) : '—' },
  { key: 'identification/arrondissement',         label: 'Arrondissement',
    fmt: v => {
      if (!v) return '—';
      if (ARR_NAMES[v]) return ARR_NAMES[v];
      const dept = DEPT_NAMES[v.slice(0,4)];
      return dept ? `${dept.split(' (')[0]} – Arr.${parseInt(v.slice(4),10)||v.slice(4)}` : v;
    }},
  { key: 'identification/n_zc',                   label: 'ZC' },
  { key: 'identification/n_zs',                   label: 'ZS' },
  { key: 'auto_zd_apres_maj',                     label: 'ZD assignées' },
  { key: 'auto_nb_zd_visitees',                   label: 'ZD visitées' },
  { key: 'totaux_zc/tot_cumul/cumul_zd_achevees', label: 'ZD achevées cumul' },
  { key: 'auto_zd_achevees',                      label: 'ZD ach. ce jour' },
  { key: 'auto_presents',                         label: 'Agents présents' },
  { key: 'auto_absents',                          label: 'Agents absents' },
  { key: 'auto_non_payes',                        label: 'Non payés' },
  { key: 'auto_desist',                           label: 'Désistements' },
  { key: 'auto_reserv',                           label: 'Réservistes' },
  { key: 'auto_menages',                          label: 'Ménages' },
  { key: 'bilan/appreciation_globale',            label: 'Appréciation',
    fmt: v => VALUE_LABELS[v] || v || '—' },
];

function renderTable() {
  if (dataTableRef) {
    dataTableRef.destroy();
    dataTableRef = null;
    byId('tableHead').innerHTML = '';
    byId('tableBody').innerHTML = '';
  }
  const data = filtered();
  if (!data.length) {
    byId('tableInfo').textContent = '0 soumission';
    return;
  }

  // En-têtes
  const trH = document.createElement('tr');
  TABLE_COLS.forEach(c => {
    const th = document.createElement('th');
    th.textContent = c.label;
    th.title = c.key;
    trH.appendChild(th);
  });
  byId('tableHead').appendChild(trH);

  // Lignes
  const frag = document.createDocumentFragment();
  data.forEach(item => {
    const tr = document.createElement('tr');
    TABLE_COLS.forEach(col => {
      const td = document.createElement('td');
      let val = item[col.key];
      // Appliquer le formateur si défini
      if (col.fmt) {
        td.textContent = col.fmt(val) ?? '—';
      } else {
        if (Array.isArray(val))    val = `[${val.length} entrées]`;
        else if (typeof val === 'object' && val !== null) val = JSON.stringify(val).slice(0, 60);
        td.textContent = (val !== null && val !== undefined && val !== '') ? val : '—';
      }
      tr.appendChild(td);
    });
    frag.appendChild(tr);
  });
  byId('tableBody').appendChild(frag);

  byId('tableInfo').textContent =
    `${data.length.toLocaleString('fr-FR')} soumission${data.length > 1 ? 's' : ''} · ${TABLE_COLS.length} colonnes`;

  dataTableRef = $('#dataTable').DataTable({
    pageLength: 25,
    autoWidth: false,
    order: [[0, 'desc']],
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
  // Champs de niveau racine
  const topLevel = Object.keys(allData[0])
    .filter(k => {
      if (k.startsWith('_') || k.includes('/uuid') || k.includes('instanceID')) return false;
      if (k === 'suivi_zd') return false; // tableau imbriqué, traité séparément
      const vals = new Set(allData.slice(0, 200).map(d => d[k]).filter(v => v != null && v !== ''));
      return vals.size >= 2 && vals.size <= 40;
    });
  // Champs de suivi_zd (groupe répété) — navigue dans les lignes
  const zdFields = new Set();
  allData.slice(0, 50).forEach(d => {
    (d.suivi_zd || []).forEach(zd => {
      Object.keys(zd).forEach(k => {
        if (k.startsWith('_') || k.startsWith('suivi_zd/_c_')) return;
        const vals = new Set();
        allData.slice(0, 100).forEach(d2 =>
          (d2.suivi_zd || []).forEach(zd2 => {
            const v = zd2[k]; if (v != null && v !== '') vals.add(String(v));
          })
        );
        if (vals.size >= 2 && vals.size <= 20) zdFields.add(k);
      });
    });
  });
  return [...new Set([...topLevel, ...zdFields])].slice(0, max);
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
  const addVal = raw => {
    if (raw == null || raw === '') return;
    const vals = (typeof raw === 'string' && raw.includes(' ') && !raw.match(/\d{4}-\d{2}/))
      ? raw.split(' ') : [String(raw)];
    vals.forEach(v => { counts[v] = (counts[v] || 0) + 1; });
  };
  filtered().forEach(d => {
    // Champs dans le groupe répété suivi_zd : naviguer dans chaque ligne
    // Supporte les deux versions (etat/ et etat_avancement/)
    if (field.startsWith('suivi_zd/')) {
      const altField = field.replace('suivi_zd/etat_avancement/', 'suivi_zd/etat/');
      (d.suivi_zd || []).forEach(zd => {
        const raw = zd[field] ?? (altField !== field ? zd[altField] : undefined);
        addVal(raw);
      });
      return;
    }
    addVal(d[field]);
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
