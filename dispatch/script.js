
const CONFIG = {
  siteName:    "Tuan Biomass",
  siteAddress: "Tuan, Queensland",
  contacts: [
    { role: "Plant Manager",         name: "David Knight",    phone: "0439 013 224" },
    { role: "Safety Manager",        name: "Chris Foster",    phone: "0478 774 434" },
  ],
  siteRules_tuan: [
    "Contact the loader operator on Channel 34 before entering the site.",
    "The loader operator has control of traffic movements. Follow their directions at all times.",
    "All vehicles must travel clockwise around the ring road at all times.",
    "Maximum speed limit is 10 km/h at all times.",
    "All workers must remain at least 6 metres from the loader while it is in operation.",
    "Mobile phone use is prohibited while driving or walking.",
    "Drivers must remain in their vehicle until positioned under the truck silos.",
    "If a second pellet truck arrives, the driver must park in the designated waiting bay between the concrete barriers and the shipping container.",
    "Un-tarping is only permitted under the truck silos. Once un-tarped, proceed to the shed and locate a worker for loading.",
    "Loading is coordinated on Channel 34 or 35 as directed by site workers.",
    "If no operator is found in the test room, return to your truck and use the radio to call for operators.",
    "Do not wander around the site without an authorised site worker present.",
    "Report all hazards, near misses, and incidents immediately to the site office or on-shift operator.",
  ],
  hazards: [
    { hazard: "Being struck by moving plant", controls: ["Maximum speed 10 km/h within the work area.","All plant warning devices (flashing lights, reversing beepers) must be checked and operational before use.","All workers must wear high-visibility garments.","Mobile phone use prohibited while driving or walking.","Trucks must circulate clockwise around the ring road.","All drivers must use Channel 35 for communication.","Second pellet truck must park in the designated waiting area.","All trucks must give way to the loader."] },
    { hazard: "Being caught between plant and structures", controls: ["Workers must stand in safe areas, away from structures when near moving trucks.","Driver must maintain awareness of worker and pedestrian traffic in the work area."] },
    { hazard: "Worker / pedestrian not visible to plant operators", controls: ["All workers must wear high-visibility garments.","Workers must gain the driver's attention before moving near vehicles or plant.","All workers must monitor work areas and stop work if imminent risks are identified."] },
    { hazard: "Trucks entering pedestrian traffic areas", controls: ["Drivers must be constantly aware of worker and pedestrian traffic.","Drivers must check for workers and others before moving any plant."] },
    { hazard: "Overhead obstructions (storage facility)", controls: ["Check for overhead obstructions before raising the tipper.","Ensure the truck is clear of building structures before tipping.","Do not stand near or under a raised tipper body."] },
  ],
  quiz: [
    { question: "What UHF channel must drivers use before entering the Tuan site?", options: ["Channel 22","Channel 34","Channel 35","Channel 40"], correct: 1, feedback: "All drivers must contact the loader operator on Channel 34 before entering the Tuan site." },
    { question: "What direction must all vehicles travel on the ring road?", options: ["Anti-clockwise","Clockwise","Either direction","Only trucks go clockwise"], correct: 1, feedback: "All vehicles must travel clockwise around the ring road at all times." },
    { question: "What is the maximum speed limit within the ring road?", options: ["5 km/h","10 km/h","20 km/h","30 km/h"], correct: 1, feedback: "The maximum speed limit is 10 km/h within the work area at all times." },
    { question: "When are pellet truck drivers allowed to exit their truck at the Tuan site?", options: ["As soon as they enter the ring road","Once directed by a site worker via radio","Once they are positioned under the truck silos","Whenever they need to"], correct: 2, feedback: "Drivers must remain in their vehicles until they are positioned under the truck silos." },
    { question: "If a second pellet truck arrives while the first is loading, what should the driver do?", options: ["Park anywhere convenient","Wait on the street","Park in the designated waiting bay between the concrete barriers and the shipping container","Proceed directly to the silos"], correct: 2, feedback: "The second truck must park in the designated waiting bay between the concrete barriers and the shipping container." },
    { question: "Before accessing the Port of Bundaberg Storage Facility, where must drivers complete an induction?", options: ["Tuan Biomass site office","STL's Bundaberg Bulk Sugar Terminal","Queensland Ports Authority","No induction is required"], correct: 1, feedback: "All drivers must complete an induction at STL's Bundaberg Bulk Sugar Terminal before entering the storage facility. Contact QSL-WPC on 0437 458 551." },
    { question: "What PPE must be worn at all times on Tuan Biomass sites?", options: ["Hi-vis vest and hard hat","Steel-cap boots and high-visibility clothing","Safety glasses and gloves","Reflective vest only"], correct: 1, feedback: "Steel-cap boots and high-visibility clothing must be worn at all times. Night shift requires hi-vis with reflective tape." },
    { question: "What PPE must be worn when positioned under the truck silos for loading?", options: ["No PPE is required while seated in the cab","Steel-cap boots and high-visibility clothing only, hard hat not required","Steel-cap boots, hard hat, and high-visibility clothing","Hi-vis vest only, hard hat optional if loading is quick"], correct: 2, feedback: "Steel-cap boots, a hard hat, and high-visibility clothing must be worn at all times when positioned under the truck silos." },
    { question: "Where is the emergency assembly point at the Tuan Biomass site?", options: ["Near the weighbridge","Inside the storage building","At the front gate","Southwest corner of the facility"], correct: 2, feedback: "The emergency assembly point is located at the front gate." },
    { question: "What is the policy on drugs and alcohol on site?", options: ["Allowed in small amounts after hours","Only applies to machinery operators","Zero tolerance — no drugs or alcohol permitted on site at any time","A breathalyser test is required each morning"], correct: 2, feedback: "Zero tolerance. The use of drugs and alcohol is strictly prohibited at all times. Random drug and alcohol testing is conducted on site." },
    { question: "What must you do after loading is complete?", options: ["Leave site immediately","Check the final truck scale weight","Park on the ring road","Contact your transport company"], correct: 1, feedback: "After loading, shake down the load and check the final truck scale weight before departure." },
    { question: "What must you do if the weighbridge indicates your vehicle may be overweight?", options: ["Continue and check it later","Leave if it is only slightly overweight","Return to the loading silos","Report the overload immediately"], correct: 3, feedback: "As soon as you become aware that the vehicle may be overweight, it must be reported immediately." },
    { question: "What number must you call to report an overloaded vehicle?", options: ["(07) 4123 4733","(07) 4123 4734","UHF Channel 34","000"], correct: 1, feedback: "Call (07) 4123 4734 as soon as you become aware of the overload." },
    { question: "If your vehicle is overloaded, can you tip off product?", options: ["Yes","No"], correct: 0, feedback: "Yes. Follow the Overweight Vehicle Procedure and tip off only in the designated area." },
    { question: "Can you leave the site if your vehicle is known to be overweight?", options: ["Yes","No"], correct: 1, feedback: "No. An overweight vehicle must not leave site. Follow the Overweight Vehicle Procedure until the load has been corrected and the vehicle is within its permitted weight." },
    { question: "Does your tarp need to be waterproof to be loaded at the Tuan site?", options: ["Yes","No"], correct: 0, feedback: "Yes. The tarp must be waterproof and capable of fully covering and securing the load before leaving site." },
    { question: "Can you climb onto the trailer to adjust the tarp?", options: ["Yes","No"], correct: 1, feedback: "No. Do not climb onto the trailer or load to adjust the tarp. Ask Tuan staff for assistance using mobile plant." },
  ],
  passMark: 80,
  inductionCheckURL: "/api/induction-check",
  webhookURL: "/api/induction-submit",
  docUploadURL: "/api/doc-upload",
  sharePointFolder: "Contractor Documents",
};

