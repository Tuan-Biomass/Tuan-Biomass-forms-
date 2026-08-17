
// ═══════════════════════════════════════
// CONFIG & STORAGE KEYS
// ═══════════════════════════════════════
const KEYS = {
  signoffs:       'tb_swms_signoffs_v2',
  pretasks:       'tb_swms_pretasks_v2',
  workers:        'tb_swms_workers_v2',
  pretaskWorkers: 'tb_swms_ptworkers_v1',
  config:         'tb_swms_config_v2',
  swmslib:        'tb_swms_library_v2',
};

// ═══════════════════════════════════════
// SWMS LIBRARY — from spreadsheet
// ═══════════════════════════════════════
// ─── SWMS LIBRARY — sourced from SWMS_Master_Register.xlsx ───────────────────
// PDF links — all hosted on GitHub Pages (tuan-biomass.github.io/Tuan-Biomass-forms-/)
// Every SWMS PDF uploaded to GitHub is listed here.
// For new SWMS not yet on GitHub, pdfUrl() falls back to the pdfBase setting.
const SWMS_PDF_LINKS = {
  'SWMS-001':'https://tuan-biomass.github.io/Tuan-Biomass-forms-/SWMS_001.pdf',
  'SWMS-002':'https://tuan-biomass.github.io/Tuan-Biomass-forms-/SWMS_002.pdf',
  'SWMS-003':'https://tuan-biomass.github.io/Tuan-Biomass-forms-/SWMS_003.pdf',
  'SWMS-004':'https://tuan-biomass.github.io/Tuan-Biomass-forms-/SWMS_004.pdf',
  'SWMS-005':'https://tuan-biomass.github.io/Tuan-Biomass-forms-/SWMS_005.pdf',
  'SWMS-006':'https://tuan-biomass.github.io/Tuan-Biomass-forms-/SWMS_006.pdf',
  'SWMS-007':'https://tuan-biomass.github.io/Tuan-Biomass-forms-/SWMS_007.pdf',
  'SWMS-008':'https://tuan-biomass.github.io/Tuan-Biomass-forms-/SWMS_008.pdf',
  'SWMS-009':'https://tuan-biomass.github.io/Tuan-Biomass-forms-/SWMS_009.pdf',
  'SWMS-011':'https://tuan-biomass.github.io/Tuan-Biomass-forms-/SWMS_011.pdf',
  'SWMS-012':'https://tuan-biomass.github.io/Tuan-Biomass-forms-/SWMS_012.pdf',
  'SWMS-013':'https://tuan-biomass.github.io/Tuan-Biomass-forms-/SWMS_013.pdf',
  'SWMS-014':'https://tuan-biomass.github.io/Tuan-Biomass-forms-/SWMS_014.pdf',
  'SWMS-015':'https://tuan-biomass.github.io/Tuan-Biomass-forms-/SWMS_015.pdf',
  'SWMS-016':'https://tuan-biomass.github.io/Tuan-Biomass-forms-/SWMS_016.pdf',
  'SWMS-017':'https://tuan-biomass.github.io/Tuan-Biomass-forms-/SWMS_017.pdf',
  'SWMS-018':'https://tuan-biomass.github.io/Tuan-Biomass-forms-/SWMS_018.pdf',
  'SWMS-019':'https://tuan-biomass.github.io/Tuan-Biomass-forms-/SWMS_019.pdf',
  'SWMS-020':'https://tuan-biomass.github.io/Tuan-Biomass-forms-/SWMS_020.pdf',
  'SWMS-021':'https://tuan-biomass.github.io/Tuan-Biomass-forms-/SWMS_021.pdf',
  'SWMS-022':'https://tuan-biomass.github.io/Tuan-Biomass-forms-/SWMS_022.pdf',
  'SWMS-023':'https://tuan-biomass.github.io/Tuan-Biomass-forms-/SWMS_023.pdf',
  'SWMS-024':'https://tuan-biomass.github.io/Tuan-Biomass-forms-/SWMS_024.pdf',
  'SWMS-025':'https://tuan-biomass.github.io/Tuan-Biomass-forms-/SWMS_025.pdf',
  'SWMS-026':'https://tuan-biomass.github.io/Tuan-Biomass-forms-/SWMS_026.pdf',
  'SWMS-027':'https://tuan-biomass.github.io/Tuan-Biomass-forms-/SWMS_027.pdf',
  'SWMS-028':'https://tuan-biomass.github.io/Tuan-Biomass-forms-/SWMS_028.pdf',
};

const SWMS_LIB_DEFAULT = [
  {id:'SWMS-001',title:'Baghouse and Ducting Installation',version:1,type:'Non-Routine Task SWMS',authDate:'2025-01-06',reviewDate:null,active:false,linkedCore:[]},
  {id:'SWMS-002',title:'Burner Clean',version:1,type:'Routine Task SWMS',authDate:'2026-04-07',reviewDate:'2027-04-07',active:true,linkedCore:['SWMS-024','SWMS-026']},
  {id:'SWMS-003',title:'Dust Blower Bag Change',version:1,type:'Routine Task SWMS',authDate:'2025-12-15',reviewDate:'2026-12-15',active:true,linkedCore:['SWMS-024','SWMS-025','SWMS-026']},
  {id:'SWMS-004',title:'Dryer Stack Clean',version:1,type:'Non-Routine Task SWMS',authDate:'2025-05-12',reviewDate:null,active:false,linkedCore:[]},
  {id:'SWMS-005',title:'Hot Work',version:1,type:'Core SWMS',authDate:'2026-05-15',reviewDate:'2027-05-15',active:true,linkedCore:[]},
  {id:'SWMS-006',title:'ID Fan',version:1,type:'Routine Task SWMS',authDate:'2026-06-26',reviewDate:'2027-06-26',active:true,linkedCore:['SWMS-024','SWMS-026']},
  {id:'SWMS-007',title:'Outlet Pipe',version:2,type:'Routine Task SWMS',authDate:'2026-06-24',reviewDate:'2027-06-24',active:true,linkedCore:['SWMS-024','SWMS-026']},
  {id:'SWMS-008',title:'Roof Clean',version:1,type:'Routine Task SWMS',authDate:'2025-12-16',reviewDate:'2026-12-16',active:true,linkedCore:['SWMS-025']},
  {id:'SWMS-009',title:'Shavings Bucket Elevator',version:1,type:'Non-Routine Task SWMS',authDate:'2024-11-26',reviewDate:null,active:false,linkedCore:[]},
  {id:'SWMS-011',title:'Shredder Air Assist',version:1,type:'Non-Routine Task SWMS',authDate:'2024-11-26',reviewDate:null,active:false,linkedCore:[]},
  {id:'SWMS-012',title:'Replace Filters in New York Blower Baghouse',version:1,type:'Routine Task SWMS',authDate:'2025-12-16',reviewDate:'2026-12-16',active:true,linkedCore:['SWMS-024','SWMS-025','SWMS-026']},
  {id:'SWMS-013',title:'Tail End Breakdown',version:1,type:'Routine Task SWMS',authDate:'2026-05-03',reviewDate:'2027-05-03',active:true,linkedCore:['SWMS-026','SWMS-028']},
  {id:'SWMS-014',title:'Truck Silos Cleaning',version:1,type:'Routine Task SWMS',authDate:'2025-12-16',reviewDate:'2026-12-16',active:true,linkedCore:['SWMS-025']},
  {id:'SWMS-015',title:'Grecon Filters Outlet Pipe',version:1,type:'Routine Task SWMS',authDate:'2025-12-16',reviewDate:'2026-12-16',active:true,linkedCore:['SWMS-025']},
  {id:'SWMS-016',title:'Replace Drag Chain Silo Top (Crane Lift)',version:1,type:'Non-Routine Task SWMS',authDate:'2026-06-15',reviewDate:null,active:false,linkedCore:[]},
  {id:'SWMS-017',title:'3P Discharge',version:1,type:'Non-Routine Task SWMS',authDate:'2025-12-16',reviewDate:null,active:false,linkedCore:[]},
  {id:'SWMS-018',title:'Airlock Repair',version:1,type:'Non-Routine Task SWMS',authDate:'2025-12-16',reviewDate:null,active:false,linkedCore:[]},
  {id:'SWMS-019',title:'Burner Fan Shroud',version:1,type:'Non-Routine Task SWMS',authDate:'2025-06-18',reviewDate:null,active:false,linkedCore:[]},
  {id:'SWMS-020',title:'Hot Pellet Conveyor',version:1,type:'Non-Routine Task SWMS',authDate:'2025-12-16',reviewDate:null,active:false,linkedCore:[]},
  {id:'SWMS-021',title:'Incline Screw',version:1,type:'Non-Routine Task SWMS',authDate:'2026-01-10',reviewDate:null,active:false,linkedCore:[]},
  {id:'SWMS-022',title:'Conveyor Belt Maintenance',version:1,type:'Routine Task SWMS',authDate:'2026-03-01',reviewDate:'2027-03-01',active:true,linkedCore:['SWMS-026','SWMS-028']},
  {id:'SWMS-023',title:'Confined Space Weld Repair Dryer Drum',version:1,type:'Non-Routine Task SWMS',authDate:'2026-03-02',reviewDate:null,active:false,linkedCore:[]},
  {id:'SWMS-024',title:'Confined Space Entry',version:1,type:'Core SWMS',authDate:'2026-05-01',reviewDate:'2027-05-01',active:true,linkedCore:[]},
  {id:'SWMS-025',title:'Working at Heights',version:1,type:'Core SWMS',authDate:'2026-06-11',reviewDate:'2027-06-11',active:true,linkedCore:[]},
  {id:'SWMS-026',title:'Isolation (LOTO)',version:1,type:'Core SWMS',authDate:'2026-06-24',reviewDate:'2027-06-24',active:true,linkedCore:[]},
  {id:'SWMS-027',title:'Working Around Crane and Lifting Operations',version:1,type:'Core SWMS',authDate:'2026-06-24',reviewDate:'2027-06-24',active:true,linkedCore:[]},
  {id:'SWMS-028',title:'Working on Energised or Unguarded Machinery',version:1,type:'Core SWMS',authDate:'2026-06-25',reviewDate:'2027-06-25',active:true,linkedCore:[]},
];

// Live library — localStorage overrides the hardcoded default when present
function getSwmsLib(){
  try{
    const stored = JSON.parse(localStorage.getItem(KEYS.swmslib));
    return (stored && stored.length) ? stored : SWMS_LIB_DEFAULT;
  }catch(e){ return SWMS_LIB_DEFAULT; }
}
// Single reference used everywhere — refreshed after any edit
let SWMS_LIB = getSwmsLib();
let CORE_SWMS = SWMS_LIB.filter(s=>s.type==='Core SWMS'&&s.active).map(s=>s.id);

// ═══════════════════════════════════════
// DATA LAYER
// ═══════════════════════════════════════
function load(key){ try{ return JSON.parse(localStorage.getItem(key))||[] }catch(e){ return [] } }
function loadObj(key){ try{ return JSON.parse(localStorage.getItem(key))||{} }catch(e){ return {} } }
function save(key,val){ localStorage.setItem(key, JSON.stringify(val)) }
function genId(){ return Date.now().toString(36)+Math.random().toString(36).slice(2,6) }

let signoffs = load(KEYS.signoffs);
let pretasks = load(KEYS.pretasks);
let workers  = load(KEYS.workers);
let cfg = loadObj(KEYS.config);

// Bake in defaults if config not yet saved on this device
if(!cfg.settingsCode){
  cfg = {
    getUrl:      'https://defaultde8813d6d4894c538dbbbb7918b75d.6c.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/64030228e39443c082c5cc350e2b6c79/triggers/manual/paths/invoke?api-version=1',
    signUrl:     'https://defaultde8813d6d4894c538dbbbb7918b75d.6c.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/48296a499df54b43966967c9e8dc98a7/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=dvYXFQgRk3HzJDzCNe2I3MAlYq03p-YThOQVpwwSHpY',
    ptUrl:       'https://defaultde8813d6d4894c538dbbbb7918b75d.6c.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/a55450ef89b34008b3efe5d74c5eb7d0/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=7_LmLcddRHFfqVmyXxUYlQ3zdGJ91tbv8bxE0MVmsfo',
    ptGetUrl:    'https://defaultde8813d6d4894c538dbbbb7918b75d.6c.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/41e1dedf7a094094b0ae235c6492631a/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=K0ue8teWVJrVWQLh1RisAMZ4yu7fOrI6A6NGsupnAEE',
    pdfBase:     'https://tuan-biomass.github.io/Tuan-Biomass-forms-/',
    settingsCode: 'tuan2026',
  };
  save(KEYS.config, cfg);
}

