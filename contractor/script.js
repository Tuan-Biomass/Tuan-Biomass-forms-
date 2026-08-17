
const CONFIG = {
  siteName:    "Tuan Biomass",
  siteAddress: "Tuan, Queensland",
  emergency: {
    phone:       "000",
    site:        "David Knight — 0439 013 224",
    musterPoint: "Car park by the front gate",
    firstAid:    "Smoko Room",
    fireEx:      "Wall of main shed",
    uhfChannel:  "34",
  },
  contacts: [
    { role: "Plant Manager",       name: "David Knight", phone: "0439 013 224", email: "david.knight@albioma.com" },
    { role: "Safety & Compliance", name: "Chris Foster", phone: "0478 774 434", email: "christopher.foster@albioma.com" },
  ],
  goldenRules: [
    { title: "ATEX / Fire",             detail: "Comply with ATEX risk rules defined for this site. Adhere to the rules set out in any SWMS and hot work permit presented to you or in which you have taken part." },
    { title: "Personal Protective Equipment", detail: "Wear the PPE required in the area, where you are working." },
    { title: "Chemical Risks",          detail: "Follow the work instructions or safety data sheets for all products you use or handle." },
    { title: "Movement",                detail: "Maintain clear, positive communication at all times while moving around site. Before crossing the ring road, contact the loader driver on UHF Channel 34 and confirm they have acknowledged you before proceeding." },
    { title: "Lifting Operations",      detail: "Follow the lifting plan at all times (markings, signals, slinging methods and designated lifting areas). Never walk or stand under a suspended load. Only use lifting gear with current inspection tags. Check the tag colour matches the current inspection period shown on the lifting gear rack. Do not use damaged or untagged lifting equipment." },
    { title: "Confined Spaces",         detail: "Never enter a confined space without authorisation, atmosphere control, and surveillance." },
    { title: "Working at Heights",      detail: "Respect collective protection mechanisms. If removal is required, take compensatory measures. Always work with a harness and anti-fall system." },
    { title: "Isolation of Energy",     detail: "Work must only be carried out on equipment that has been isolated from all energy sources. Lockout Officers are responsible for isolating plant and equipment and applying lockout devices before work begins." },
    { title: "Operation of Machinery",  detail: "You may only drive a machine or vehicle if you hold a valid ticket for it." },
    { title: "Hot Spot Work",           detail: "Do not carry out hot work unless a Hot Work Permit and risk assessment have been completed and authorised. All work must strictly comply with the conditions listed on the permit." },
  ],
  siteRules: [
    "Sign in and sign out when attending site.",
    "Smoking is permitted in designated areas only. No drugs or alcohol are permitted on site.",
    "Follow all site signage and instructions at all times.",
    "Do not wander around site. Remain in your work area and only access areas required for your task.",
    "Mobile phone use is prohibited while walking or operating vehicles.",
    "The site can be busy. Stay alert for moving plant, forklifts, loaders and trucks at all times.",
    "When crossing or moving around the ring road, contact the loader driver on UHF Channel 34.",
    "Seat belts must be worn and all speed limits observed.",
    "All energy sources must be fully isolated and discharged before work begins — use lockout/tagout.",
    "A hot work permit must be approved before any cutting, grinding, or welding begins.",
    "Only qualified personnel may conduct work at height. Barricade areas below overhead work.",
    "All lifting equipment must be visually inspected before use. Only trained personnel may use lifting gear.",
    "Always clean up your work area before leaving site.",
    "CCTV cameras are in operation in high-risk areas for safety and security monitoring.",
    "Report any unsafe condition, near miss, or incident immediately to your site contact.",
  ],
  hazards: [
    "Rotating and moving machinery — Guards must be in place at all times. Never reach past guarding. Risk assessment and Authorisation is required before removing any guard.",
    "Combustible biomass dust — No ignition sources in dust-prone areas. Avoid using compressed air or air tools unless authorised.",
    "Forklift and loader movements — use designated pedestrian walkways only.",
    "Working at heights — Authorisation is required before working at heights. A SWMS or JSA must be completed and the area below must be barricaded.",
    "Confined spaces — Confined space entry requires a permit, atmosphere testing, a standby person, and an approved SWMS before entry.",
    "Hot surfaces and process equipment — do not touch without checking first.",
    "Slip and trip hazards — pellet fines, wet surfaces, and uneven ground.",
    "Noise — hearing protection is mandatory in high-noise zones.",
  ],
  ppeZones: [
    { zone: "Blue — Main Shed (Operational)", color: "#2563eb", items: ["Long hi-vis clothing", "Steel cap boots", "Hearing protection"] },
    { zone: "Yellow — Pellet Mills / High-Risk", color: "#d97706", items: ["Long hi-vis clothing", "Steel cap boots", "Hard hat", "Hearing protection"] },
    { zone: "Green — Ring Road / Open Grounds", color: "#16a34a", items: ["Long hi-vis clothing", "Steel cap boots", "Hearing protection"] },
    { zone: "Red — Office / Admin / Car Park", color: "#dc2626", items: ["Enclosed footwear", "Appropriate office dress"] },
  ],
  quiz: [
    { question: "Where is the site muster point in an emergency?", options: ["Main shed entrance", "Car park by the front gate", "Smoko Room", "Administration office"], correctIndex: 1, feedback: "The muster point is the car park by the front gate. Proceed there immediately in any emergency." },
    { question: "What UHF channel must you contact before crossing or moving around the facility?", options: ["Channel 10", "Channel 22", "Channel 34", "Channel 40"], correctIndex: 2, feedback: "Always contact the loader driver on UHF Channel 34 before crossing or moving around the facility." },
    { question: "What is required before any hot work (cutting, grinding, welding) can begin?", options: ["Verbal approval from your supervisor", "An approved hot work permit", "A safety glasses check", "Nothing — just use common sense"], correctIndex: 1, feedback: "An approved hot work permit is mandatory before any cutting, grinding, or welding on site." },
    { question: "Where is the first aid kit located?", options: ["Main shed wall", "Administration office", "Smoko Room", "Near the front gate"], correctIndex: 2, feedback: "The first aid kit is located in the Smoko Room." },
    { question: "Which PPE is required in the Yellow zone (pellet mills and high-risk areas)?", options: ["Hi-vis vest and safety glasses only", "Long hi-vis, steel cap boots, hard hat and hearing protection", "Steel cap boots and hard hat only", "No specific PPE required"], correctIndex: 1, feedback: "The Yellow zone requires long hi-vis clothing, steel cap boots, hard hat, and hearing protection." },
    { question: "What must you do before entering a confined space?", options: ["Check with a workmate", "Enter quickly to minimise exposure", "Obtain a permit, atmosphere control, and have a watch person present", "Wear a dust mask and proceed"], correctIndex: 2, feedback: "Confined space entry requires a permit, atmosphere control, and a surveillance/watch person — no exceptions." },
    { question: "Can machine guards be removed?", options: ["Yes, if the job is easier to complete", "Yes, if you put them back afterwards", "Only if authorised and the equipment has been isolated", "Yes, if no one is watching"], correctIndex: 2, feedback: "Machine guards must remain in place. Guards may only be removed if authorised and the equipment has been properly isolated." },
    { question: "Who must you report a near miss or unsafe condition to?", options: ["Fix it yourself and say nothing", "Your own supervisor only", "Your site contact at Albioma immediately", "Write it in a notebook for later"], correctIndex: 2, feedback: "All near misses, hazards, and unsafe conditions must be reported immediately to your Albioma site contact." },
    { question: "What is Albioma's policy on drugs and alcohol on site?", options: ["A breathalyser test is required each morning", "Zero tolerance — no drugs or alcohol permitted on site", "Allowed in small amounts after hours", "Only applies to machinery operators"], correctIndex: 1, feedback: "Zero tolerance. No drugs or alcohol are permitted on site at any time for any person." },
  ],
  passMark: 80,
  inductionCheckURL: "/api/induction-check",
  webhookURL: "/api/induction-submit",
  docUploadURL: "/api/doc-upload",
  sharePointFolder: "Contractor Documents",
};