function normaliseMobile(m){ return m.replace(/[^0-9]/g,""); }

async function autofillFromMobile(mobile) {
  mobile = mobile.trim();
  if (mobile.length < 8) return;
  const hint = document.getElementById("autofillHint");
  hint.innerHTML = "<span style='color:#6b7280'>Looking up driver details...</span>";
  try {
    const res = await fetch(CONFIG.inductionCheckURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mobile_number: mobile, person_id: mobile, lookup_only: "true" })
    });
    if (!res.ok) { hint.innerHTML = ""; return; }
    const d = await res.json();
    if (d.full_name) {
      document.getElementById("driverName").value = d.full_name || "";
      document.getElementById("driverCompany").value = d.company || "";
      if (d.company_contact_name)   document.getElementById("companyContact").value       = d.company_contact_name;
      if (d.company_contact_mobile) document.getElementById("companyContactMobile").value = d.company_contact_mobile;
      if (d.company_contact_email)  document.getElementById("companyContactEmail").value  = d.company_contact_email;
      hint.innerHTML = "<span style='color:#2D6A4F'>Details filled from contractor register - please check and update if needed</span>";
    } else {
      hint.innerHTML = "<span style='color:#6b7280'>No existing record found - please enter details manually</span>";
    }
  } catch(e) {
    hint.innerHTML = "";
    console.warn("Autofill lookup failed:", e);
  }
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

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload  = () => resolve(reader.result.split(",")[1]);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}