// Sign-off worker list — employees who have used the new system
if(!workers.length){
  workers = ['Amber Seehars','Anthony South','Ben Alexander','Chris Foster','David Knight','Dylan Hall','Glenn Croft','Kendal Brown','Kyle Belton','Lincoln Knight','Luke Seno','Rob Presser','Tate Petersen','Tim Ronher'];
  save(KEYS.workers, workers);
}

// Pre-task crew list — all site employees
let ptWorkers = load(KEYS.pretaskWorkers);
if(!ptWorkers.length){
  ptWorkers = ['Anthony South','Chris Foster','David Knight','Kendal Brown','Kyle Belton'];
  save(KEYS.pretaskWorkers, ptWorkers);
}

// Seed demo sign-offs
if(!signoffs.length){
  signoffs = [
    {id:genId(),swmsId:'SWMS-024',swmsTitle:'Confined Space Entry',swmsVersion:1,worker:'Chris Foster',dateSigned:'2026-06-24',sig:'demo',ts:'2026-06-24T08:00:00',type:'signoff'},
  ];
  save(KEYS.signoffs, signoffs);
}

// ═══════════════════════════════════════
// NAVIGATION
// ═══════════════════════════════════════
function showPage(name){
  ['register','signoff','pretask','dashboard','audit','taskreg','settings'].forEach(p=>{
    document.getElementById('page-'+p).classList.add('hidden');
    const nb = document.getElementById('nav-'+p);
    if(nb) nb.classList.remove('active');
  });
  document.getElementById('page-'+name).classList.remove('hidden');
  const nb = document.getElementById('nav-'+name);
  if(nb) nb.classList.add('active');
  if(name==='register') renderRegister();
  if(name==='dashboard') renderDashboard();
  if(name==='audit') renderSignOffRegister();
  if(name==='taskreg') renderTaskRegister();
  if(name==='settings') renderSettings();
  if(name==='signoff'||name==='pretask') refreshDropdowns();
  window.scrollTo(0,0);
}