const SIGNIN_WEBHOOK_URL = "/api/signin";

function todayISO(){const n=new Date(),p=x=>String(x).padStart(2,"0");return `${n.getFullYear()}-${p(n.getMonth()+1)}-${p(n.getDate())}`}
function timeNow(){const n=new Date(),p=x=>String(x).padStart(2,"0");return `${p(n.getHours())}:${p(n.getMinutes())}`}
function genId(){return crypto.randomUUID?crypto.randomUUID():'ind_'+Date.now().toString(36)+Math.random().toString(36).slice(2)}

const STORE_KEY = "tuan_biomass_site_register_v4";
const SIGNIN_URL = "/signin/";
function loadLocalRecords(){try{return JSON.parse(localStorage.getItem(STORE_KEY))||[]}catch(e){return[]}}
function saveLocalRecords(r){localStorage.setItem(STORE_KEY, JSON.stringify(r))}

// ── Prefill from sign-in redirect (name, company, mobile, rego) ───────────────
const urlParams = new URLSearchParams(window.location.search);
const incomingRego = urlParams.get("rego") || "";
const cameFromSiteSignIn = urlParams.get("return") === "site-register";
window.addEventListener("DOMContentLoaded", () => {
  const n = urlParams.get("name"), c = urlParams.get("company"), m = urlParams.get("mobile");
  if (n) document.getElementById("name").value = n;
  if (c) document.getElementById("company").value = c;
  if (m) document.getElementById("phone").value = m;
});



const TOTAL_SCREENS = 9;
let contractor = {};
let currentScreen = 0;
let currentQ = 0;
let answers = [];
let quizAnswered = false;

const ACK_ITEMS = [
  "I have received and read Albioma's Golden Rules.",
  "I have received and read the General Workplace Safety Rules including site access, PPE, permits, emergency procedures, and reporting requirements.",
  "I have received and read the Site Safety Rules.",
  "I understand I must follow the Albioma work permit system for hot work and confined space entry.",
  "I have reviewed the PPE zone requirements and will supply task-specific PPE as identified in my risk assessments.",
  "I have received emergency procedure information including the muster point, first aid location, alarm process, and fire extinguisher locations.",
];