// ── Init ──────────────────────────────────────────────────────────────────────
document.getElementById("headerTitle").textContent   = CONFIG.siteName + " — Pellet Truck Driver Induction";
document.getElementById("headerSub").textContent     = CONFIG.siteAddress;
document.getElementById("passMarkHero").textContent  = CONFIG.passMark;
document.getElementById("quizPassNote").textContent  = CONFIG.passMark;
document.getElementById("quizTotalNote").textContent = CONFIG.quiz.length;
document.getElementById("driverDate").value          = new Date().toISOString().split("T")[0];

const cg = document.getElementById("contactGrid");
CONFIG.contacts.forEach(c => {
  cg.insertAdjacentHTML("beforeend", `<div class="contact-card"><div class="role">${c.role}</div><div class="name">${c.name}</div><div class="detail">${c.phone}</div></div>`);
});

const trl = document.getElementById("tuanRulesList");
CONFIG.siteRules_tuan.forEach((r,i) => trl.insertAdjacentHTML("beforeend", `<li><span class="rule-num green">${i+1}</span>${r}</li>`));


// ── Screen navigation ─────────────────────────────────────────────────────────
const SCREENS = {
  "0":  { label: "Registration",         pct: 0   },
  "1":  { label: "Licences",             pct: 8   },
  "2":  { label: "Contacts",             pct: 16  },
  "2b": { label: "Directions",           pct: 24  },
  "2c": { label: "Truck Check-In",       pct: 28  },
  "3":  { label: "CoR & Fatigue",        pct: 33  },
  "4":  { label: "PPE & Drug/Alcohol",   pct: 42  },
  "5":  { label: "Tuan Loading Rules",   pct: 51  },
  "5b": { label: "Loading Process",      pct: 58  },
  "5c": { label: "Overweight Vehicles",  pct: 65  },
  "5d": { label: "Overweight Reporting", pct: 68  },
  "5e": { label: "Tarping Requirements", pct: 70  },
  "7":  { label: "Hazards & Emergency",  pct: 72  },
  "8":  { label: "Quiz",                 pct: 82  },
  "9":  { label: "Declaration",          pct: 92  },
  "10": { label: "Complete",             pct: 100 },
};

function goTo(n) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  document.getElementById("screen-" + n).classList.add("active");
  document.getElementById("progressFill").style.width  = SCREENS[n].pct + "%";
  document.getElementById("progressLabel").textContent = SCREENS[n].label;
  window.scrollTo({ top: 0, behavior: "smooth" });
}

document.getElementById("startBtn").addEventListener("click", () => {
  const name                 = document.getElementById("driverName").value.trim();
  const company              = document.getElementById("driverCompany").value.trim();
  const rego                 = document.getElementById("driverRego").value.trim();
  const companyContact       = document.getElementById("companyContact").value.trim();
  const companyContactMobile = document.getElementById("companyContactMobile").value.trim();
  const date                 = document.getElementById("driverDate").value;
  if (!name || !company || !rego || !companyContact || !companyContactMobile || !date) {
    alert("Please fill in your name, company, truck registration, company contact, company contact mobile and date before beginning.");
    return;
  }
  goTo("1");
});