// ═══════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════
function fmtDate(d){ if(!d) return '—'; return new Date(d).toLocaleDateString('en-AU',{day:'2-digit',month:'short',year:'numeric'}); }
function isOverdue(d){ return d && new Date(d)<new Date(); }
function esc(s){ return String(s||'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m])); }

function typeBadge(t){
  if(t.includes('Core')) return '<span class="badge badge-core">Core</span>';
  if(t.includes('Routine')&&!t.includes('Non')) return '<span class="badge badge-routine">Routine</span>';
  return '<span class="badge badge-nonroutine">Non-Routine</span>';
}

function workerSignedCurrent(worker, swmsId){
  const s = SWMS_LIB.find(x=>x.id===swmsId);
  if(!s) return false;
  return signoffs.some(r=>r.swmsId===swmsId && r.swmsVersion===s.version && r.worker===worker);
}

function workerSignedAllRequired(worker, swmsId){
  // Must have signed the selected SWMS + all active Core SWMS
  const required = [swmsId, ...CORE_SWMS.filter(c=>c!==swmsId)];
  return required.every(id => workerSignedCurrent(worker, id));
}

function crewAllSigned(crew, swmsId){
  return crew.every(w => workerSignedAllRequired(w, swmsId));
}

function pdfUrl(swmsId){
  // Primary: GitHub Pages — all PDFs live at tuan-biomass.github.io/Tuan-Biomass-forms-/
  if(SWMS_PDF_LINKS[swmsId]) return SWMS_PDF_LINKS[swmsId];
  // Fallback: pdfBase setting for new SWMS not yet in the baked-in list
  const freshCfg = loadObj(KEYS.config);
  const base = freshCfg.pdfBase || '';
  if(!base) return null;
  const num = swmsId.replace('SWMS-','').padStart(3,'0');
  return base.replace(/\/$/, '') + '/SWMS_' + num + '.pdf';
}

function toast(msg, color){
  const el = document.createElement('div');
  el.className = 'toast';
  el.textContent = msg;
  if(color) el.style.borderLeftColor = color;
  document.getElementById('toast-wrap').appendChild(el);
  requestAnimationFrame(()=>el.classList.add('show'));
  setTimeout(()=>{ el.classList.remove('show'); setTimeout(()=>el.remove(),400); }, 3000);
}

// ═══════════════════════════════════════
// REGISTER PAGE
// ═══════════════════════════════════════
let modalSwmsId = null;

function renderRegister(){
  const search  = (document.getElementById('searchInput').value||'').toLowerCase();
  const typeF   = document.getElementById('typeFilter').value;
  const statusF = document.getElementById('statusFilter').value;
  const filtered = SWMS_LIB.filter(s=>{
    const ms = !search || s.title.toLowerCase().includes(search) || s.id.toLowerCase().includes(search);
    const mt = !typeF || s.type===typeF;
    const mst= !statusF || (statusF==='active'?s.active:!s.active);
    return ms&&mt&&mst;
  });
  const container = document.getElementById('swmsCards');
  if(!filtered.length){ container.innerHTML='<div class="empty-state" style="border:1px dashed var(--border);border-radius:12px;">No SWMS found.</div>'; return; }
  container.innerHTML = filtered.map(s=>{
    const od = isOverdue(s.reviewDate);
    const border = !s.active?'':'border-color:'+(od?'var(--danger)':'var(--border)');
    return `<div class="swms-card" style="${border}" data-action="open-modal" data-id="${s.id}">
      <div class="swms-card-header">
        <div>
          <div class="swms-id">${s.id}</div>
          <div class="swms-title">${esc(s.title)}</div>
          <div class="swms-meta">v${s.version} &middot; Authorised ${fmtDate(s.authDate)}</div>
        </div>
        <div>${s.active?'<span class="badge badge-green">Active</span>':'<span class="badge badge-grey">Not Active</span>'}</div>
      </div>
      <div class="tag-row">
        ${typeBadge(s.type)}
        ${s.reviewDate?`<span class="badge ${od?'badge-red':'badge-blue'}">Review: ${fmtDate(s.reviewDate)}</span>`:'<span class="badge badge-grey">No Review Date</span>'}
        ${SWMS_HAZARD_LINKS[s.id]?`<a data-action="open-hazard-modal" data-id="${s.id}" data-title="${esc(s.title)}" class="badge badge-orange" style="cursor:pointer;background:#FEF3C7;color:#92400E;border:1px solid #FCD34D;">View Hazards</a>`:''}
        ${pdfUrl(s.id)?`<a data-action="open-pdf-viewer" data-pdf="${pdfUrl(s.id)}" data-title="${esc(s.title)}" data-id="${s.id}" class="badge badge-green" style="cursor:pointer;">View PDF</a>`:''}
      </div>
    </div>`;
  }).join('');
}

function openModal(id){
  modalSwmsId = id;
  const s = SWMS_LIB.find(x=>x.id===id);
  document.getElementById('mId').textContent = s.id;
  document.getElementById('mTitle').textContent = s.title;
  document.getElementById('mSub').textContent = `${s.type} \u00b7 v${s.version} \u00b7 ${s.active?'Active':'Not Active'}`;
  const sigs = signoffs.filter(r=>r.swmsId===id&&r.swmsVersion===s.version);
  const revs = []; // revision history entries could go here
  const pdf = pdfUrl(id);
  document.getElementById('mBody').innerHTML = `
    <div class="form-grid" style="margin-bottom:14px;">
      <div class="card" style="margin:0;padding:14px;"><div class="section-label" style="margin-bottom:4px;">Authorised</div><div class="bold">${fmtDate(s.authDate)}</div></div>
      <div class="card" style="margin:0;padding:14px;"><div class="section-label" style="margin-bottom:4px;">Next Review</div><div class="bold ${isOverdue(s.reviewDate)?'stat-red':''}">${fmtDate(s.reviewDate)}</div></div>
    </div>
    <div class="card" style="margin:0 0 12px;padding:14px;">
      <div class="section-label" style="margin-bottom:4px;">Sign-Offs — v${s.version}</div>
      <div style="font-family:'Barlow Condensed',sans-serif;font-size:28px;font-weight:800;color:var(--green-dark);">${sigs.length} <span style="font-size:14px;font-weight:400;color:var(--muted);">workers signed</span></div>
    </div>
    ${pdf?`<button data-action="close-and-open-pdf" data-pdf="${pdf}" data-title="${esc(s.title)}" data-id="${s.id}" class="btn btn-secondary btn-full" style="margin-top:4px;">View PDF Document</button>`:'<div class="notice notice-info" style="margin-top:4px;">No PDF linked. Add the base URL in Settings once PDFs are uploaded to GitHub.</div>'}
    ${SWMS_HAZARD_LINKS[s.id]?`<button data-action="close-and-open-hazard" data-id="${s.id}" data-title="${esc(s.title)}" class="btn btn-primary btn-full" style="margin-top:8px;">View Hazard Summary</button>`:''}
  `;
  document.getElementById('swmsModal').classList.add('open');
}

function closeModal(){ document.getElementById('swmsModal').classList.remove('open'); }

// Hazard overlay modal
function openHazardModal(id, title){
  const overlay = document.getElementById('hazardModal');
  document.getElementById('hazardModalTitle').textContent = title;
  document.getElementById('hazardModalId').textContent = id;
  renderHazardReview(id, title);
  // Move hazard content into the modal
  const content = document.getElementById('hazardReviewContent').innerHTML;
  document.getElementById('hazardModalBody').innerHTML = content;
  overlay.classList.add('open');
}

function closeHazardModal(){
  document.getElementById('hazardModal').classList.remove('open');
}

function goSignFromModal(){
  const id = modalSwmsId;
  closeModal();
  showPage('signoff');
  setTimeout(()=>{
    document.getElementById('signSwmsSelect').value = id;
    onSignSwmsChange();
  },50);
}

// ═══════════════════════════════════════
// DROPDOWNS — populate from workers list
// ═══════════════════════════════════════
function refreshDropdowns(){
  const w = load(KEYS.workers);
  const opts = w.map(n=>`<option value="${esc(n)}">${esc(n)}</option>`).join('');
  const blank = '<option value="">— Select worker —</option>';
  document.getElementById('signCheckName').innerHTML = blank + opts;

  // Active SWMS selects
  const aOpts = SWMS_LIB.filter(s=>s.active).map(s=>`<option value="${s.id}">${s.id} — ${esc(s.title)} (v${s.version})</option>`).join('');
  const sBlank = '<option value="">— Choose a SWMS —</option>';
  document.getElementById('signSwmsSelect').innerHTML = sBlank + aOpts;
  document.getElementById('ptSwms').innerHTML = '<option value="">— Select SWMS —</option>' + aOpts;

  // Crew multi-select
  renderCrewList([]);
}

function renderCrewList(selected){
  const w = load(KEYS.workers);
  document.getElementById('ptCrewList').innerHTML = w.map((n,i)=>{
    const sel = selected.includes(n);
    return `<div class="multi-option ${sel?'selected':''}" id="crew-opt-${i}">
      <input type="checkbox" ${sel?'checked':''} id="crew-cb-${i}" data-name="${esc(n)}" data-action="sync-crew" data-index="${i}">
      <label for="crew-cb-${i}">${esc(n)}</label>
    </div>`;
  }).join('') || '<div style="padding:12px 14px;color:var(--muted);font-size:14px;">No workers configured. Add workers in Settings.</div>';
}


function getSelectedCrew(){
  const items = document.querySelectorAll('#ptCrewList input[type=checkbox]');
  return Array.from(items).filter(cb=>cb.checked).map(cb=>cb.getAttribute('data-name'));
}

// ═══════════════════════════════════════
// HAZARD DATA
// ═══════════════════════════════════════
// ─── HAZARD LIBRARY — sourced from SWMS_Master_Register.xlsx Hazard_Library sheet ──
// Full 22-hazard library baked in. Assignments per SWMS via SWMS_HAZARD_LINKS below.
const HAZ_LIB = {
  'HAZ-001':{risk:'E',title:'Entering a Confined Space',risks:['Heat exhaustion, engulfment, limited access/egress','Asphyxiation — low O₂ or contaminants','Explosive atmosphere, combustible dusts'],permits:['Confined Space Entry Permit','Hot Work Permit (if applicable)'],controls:['Atmospheric testing before and during entry','Continuous forced ventilation throughout task','Standby person stationed at entry point at all times','Emergency rescue plan in place before entry']},
  'HAZ-002':{risk:'E',title:'Contaminated or Flammable Atmosphere',risks:['Fire / explosion from ignition source','Asphyxiation or poisoning from contaminated atmosphere'],permits:['Confined Space Entry Permit','Hot Work Permit'],controls:['Gas test for O₂, LEL and toxic gases before entry','No ignition sources within space or entry zone','Continuous atmospheric monitoring during work','Entrant to withdraw immediately if alarm sounds']},
  'HAZ-003':{risk:'E',title:'Falling from Height ≥2m or Working on Roof',risks:['Falling worker or object — ≥2m requires SWMS'],permits:[],controls:['Fall arrest harness required for work ≥2m above ground','Anchor points inspected before use','Exclusion zone below work area']},
  'HAZ-004':{risk:'E',title:'Hot Work — Oxy Cutting, Welding, Soldering, Grinding',risks:['Fire or explosion from ignition source','Injury from hot surface or grinding wheel ejection','Fire inside Expanded Polystyrene (EPS) panels'],permits:['Hot Work Permit'],controls:['Hot Work Permit issued and briefed to all crew','Fire extinguisher within 1m of hot work at all times','Fire watch minimum 30 minutes after work ceases','All combustibles removed or shielded']},
  'HAZ-005':{risk:'E',title:'Hand Dig / Ground Penetration / Excavation',risks:['Contact with utilities — electrical, water, gas, communications','Trench collapse'],permits:['Excavation Permit'],controls:['Dial Before You Dig check completed','Hand excavation within 500mm of known services','Shoring or battering for excavations deeper than 1.5m']},
  'HAZ-006':{risk:'E',title:'Non-Routine Electrical / High Voltage / Live Work',risks:['High voltage greater than 33kV','Electrocution during live electrical work','Electrical cabinets or MCC identified as Red'],permits:[],controls:['Management approval required before commencing','Only qualified electricians to perform live work','Appropriate PPE — insulated gloves, arc flash rating','LOTO isolation confirmed before any access']},
  'HAZ-007':{risk:'E',title:'Non-Routine Mechanical Lifting / Lowering / Pulling',risks:['High mechanical force — damage or injury','High risk work licence required for cranes, mobile plant, scaffold, dogging'],permits:[],controls:['Lift plan completed for all crane lifts','Certified rigger and dogman on site','Exclusion zone established under load','SWL of all lifting equipment verified']},
  'HAZ-008':{risk:'E',title:'High Risk Power Tools — High Speed / Pressure / Weight',risks:['Injury from high risk powered or hand tools','Electrocution, burn or electric shock','Manual task injury from repetition or poor posture'],permits:[],controls:['Pre-use inspection of all tools','Appropriate guarding in place','Correct PPE — gloves, eye protection, hearing protection','Take 5 completed before task']},
  'HAZ-009':{risk:'E',title:'Demolish / Alter Load Bearing Structures / Use Explosives',risks:['Being struck or crushed by structural collapse','Exposure to hazardous chemicals, asbestos, lead'],permits:[],controls:['Demolition licence required','Asbestos removal licence if ACM identified','Safe Work Plan required before commencement','Engineer sign-off for structural alterations']},
  'HAZ-010':{risk:'V',title:'Work Near Moving / Rotating Machinery',risks:['Serious bodily injury from contact with moving parts or materials','Machinery starting unexpectedly — electrocution, burn or electric shock'],permits:[],controls:['LOTO isolation confirmed and tested before approach','Guards reinstated before restarting','No loose clothing or jewellery near rotating parts']},
  'HAZ-011':{risk:'V',title:'Potential / Stored Energy — Electrical, Hydraulic, Pneumatic, Kinetic',risks:['Machinery entanglement or injury from unexpected energy release'],permits:[],controls:['Full LOTO process — isolate, lock, tag, test','Stored energy (springs, pressure, gravity) identified and released','Isolation register updated']},
  'HAZ-012':{risk:'V',title:'Work on Pressurised / Closed Circuit Systems',risks:['Fracturing mains or piping from contact — spills, leaks, emissions','Contact with extreme temperature fluids'],permits:[],controls:['System fully depressurised and vented before opening','Pressure gauge confirmed at zero','PPE — chemical resistant gloves, face shield for hot systems']},
  'HAZ-013':{risk:'V',title:'Extreme Weather Conditions',risks:['Electrocution from lightning or power tools in wet conditions','Heat stroke, heat exhaustion, fatigue, frost bite, hypothermia','Slip / trip / fall hazards'],permits:[],controls:['Work suspended during electrical storms','Heat illness prevention plan in place for hot weather','Additional hydration and rest breaks as required','Appropriate wet weather or cold weather PPE']},
  'HAZ-014':{risk:'H',title:'Noise and Vibration',risks:['Hearing loss from excessive noise exposure','Hand-arm or whole-body vibration injury'],permits:[],controls:['Hearing protection required in designated areas','Limit exposure time for high vibration tools','Regular tool maintenance to minimise vibration']},
  'HAZ-015':{risk:'H',title:'Manual Handling — Lifting, Carrying, Pushing, Pulling',risks:['Musculoskeletal injury from manual handling','Crush injury from dropped loads'],permits:[],controls:['Assess load before lifting — use mechanical aids where possible','Team lift for loads over 16kg','Maintain neutral spine','Clear path before moving loads']},
  'HAZ-016':{risk:'H',title:'Dust Exposure — Wood Dust, Biomass, Silica',risks:['Respiratory disease from inhalation of fine dust particles','Fire or explosion from combustible dust accumulation'],permits:[],controls:['P2 respirator required in dusty areas','Wet suppression or local exhaust ventilation where practicable','Housekeeping — regular dust removal','No ignition sources in dusty environments']},
  'HAZ-017':{risk:'H',title:'Working in Confined or Restricted Spaces — Non-Classified',risks:['Ergonomic injury from awkward posture','Difficulty evacuating in emergency'],permits:[],controls:['Plan task to minimise time in restricted position','Rest breaks for sustained awkward work','Ensure emergency egress route is clear at all times']},
  'HAZ-018':{risk:'H',title:'Fire and Combustion Risk — Biomass and Pellet Material',risks:['Spontaneous combustion of biomass material','Rapid fire spread in pellet storage areas'],permits:[],controls:['No ignition sources near biomass storage','Thermal monitoring of storage areas','Fire suppression system operational','Emergency evacuation plan briefed']},
  'HAZ-019':{risk:'M',title:'Slips, Trips and Falls — Same Level',risks:['Injury from slipping on wet, dusty or uneven surfaces','Tripping on hoses, cables or debris'],permits:[],controls:['Housekeeping maintained throughout task','Wet areas signed and barricaded','Cables and hoses routed to avoid walkways']},
  'HAZ-020':{risk:'M',title:'Working at Heights — Below 2m',risks:['Injury from falling less than 2m','Falling objects striking workers below'],permits:[],controls:['Step ladder or platform used instead of improvised steps','Barricade below work area','Tools secured or tethered']},
  'HAZ-021':{risk:'M',title:'Chemical Handling — Lubricants, Fuels, Cleaning Agents',risks:['Skin or eye irritation from chemical contact','Environmental contamination from spills'],permits:[],controls:['Refer to SDS before use','PPE as per SDS — gloves, eye protection','Spill kit available','Waste disposed of correctly']},
  'HAZ-022':{risk:'M',title:'Working Alone or in Isolation',risks:['No assistance available in emergency','Delayed response to injury or illness'],permits:[],controls:['Check-in procedure established','Supervisor contact confirmed','Lone worker duration limited']},
};

// Hazard assignments per SWMS — sourced from SWMS_Hazard_Links sheet
const SWMS_HAZARD_LINKS = {
  'SWMS-001':['HAZ-001','HAZ-002','HAZ-003','HAZ-004','HAZ-007','HAZ-008','HAZ-009','HAZ-013','HAZ-014','HAZ-015','HAZ-017','HAZ-018','HAZ-019','HAZ-020'],
  'SWMS-002':['HAZ-001','HAZ-003','HAZ-013','HAZ-014','HAZ-015','HAZ-016','HAZ-017','HAZ-019'],
  'SWMS-003':['HAZ-001','HAZ-002','HAZ-003','HAZ-007','HAZ-011','HAZ-013','HAZ-014','HAZ-015','HAZ-016','HAZ-017','HAZ-018','HAZ-019','HAZ-020'],
  'SWMS-007':['HAZ-001','HAZ-002','HAZ-010','HAZ-013','HAZ-014','HAZ-015','HAZ-016','HAZ-017','HAZ-018','HAZ-019','HAZ-022'],
  'SWMS-008':['HAZ-003','HAZ-013','HAZ-014','HAZ-015','HAZ-016','HAZ-018','HAZ-019','HAZ-020'],
  'SWMS-012':['HAZ-001','HAZ-002','HAZ-003','HAZ-004','HAZ-007','HAZ-008','HAZ-009','HAZ-013','HAZ-014','HAZ-015','HAZ-017','HAZ-018','HAZ-019','HAZ-020'],
  'SWMS-013':['HAZ-003','HAZ-010','HAZ-011','HAZ-013','HAZ-014','HAZ-015','HAZ-016','HAZ-018','HAZ-019','HAZ-020','HAZ-022'],
  'SWMS-014':['HAZ-003','HAZ-006','HAZ-013','HAZ-015','HAZ-016','HAZ-019'],
  'SWMS-022':['HAZ-003','HAZ-010','HAZ-011','HAZ-013','HAZ-014','HAZ-015','HAZ-016','HAZ-018','HAZ-019','HAZ-020','HAZ-022'],
  'SWMS-024':['HAZ-001','HAZ-002','HAZ-003','HAZ-004','HAZ-007','HAZ-008','HAZ-010','HAZ-011','HAZ-012','HAZ-013','HAZ-014','HAZ-015','HAZ-016','HAZ-017','HAZ-018','HAZ-019','HAZ-020','HAZ-021','HAZ-022'],
  'SWMS-025':['HAZ-003','HAZ-004','HAZ-006','HAZ-007','HAZ-008','HAZ-009','HAZ-010','HAZ-011','HAZ-012','HAZ-013','HAZ-014','HAZ-015','HAZ-016','HAZ-017','HAZ-018','HAZ-019','HAZ-020','HAZ-021','HAZ-022'],
  'SWMS-026':['HAZ-001','HAZ-002','HAZ-003','HAZ-004','HAZ-005','HAZ-006','HAZ-007','HAZ-008','HAZ-009','HAZ-010','HAZ-011','HAZ-012','HAZ-013','HAZ-014','HAZ-015','HAZ-016','HAZ-017','HAZ-018','HAZ-019','HAZ-020','HAZ-021','HAZ-022'],
};


// ═══════════════════════════════════════
// HAZARD REVIEW RENDERER
// ═══════════════════════════════════════
function renderHazardReview(swmsId, swmsTitle){
  const hazIds = SWMS_HAZARD_LINKS[swmsId] || [];
  const container = document.getElementById('hazardReviewContent');

  if(!hazIds.length){
    container.innerHTML = `
      <div class="card">
        <div class="swms-id">${esc(swmsId)}</div>
        <div class="title" style="margin-bottom:6px;">${esc(swmsTitle)}</div>
        <div class="no-hazards">No hazard data entered for this SWMS yet.<br>Review the printed document before signing.</div>
      </div>`;
    return;
  }

  const riskLabel = {E:'Extreme',V:'Very High',H:'High',M:'Moderate',L:'Low'};
  const hazards = hazIds.map((id,i)=>({num:i+1,id,...HAZ_LIB[id]})).filter(h=>h.title);

  container.innerHTML = `
    <div class="card" style="margin-bottom:10px;">
      <div class="swms-id">${esc(swmsId)}</div>
      <div class="title" style="margin-bottom:4px;">${esc(swmsTitle)}</div>
      <div class="risk-legend">
        ${Object.entries(riskLabel).map(([k,v])=>`<div class="risk-legend-item"><div class="risk-badge risk-${k}" style="width:20px;height:20px;font-size:11px;">${k}</div>${v}</div>`).join('')}
      </div>
      <div class="section-label">Review all hazards before signing</div>
    </div>
    ${hazards.map(h=>`
      <div class="hazard-card">
        <div class="hazard-header">
          <div class="hazard-num">${h.num}.</div>
          <div class="hazard-title">${esc(h.title)}</div>
          <div class="risk-badge risk-${h.risk}" title="${riskLabel[h.risk]||h.risk}">${h.risk}</div>
        </div>
        <div class="hazard-body">
          <ul class="hazard-risks">
            ${h.risks.map(r=>`<li>${esc(r)}</li>`).join('')}
          </ul>
          ${h.permits&&h.permits.length?`<div style="margin-bottom:6px;">${h.permits.map(p=>`<span class="permit-tag">${esc(p)}</span>`).join('')}</div>`:''}
          ${h.controls&&h.controls.length?`
          <div class="hazard-controls">
            <div class="hazard-controls-title">Controls</div>
            ${h.controls.map(c=>`<div class="control-item">${esc(c)}</div>`).join('')}
          </div>`:''}
        </div>
      </div>`).join('')}`;
}
let signSwms = null;
let signWorker = null;

function onSignSwmsChange(){
  const id = document.getElementById('signSwmsSelect').value;
  const info = document.getElementById('signSwmsInfo');
  if(!id){ info.classList.add('hidden'); return; }
  signSwms = SWMS_LIB.find(x=>x.id===id);
  info.className = 'notice notice-info';
  info.innerHTML = `${esc(signSwms.title)} &mdash; v${signSwms.version} &middot; Authorised ${fmtDate(signSwms.authDate)}`;
  info.classList.remove('hidden');
}

function goStep2(){
  const id = document.getElementById('signSwmsSelect').value;
  const name = document.getElementById('signCheckName').value;
  if(!id){ toast('Select a SWMS','var(--danger)'); return; }
  if(!name){ toast('Select a worker','var(--danger)'); return; }
  signSwms = SWMS_LIB.find(x=>x.id===id);
  signWorker = name;

  const hasCurrent = workerSignedCurrent(signWorker, signSwms.id);

  const alreadyCard = document.getElementById('signAlreadySignedCard');
  const hazardCard  = document.getElementById('signHazardCard');

  if(hasCurrent){
    alreadyCard.classList.remove('hidden');
    hazardCard.classList.add('hidden');
    document.getElementById('signStatusNotice').innerHTML =
      `<div class="notice notice-success">${esc(signWorker)} has already signed ${esc(signSwms.id)} — ${esc(signSwms.title)} (v${signSwms.version}). No further action required.</div>
      <div class="actions" style="margin-top:8px;justify-content:flex-start;"><button class="btn btn-secondary" data-action="set-sign-step" data-step="1">Back</button></div>`;
  } else {
    alreadyCard.classList.add('hidden');
    hazardCard.classList.remove('hidden');

    // Version update notice
    const prevSig = signoffs.find(r=>r.swmsId===signSwms.id && r.swmsVersion<signSwms.version && r.worker===signWorker);
    const verDiv = document.getElementById('signVersionNotice');
    if(prevSig){
      verDiv.className='notice notice-warn';
      verDiv.innerHTML=`${esc(signWorker)} previously signed v${prevSig.swmsVersion} of this SWMS (${fmtDate(prevSig.dateSigned)}). Updated to v${signSwms.version} — re-sign required.`;
      verDiv.classList.remove('hidden');
    } else {
      verDiv.classList.add('hidden');
    }

    renderHazardReview(signSwms.id, signSwms.title);
  }

  setSignStep(2);
}

function goStep3(){
  setSignStep(3);
  const canvas = document.getElementById('sigCanvas1');
  if(canvas._resize) canvas._resize();
  document.getElementById('s3SwmsId').textContent = signSwms.id;
  document.getElementById('s3SwmsTitle').textContent = signSwms.title;
  document.getElementById('s3SwmsMeta').textContent = `v${signSwms.version} \u00b7 Authorised ${fmtDate(signSwms.authDate)}`;
  document.getElementById('s3VersionWarn').classList.add('hidden');
  const pdf = pdfUrl(signSwms.id);
  signPdfOpened = !pdf; // if no PDF, treat as already opened
  renderSignPdfState(pdf);
  ['chk-read','chk-follow','chk-stop'].forEach(id=>{
    const cb = document.getElementById(id);
    cb.checked = false;
    document.getElementById(id+'-item').classList.remove('checked');
  });
  clearSig('sigCanvas1','sigWrap1');
  document.getElementById('signDate').value = todayISO();
}

function renderSignPdfState(pdf){
  const pdfDiv = document.getElementById('s3PdfLink');
  const warnDiv = document.getElementById('s3PdfWarn');
  if(!pdf){
    pdfDiv.innerHTML = '<div class="notice notice-info">No PDF linked. Review a printed copy before signing.</div>';
    if(warnDiv) warnDiv.style.display='none';
    return;
  }
  pdfDiv.innerHTML = signPdfOpened
    ? `<button data-action="sign-open-pdf" data-pdf="${pdf}" data-title="${esc(signSwms.title)}" data-id="${signSwms.id}" class="btn btn-secondary btn-full">✓ PDF Opened — View Again</button>`
    : `<button data-action="sign-open-pdf" data-pdf="${pdf}" data-title="${esc(signSwms.title)}" data-id="${signSwms.id}" class="btn btn-primary btn-full">Open SWMS Document to Continue</button>`;
  if(warnDiv) warnDiv.style.display = signPdfOpened ? 'none' : 'block';
}

function signOpenPdf(url, title, id){
  openPdfViewer(url, title, id);
  signPdfOpened = true;
  renderSignPdfState(url);
}

function submitSignOff(){
  if(!signPdfOpened){ toast('Open the SWMS document before signing','var(--danger)'); return; }
  const allChecked = ['chk-read','chk-follow','chk-stop'].every(id=>document.getElementById(id).checked);
  if(!allChecked){ toast('Tick all declarations before signing','var(--danger)'); return; }
  const canvas = document.getElementById('sigCanvas1');
  if(isSigBlank(canvas)){ toast('Signature required','var(--danger)'); return; }
  const rec = {
    id:genId(), type:'signoff',
    swmsId:signSwms.id, swmsTitle:signSwms.title, swmsVersion:signSwms.version,
    worker:signWorker,
    dateSigned:document.getElementById('signDate').value,
    sig:canvas.toDataURL('image/png',0.4),
    // Compress to small JPEG for PA — keeps payload under 5KB
    sigBase64: (()=>{
      const tmp = document.createElement('canvas');
      tmp.width = 300; tmp.height = 100;
      const tctx = tmp.getContext('2d');
      tctx.fillStyle='#fff'; tctx.fillRect(0,0,300,100);
      tctx.drawImage(canvas,0,0,300,100);
      return tmp.toDataURL('image/jpeg',0.6).split(',')[1];
    })(),
    ts:new Date().toISOString(),
  };
  signoffs.push(rec);
  save(KEYS.signoffs, signoffs);
  // Reload cfg fresh in case URL was saved after page load
  cfg = loadObj(KEYS.config);
  postFlow(cfg.signUrl, {
    Signoff_ID:     rec.id,
    Timestamp:      rec.ts,
    Worker_Name:    rec.worker,
    SWMS_ID:        rec.swmsId,
    SWMS_Title:     rec.swmsTitle,
    SWMS_Version:   String(rec.swmsVersion),
    Date_Signed:    rec.dateSigned,
    Signature_PNG:  rec.sigBase64,     // raw base64 PNG — no data:image prefix — PA uses base64ToBinary() directly
    Signature_File: rec.id + '.jpg',   // filename PA should use when creating the file
    Source:         'SWMS-System-v5',
  });
  document.getElementById('signConfirmText').textContent = `${signWorker} \u2014 ${signSwms.title} v${signSwms.version} \u2014 signed on ${fmtDate(rec.dateSigned)}. Record saved.`;
  setSignStep(4);
  toast('Sign-off recorded');
}

function resetSignOff(){
  signSwms=null; signWorker=null;
  document.getElementById('signSwmsSelect').value='';
  document.getElementById('signCheckName').value='';
  document.getElementById('signSwmsInfo').classList.add('hidden');
  setSignStep(1);
}

function setSignStep(n){
  [1,2,3,4].forEach(i=>{
    document.getElementById('signStep'+i).classList.toggle('hidden',i!==n);
    const dot = document.getElementById('step'+i);
    dot.classList.remove('done','current');
    if(i<n) dot.classList.add('done');
    if(i===n) dot.classList.add('current');
  });
}

// ═══════════════════════════════════════
// PRE-TASK CHECK
// ═══════════════════════════════════════
// ═══════════════════════════════════════
// PRE-TASK CHECK — STEPPED FLOW
// ═══════════════════════════════════════
let ptSwmsSelected = null;

function setPtStep(n){
  [1,2,3,4,5].forEach(i=>{
    document.getElementById('ptStep'+i).classList.toggle('hidden',i!==n);
    const dot=document.getElementById('ptstep'+i);
    dot.classList.remove('done','current');
    if(i<n) dot.classList.add('done');
    if(i===n) dot.classList.add('current');
  });
}

function ptGoStep2(){
  const swmsId=document.getElementById('ptSwms').value;
  if(!swmsId){ toast('Select a SWMS','var(--danger)'); return; }
  ptSwmsSelected=SWMS_LIB.find(x=>x.id===swmsId);
  renderCrewList([]);
  setPtStep(2);
  document.getElementById('ptCrewCompliance').classList.add('hidden');
  document.getElementById('ptStep2Continue').disabled=false;
}

function syncCrew(i){
  const cb=document.getElementById('crew-cb-'+i);
  document.getElementById('crew-opt-'+i).classList.toggle('selected',cb.checked);
  ptCheckCrewCompliance();
}

function ptCheckCrewCompliance(){
  const swmsId=ptSwmsSelected?.id;
  const crew=getSelectedCrew();
  const div=document.getElementById('ptCrewCompliance');
  const btn=document.getElementById('ptStep2Continue');
  if(!crew.length){ div.classList.add('hidden'); btn.disabled=false; return; }
  const required=[swmsId,...(ptSwmsSelected?.linkedCore||[])];
  let missing=[];
  crew.forEach(w=>{
    const unsigned=required.filter(id=>!workerSignedCurrent(w,id));
    if(unsigned.length){
      const labels=unsigned.map(id=>{const s=SWMS_LIB.find(x=>x.id===id);return s?s.title:id;});
      missing.push({worker:w,swms:labels});
    }
  });
  div.classList.remove('hidden');
  if(!missing.length){
    div.className='notice notice-success';
    div.innerHTML='All selected crew members have signed the current version of this SWMS and all required Core SWMS.';
    btn.disabled=false;
  } else {
    div.className='notice notice-danger';
    div.innerHTML=`<strong>Outstanding sign-offs — resolve before proceeding.</strong><br><br>`+
      missing.map(m=>`<strong>${m.worker}</strong> — must sign: ${m.swms.join(', ')}`).join('<br>')+
      `<br><br><button class="btn btn-primary btn-sm" data-action="go-to-signoff-from-pt">Go to Sign-Off Page</button>`;
    btn.disabled=true;
  }
}

function goToSignOffFromPT(){
  const id=ptSwmsSelected?.id;
  showPage('signoff');
  setTimeout(()=>{
    document.getElementById('signSwmsSelect').value=id||'';
    onSignSwmsChange();
  },50);
}

let ptPdfOpened = false;
let signPdfOpened = false;

function ptGoStep3(){
  const crew=getSelectedCrew();
  if(!crew.length){ toast('Select at least one crew member','var(--danger)'); return; }
  const content=document.getElementById('ptHazardContent');
  if(SWMS_HAZARD_LINKS[ptSwmsSelected.id]){
    renderHazardReview(ptSwmsSelected.id,ptSwmsSelected.title);
    content.innerHTML=document.getElementById('hazardReviewContent').innerHTML;
  } else {
    content.innerHTML=`<div class="notice notice-info">No hazard summary available for this SWMS. Review the printed document with the crew.</div>`;
  }
  const pdf=pdfUrl(ptSwmsSelected.id);

  // Reset PDF opened flag each time step 3 is entered
  ptPdfOpened = false;
  const continueBtn = document.getElementById('ptStep3Continue');
  const notOpenedDiv = document.getElementById('ptPdfNotOpened');
  continueBtn.disabled = true;
  continueBtn.style.opacity = '.5';
  continueBtn.style.cursor = 'not-allowed';
  notOpenedDiv.style.display = pdf ? 'block' : 'none';

  document.getElementById('ptPdfBtn').innerHTML=pdf
    ?`<button data-action="pt-open-pdf" data-pdf="${pdf}" data-title="${ptSwmsSelected.title}" data-id="${ptSwmsSelected.id}" class="btn btn-secondary btn-full">Open SWMS Document</button>`
    :'<div class="notice notice-warn">No PDF linked. Review the printed copy with the crew — then tap the button below to continue.</div>';

  // If no PDF available, allow proceeding without opening
  if(!pdf){
    ptPdfOpened = true;
    continueBtn.disabled = false;
    continueBtn.style.opacity = '1';
    continueBtn.style.cursor = 'pointer';
  }

  setPtStep(3);
}

function ptOpenPdf(url, title, id){
  openPdfViewer(url, title, id);
  ptMarkPdfOpened();
}

function ptMarkPdfOpened(){
  ptPdfOpened = true;
  const btn = document.getElementById('ptStep3Continue');
  btn.disabled = false;
  btn.style.opacity = '1';
  btn.style.cursor = 'pointer';
  document.getElementById('ptPdfNotOpened').style.display = 'none';
}

function ptStep3Proceed(){
  if(!ptPdfOpened){ toast('Open the SWMS document first','var(--danger)'); return; }
  setPtStep(4);
}

function ptGoStep5(){
  const ptChecks=['ptc1','ptc2','ptc3','ptc4','ptc5','ptc6','ptc7','ptc8'];
  if(!ptChecks.every(id=>document.getElementById(id).checked)){
    toast('All checklist items must be ticked','var(--danger)'); return;
  }
  // Show compliance summary on step 5
  const swmsId=ptSwmsSelected?.id;
  const crew=getSelectedCrew();
  const div=document.getElementById('ptSignCompliance');
  const required=[swmsId,...(ptSwmsSelected?.linkedCore||[])];
  let missing=[];
  crew.forEach(w=>{
    const u=required.filter(id=>!workerSignedCurrent(w,id));
    if(u.length) missing.push(w);
  });
  if(!missing.length){
    div.className='notice notice-success';
    div.innerHTML='All crew sign-offs verified. Ready to authorise.';
    div.classList.remove('hidden');
  } else {
    div.className='notice notice-danger';
    div.innerHTML='<strong>Sign-off check failed:</strong> '+missing.join(', ')+' have outstanding sign-offs.';
    div.classList.remove('hidden');
  }
  setPtStep(5);
}

function togglePtChanges(){
  document.getElementById('ptChangesDetail').classList.toggle('hidden',document.getElementById('ptChanges').value==='no');
}

function checkPtCompliance(){ /* handled inline in stepped flow */ }
function onPtSwmsChange(){ /* handled by step flow */ }

function submitPreTask(){
  const swmsId=ptSwmsSelected?.id;
  const location=document.getElementById('ptLocation').value.trim();
  const date=document.getElementById('ptDate').value;
  const time=document.getElementById('ptTime').value;
  const crew=getSelectedCrew();
  if(!swmsId||!location||!date||!crew.length){ toast('Complete all required fields','var(--danger)'); return; }
  const required=[swmsId,...(ptSwmsSelected?.linkedCore||[])];
  const stillMissing=crew.filter(w=>required.some(id=>!workerSignedCurrent(w,id)));
  if(stillMissing.length){ toast('Resolve outstanding sign-offs first','var(--danger)'); return; }
  const changes=document.getElementById('ptChanges').value==='yes';
  const rec={
    id:genId(),type:'pretask',
    swmsId,swmsTitle:ptSwmsSelected.title,swmsVersion:ptSwmsSelected.version,
    location,date,time,crew:crew.join(', '),
    changes,changeDetail:changes?document.getElementById('ptChangesText').value:'',
    ts:new Date().toISOString(),
  };
  pretasks.push(rec);
  save(KEYS.pretasks, rec);
  // Reload cfg fresh in case URL was saved after page load
  cfg = loadObj(KEYS.config);
  postFlow(cfg.ptUrl,{
    Task_ID:            rec.id,
    Timestamp:          rec.ts,
    Date:               rec.date,
    Time:               rec.time,
    SWMS_ID:            rec.swmsId,
    SWMS_Title:         rec.swmsTitle,
    SWMS_Version:       String(rec.swmsVersion),
    Location:           rec.location,
    Crew:               rec.crew,
    Conditions_Changed: rec.changes ? 'Yes' : 'No',
    Change_Detail:      rec.changeDetail || '',
    Source:             'SWMS-System-v5',
  });
  toast('Work authorised — pre-task record saved');
  ptSwmsSelected=null;
  ptPdfOpened=false;
  document.getElementById('ptSwms').value='';
  document.getElementById('ptLocation').value='';
  document.getElementById('ptChanges').value='no';
  document.getElementById('ptChangesDetail').classList.add('hidden');
  document.getElementById('ptChangesText').value='';
  document.getElementById('ptHazardContent').innerHTML='';
  document.getElementById('ptSignCompliance').classList.add('hidden');
  document.getElementById('ptCrewCompliance').classList.add('hidden');
  const ptChecks=['ptc1','ptc2','ptc3','ptc4','ptc5','ptc6','ptc7','ptc8'];
  ptChecks.forEach(id=>{ document.getElementById(id).checked=false; syncCheck(id,id+'-item'); });
  document.getElementById('ptDate').value=todayISO();
  document.getElementById('ptTime').value=new Date().toTimeString().slice(0,5);
  renderCrewList([]);
  setPtStep(1);
}

// ═══════════════════════════════════════
// DASHBOARD
// ═══════════════════════════════════════
function renderDashboard(){
  const w = load(KEYS.workers);
  const activeSwms = SWMS_LIB.filter(s=>s.active);
  let totalReq=0, totalSigned=0;
  activeSwms.forEach(s=>{
    const signed=new Set(signoffs.filter(r=>r.swmsId===s.id&&r.swmsVersion===s.version).map(r=>r.worker)).size;
    totalReq+=w.length; totalSigned+=Math.min(signed,w.length);
  });
  const pct = totalReq>0?Math.round(totalSigned/totalReq*100):0;
  const od = activeSwms.filter(s=>isOverdue(s.reviewDate)).length;
  document.getElementById('dashStats').innerHTML=`
    <div class="stat-card"><div class="stat-val" style="color:var(--green-dark)">${activeSwms.length}</div><div class="stat-lbl">Active SWMS</div></div>
    <div class="stat-card"><div class="stat-val stat-blue">${w.length}</div><div class="stat-lbl">Workers</div></div>
    <div class="stat-card"><div class="stat-val ${pct===100?'stat-green':pct>=80?'stat-amber':'stat-red'}">${pct}%</div><div class="stat-lbl">Compliance</div></div>
    <div class="stat-card"><div class="stat-val ${od?'stat-red':'stat-green'}">${od}</div><div class="stat-lbl">Overdue Reviews</div></div>
    <div class="stat-card"><div class="stat-val stat-blue">${signoffs.length}</div><div class="stat-lbl">Sign-Offs</div></div>
    <div class="stat-card"><div class="stat-val" style="color:var(--green-dark)">${pretasks.length}</div><div class="stat-lbl">Pre-Task Checks</div></div>
  `;
  document.getElementById('dashSwmsBody').innerHTML=activeSwms.map(s=>{
    const signed=new Set(signoffs.filter(r=>r.swmsId===s.id&&r.swmsVersion===s.version).map(r=>r.worker)).size;
    const p=w.length>0?Math.round(signed/w.length*100):0;
    const dotC=p===100?'tl-green':p>=80?'tl-amber':'tl-red';
    const barC=p===100?'var(--green)':p>=80?'var(--amber)':'var(--danger)';
    return `<tr>
      <td><span class="swms-id">${s.id}</span></td>
      <td class="bold">${esc(s.title)}</td>
      <td>v${s.version}</td>
      <td>${signed} / ${w.length}</td>
      <td style="min-width:130px;"><span class="tl ${dotC}"></span>${p}%<div class="progress-bar" style="margin-top:4px;"><div class="progress-fill" style="width:${p}%;background:${barC}"></div></div></td>
      <td>${isOverdue(s.reviewDate)?'<span class="badge badge-red">Overdue</span>':'<span class="badge badge-green">On Time</span>'}</td>
    </tr>`;
  }).join('');
  document.getElementById('dashWorkerBody').innerHTML=w.map(worker=>{
    const curr=signoffs.filter(r=>{const s=SWMS_LIB.find(x=>x.id===r.swmsId);return s&&r.swmsVersion===s.version&&r.worker===worker;});
    const out=activeSwms.filter(s=>!curr.find(r=>r.swmsId===s.id));
    const last=signoffs.filter(r=>r.worker===worker).sort((a,b)=>b.ts.localeCompare(a.ts))[0];
    return `<tr>
      <td class="bold">${esc(worker)}</td>
      <td>${curr.length}</td>
      <td>${out.length?`<span class="badge badge-red">${out.length} outstanding</span>`:'<span class="badge badge-green">All signed</span>'}</td>
      <td>${last?fmtDate(last.dateSigned):'—'}</td>
    </tr>`;
  }).join('');
}

// ═══════════════════════════════════════
// AUDIT TRAIL
// ═══════════════════════════════════════
// ═══════════════════════════════════════
// WORKER SIGN-OFF REGISTER
// ═══════════════════════════════════════
function renderSignOffRegister(){
  // Populate SWMS filter dropdown
  const swmsFilter = document.getElementById('signoffSwmsFilter');
  if(swmsFilter.options.length <= 1){
    const ids = [...new Set(signoffs.map(r=>r.swmsId))].sort();
    ids.forEach(id=>{
      const s = SWMS_LIB.find(x=>x.id===id);
      const opt = document.createElement('option');
      opt.value = id;
      opt.textContent = `${id} — ${s?s.title:id}`;
      swmsFilter.appendChild(opt);
    });
  }

  const search   = (document.getElementById('signoffSearch').value||'').toLowerCase();
  const swmsF    = document.getElementById('signoffSwmsFilter').value;

  let rows = [...signoffs].sort((a,b)=>b.ts.localeCompare(a.ts));
  if(search) rows = rows.filter(r=>
    (r.worker||'').toLowerCase().includes(search)||
    (r.swmsId||'').toLowerCase().includes(search)||
    (r.swmsTitle||'').toLowerCase().includes(search)
  );
  if(swmsF) rows = rows.filter(r=>r.swmsId===swmsF);

  const body  = document.getElementById('signoffRegisterBody');
  const empty = document.getElementById('signoffRegisterEmpty');

  if(!rows.length){ body.innerHTML=''; empty.classList.remove('hidden'); return; }
  empty.classList.add('hidden');
  body.innerHTML = rows.map(r=>`<tr>
    <td style="white-space:nowrap;">${fmtDate(r.dateSigned)}</td>
    <td class="bold">${esc(r.worker)}</td>
    <td><span class="swms-id">${esc(r.swmsId)}</span></td>
    <td>${esc(r.swmsTitle)}</td>
    <td>v${r.swmsVersion}</td>
  </tr>`).join('');
}

function exportSignOffCSV(){
  if(!signoffs.length){ toast('No sign-off records to export'); return; }
  const rows = [...signoffs].sort((a,b)=>b.ts.localeCompare(a.ts))
    .map(r=>({ Timestamp:r.ts, Date_Signed:r.dateSigned, Worker:r.worker, SWMS_ID:r.swmsId, SWMS_Title:r.swmsTitle, Version:r.swmsVersion }));
  const h = Object.keys(rows[0]);
  const csv = [h.join(','),...rows.map(r=>h.map(k=>`"${String(r[k]||'').replace(/"/g,'""')}"`).join(','))].join('\n');
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([csv],{type:'text/csv'}));
  a.download = `SWMS_SignOff_Register_${todayISO()}.csv`;
  a.click();
  toast('Exported');
}

// ═══════════════════════════════════════
// TASK REGISTER
// ═══════════════════════════════════════
function renderTaskRegister(){
  const search = (document.getElementById('taskSearch').value||'').toLowerCase();
  let rows = [...pretasks].sort((a,b)=>b.ts.localeCompare(a.ts));
  if(search) rows = rows.filter(r=>
    (r.swmsId||'').toLowerCase().includes(search)||
    (r.swmsTitle||'').toLowerCase().includes(search)||
    (r.location||'').toLowerCase().includes(search)||
    (r.crew||'').toLowerCase().includes(search)
  );

  const body  = document.getElementById('taskRegisterBody');
  const empty = document.getElementById('taskRegisterEmpty');

  if(!rows.length){ body.innerHTML=''; empty.classList.remove('hidden'); return; }
  empty.classList.add('hidden');
  body.innerHTML = rows.map(r=>`<tr>
    <td style="white-space:nowrap;">${fmtDate(r.date)}</td>
    <td style="white-space:nowrap;">${r.time||'—'}</td>
    <td><span class="swms-id">${esc(r.swmsId)}</span></td>
    <td>${esc(r.swmsTitle)}</td>
    <td>${esc(r.location)}</td>
    <td style="font-size:13px;">${esc(r.crew)}</td>
    <td>${r.changes?'<span class="badge badge-amber">Yes</span>':'<span class="badge badge-green">No</span>'}</td>
  </tr>`).join('');
}

function exportTaskCSV(){
  if(!pretasks.length){ toast('No task records to export'); return; }
  const rows = [...pretasks].sort((a,b)=>b.ts.localeCompare(a.ts))
    .map(r=>({ Timestamp:r.ts, Date:r.date, Time:r.time, SWMS_ID:r.swmsId, SWMS_Title:r.swmsTitle, Version:r.swmsVersion, Location:r.location, Crew:r.crew, Conditions_Changed:r.changes?'Yes':'No', Change_Detail:r.changeDetail||'' }));
  const h = Object.keys(rows[0]);
  const csv = [h.join(','),...rows.map(r=>h.map(k=>`"${String(r[k]||'').replace(/"/g,'""')}"`).join(','))].join('\n');
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([csv],{type:'text/csv'}));
  a.download = `SWMS_Task_Register_${todayISO()}.csv`;
  a.click();
  toast('Exported');
}