// ── Init ──────────────────────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("passMarkDisplay").textContent = CONFIG.passMark;
  document.getElementById("siteEmPhone").textContent    = CONFIG.emergency.site;
  document.getElementById("musterPoint").textContent    = CONFIG.emergency.musterPoint;
  document.getElementById("firstAidLoc").textContent    = CONFIG.emergency.firstAid;
  document.getElementById("fireExLoc").textContent      = CONFIG.emergency.fireEx;
  document.getElementById("uhfChannel").textContent     = CONFIG.emergency.uhfChannel;

  const cg = document.getElementById("contactGrid");
  CONFIG.contacts.forEach(c => {
    cg.innerHTML += `<div class="contact-card"><div class="role">${c.role}</div><div class="name">${c.name}</div><div class="detail">${c.phone}<br>${c.email}</div></div>`;
  });

  const gr = document.getElementById("goldenRulesList");
  CONFIG.goldenRules.forEach((r,i) => {
    gr.innerHTML += `<li><span class="rule-num golden">${i+1}</span><div><strong>${r.title}</strong><br><span style="color:#6b7280;font-size:14px">${r.detail}</span></div></li>`;
  });

  const sr = document.getElementById("siteRulesList");
  CONFIG.siteRules.forEach((r,i) => { sr.innerHTML += `<li><span class="rule-num site">${i+1}</span><div>${r}</div></li>`; });

  const hz = document.getElementById("hazardsList");
  CONFIG.hazards.forEach(h => { hz.innerHTML += `<li><span class="rule-num hazard">!</span><div>${h}</div></li>`; });

  const pz = document.getElementById("ppeZoneList");
  CONFIG.ppeZones.forEach(z => {
    pz.innerHTML += `<div style="border-left:4px solid ${z.color};background:#f8f6f1;padding:12px 16px;border-radius:0 8px 8px 0;margin-bottom:10px">
      <strong style="color:${z.color};font-family:Barlow Condensed,sans-serif;font-size:15px">${z.zone}</strong>
      <div style="font-size:14px;margin-top:4px;color:#374151">${z.items.join(" · ")}</div>
    </div>`;
  });

  const ac = document.getElementById("ackChecklist");
  ACK_ITEMS.forEach((item,i) => {
    ac.innerHTML += `<li><input type="checkbox" id="ack${i}"><label for="ack${i}" style="cursor:pointer">${item}</label></li>`;
  });

  // Initialise one blank row per section
  addDocumentRow("licence");
  addDocumentRow("risk");
  addDocumentRow("insurance");

  updateProgress();

  if (cameFromSiteSignIn) {
    document.getElementById("closeBtn").textContent = "Return to Site Register";
  }
  document.getElementById("homeBtn").addEventListener("click", () => {
    if (cameFromSiteSignIn) { window.location.href = SIGNIN_URL; return; }
    location.reload();
  });
  document.getElementById("closeBtn").addEventListener("click", () => {
    if (cameFromSiteSignIn) { window.location.href = SIGNIN_URL; return; }
    window.close();
    // Some browsers block window.close() on tabs not opened by script — fall back to a message.
    setTimeout(() => {
      if (!window.closed) {
        document.getElementById("sheetStatus").textContent = "You can now close this tab.";
      }
    }, 300);
  });
});

// ── Screen navigation ─────────────────────────────────────────────────────────
function goTo(n) {
  document.getElementById("screen-" + currentScreen).classList.remove("active");
  currentScreen = n;
  document.getElementById("screen-" + currentScreen).classList.add("active");
  updateProgress();
  window.scrollTo({ top: 0, behavior: "smooth" });
  if (n === 7) loadQuestion(0);
}

function updateProgress() {
  const pct = Math.round((currentScreen / (TOTAL_SCREENS - 1)) * 100);
  document.getElementById("progressFill").style.width = pct + "%";
  const labels = ["Registration","Emergency & Contacts","Golden Rules","Site Rules","Hazards & PPE","SWMS","Documents & Acknowledgement","Quiz","Complete"];
  document.getElementById("progressLabel").textContent = labels[currentScreen] || "";
}

function normaliseMobile(m){ return m.replace(/\D/g,""); }

async function autofillFromMobile(mobile) {
  mobile = mobile.trim();
  if (mobile.length < 8) return;
  const hint = document.getElementById("autofillHint");
  hint.innerHTML = "<span style='color:#6b7280'>Looking up contractor details...</span>";
  try {
    const res = await fetch(CONFIG.inductionCheckURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mobile_number: mobile, person_id: mobile, lookup_only: "true" })
    });
    if (!res.ok) { hint.innerHTML = ""; return; }
    const data = await res.json();
    if (data.full_name) {
      document.getElementById("name").value = data.full_name || "";
      document.getElementById("company").value = data.company || "";
      if (data.company_contact_name)   document.getElementById("companyContactName").value   = data.company_contact_name;
      if (data.company_contact_mobile) document.getElementById("companyContactMobile").value = data.company_contact_mobile;
      if (data.company_contact_email)  document.getElementById("companyContactEmail").value  = data.company_contact_email;
      if (data.emergency_name)         document.getElementById("emergencyName").value         = data.emergency_name;
      if (data.emergency_relationship) document.getElementById("emergencyRelationship").value = data.emergency_relationship;
      if (data.emergency_phone)        document.getElementById("emergencyPhone").value        = data.emergency_phone;
      hint.innerHTML = "<span style='color:#2D6A4F'>✓ Details filled from contractor register — please check and update if needed</span>";
    } else {
      hint.innerHTML = "<span style='color:#6b7280'>No existing record found — please enter details manually</span>";
    }
  } catch(e) {
    hint.innerHTML = "";
    console.warn("Autofill lookup failed:", e);
  }
}