document.getElementById("licBack").addEventListener("click", () => goTo("0"));
document.getElementById("licNext").addEventListener("click", () => goTo("2"));
document.getElementById("s1Back").addEventListener("click",  () => goTo("1"));
document.getElementById("s1Next").addEventListener("click",  () => goTo("2b"));
document.getElementById("s1bBack").addEventListener("click", () => goTo("2"));
document.getElementById("s1bNext").addEventListener("click", () => goTo("2c"));
document.getElementById("s1cBack").addEventListener("click", () => goTo("2b"));
document.getElementById("s1cNext").addEventListener("click", () => goTo("3"));
document.getElementById("s2Back").addEventListener("click",  () => goTo("2c"));
document.getElementById("s2Next").addEventListener("click",  () => goTo("4"));
document.getElementById("s3Back").addEventListener("click",  () => goTo("3"));
document.getElementById("s3Next").addEventListener("click",  () => goTo("5"));
document.getElementById("s4Back").addEventListener("click",  () => goTo("4"));
document.getElementById("s4Next").addEventListener("click",  () => goTo("5b"));
document.getElementById("s4bBack").addEventListener("click", () => goTo("5"));
document.getElementById("s4bNext").addEventListener("click", () => goTo("5c"));
document.getElementById("s4cBack").addEventListener("click", () => goTo("5b"));
document.getElementById("s4cNext").addEventListener("click", () => goTo("5d"));
document.getElementById("s4dBack").addEventListener("click", () => goTo("5c"));
document.getElementById("s4dNext").addEventListener("click", () => goTo("5e"));
document.getElementById("s4eBack").addEventListener("click", () => goTo("5d"));
document.getElementById("s4eNext").addEventListener("click", () => goTo("7"));
document.getElementById("s6Back").addEventListener("click",  () => goTo("5e"));
document.getElementById("s6Next").addEventListener("click",  () => { resetQuiz(); goTo("8"); });
document.getElementById("s7Back").addEventListener("click",  () => goTo("7"));
document.getElementById("homeBtn").addEventListener("click", () => { location.reload(); });
document.getElementById("closeBtn").addEventListener("click", () => {
  window.close();
  // Some browsers block window.close() on tabs not opened by script — fall back to a message.
  setTimeout(() => {
    if (!window.closed) {
      document.getElementById("completeStatus").textContent = "You can now close this tab.";
    }
  }, 300);
});

// ── Document upload (licence only) ────────────────────────────────────────────
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

function documentTypeOptions() {
  const opts = ["High Risk Work Licence","Driver Licence","Front End Loader Licence","Telehandler Licence","Working at Heights Certificate","Confined Space Certificate"];
  return `<option value="">Select...</option>${opts.map(v => `<option>${escapeHTML(v)}</option>`).join("")}`;
}

function hrwlCodeBoxes() {
  const codes = ["LF","LO","DG","RB","RI","RA","SB","SI","SA","WP","CB","CD","CN","C2","C6","C1","C0","CP","CT","CS","CV","HM","HP","RS","PB","BS","BA","ES","TO"];
  return codes.map(code => `<label class="hrwl-code" title="${code}"><input type="checkbox" class="hrwl-code-check" value="${code}">${code}</label>`).join("");
}

function addDocumentRow(category = "licence") {
  const container = document.getElementById("licenceRows");
  const rowId = `doc_lic_${Date.now()}_${Math.floor(Math.random()*10000)}`;
  const div = document.createElement("div");
  div.className = "doc-row document-row";
  div.dataset.rowId = rowId;
  div.innerHTML = `
    <div class="doc-field">
      <label>Type *</label>
      <select class="doc-type" data-action="doc-type-change">${documentTypeOptions()}</select>
    </div>
    <div class="doc-field expiry-wrap hidden" style="display:none;">
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
    <div class="hrwl-field hidden" style="display:none;">
      <label>High Risk Work Licence Classes *</label>
      <div class="hrwl-note">Select the two-letter HRWL codes shown on the licence card.</div>
      <div class="hrwl-code-grid">${hrwlCodeBoxes()}</div>
    </div>
  `;
  container.appendChild(div);
}

function handleDocumentTypeChange(rowId) {
  const row = document.querySelector(`.document-row[data-row-id="${rowId}"]`);
  if (!row) return;
  const val        = row.querySelector(".doc-type").value;
  const expiryWrap = row.querySelector(".expiry-wrap");
  const hrwl       = row.querySelector(".hrwl-field");

  // Hide all conditional fields first
  expiryWrap.style.display = "none";
  hrwl.style.display       = "none";

  if (val === "High Risk Work Licence") {
    expiryWrap.style.display = "block";
    hrwl.style.display       = "block";
  }
  // No expiry for other licence types in this induction
  if (val !== "High Risk Work Licence") {
    row.querySelectorAll(".hrwl-code-check").forEach(i => i.checked = false);
    row.querySelector(".doc-expiry").value = "";
  }
}