// ═══════════════════════════════════════
// SETTINGS
// ═══════════════════════════════════════
function refreshSwmsLib(){
  SWMS_LIB = getSwmsLib();
  CORE_SWMS = SWMS_LIB.filter(s=>s.type==='Core SWMS'&&s.active).map(s=>s.id);
}

// ═══════════════════════════════════════
// SWMS REGISTER EDITOR
// ═══════════════════════════════════════
function renderSwmsEditorTable(){
  const lib = getSwmsLib().sort((a,b)=>a.id.localeCompare(b.id));
  document.getElementById('swmsEditorTable').innerHTML = lib.map(s=>`
    <tr>
      <td><span class="swms-id">${esc(s.id)}</span></td>
      <td style="font-weight:600;">${esc(s.title)}</td>
      <td>${typeBadge(s.type)}</td>
      <td>v${s.version}</td>
      <td style="font-size:13px;color:var(--muted);">${fmtDate(s.authDate)}</td>
      <td style="font-size:13px;color:var(--muted);">${fmtDate(s.reviewDate)}</td>
      <td>${s.active?'<span class="badge badge-green">Active</span>':'<span class="badge badge-grey">Not Active</span>'}</td>
      <td><button class="btn btn-secondary btn-sm" data-action="open-swms-editor" data-id="${esc(s.id)}">Edit</button></td>
    </tr>`).join('');
}