function startInduction() {
  const name                 = document.getElementById("name").value.trim();
  const co                   = document.getElementById("company").value.trim();
  const emergencyName        = document.getElementById("emergencyName").value.trim();
  const emergencyRelationship= document.getElementById("emergencyRelationship").value.trim();
  const emergencyPhone       = document.getElementById("emergencyPhone").value.trim();
  if (!name || !co) { alert("Please enter your name and company before continuing."); return; }
  if (!emergencyName || !emergencyRelationship || !emergencyPhone) { alert("Please enter the emergency contact name, relationship, and phone number before continuing."); return; }
  contractor = {
    name, company: co,
    trade:                document.getElementById("trade").value.trim(),
    companyContactName:   document.getElementById("companyContactName").value.trim(),
    companyContactMobile: document.getElementById("companyContactMobile").value.trim(),
    companyContactEmail:  document.getElementById("companyContactEmail").value.trim(),
    phone:                document.getElementById("phone").value.trim(),
    emergencyName, emergencyRelationship, emergencyPhone,
    dates: document.getElementById("dates").value.trim(),
    tasks: document.getElementById("tasks").value.trim(),
  };
  goTo(1);
}

function proceedToQuiz() {
  const unchecked = ACK_ITEMS.map((_,i) => document.getElementById("ack"+i).checked).filter(v => !v).length;
  if (unchecked > 0) { alert("Please tick all acknowledgement boxes before proceeding to the quiz."); return; }
  contractor.docNotes = document.getElementById("docNotes").value.trim() || "—";
  goTo(7);
}

// ── Document upload (matches site register) ───────────────────────────────────
function escapeHTML(str) {
  return String(str||"").replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
}

// Prevents Excel/CSV formula injection when text values are opened in Excel.
// Skips content_base64 so file attachment data is never altered.
function stripFormulaChars(key, value) {
  if (key === "content_base64") return value;
  if (typeof value === "string" && /^[=+\-@]/.test(value)) return "'" + value;
  return value;
}

// Blocks oversized files before they're queued for upload.
const MAX_FILE_MB = 20;
function enforceFileSizeLimit(input) {
  if (!input || !input.files || !input.files.length) return;
  const files = [...input.files];
  const oversized = files.filter(f => f.size > MAX_FILE_MB * 1024 * 1024);
  if (oversized.length) {
    alert(`These files exceed ${MAX_FILE_MB}MB and were not added: ` + oversized.map(f => f.name).join(", "));
    const dt = new DataTransfer();
    files.filter(f => f.size <= MAX_FILE_MB * 1024 * 1024).forEach(f => dt.items.add(f));
    input.files = dt.files;
  }
}

function documentTypeOptions(category) {
  const options = {
    risk:      ["SWMS","JSA / Risk Assessment","Other Document"],
    insurance: ["Public Liability Insurance","Workers Compensation Insurance"],
    licence:   ["High Risk Work Licence","Driver Licence","Front End Loader Licence","Telehandler Licence","Working at Heights Certificate","Confined Space Certificate","Trade Certificate"]
  };
  return `<option value="">Select...</option>${options[category].map(v => `<option>${escapeHTML(v)}</option>`).join("")}`;
}

function sectionRowsId(category) {
  return category === "risk" ? "riskRows" : category === "insurance" ? "insuranceRows" : "licenceRows";
}

function hrwlCodeBoxes() {
  const codes = ["LF","LO","DG","RB","RI","RA","SB","SI","SA","WP","CB","CD","CN","C2","C6","C1","C0","CP","CT","CS","CV","HM","HP","RS","PB","BS","BA","ES","TO"];
  return codes.map(code => `<label class="hrwl-code" title="${code}"><input type="checkbox" class="hrwl-code-check" value="${code}">${code}</label>`).join("");
}