function removeDocumentRow(rowId) {
  const row = document.querySelector(`.document-row[data-row-id="${rowId}"]`);
  if (!row) return;
  const rows = [...document.querySelectorAll(".document-row")];
  if (rows.length <= 1) { alert("Keep at least one row. Leave it blank if it does not apply."); return; }
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
  // Fixed driver licence row
  const dlF = document.getElementById('dl_files');
  const dlC = document.getElementById('dl_camera');
  const dlFiles = (dlF && dlF.files && dlF.files.length) ? [...dlF.files]
                : (dlC && dlC.files && dlC.files.length) ? [...dlC.files] : [];
  dlFiles.forEach(f => items.push(`<span style="color:var(--green-dark);font-weight:600;">Driver Licence</span> — ${escapeHTML(f.name)}`));
  // Additional licence rows
  const rows = [...document.querySelectorAll(".document-row")];
  rows.forEach(row => {
    const docType  = row.querySelector(".doc-type").value.trim();
    const fileInput = row.querySelector(".doc-files");
    const camInput  = row.querySelector(".doc-camera");
    const files = (fileInput && fileInput.files && fileInput.files.length) ? [...fileInput.files]
                : (camInput  && camInput.files  && camInput.files.length)  ? [...camInput.files]
                : [];
    if (docType && files.length) {
      files.forEach(f => items.push(`<span style="color:var(--green-dark);font-weight:600;">${escapeHTML(docType)}</span> — ${escapeHTML(f.name)}`));
    }
  });
  const summary   = document.getElementById("queueSummary");
  const empty     = document.getElementById("queueEmpty");
  const queueList = document.getElementById("queueList");
  if (items.length) {
    queueList.innerHTML     = items.join("<br>");
    summary.style.display   = "block";
    empty.style.display     = "none";
  } else {
    summary.style.display   = "none";
    empty.style.display     = "block";
  }
}

function showDLFiles(source) {
  const input = source === 'camera' ? document.getElementById('dl_camera') : document.getElementById('dl_files');
  enforceFileSizeLimit(input);
  const files = [...(input.files || [])];
  document.getElementById('dl_fname').innerHTML = files.length
    ? files.map(f => `${escapeHTML(f.name)} — ${(f.size/1024/1024).toFixed(2)} MB`).join('<br>')
    : 'No documents selected.';
  updateQueueSummary();
}

// Also include driver licence row in queue summary
const _origUpdate = updateQueueSummary;

// Initialise with one blank licence row
addDocumentRow();

// ── Quiz ──────────────────────────────────────────────────────────────────────
let quizAnswers = [];
let currentQ    = 0;

function resetQuiz() {
  quizAnswers = new Array(CONFIG.quiz.length).fill(null);
  currentQ = 0;
  renderQuestion();
}

function renderQuestion() {
  const q = CONFIG.quiz[currentQ];
  document.getElementById("quizCounter").textContent  = "Question " + (currentQ + 1) + " of " + CONFIG.quiz.length;
  document.getElementById("quizQuestion").textContent = q.question;
  const opts = document.getElementById("quizOptions");
  opts.innerHTML = "";
  q.options.forEach((opt, i) => {
    const el = document.createElement("div");
    el.className = "option";
    el.textContent = opt;
    el.addEventListener("click", () => selectOption(i));
    opts.appendChild(el);
  });
  const fb = document.getElementById("quizFeedback");
  fb.className = "quiz-feedback";
  fb.textContent = "";
  document.getElementById("quizNextBtn").style.display   = "none";
  document.getElementById("quizSubmitBtn").style.display = "none";
}