function openSwmsEditor(id){
  const isNew = !id;
  document.getElementById('swmsEditorTitle').textContent = isNew ? 'Add SWMS' : 'Edit SWMS';
  document.getElementById('swmsDeleteBtn').classList.toggle('hidden', isNew);
  document.getElementById('swmsEditorError').classList.add('hidden');

  let currentLinked = [];

  if(isNew){
    const lib = getSwmsLib();
    const nums = lib.map(s=>parseInt(s.id.replace('SWMS-',''))||0);
    const next = (Math.max(0,...nums)+1).toString().padStart(3,'0');
    document.getElementById('edSwmsOrigId').value = '';
    document.getElementById('edId').value = 'SWMS-'+next;
    document.getElementById('edTitle').value = '';
    document.getElementById('edType').value = 'Routine Task SWMS';
    document.getElementById('edVersion').value = '1';
    document.getElementById('edAuthDate').value = todayISO();
    document.getElementById('edReviewDate').value = '';
    document.getElementById('edActiveYes').checked = true;
  } else {
    const s = getSwmsLib().find(x=>x.id===id);
    if(!s) return;
    document.getElementById('edSwmsOrigId').value = s.id;
    document.getElementById('edId').value = s.id;
    document.getElementById('edTitle').value = s.title;
    document.getElementById('edType').value = s.type;
    document.getElementById('edVersion').value = String(s.version);
    document.getElementById('edAuthDate').value = s.authDate||'';
    document.getElementById('edReviewDate').value = s.reviewDate||'';
    document.getElementById('edActiveYes').checked = s.active;
    document.getElementById('edActiveNo').checked = !s.active;
    currentLinked = s.linkedCore || [];
  }

  // Render Core SWMS picker — only show if this SWMS is not itself a Core SWMS
  renderLinkedCorePicker(currentLinked);

  document.getElementById('swmsEditorModal').classList.add('open');
}