function addDocumentRow(category) {
  const container = document.getElementById(sectionRowsId(category));
  const rowId = `doc_${category}_${Date.now()}_${Math.floor(Math.random()*10000)}`;
  const div = document.createElement("div");
  div.className = "doc-row document-row";
  div.dataset.rowId = rowId;
  div.dataset.category = category;
  div.innerHTML = `
    <div class="doc-field">
      <label>Type *</label>
      <select class="doc-type" data-action="doc-type-change">${documentTypeOptions(category)}</select>
    </div>
    <div class="doc-field expiry-wrap" style="display:none;">
      <label>Expiry Date *</label>
      ${category === "insurance" ? `
      <div style="display:flex;gap:8px;">
        <select class="doc-expiry-day" data-action="sync-expiry" style="flex:1;padding:10px 12px;border:1.5px solid var(--border);border-radius:8px;font-family:'Barlow',sans-serif;font-size:14px;background:#fff;">
          <option value="">Day</option>
          ${Array.from({length:31},(_,i)=>i+1).map(d=>`<option value="${String(d).padStart(2,'0')}">${d}</option>`).join("")}
        </select>
        <select class="doc-expiry-month" data-action="sync-expiry" style="flex:1;padding:10px 12px;border:1.5px solid var(--border);border-radius:8px;font-family:'Barlow',sans-serif;font-size:14px;background:#fff;">
          <option value="">Month</option>
          <option value="01">Jan</option><option value="02">Feb</option><option value="03">Mar</option>
          <option value="04">Apr</option><option value="05">May</option><option value="06">Jun</option>
          <option value="07">Jul</option><option value="08">Aug</option><option value="09">Sep</option>
          <option value="10">Oct</option><option value="11">Nov</option><option value="12">Dec</option>
        </select>
        <select class="doc-expiry-year" data-action="sync-expiry" style="flex:1;padding:10px 12px;border:1.5px solid var(--border);border-radius:8px;font-family:'Barlow',sans-serif;font-size:14px;background:#fff;">
          <option value="">Year</option>
          ${Array.from({length:15},(_,i)=>2026+i).map(y=>`<option value="${y}">${y}</option>`).join("")}
        </select>
      </div>
      ` : `
      <div style="display:flex;gap:8px;">
        <select class="doc-expiry-month" data-action="sync-expiry" style="flex:1;padding:10px 12px;border:1.5px solid var(--border);border-radius:8px;font-family:'Barlow',sans-serif;font-size:14px;background:#fff;">
          <option value="">Month</option>
          <option value="01">January</option><option value="02">February</option><option value="03">March</option>
          <option value="04">April</option><option value="05">May</option><option value="06">June</option>
          <option value="07">July</option><option value="08">August</option><option value="09">September</option>
          <option value="10">October</option><option value="11">November</option><option value="12">December</option>
        </select>
        <select class="doc-expiry-year" data-action="sync-expiry" style="flex:1;padding:10px 12px;border:1.5px solid var(--border);border-radius:8px;font-family:'Barlow',sans-serif;font-size:14px;background:#fff;">
          <option value="">Year</option>
          ${Array.from({length:15},(_,i)=>2026+i).map(y=>`<option value="${y}">${y}</option>`).join("")}
        </select>
      </div>
      `}
      <input type="hidden" class="doc-expiry">
    </div>
    <div class="doc-field">
      <label>Upload Document / Take Photos *</label>
      <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:6px;">
        <label class="file-btn">File<input type="file" class="doc-files" multiple accept="image/*,.pdf,.doc,.docx" style="display:none" data-action="show-selected-files" data-source="file"></label>
        <label class="file-btn">Camera<input type="file" class="doc-camera" accept="image/*" capture="environment" style="display:none" data-action="show-selected-files" data-source="camera"></label>
      </div>
      <div class="file-list" id="files_${rowId}">No documents selected.</div>
    </div>
    <div class="doc-field">
      <button class="btn btn-secondary doc-remove" data-action="remove-document-row">Remove</button>
    </div>
    <div class="extra-field public-liability-field" style="display:none;">
      <label>Public Liability Policy Number *</label>
      <input type="text" class="policy-number" placeholder="Enter policy number">
      <label>Coverage Amount *</label>
      <input type="text" class="coverage-amount" placeholder="e.g. $20 million">
    </div>
    <div class="extra-field workers-comp-field" style="display:none;">
      <label>Workers Compensation Policy Number *</label>
      <input type="text" class="policy-number" placeholder="Enter policy number">
    </div>
    <div class="hrwl-field" style="display:none;">
      <label>High Risk Work Licence Classes *</label>
      <div class="hrwl-note">Select the two-letter HRWL codes shown on the licence card.</div>
      <div class="hrwl-code-grid">${hrwlCodeBoxes()}</div>
    </div>
  `;
  container.appendChild(div);
}

function syncExpiry(el) {
  const wrap  = el.closest(".expiry-wrap");
  if (!wrap) return;
  const month = wrap.querySelector(".doc-expiry-month") ? wrap.querySelector(".doc-expiry-month").value : "";
  const year  = wrap.querySelector(".doc-expiry-year")  ? wrap.querySelector(".doc-expiry-year").value  : "";
  const dayEl = wrap.querySelector(".doc-expiry-day");
  const day   = dayEl ? (dayEl.value || "01") : "01";
  wrap.querySelector(".doc-expiry").value = (year && month) ? `${year}-${month}-${day}` : "";
}

function handleDocumentTypeChange(rowId) {
  const row = document.querySelector(`.document-row[data-row-id="${rowId}"]`);
  if (!row) return;
  const val      = row.querySelector(".doc-type").value;
  const category = row.dataset.category;
  const expiryWrap = row.querySelector(".expiry-wrap");
  const expiryInput= row.querySelector(".doc-expiry");
  const pubLiab  = row.querySelector(".public-liability-field");
  const workComp = row.querySelector(".workers-comp-field");
  const hrwl     = row.querySelector(".hrwl-field");

  expiryWrap.style.display = "none";
  pubLiab.style.display    = "none";
  workComp.style.display   = "none";
  hrwl.style.display       = "none";

  if (category === "insurance") {
    if (val === "Public Liability Insurance")      { expiryWrap.style.display = "block"; pubLiab.style.display  = "block"; }
    if (val === "Workers Compensation Insurance")  { expiryWrap.style.display = "block"; workComp.style.display = "block"; }
  }
  if (category === "licence" && val === "High Risk Work Licence") {
    expiryWrap.style.display = "block";
    hrwl.style.display = "block";
  }
  if (expiryWrap.style.display === "none") {
    expiryInput.value = "";
    const mSel = expiryWrap.querySelector(".doc-expiry-month");
    const ySel = expiryWrap.querySelector(".doc-expiry-year");
    if (mSel) mSel.value = "";
    if (ySel) ySel.value = "";
  }
}

function removeDocumentRow(rowId) {
  const row = document.querySelector(`.document-row[data-row-id="${rowId}"]`);
  if (!row) return;
  const category = row.dataset.category;
  const rows = [...document.querySelectorAll(`.document-row[data-category="${category}"]`)];
  if (rows.length <= 1) { alert("Keep at least one row per section. Leave it blank if that section does not apply."); return; }
  row.remove();
  updateQueueSummary();
}