function selectOption(idx) {
  if (quizAnswers[currentQ] !== null) return;
  const q       = CONFIG.quiz[currentQ];
  const isLast  = currentQ === CONFIG.quiz.length - 1;
  const correct = (idx === q.correct);
  quizAnswers[currentQ] = correct;
  document.querySelectorAll(".option").forEach((el, i) => {
    el.style.pointerEvents = "none";
    if (i === q.correct) el.classList.add("show-correct");
    if (i === idx && !correct) el.classList.add("wrong");
    if (i === idx && correct)  { el.classList.remove("show-correct"); el.classList.add("correct"); }
  });
  const fb = document.getElementById("quizFeedback");
  fb.textContent = q.feedback;
  fb.className   = "quiz-feedback show " + (correct ? "pass" : "fail");
  if (isLast) document.getElementById("quizSubmitBtn").style.display = "inline-flex";
  else        document.getElementById("quizNextBtn").style.display   = "inline-flex";
}

document.getElementById("quizNextBtn").addEventListener("click",   () => { currentQ++; renderQuestion(); });
document.getElementById("quizSubmitBtn").addEventListener("click", () => {
  const correct = quizAnswers.filter(Boolean).length;
  const score   = Math.round((correct / CONFIG.quiz.length) * 100);
  if (score >= CONFIG.passMark) { goTo("9"); }
  else { alert("Quiz not passed. You scored " + score + "%. A score of " + CONFIG.passMark + "% or higher is required."); resetQuiz(); goTo("8"); }
});