function renderLinkedCorePicker(selected){
  const editingId = document.getElementById('edId').value;
  const editingType = document.getElementById('edType').value;
  const field = document.getElementById('edLinkedCoreField');
  const coreItems = SWMS_LIB.filter(s=>s.type==='Core SWMS' && s.active && s.id !== editingId);

  // Hide the field if this is itself a Core SWMS or there are no Core SWMS
  if(editingType === 'Core SWMS' || !coreItems.length){
    field.classList.add('hidden');
    return;
  }
  field.classList.remove('hidden');

  document.getElementById('edLinkedCoreList').innerHTML = coreItems.map((s,i)=>{
    const checked = selected.includes(s.id);
    return `<div class="multi-option ${checked?'selected':''}" id="lc-opt-${i}">
      <input type="checkbox" id="lc-cb-${i}" data-id="${s.id}" ${checked?'checked':''} data-action="sync-linked-core" data-cb-index="${i}" style="width:17px;height:17px;accent-color:var(--green);cursor:pointer;flex-shrink:0;">
      <label for="lc-cb-${i}" style="cursor:pointer;font-size:14px;">${esc(s.id)} — ${esc(s.title)}</label>
    </div>`;
  }).join('') || '<div style="padding:10px 12px;color:var(--muted);font-size:13px;">No active Core SWMS found.</div>';
}

function syncLinkedCore(i){
  const cb = document.getElementById('lc-cb-'+i);
  document.getElementById('lc-opt-'+i).classList.toggle('selected', cb.checked);
}

function closeSwmsEditor(){
  document.getElementById('swmsEditorModal').classList.remove('open');
}

function saveSwmsEntry(){
  const errDiv = document.getElementById('swmsEditorError');
  errDiv.classList.add('hidden');

  const origId  = document.getElementById('edSwmsOrigId').value;
  const id      = document.getElementById('edId').value.trim().toUpperCase();
  const title   = document.getElementById('edTitle').value.trim();
  const type    = document.getElementById('edType').value;
  const version = parseInt(document.getElementById('edVersion').value)||1;
  const authDate= document.getElementById('edAuthDate').value||null;
  const reviewDate= document.getElementById('edReviewDate').value||null;
  const active  = document.getElementById('edActiveYes').checked;

  // Read linked Core SWMS
  const linkedCore = Array.from(document.querySelectorAll('#edLinkedCoreList input[type=checkbox]'))
    .filter(cb=>cb.checked).map(cb=>cb.getAttribute('data-id'));

  if(!id||!title){
    errDiv.textContent='ID and Title are required.';
    errDiv.classList.remove('hidden');
    return;
  }
  if(!/^SWMS-\d+$/.test(id)){
    errDiv.textContent='ID must be in format SWMS-001';
    errDiv.classList.remove('hidden');
    return;
  }

  let lib = getSwmsLib();

  // Check for duplicate ID (only if new or ID changed)
  if(id !== origId && lib.find(s=>s.id===id)){
    errDiv.textContent=`ID ${id} already exists. Choose a different ID.`;
    errDiv.classList.remove('hidden');
    return;
  }

  const entry = {id, title, version, type, authDate, reviewDate, active, linkedCore};

  if(origId){
    // Edit existing
    const idx = lib.findIndex(s=>s.id===origId);
    if(idx>=0) lib[idx]=entry; else lib.push(entry);
  } else {
    lib.push(entry);
  }

  // Sort by ID
  lib.sort((a,b)=>a.id.localeCompare(b.id));
  localStorage.setItem(KEYS.swmslib, JSON.stringify(lib));
  refreshSwmsLib();
  closeSwmsEditor();
  renderSwmsEditorTable();
  renderRegister();
  refreshDropdowns();
  toast(origId ? 'SWMS updated' : 'SWMS added');
}

function deleteSwmsEntry(){
  const id = document.getElementById('edSwmsOrigId').value;
  if(!id) return;
  let lib = getSwmsLib().filter(s=>s.id!==id);
  localStorage.setItem(KEYS.swmslib, JSON.stringify(lib));
  refreshSwmsLib();
  closeSwmsEditor();
  renderSwmsEditorTable();
  renderRegister();
  refreshDropdowns();
  toast('SWMS deleted');
}

function generateSwmsCode(){
  const lib = getSwmsLib();
  const lines = lib.map(s=>{
    const rd = s.reviewDate ? `'${s.reviewDate}'` : 'null';
    const lc = (s.linkedCore&&s.linkedCore.length) ? JSON.stringify(s.linkedCore) : '[]';
    return `  {id:'${s.id}',title:'${s.title.replace(/'/g,"\\'")}',version:${s.version},type:'${s.type}',authDate:'${s.authDate||''}',reviewDate:${rd},active:${s.active},linkedCore:${lc}}`;
  }).join(',\n');
  const code = `const SWMS_LIB_DEFAULT = [\n${lines},\n];`;
  document.getElementById('swmsCodeText').value = code;
  document.getElementById('swmsCodeOutput').classList.remove('hidden');
  document.getElementById('swmsCodeCopied').classList.add('hidden');
}

function copySwmsCode(){
  const ta = document.getElementById('swmsCodeText');
  ta.select();
  document.execCommand('copy');
  document.getElementById('swmsCodeCopied').classList.remove('hidden');
  setTimeout(()=>document.getElementById('swmsCodeCopied').classList.add('hidden'),2500);
}

function renderSettings(){
  // Reset lock state each time page is opened
  document.getElementById('settingsLocked').classList.remove('hidden');
  document.getElementById('settingsUnlocked').classList.add('hidden');
  document.getElementById('settingsCodeInput').value='';
  document.getElementById('settingsCodeError').classList.add('hidden');
}

function unlockSettings(){
  cfg = loadObj(KEYS.config);
  const code = cfg.settingsCode || 'tuan2026';
  const entered = document.getElementById('settingsCodeInput').value;
  if(entered !== code){
    document.getElementById('settingsCodeError').classList.remove('hidden');
    return;
  }
  document.getElementById('settingsLocked').classList.add('hidden');
  document.getElementById('settingsUnlocked').classList.remove('hidden');
  renderSettingsContent();
}

function renderSettingsContent(){
  workers = load(KEYS.workers);
  cfg = loadObj(KEYS.config);

  document.getElementById('workerListDisplay').innerHTML = workers.length
    ? workers.map(n=>`<div class="worker-list-item"><span class="name">${esc(n)}</span><button class="btn btn-danger btn-sm" data-action="remove-worker" data-name="${esc(n)}">Remove</button></div>`).join('')
    : '<div class="muted" style="padding:8px 0;">No workers added yet.</div>';

  document.getElementById('cfgGetUrl').value   = cfg.getUrl||'';
  document.getElementById('cfgSignUrl').value  = cfg.signUrl||'';
  document.getElementById('cfgPtUrl').value    = cfg.ptUrl||'';
  document.getElementById('cfgPtGetUrl').value = cfg.ptGetUrl||'';
  document.getElementById('cfgPdfBase').value = cfg.pdfBase||'';
  document.getElementById('cfgNewCode').value = '';
  document.getElementById('cfgNewCodeConfirm').value = '';
  document.getElementById('swmsCodeOutput').classList.add('hidden');
  renderSwmsEditorTable();
}