function showSelectedFiles(rowId, source) {
  const row = document.querySelector(`.document-row[data-row-id="${rowId}"]`);
  if (!row) return;
  const input = source === "camera" ? row.querySelector(".doc-camera") : row.querySelector(".doc-files");
  enforceFileSizeLimit(input);
  const files = [...(input.files || [])];
  document.getElementById(`files_${rowId}`).innerHTML = files.length
    ? files.map(f => `${escapeHTML(f.name)} — ${(f.size/1024/1024).toFixed(2)} MB`).join("<br>")
    : "No documents selected.";
  updateQueueSummary();
}

function updateQueueSummary() {
  const items = [];
  const rows = [...document.querySelectorAll(".document-row")];
  rows.forEach(row => {
    const docType  = row.querySelector(".doc-type").value.trim();
    const fileInput = row.querySelector(".doc-files");
    const camInput  = row.querySelector(".doc-camera");
    const files = (fileInput && fileInput.files && fileInput.files.length) ? [...fileInput.files]
                : (camInput  && camInput.files  && camInput.files.length)  ? [...camInput.files] : [];
    if (docType && files.length) {
      files.forEach(f => items.push(`<span style="color:var(--green-dark);font-weight:600;">${escapeHTML(docType)}</span> — ${escapeHTML(f.name)}`));
    }
  });
  const summary   = document.getElementById("queueSummary");
  const empty     = document.getElementById("queueEmpty");
  const queueList = document.getElementById("queueList");
  if (items.length) {
    queueList.innerHTML   = items.join("<br>");
    summary.style.display = "block";
    empty.style.display   = "none";
  } else {
    summary.style.display = "none";
    empty.style.display   = "block";
  }
}

// ── Quiz ──────────────────────────────────────────────────────────────────────
function loadQuestion(index) {
  currentQ = index;
  quizAnswered = false;
  const q = CONFIG.quiz[index];
  document.getElementById("quizCounter").textContent  = `Question ${index + 1} of ${CONFIG.quiz.length}`;
  document.getElementById("quizQuestion").textContent = q.question;
  document.getElementById("quizFeedback").className   = "quiz-feedback";
  document.getElementById("quizFeedback").textContent = "";
  document.getElementById("quizNextBtn").style.display = "none";
  const opts = document.getElementById("quizOptions");
  opts.innerHTML = "";
  q.options.forEach((opt,i) => {
    const div = document.createElement("div");
    div.className = "option";
    div.textContent = opt;
    div.onclick = () => selectAnswer(i);
    opts.appendChild(div);
  });
}

function selectAnswer(i) {
  if (quizAnswered) return;
  quizAnswered = true;
  answers[currentQ] = i;
  const q = CONFIG.quiz[currentQ];
  const opts = document.querySelectorAll(".option");
  opts[i].classList.add(i === q.correctIndex ? "correct" : "wrong");
  if (i !== q.correctIndex) opts[q.correctIndex].classList.add("reveal-correct");
  const fb = document.getElementById("quizFeedback");
  fb.textContent = (i === q.correctIndex ? "✓ Correct. " : "✗ Incorrect. ") + q.feedback;
  fb.className = "quiz-feedback show " + (i === q.correctIndex ? "pass" : "fail");
  const btn = document.getElementById("quizNextBtn");
  btn.style.display = "inline-flex";
  btn.textContent = currentQ === CONFIG.quiz.length - 1 ? "See Results →" : "Next Question →";
}

function nextQuestion() {
  if (currentQ < CONFIG.quiz.length - 1) { loadQuestion(currentQ + 1); } else { showResult(); }
}

// ── File helper ───────────────────────────────────────────────────────────────
function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload  = () => resolve(reader.result.split(",")[1]);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// ── Show result & submit ──────────────────────────────────────────────────────
function showResult() {
  const correct = answers.filter((a,i) => a === CONFIG.quiz[i].correctIndex).length;
  const pct     = Math.round((correct / CONFIG.quiz.length) * 100);
  const passed  = pct >= CONFIG.passMark;

  if (!passed) {
    const fb = document.getElementById("quizFeedback");
    fb.textContent = "You did not reach " + CONFIG.passMark + "%. Please complete the quiz again.";
    fb.className = "quiz-feedback show fail";
    document.getElementById("quizNextBtn").style.display = "none";
    setTimeout(() => { answers = []; loadQuestion(0); window.scrollTo({ top: 0, behavior: "smooth" }); }, 2500);
    return;
  }

  const now     = new Date();
  const dateStr = now.toLocaleDateString("en-AU", {day:"2-digit",month:"2-digit",year:"numeric"});
  const timeStr = now.toLocaleTimeString("en-AU", {hour:"2-digit",minute:"2-digit"});
  goTo(8);
  document.getElementById("resultBadge").textContent = "✓";
  document.getElementById("resultBadge").className   = "result-badge pass";
  document.getElementById("resultScore").textContent = pct + "%";
  document.getElementById("resultLabel").textContent = correct + " of " + CONFIG.quiz.length + " correct";
  document.getElementById("recordBox").innerHTML = `
    <strong>Name</strong>${contractor.name}
    <strong>Company</strong>${contractor.company}
    <strong>Trade / Role</strong>${contractor.trade || "—"}
    <strong>Company Contact</strong>${contractor.companyContactName || "—"}
    <strong>Company Contact Mobile</strong>${contractor.companyContactMobile || "—"}
    <strong>Company Contact Email</strong>${contractor.companyContactEmail || "—"}
    <strong>Phone</strong>${contractor.phone || "—"}
    <strong>Emergency Contact</strong>${contractor.emergencyName || "—"} (${contractor.emergencyRelationship || "—"})
    <strong>Emergency Contact Phone</strong>${contractor.emergencyPhone || "—"}
    <strong>Planned Date(s)</strong>${contractor.dates || "—"}
    <strong>High Risk Tasks</strong>${contractor.tasks || "—"}
    <strong>Document Notes</strong>${contractor.docNotes || "—"}
    <strong>Date Inducted</strong>${dateStr} at ${timeStr}
    <strong>Result</strong>✅ PASSED (${pct}%)
    <strong>Site</strong>${CONFIG.siteName}
  `;
  document.getElementById("resultMsg").textContent = cameFromSiteSignIn
    ? "Induction complete — you're signed in and on today's site register."
    : "Induction complete. Please confirm sign-in with site personnel before commencing work.";

  sendToFlow({ name: contractor.name, company: contractor.company, trade: contractor.trade,
    company_contact_name: contractor.companyContactName, company_contact_mobile: contractor.companyContactMobile,
    company_contact_email: contractor.companyContactEmail, phone: contractor.phone,
    emergency_name: contractor.emergencyName, emergency_relationship: contractor.emergencyRelationship,
    emergency_phone: contractor.emergencyPhone, dates: contractor.dates, tasks: contractor.tasks,
    doc_notes: contractor.docNotes, date: dateStr, time: timeStr, score: pct, result: "PASSED", site: CONFIG.siteName });
}