// ── Submit declaration ────────────────────────────────────────────────────────
document.getElementById("submitDeclBtn").addEventListener("click", async function() {
  const checks = document.querySelectorAll(".decl-check");
  if (!Array.from(checks).every(c => c.checked)) { alert("Please tick all declaration items before submitting."); return; }

  const btn = document.getElementById("submitDeclBtn");
  btn.disabled = true;
  btn.textContent = "Submitting...";

  const name                 = document.getElementById("driverName").value.trim();
  const company              = document.getElementById("driverCompany").value.trim();
  const rego                 = document.getElementById("driverRego").value.trim();
  const date                 = document.getElementById("driverDate").value;
  const phone                = document.getElementById("phone").value.trim();
  const personId             = phone.replace(/\D/g,"");
  const companyContact       = document.getElementById("companyContact").value.trim();
  const companyContactMobile = document.getElementById("companyContactMobile").value.trim();
  const companyContactEmail  = document.getElementById("companyContactEmail").value.trim();
  const score                = Math.round((quizAnswers.filter(Boolean).length / CONFIG.quiz.length) * 100);

  // Populate completion screen
  document.getElementById("recordName").textContent                  = name || "Not recorded";
  document.getElementById("recordCompany").textContent               = company || "Not recorded";
  document.getElementById("recordRego").textContent                  = rego || "Not recorded";
  document.getElementById("recordCompanyContact").textContent        = companyContact || "Not recorded";
  document.getElementById("recordCompanyContactMobile").textContent  = companyContactMobile || "Not recorded";
  document.getElementById("recordCompanyContactEmail").textContent   = companyContactEmail || "Not provided";
  document.getElementById("recordScore").textContent                 = score;
  document.getElementById("recordDate").textContent                  = new Date().toLocaleString("en-AU");

  // Collect documents
  const uploadDocuments = [];
  const docList = [];

  // Fixed driver licence row
  const dlFInput = document.getElementById('dl_files');
  const dlCInput = document.getElementById('dl_camera');
  const dlFiles  = (dlFInput && dlFInput.files && dlFInput.files.length) ? [...dlFInput.files]
                 : (dlCInput && dlCInput.files && dlCInput.files.length) ? [...dlCInput.files] : [];
  if (dlFiles.length) {
    const dlAttachments = [];
    for (const file of dlFiles) {
      docList.push('Driver Licence (' + file.name + ')');
      try {
        const base64 = await fileToBase64(file);
        dlAttachments.push({ file_name: file.name, content_type: file.type || 'application/octet-stream', size: file.size, content_base64: base64 });
      } catch(e) { console.warn('Could not read DL file', file.name, e); }
    }
    if (dlAttachments.length) uploadDocuments.push({ category: 'licence', document_type: 'Driver Licence', expiry_date: '', licence_class: '', attachments: dlAttachments });
  }

  const rows = [...document.querySelectorAll(".document-row")];

  for (const row of rows) {
    const docType     = row.querySelector(".doc-type").value.trim();
    const expiry_date = row.querySelector(".doc-expiry").value;
    const hrwl_classes = [...row.querySelectorAll(".hrwl-code-check:checked")].map(i => i.value).join(", ");
    const fileInput   = row.querySelector(".doc-files");
    const camInput    = row.querySelector(".doc-camera");
    const files = (fileInput && fileInput.files && fileInput.files.length) ? [...fileInput.files]
                : (camInput  && camInput.files  && camInput.files.length)  ? [...camInput.files]
                : [];
    if (!docType || !files.length) continue;
    const attachments = [];
    for (const file of files) {
      docList.push(docType + " (" + file.name + ")");
      try {
        const base64 = await fileToBase64(file);
        attachments.push({ file_name: file.name, content_type: file.type || "application/octet-stream", size: file.size, content_base64: base64 });
      } catch(e) { console.warn("Could not read file", file.name, e); }
    }
    if (attachments.length) {
      uploadDocuments.push({ category: "licence", document_type: docType, expiry_date, licence_class: hrwl_classes, attachments });
    }
  }

  document.getElementById("recordDocs").textContent = docList.length ? docList.join(", ") : "None submitted";

  const inductionPayload = {
    induction_type:         "Pellet Truck Driver",
    document_no:            "ID-004-2024-v1.0",
    person_id:              personId,
    name, company, phone,
    trade:                  "Pellet Truck Driver",
    company_contact_name:   companyContact,
    company_contact_mobile: companyContactMobile,
    company_contact_email:  companyContactEmail,
    emergency_name:         "",
    emergency_relationship: "",
    emergency_phone:        "",
    date_inducted:          date,
    score,
    total:                  CONFIG.quiz.length,
    acknowledged:           true,
    sharepoint_folder:      CONFIG.sharePointFolder,
    submitted_at:           new Date().toISOString(),
  };

  const uploadPayload = uploadDocuments.length ? {
    type:          "document_upload",
    record_id:     personId,
    person_id:     personId,
    mobile_number: phone,
    full_name:     name,
    company,
    company_email: companyContactEmail || "",
    notes:         "Uploaded during pellet truck driver induction — ID-004-2024-v1.0",
    uploaded_at:   new Date().toISOString(),
    documents:     uploadDocuments
  } : null;

  goTo("10");

  const el = document.getElementById("completeStatus");
  const inductionFetch = fetch(CONFIG.webhookURL, {
    method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(inductionPayload, stripFormulaChars)
  });
  const uploadFetch = uploadPayload ? fetch(CONFIG.docUploadURL, {
    method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(uploadPayload, stripFormulaChars)
  }) : Promise.resolve(null);

  const [inductionResult, uploadResult] = await Promise.allSettled([inductionFetch, uploadFetch]);
  const inductionOk = inductionResult.status === "fulfilled" && (inductionResult.value.ok || inductionResult.value.status === 202);
  const uploadOk    = !uploadPayload || (uploadResult.status === "fulfilled" && uploadResult.value && (uploadResult.value.ok || uploadResult.value.status === 202));

  if (inductionOk && uploadOk) {
    el.textContent = uploadPayload ? "✓ Induction record and documents submitted successfully." : "✓ Induction successfully submitted.";
  } else if (inductionOk && !uploadOk) {
    el.textContent = "✓ Induction record submitted. ⚠ Document upload failed — please bring originals to the site office.";
  } else {
    el.textContent = "⚠ Submission failed. Please advise site management manually.";
  }
  btn.textContent = "Submitted";
});


/* ---- CSP-safe event bindings (auto-generated) ---- */
document.querySelector('[data-csp-hook="cspHook1"]').addEventListener("error", function(event) {
  this.style.display='none'
});

document.querySelector('[data-csp-hook="cspHook2"]').addEventListener("error", function(event) {
  this.style.display='none'
});

document.querySelector('[data-csp-hook="cspHook3"]').addEventListener("blur", function(event) {
  autofillFromMobile(this.value)
});

document.querySelector('[data-csp-hook="cspHook4"]').addEventListener("change", function(event) {
  showDLFiles('file')
});

document.querySelector('[data-csp-hook="cspHook5"]').addEventListener("change", function(event) {
  showDLFiles('camera')
});

document.querySelector('[data-csp-hook="cspHook6"]').addEventListener("click", function(event) {
  addDocumentRow('licence')
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