function addWorker(){
  const name = document.getElementById('newWorkerName').value.trim();
  if(!name){toast('Enter a name','var(--danger)');return;}
  workers = load(KEYS.workers);
  if(workers.includes(name)){toast('Already in list','var(--amber)');return;}
  workers.push(name);
  save(KEYS.workers, workers);
  document.getElementById('newWorkerName').value='';
  renderSettingsContent();
  refreshDropdowns();
  toast('Worker added');
}

function removeWorker(name){
  workers = load(KEYS.workers);
  workers = workers.filter(w => w !== name);
  save(KEYS.workers, workers);
  renderSettingsContent();
  refreshDropdowns();
  toast('Worker removed');
}

function saveConfig(){
  const newCode    = document.getElementById('cfgNewCode').value.trim();
  const newConfirm = document.getElementById('cfgNewCodeConfirm').value.trim();
  const mismatchDiv = document.getElementById('settingsCodeMismatch');
  mismatchDiv.classList.add('hidden');

  cfg = loadObj(KEYS.config);
  let settingsCode = cfg.settingsCode || 'tuan2026';

  if(newCode || newConfirm){
    if(newCode !== newConfirm){
      mismatchDiv.classList.remove('hidden');
      setTimeout(()=>mismatchDiv.classList.add('hidden'),3000);
    } else {
      settingsCode = newCode;
    }
  }

  cfg={
    getUrl:       document.getElementById('cfgGetUrl').value.trim(),
    signUrl:      document.getElementById('cfgSignUrl').value.trim(),
    ptUrl:        document.getElementById('cfgPtUrl').value.trim(),
    ptGetUrl:     document.getElementById('cfgPtGetUrl').value.trim(),
    pdfBase:      document.getElementById('cfgPdfBase').value.trim(),
    settingsCode,
  };
  save(KEYS.config, cfg);
  startLiveRefresh();
  document.getElementById('settingsSaved').classList.remove('hidden');
  setTimeout(()=>document.getElementById('settingsSaved').classList.add('hidden'),2500);
  document.getElementById('cfgNewCode').value='';
  document.getElementById('cfgNewCodeConfirm').value='';
  renderRegister();
  toast('Settings saved');
}

function clearData(){
  if(!confirm('Clear all local sign-off and pre-task records? This cannot be undone.')) return;
  signoffs=[]; pretasks=[];
  save(KEYS.signoffs,signoffs); save(KEYS.pretasks,pretasks);
  toast('Records cleared');
}

// ═══════════════════════════════════════
// POWER AUTOMATE — 4 flows
// Flow 1 GET  : fetch sign-off register from SharePoint → merge into signoffs[]
// Flow 2 POST : submit sign-off → save signature PNG as SharePoint file → write metadata row to Excel
// Flow 3 POST : submit new pre-task record → Task_Register table
// Flow 4 GET  : fetch pre-task register from SharePoint → merge into pretasks[]
//
// PA FLOW SETUP:
// Flow 1 — Trigger: HTTP GET
//   → List rows (Worker_SWMS_Register table)
//   → Response: { "signOffRegister": @{outputs('List_rows')?['body/value']} }
//
// Flow 2 — Trigger: HTTP POST  (this is the one with 3 steps)
//   Step 1: Parse JSON (body schema below)
//   Step 2: Create file (SharePoint)
//           Site: your Tuan site
//           Folder: /Shared Documents/ATB.SS. Safety Management System/08_Risk Assessments/04. SWMS/Signatures
//           File name: triggerBody()?['Signature_File']          e.g. abc123def.png
//           File content: base64ToBinary(triggerBody()?['Signature_PNG'])
//   Step 3: Add a row into a table (Worker_SWMS_Register)
//           Signoff_ID    = triggerBody()?['Signoff_ID']
//           Timestamp     = triggerBody()?['Timestamp']
//           Worker_Name   = triggerBody()?['Worker_Name']
//           SWMS_ID       = triggerBody()?['SWMS_ID']
//           SWMS_Title    = triggerBody()?['SWMS_Title']
//           SWMS_Version  = triggerBody()?['SWMS_Version']
//           Date_Signed   = triggerBody()?['Date_Signed']
//           Signature_Path= outputs('Create_file')?['body/Path']   ← SharePoint path to the saved PNG
//           Source        = triggerBody()?['Source']
//
// Flow 3 — Trigger: HTTP POST
//   Step 1: Parse JSON
//   Step 2: Add a row into a table (Task_Register)
//           Task_ID, Timestamp, Date, Time, SWMS_ID, SWMS_Title, SWMS_Version,
//           Location, Crew, Conditions_Changed, Change_Detail, Source
//
// Flow 4 — Trigger: HTTP GET
//   → List rows (Task_Register table)
//   → Response: { "taskRegister": @{outputs('List_rows')?['body/value']} }
// ═══════════════════════════════════════
let _liveRefreshTimer = null;

async function testFlowUrl(inputId, label){
  const url = document.getElementById(inputId).value.trim();
  if(!url){ toast('Paste a URL first','var(--danger)'); return; }
  toast('Testing connection...','var(--amber)');
  const ok = await postFlow(url, {
    test: true,
    Signoff_ID: 'TEST-001',
    Timestamp: new Date().toISOString(),
    Worker_Name: 'Test Worker',
    SWMS_ID: 'SWMS-001',
    SWMS_Title: 'Test',
    SWMS_Version: '1',
    Date_Signed: new Date().toISOString().slice(0,10),
    Signature_PNG: 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
    Signature_File: 'TEST-001.png',
    Source: 'SWMS-System-v5-test',
  }, label);
  if(ok) toast(`✓ ${label} flow connected successfully`,'var(--green)');
}

// Prevents Excel/CSV formula injection when text values are opened in Excel.
// Skips content_base64/base64/file content fields so attachment data is never altered.
function stripFormulaChars(key, value) {
  if (/base64/i.test(key)) return value;
  if (typeof value === "string" && /^[=+\-@]/.test(value)) return "'" + value;
  return value;
}

async function postFlow(url, payload, label){
  if(!url){
    console.warn('postFlow: no URL configured for', label||'flow');
    return false;
  }
  try{
    const res = await fetch(url, {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify(payload, stripFormulaChars),
      mode:'cors',
    });
    if(!res.ok){
      console.warn('postFlow failed:', res.status, res.statusText, label);
      toast(`Flow error ${res.status} — check PA flow`, 'var(--amber)');
      return false;
    }
    console.log('postFlow success:', label, res.status);
    return true;
  }catch(e){
    console.warn('postFlow network error:', e.message, label);
    // CORS or network error — record saved locally, flow not reached
    toast('Saved locally — flow not reached (check URL or CORS)', 'var(--amber)');
    return false;
  }
}

async function loadLiveData(){
  cfg = loadObj(KEYS.config);
  let updated = false;

  // Flow 1 — sign-off register
  if(cfg.getUrl){
    try{
      const res = await fetch(cfg.getUrl);
      const data = await res.json();
      if(Array.isArray(data.signOffRegister) && data.signOffRegister.length){
        // Merge: add any records from SharePoint not already in local cache (by id)
        const localIds = new Set(signoffs.map(r=>r.id));
        const incoming = data.signOffRegister.filter(r=>r.id && !localIds.has(r.id));
        if(incoming.length){ signoffs = [...signoffs, ...incoming]; save(KEYS.signoffs, signoffs); updated = true; }
        // Also replace with full SharePoint set if it's larger (other devices have added records)
        if(data.signOffRegister.length > signoffs.length){ signoffs = data.signOffRegister; save(KEYS.signoffs, signoffs); updated = true; }
      }
    }catch(e){ console.warn('Sign-off live load failed — using cache'); }
  }

  // Flow 4 — pre-task register
  if(cfg.ptGetUrl){
    try{
      const res = await fetch(cfg.ptGetUrl);
      const data = await res.json();
      if(Array.isArray(data.taskRegister) && data.taskRegister.length){
        const localIds = new Set(pretasks.map(r=>r.id));
        const incoming = data.taskRegister.filter(r=>r.id && !localIds.has(r.id));
        if(incoming.length){ pretasks = [...pretasks, ...incoming]; save(KEYS.pretasks, pretasks); updated = true; }
        if(data.taskRegister.length > pretasks.length){ pretasks = data.taskRegister; save(KEYS.pretasks, pretasks); updated = true; }
      }
    }catch(e){ console.warn('Pre-task live load failed — using cache'); }
  }

  if(updated){
    renderDashboard();
    renderSignOffRegister();
    renderTaskRegister();
  }
}

function startLiveRefresh(){
  // Poll every 60 seconds when a GET URL is configured
  if(_liveRefreshTimer) clearInterval(_liveRefreshTimer);
  cfg = loadObj(KEYS.config);
  if(cfg.getUrl || cfg.ptGetUrl){
    _liveRefreshTimer = setInterval(loadLiveData, 60000);
    setLiveIndicator(true);
  } else {
    setLiveIndicator(false);
  }
}

function setLiveIndicator(on){
  const el = document.getElementById('liveIndicator');
  if(!el) return;
  el.textContent = on ? '● Live' : '○ Local only';
  el.style.color = on ? 'var(--green)' : 'var(--muted)';
}

async function syncNow(){
  const el = document.getElementById('liveIndicator');
  if(el){ el.textContent = '↻ Syncing...'; el.style.color = 'var(--amber)'; }
  await loadLiveData();
  cfg = loadObj(KEYS.config);
  setLiveIndicator(!!(cfg.getUrl || cfg.ptGetUrl));
  toast('Synced with SharePoint');
}

// ═══════════════════════════════════════
// PDF VIEWER
// ═══════════════════════════════════════
let currentPdfUrl = '';