async function sendToFlow(data) {
  const el = document.getElementById("sheetStatus");
  el.textContent = "Submitting induction record…";
  const personId = (data.phone || "").replace(/\D/g, "");

  // Collect documents from all three sections
  const uploadDocuments = [];
  const docList = [];
  const rows = [...document.querySelectorAll(".document-row")];

  for (const row of rows) {
    const category    = row.dataset.category;
    const doc_type    = row.querySelector(".doc-type").value.trim();
    const expiry_date = row.querySelector(".doc-expiry").value;
    const hrwl_classes = [...row.querySelectorAll(".hrwl-code-check:checked")].map(i => i.value).join(", ");
    const pubLiabEl   = row.querySelector(".public-liability-field .policy-number");
    const workCompEl  = row.querySelector(".workers-comp-field .policy-number");
    const coverageEl  = row.querySelector(".coverage-amount");
    const policy_number   = (doc_type === "Public Liability Insurance" ? pubLiabEl?.value.trim() : workCompEl?.value.trim()) || "";
    const coverage_amount = coverageEl?.value.trim() || "";

    const fileInput = row.querySelector(".doc-files");
    const camInput  = row.querySelector(".doc-camera");
    const files = (fileInput && fileInput.files && fileInput.files.length) ? [...fileInput.files]
                : (camInput  && camInput.files  && camInput.files.length)  ? [...camInput.files] : [];
    if (!doc_type || !files.length) continue;

    const attachments = [];
    for (const file of files) {
      docList.push(doc_type + " (" + file.name + ")");
      try {
        const base64 = await fileToBase64(file);
        attachments.push({ file_name: file.name, content_type: file.type || "application/octet-stream", size: file.size, content_base64: base64 });
      } catch(e) { console.warn("Could not read file", file.name, e); }
    }
    if (attachments.length) {
      uploadDocuments.push({ category, document_type: doc_type, expiry_date, licence_class: hrwl_classes, policy_number, coverage_amount, attachments });
    }
  }

  const inductionPayload = {
    induction_type:         "Contractor General",
    document_no:            "ID-002-2025-v3.0",
    person_id:              personId,
    name:                   data.name,
    company:                data.company,
    trade:                  data.trade || "",
    company_contact_name:   data.company_contact_name || "",
    company_contact_mobile: data.company_contact_mobile || "",
    company_contact_email:  data.company_contact_email || "",
    phone:                  data.phone || "",
    emergency_name:         data.emergency_name || "",
    emergency_relationship: data.emergency_relationship || "",
    emergency_phone:        data.emergency_phone || "",
    planned_dates:          data.dates || "",
    high_risk_tasks:        data.tasks || "",
    documents_submitted:    docList.length ? docList.join("; ") : "None",
    document_notes:         data.doc_notes || "",
    date_inducted:          data.date,
    time_inducted:          data.time,
    score:                  data.score,
    result:                 data.result,
    acknowledged:           true,
    site:                   data.site,
    sharepoint_folder:      CONFIG.sharePointFolder,
    submitted_at:           new Date().toISOString(),
  };

  const uploadPayload = uploadDocuments.length ? {
    type:          "document_upload",
    record_id:     personId,
    person_id:     personId,
    mobile_number: data.phone,
    full_name:     data.name,
    company:       data.company,
    company_email: data.company_contact_email || "",
    notes:         "Uploaded during contractor induction — ID-002-2025-v3.0",
    uploaded_at:   new Date().toISOString(),
    documents:     uploadDocuments
  } : null;

  const inductionFetch = fetch(CONFIG.webhookURL, { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(inductionPayload, stripFormulaChars) });
  const uploadFetch    = uploadPayload ? fetch(CONFIG.docUploadURL, { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(uploadPayload, stripFormulaChars) }) : Promise.resolve(null);
  const [inductionResult, uploadResult] = await Promise.allSettled([inductionFetch, uploadFetch]);

  const inductionOk = inductionResult.status === "fulfilled" && (inductionResult.value.ok || inductionResult.value.status === 202);
  const uploadOk    = !uploadPayload || (uploadResult.status === "fulfilled" && uploadResult.value && (uploadResult.value.ok || uploadResult.value.status === 202));

  if (inductionOk) {
    el.textContent = uploadPayload ? "✓ Induction record and documents submitted successfully." : "✓ Induction record submitted successfully.";
  } else {
    el.textContent = "⚠ Submission failed. Please advise site management manually.";
  }
  if (inductionOk && !uploadOk) {
    el.textContent += " ⚠ Document upload failed — please bring originals to the site office.";
  }

  if (inductionOk && cameFromSiteSignIn) {
    const signInRecord = {
      id: genId(), entry_id: "", type: "sign_in", person_id: personId,
      mobile_number: data.phone, status: "on_site", induction_valid: "Y",
      date: todayISO(), full_name: data.name, company: data.company,
      arrival_time: timeNow(), departure_time: "", hours_on_site: "",
      inducted_previously: "yes", visitor: "N", access_type: "yes",
      escorted_only: false, site_contact_responsible: "",
      vehicle_rego: incomingRego, tickets_uploaded: [],
      safety_issue: "", issue_details: "", notes: "Auto-signed-in after induction",
      signed_in_at: new Date().toISOString(), signed_out_at: ""
    };
    fetch(SIGNIN_WEBHOOK_URL, { method: "POST", headers: {"Content-Type":"application/json"}, body: JSON.stringify({type:"sign_in", ...signInRecord}, stripFormulaChars) })
      .catch(e => console.warn("Auto sign-in failed:", e));

    const localRecords = loadLocalRecords();
    localRecords.push(signInRecord);
    saveLocalRecords(localRecords);

    el.textContent += " Returning you to the site register...";
    setTimeout(() => { window.location.href = SIGNIN_URL; }, 2200);
  }
}


/* ---- CSP-safe event bindings (auto-generated) ---- */
document.querySelector('[data-csp-hook="cspHook1"]').addEventListener("error", function(event) {
  this.style.display='none'
});

document.querySelector('[data-csp-hook="cspHook2"]').addEventListener("blur", function(event) {
  autofillFromMobile(this.value)
});

document.querySelector('[data-csp-hook="cspHook3"]').addEventListener("click", function(event) {
  startInduction()
});

document.querySelector('[data-csp-hook="cspHook4"]').addEventListener("click", function(event) {
  goTo(2)
});

document.querySelector('[data-csp-hook="cspHook5"]').addEventListener("click", function(event) {
  goTo(1)
});

document.querySelector('[data-csp-hook="cspHook6"]').addEventListener("click", function(event) {
  goTo(3)
});

document.querySelector('[data-csp-hook="cspHook7"]').addEventListener("click", function(event) {
  goTo(2)
});

document.querySelector('[data-csp-hook="cspHook8"]').addEventListener("click", function(event) {
  goTo(4)
});

document.querySelector('[data-csp-hook="cspHook9"]').addEventListener("click", function(event) {
  goTo(3)
});

document.querySelector('[data-csp-hook="cspHook10"]').addEventListener("click", function(event) {
  goTo(5)
});

document.querySelector('[data-csp-hook="cspHook11"]').addEventListener("click", function(event) {
  goTo(4)
});

document.querySelector('[data-csp-hook="cspHook12"]').addEventListener("click", function(event) {
  goTo(6)
});

document.querySelector('[data-csp-hook="cspHook13"]').addEventListener("click", function(event) {
  addDocumentRow('licence')
});

document.querySelector('[data-csp-hook="cspHook14"]').addEventListener("click", function(event) {
  addDocumentRow('risk')
});

document.querySelector('[data-csp-hook="cspHook15"]').addEventListener("click", function(event) {
  addDocumentRow('insurance')
});

document.querySelector('[data-csp-hook="cspHook16"]').addEventListener("click", function(event) {
  goTo(5)
});

document.querySelector('[data-csp-hook="cspHook17"]').addEventListener("click", function(event) {
  proceedToQuiz()
});

document.querySelector('[data-csp-hook="cspHook18"]').addEventListener("click", function(event) {
  nextQuestion()
});

document.querySelector('[data-csp-hook="cspHook19"]').addEventListener("click", function(event) {
  window.print()
});


/* ---- CSP-safe delegated event handling for dynamically-rendered document rows ---- */
document.addEventListener("change", function(event) {
  const target = event.target.closest("[data-action]");
  if (!target) return;

  const action = target.dataset.action;
  const row = target.closest(".document-row");
  const rowId = row ? row.dataset.rowId : null;

  if (action === "doc-type-change") {
    handleDocumentTypeChange(rowId);
  } else if (action === "sync-expiry") {
    syncExpiry(target);
  } else if (action === "show-selected-files") {
    showSelectedFiles(rowId, target.dataset.source);
  }
});

document.addEventListener("click", function(event) {
  const target = event.target.closest("[data-action]");
  if (!target) return;

  const action = target.dataset.action;
  const row = target.closest(".document-row");
  const rowId = row ? row.dataset.rowId : null;

  if (action === "remove-document-row") {
    removeDocumentRow(rowId);
  }
});