function openPdfViewer(url, title, id){
  if(!url){ toast('No PDF linked for this SWMS','var(--danger)'); return; }
  currentPdfUrl = url;
  document.getElementById('pdfViewerTitle').textContent = title || '';
  document.getElementById('pdfViewerSwmsId').textContent = id || '';
  document.getElementById('pdfViewerFrame').src = url;
  document.getElementById('pdfNewTabBtn').href = url;
  document.getElementById('pdfDownloadBtn').href = url;
  document.getElementById('pdfDownloadBtn').download = (id || 'SWMS') + '.pdf';
  const overlay = document.getElementById('pdfViewerOverlay');
  overlay.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function closePdfViewer(){
  document.getElementById('pdfViewerOverlay').style.display = 'none';
  document.getElementById('pdfViewerFrame').src = '';
  document.body.style.overflow = '';
  currentPdfUrl = '';
}

function printPdf(){
  if(!currentPdfUrl) return;
  window.open(currentPdfUrl, '_blank');
}
function initSig(canvasId, wrapId){
  const canvas=document.getElementById(canvasId);
  const wrap=document.getElementById(wrapId);
  if(!canvas) return;
  const ctx=canvas.getContext('2d');
  let drawing=false,lx=0,ly=0;
  function resize(){
    // If canvas is not visible, width will be 0 — skip until called again
    const r=canvas.getBoundingClientRect();
    if(!r.width) return;
    const dpr=window.devicePixelRatio||1;
    canvas.width=r.width*dpr; canvas.height=r.height*dpr;
    ctx.scale(dpr,dpr); ctx.strokeStyle='#111827'; ctx.lineWidth=2.5; ctx.lineCap='round'; ctx.lineJoin='round';
  }
  function pos(e){ const r=canvas.getBoundingClientRect(),s=e.touches?e.touches[0]:e; return{x:s.clientX-r.left,y:s.clientY-r.top}; }
  canvas.addEventListener('mousedown',e=>{drawing=true;const p=pos(e);lx=p.x;ly=p.y;wrap.classList.add('active');});
  canvas.addEventListener('mousemove',e=>{if(!drawing)return;const p=pos(e);ctx.beginPath();ctx.moveTo(lx,ly);ctx.lineTo(p.x,p.y);ctx.stroke();lx=p.x;ly=p.y;});
  canvas.addEventListener('mouseup',()=>drawing=false);
  canvas.addEventListener('touchstart',e=>{e.preventDefault();drawing=true;const p=pos(e);lx=p.x;ly=p.y;wrap.classList.add('active');},{passive:false});
  canvas.addEventListener('touchmove',e=>{if(!drawing)return;e.preventDefault();const p=pos(e);ctx.beginPath();ctx.moveTo(lx,ly);ctx.lineTo(p.x,p.y);ctx.stroke();lx=p.x;ly=p.y;},{passive:false});
  canvas.addEventListener('touchend',()=>drawing=false);
  // Store resize so it can be called externally when canvas becomes visible
  canvas._resize = resize;
  resize();
  window.addEventListener('resize',resize);
}

function clearSig(canvasId,wrapId){
  const c=document.getElementById(canvasId);
  c.getContext('2d').clearRect(0,0,c.width,c.height);
  document.getElementById(wrapId).classList.remove('active');
}

function isSigBlank(canvas){
  return !canvas.getContext('2d').getImageData(0,0,canvas.width,canvas.height).data.some(v=>v!==0);
}

// ═══════════════════════════════════════
// CHECKBOX TOGGLE
// ═══════════════════════════════════════
// syncCheck reads the real checkbox state after the browser has updated it
// avoids the double-toggle bug caused by onclick + label for both firing
function syncCheck(cbId, itemId){
  const checked = document.getElementById(cbId).checked;
  document.getElementById(itemId).classList.toggle('checked', checked);
}

// ═══════════════════════════════════════
// UTILS
// ═══════════════════════════════════════
function todayISO(){ const n=new Date(),p=x=>String(x).padStart(2,'0'); return `${n.getFullYear()}-${p(n.getMonth()+1)}-${p(n.getDate())}`; }

// ═══════════════════════════════════════
// INIT
// ═══════════════════════════════════════
window.addEventListener('load',()=>{
  cfg = loadObj(KEYS.config);
  refreshSwmsLib();
  loadLiveData();
  startLiveRefresh();
  document.getElementById('ptDate').value = todayISO();
  document.getElementById('ptTime').value = new Date().toTimeString().slice(0,5);
  refreshDropdowns();
  renderRegister();
  initSig('sigCanvas1','sigWrap1');
});


/* ---- CSP-safe event bindings (auto-generated) ---- */
document.querySelector('[data-csp-hook="cspHook1"]').addEventListener("error", function(event) {
  this.style.display='none'
});

document.querySelector('[data-csp-hook="cspHook2"]').addEventListener("click", function(event) {
  showPage('register')
});

document.querySelector('[data-csp-hook="cspHook3"]').addEventListener("click", function(event) {
  showPage('signoff')
});

document.querySelector('[data-csp-hook="cspHook4"]').addEventListener("click", function(event) {
  showPage('pretask')
});

document.querySelector('[data-csp-hook="cspHook5"]').addEventListener("click", function(event) {
  showPage('dashboard')
});

document.querySelector('[data-csp-hook="cspHook6"]').addEventListener("click", function(event) {
  showPage('audit')
});

document.querySelector('[data-csp-hook="cspHook7"]').addEventListener("click", function(event) {
  showPage('taskreg')
});

document.querySelector('[data-csp-hook="cspHook8"]').addEventListener("click", function(event) {
  showPage('settings')
});

document.querySelector('[data-csp-hook="cspHook9"]').addEventListener("input", function(event) {
  renderRegister()
});

document.querySelector('[data-csp-hook="cspHook10"]').addEventListener("change", function(event) {
  renderRegister()
});

document.querySelector('[data-csp-hook="cspHook11"]').addEventListener("change", function(event) {
  renderRegister()
});

document.querySelector('[data-csp-hook="cspHook12"]').addEventListener("change", function(event) {
  onSignSwmsChange()
});

document.querySelector('[data-csp-hook="cspHook13"]').addEventListener("click", function(event) {
  goStep2()
});

document.querySelector('[data-csp-hook="cspHook14"]').addEventListener("click", function(event) {
  setSignStep(1)
});

document.querySelector('[data-csp-hook="cspHook15"]').addEventListener("click", function(event) {
  goStep3()
});

document.querySelector('[data-csp-hook="cspHook16"]').addEventListener("change", function(event) {
  syncCheck('chk-read','chk-read-item')
});

document.querySelector('[data-csp-hook="cspHook17"]').addEventListener("change", function(event) {
  syncCheck('chk-follow','chk-follow-item')
});

document.querySelector('[data-csp-hook="cspHook18"]').addEventListener("change", function(event) {
  syncCheck('chk-stop','chk-stop-item')
});

document.querySelector('[data-csp-hook="cspHook19"]').addEventListener("click", function(event) {
  clearSig('sigCanvas1','sigWrap1')
});

document.querySelector('[data-csp-hook="cspHook20"]').addEventListener("click", function(event) {
  setSignStep(2)
});

document.querySelector('[data-csp-hook="cspHook21"]').addEventListener("click", function(event) {
  submitSignOff()
});

document.querySelector('[data-csp-hook="cspHook22"]').addEventListener("click", function(event) {
  resetSignOff()
});

document.querySelector('[data-csp-hook="cspHook23"]').addEventListener("click", function(event) {
  ptGoStep2()
});

document.querySelector('[data-csp-hook="cspHook24"]').addEventListener("click", function(event) {
  setPtStep(1)
});

document.querySelector('[data-csp-hook="cspHook25"]').addEventListener("click", function(event) {
  ptGoStep3()
});

document.querySelector('[data-csp-hook="cspHook26"]').addEventListener("click", function(event) {
  setPtStep(2)
});

document.querySelector('[data-csp-hook="cspHook27"]').addEventListener("click", function(event) {
  ptStep3Proceed()
});

document.querySelector('[data-csp-hook="cspHook28"]').addEventListener("change", function(event) {
  syncCheck('ptc1','ptc1-item')
});

document.querySelector('[data-csp-hook="cspHook29"]').addEventListener("change", function(event) {
  syncCheck('ptc2','ptc2-item')
});

document.querySelector('[data-csp-hook="cspHook30"]').addEventListener("change", function(event) {
  syncCheck('ptc3','ptc3-item')
});

document.querySelector('[data-csp-hook="cspHook31"]').addEventListener("change", function(event) {
  syncCheck('ptc4','ptc4-item')
});

document.querySelector('[data-csp-hook="cspHook32"]').addEventListener("change", function(event) {
  syncCheck('ptc5','ptc5-item')
});

document.querySelector('[data-csp-hook="cspHook33"]').addEventListener("change", function(event) {
  syncCheck('ptc6','ptc6-item')
});

document.querySelector('[data-csp-hook="cspHook34"]').addEventListener("change", function(event) {
  syncCheck('ptc7','ptc7-item')
});

document.querySelector('[data-csp-hook="cspHook35"]').addEventListener("change", function(event) {
  syncCheck('ptc8','ptc8-item')
});

document.querySelector('[data-csp-hook="cspHook36"]').addEventListener("change", function(event) {
  togglePtChanges()
});

document.querySelector('[data-csp-hook="cspHook37"]').addEventListener("click", function(event) {
  setPtStep(3)
});

document.querySelector('[data-csp-hook="cspHook38"]').addEventListener("click", function(event) {
  ptGoStep5()
});

document.querySelector('[data-csp-hook="cspHook39"]').addEventListener("click", function(event) {
  submitPreTask()
});

document.querySelector('[data-csp-hook="cspHook40"]').addEventListener("click", function(event) {
  setPtStep(4)
});

document.querySelector('[data-csp-hook="cspHook41"]').addEventListener("click", function(event) {
  syncNow()
});

document.querySelector('[data-csp-hook="cspHook42"]').addEventListener("click", function(event) {
  renderDashboard()
});

document.querySelector('[data-csp-hook="cspHook43"]').addEventListener("click", function(event) {
  exportSignOffCSV()
});

document.querySelector('[data-csp-hook="cspHook44"]').addEventListener("input", function(event) {
  renderSignOffRegister()
});

document.querySelector('[data-csp-hook="cspHook45"]').addEventListener("change", function(event) {
  renderSignOffRegister()
});

document.querySelector('[data-csp-hook="cspHook46"]').addEventListener("click", function(event) {
  exportTaskCSV()
});

document.querySelector('[data-csp-hook="cspHook47"]').addEventListener("input", function(event) {
  renderTaskRegister()
});

document.querySelector('[data-csp-hook="cspHook48"]').addEventListener("click", function(event) {
  unlockSettings()
});

document.querySelector('[data-csp-hook="cspHook49"]').addEventListener("click", function(event) {
  openSwmsEditor(null)
});

document.querySelector('[data-csp-hook="cspHook50"]').addEventListener("click", function(event) {
  generateSwmsCode()
});

document.querySelector('[data-csp-hook="cspHook51"]').addEventListener("click", function(event) {
  copySwmsCode()
});

document.querySelector('[data-csp-hook="cspHook52"]').addEventListener("click", function(event) {
  addWorker()
});

document.querySelector('[data-csp-hook="cspHook53"]').addEventListener("click", function(event) {
  testFlowUrl('cfgSignUrl','sign-off')
});

document.querySelector('[data-csp-hook="cspHook54"]').addEventListener("click", function(event) {
  saveConfig()
});

document.querySelector('[data-csp-hook="cspHook55"]').addEventListener("click", function(event) {
  clearData()
});

document.querySelector('[data-csp-hook="cspHook56"]').addEventListener("click", function(event) {
  closeSwmsEditor()
});

document.querySelector('[data-csp-hook="cspHook57"]').addEventListener("click", function(event) {
  closeSwmsEditor()
});

document.querySelector('[data-csp-hook="cspHook58"]').addEventListener("click", function(event) {
  deleteSwmsEntry()
});

document.querySelector('[data-csp-hook="cspHook59"]').addEventListener("click", function(event) {
  saveSwmsEntry()
});

document.querySelector('[data-csp-hook="cspHook60"]').addEventListener("click", function(event) {
  closeModal()
});

document.querySelector('[data-csp-hook="cspHook61"]').addEventListener("click", function(event) {
  closeModal()
});

document.querySelector('[data-csp-hook="cspHook62"]').addEventListener("click", function(event) {
  goSignFromModal()
});

document.querySelector('[data-csp-hook="cspHook63"]').addEventListener("click", function(event) {
  closeHazardModal()
});

document.querySelector('[data-csp-hook="cspHook64"]').addEventListener("click", function(event) {
  closeHazardModal()
});

document.querySelector('[data-csp-hook="cspHook65"]').addEventListener("click", function(event) {
  closePdfViewer()
});


/* ---- CSP-safe delegated event handling ---- */
document.addEventListener("click", function(event) {
  const target = event.target.closest("[data-action]");
  if (!target) return;

  const action = target.dataset.action;

  if (action === "open-modal") {
    openModal(target.dataset.id);
  } else if (action === "open-hazard-modal") {
    openHazardModal(target.dataset.id, target.dataset.title);
  } else if (action === "open-pdf-viewer") {
    openPdfViewer(target.dataset.pdf, target.dataset.title, target.dataset.id);
  } else if (action === "close-and-open-pdf") {
    closeModal();
    openPdfViewer(target.dataset.pdf, target.dataset.title, target.dataset.id);
  } else if (action === "close-and-open-hazard") {
    closeModal();
    openHazardModal(target.dataset.id, target.dataset.title);
  } else if (action === "set-sign-step") {
    setSignStep(Number(target.dataset.step));
  } else if (action === "sign-open-pdf") {
    signOpenPdf(target.dataset.pdf, target.dataset.title, target.dataset.id);
  } else if (action === "go-to-signoff-from-pt") {
    goToSignOffFromPT();
  } else if (action === "pt-open-pdf") {
    ptOpenPdf(target.dataset.pdf, target.dataset.title, target.dataset.id);
  } else if (action === "open-swms-editor") {
    openSwmsEditor(target.dataset.id);
  } else if (action === "remove-worker") {
    removeWorker(target.dataset.name);
  }
});

document.addEventListener("change", function(event) {
  const target = event.target.closest("[data-action]");
  if (!target) return;

  const action = target.dataset.action;

  if (action === "sync-crew") {
    syncCrew(Number(target.dataset.index));
  } else if (action === "sync-linked-core") {
    syncLinkedCore(Number(target.dataset.cbIndex));
  }
});
