
const CONFIG = {
  siteName: "Tuan Biomass",
  siteAddress: "Tuan, Queensland",
  documentNo: "ID-003-2024-v1.0",
  contacts: [
    { role: "Plant Manager", name: "David Knight", phone: "0439 013 224" },
    { role: "Safety Officer", name: "Chris Foster", phone: "0478 774 434" }
  ],
  siteRules: [
    "Contact the loader operator on Channel 34 before entering site.",
    "The loader operator has control of traffic movements. Follow their directions at all times.",
    "All vehicles must travel clockwise around the ring road unless directed otherwise.",
    "Maximum speed limit is 10 km/h.",
    "Drivers on foot must stay at least 6 metres away from the loader while it is operating.",
    "Mobile phone use is prohibited while driving or walking.",
    "Feedstock trucks must not enter car parks unless directed by site workers.",
    "Unload quickly so the site remains clear for other deliveries.",
    "No non-essential maintenance work is to be carried out on the ring road.",
    "After unloading, exit the site as soon as possible.",
    "Deliver the docket to the table outside the site office.",
    "Do not wander around site without an authorised site worker present.",
    "Report all hazards, near misses and incidents immediately to the site office or on-shift operator."
  ],
  hazards: [
    { hazard: "Being struck by moving plant", controls: "10 km/h speed limit, high-vis clothing, Channel 34 communication, clockwise traffic flow, give way to the loader and remain in vehicle unless duties require otherwise." },
    { hazard: "Being caught between plant and structures", controls: "Stand in safe areas, stay away from structures near moving trucks, and maintain awareness of workers and pedestrians." },
    { hazard: "Pedestrian traffic not visible", controls: "Gain the driver's attention before moving near vehicles or plant. Stop work if an imminent risk is identified." },
    { hazard: "Truck tipping risk", controls: "Check ground conditions, wind and load stability before raising a tipper. Keep other vehicles and workers clear while tipping." }
  ],
  quiz: [
    { question: "What communication channel must truck drivers use before entering the site?", options: ["Channel 12", "Channel 34", "Any channel", "Channel 40"], correct: 1, feedback: "Use Channel 34 before entering the site." },
    { question: "What direction must all vehicles travel on the ring road?", options: ["Clockwise", "Anti-clockwise", "Either direction", "Only at night"], correct: 0, feedback: "All vehicles must travel clockwise around the ring road unless directed otherwise." },
    { question: "What is the maximum speed limit on the ring road?", options: ["5 km/h", "10 km/h", "20 km/h", "40 km/h"], correct: 1, feedback: "The maximum speed limit is 10 km/h." },
    { question: "What minimum safe distance must be kept from the loader while it is operating?", options: ["2 metres", "4 metres", "6 metres", "10 metres"], correct: 2, feedback: "Drivers on foot must stay at least 6 metres away from the loader." },
    { question: "What should you do if you identify an imminent risk?", options: ["Continue and report later", "Stop work and report it", "Move faster through the area", "Ignore it if no one is hurt"], correct: 1, feedback: "Stop work and report the risk immediately." },
    { question: "What PPE must be worn on site?", options: ["Steel-cap boots, hard hats and high-visibility clothing", "Gloves only", "No PPE required", "Shorts and runners"], correct: 0, feedback: "Steel-cap boots, hard hats and high-visibility clothing must be worn on site at all times." },
    { question: "What PPE is required during night shift?", options: ["Steel-cap boots, hard hat and high-visibility clothing with reflective tape", "Day high-vis only", "No high-vis required", "Gloves only"], correct: 0, feedback: "Night shift requires steel-cap boots, a hard hat and high-visibility clothing with reflective tape." },
    { question: "What should be done if a fire occurs?", options: ["Report it, use fire equipment only if trained and safe, then evacuate if required", "Ignore it if small", "Drive through the area", "Finish unloading first"], correct: 0, feedback: "Report the fire and only use fire equipment if trained and safe." },
    { question: "Who must you contact before raising an axle tipper?", options: ["Anyone in the vicinity", "The office only", "No one", "Only another truck driver"], correct: 0, feedback: "Contact anyone in the vicinity before raising an axle tipper." },
    { question: "What is the site drug and alcohol rule?", options: ["Allowed after hours", "Only applies to employees", "Drugs and alcohol are strictly prohibited on site", "Only applies to forklift drivers"], correct: 2, feedback: "Drugs and alcohol are strictly prohibited on site. Contractors may be subject to random drug testing." }
  ],
  passMark: 80,
  inductionCheckURL: "/api/induction-check",
  webhookURL: "/api/induction-submit",
  docUploadURL: "/api/doc-upload",
  sharePointFolder: "Contractor Documents",
};



// ── Init ──────────────────────────────────────────────────────────────────────
document.getElementById("headerTitle").textContent = CONFIG.siteName + " — Feedstock Truck Driver Induction";
document.getElementById("headerSub").textContent = CONFIG.siteAddress;
document.getElementById("quizPassNote").textContent = CONFIG.passMark;
document.getElementById("quizTotalNote").textContent = CONFIG.quiz.length;
if (document.getElementById("passMarkHero")) document.getElementById("passMarkHero").textContent = CONFIG.passMark;
if (document.getElementById("driverDate")) document.getElementById("driverDate").value = new Date().toISOString().slice(0,10);

const contacts = document.getElementById("contactGrid");
CONFIG.contacts.forEach(c => contacts.insertAdjacentHTML("beforeend",
  `<div class="contact-card"><div class="role">${c.role}</div><div class="name">${c.name}</div><div class="detail">${c.phone}</div></div>`));

const rules = document.getElementById("siteRulesList");
CONFIG.siteRules.forEach((r,i) => rules.insertAdjacentHTML("beforeend", `<li><span class="rule-num green">${i+1}</span>${r}</li>`));
const hazards = document.getElementById("hazardRows");
CONFIG.hazards.forEach(h => hazards.insertAdjacentHTML("beforeend", `<tr><td>${h.hazard}</td><td>${h.controls}</td></tr>`));

// ── Screen navigation ─────────────────────────────────────────────────────────
const screens = [...document.querySelectorAll(".screen")];
const labels  = ["Registration","Licences & Documents","Contacts","Truck Check-In","Sign In & Docket Spike","CoR","PPE","Traffic","Ring Road Access","Stay in Truck","Emergency","Hazards","Acknowledgement","Quiz","Complete"];
let current = 0, currentQ = 0, quizAnswers = [], lastScore = 0, lastCorrect = 0, lastPassed = false;

function showScreen(n) {
  current = Math.max(0, Math.min(n, screens.length - 1));
  screens.forEach((s,i) => s.classList.toggle("active", i === current));
  document.getElementById("progressFill").style.width = ((current + 1) / screens.length * 100) + "%";
  document.getElementById("progressLabel").textContent = labels[current] || "Induction";
  window.scrollTo({top: 0, behavior: "smooth"});
}
function registrationComplete() {
  return ["driverName","driverCompany","driverRego","phone"].every(id => document.getElementById(id).value.trim());
}

document.getElementById("startBtn").onclick = () => {
  if (!registrationComplete()) { alert("Please complete your name, company, truck registration and mobile number before starting."); return; }
  showScreen(1);
};
document.querySelectorAll("[data-next]").forEach(b => b.onclick = () => showScreen(current + 1));
document.querySelectorAll("[data-back]").forEach(b => b.onclick = () => showScreen(current - 1));
document.getElementById("beginQuizBtn").onclick = startQuiz;
document.getElementById("homeBtn").onclick = () => { location.reload(); };
document.getElementById("closeBtn").onclick = () => {
  window.close();
  // Some browsers block window.close() on tabs not opened by script — fall back to a message.
  setTimeout(() => {
    if (!window.closed) {
      document.getElementById("uploadStatusMsg").textContent = "You can now close this tab.";
    }
  }, 300);
};

// ── Document upload section (matches site register) ───────────────────────────
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
    licence:   ["High Risk Work Licence","Driver Licence","Front End Loader Licence","Telehandler Licence","Working at Heights Certificate","Confined Space Certificate"]
  };
  return `<option value="">Select...</option>${options[category].map(v => `<option>${escapeHTML(v)}</option>`).join("")}`;
}

function sectionRowsId(category) {
  return category === "risk" ? "riskRows" : category === "insurance" ? "insuranceRows" : "licenceRows";
}

function hrwlCodeBoxes() {
  const codes = ["LF","LO","DG","RB","RI","RA","SB","SI","SA","WP","CB","CD","CN","C2","C6","C1","C0","CP","CT","CS","CV","HM","HP","RS","PB","BS","BA","ES","TO"];
  return codes.map(code => `
    <label class="hrwl-code" title="${code}">
      <input type="checkbox" class="hrwl-code-check" value="${code}">
      ${code}
    </label>`).join("");
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

    <div class="doc-field expiry-wrap hidden">
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

    <div class="extra-field public-liability-field hidden">
      <label>Public Liability Policy Number *</label>
      <input type="text" class="policy-number" placeholder="Enter policy number">
      <label>Coverage Amount *</label>
      <input type="text" class="coverage-amount" placeholder="e.g. $20 million">
    </div>

    <div class="extra-field workers-comp-field hidden">
      <label>Workers Compensation Policy Number *</label>
      <input type="text" class="policy-number" placeholder="Enter policy number">
    </div>

    <div class="hrwl-field hidden">
      <label>High Risk Work Licence Classes *</label>
      <div class="hrwl-note">Select the two-letter HRWL codes shown on the licence card.</div>
      <div class="hrwl-code-grid">${hrwlCodeBoxes()}</div>
    </div>
  `;
  container.appendChild(div);
  handleDocumentTypeChange(rowId);
}

function handleDocumentTypeChange(rowId) {
  const row = document.querySelector(`.document-row[data-row-id="${rowId}"]`);
  if (!row) return;
  const val      = row.querySelector(".doc-type").value;
  const category = row.dataset.category;
  const expiryWrap      = row.querySelector(".expiry-wrap");
  const expiryInput     = row.querySelector(".doc-expiry");
  const publicLiability = row.querySelector(".public-liability-field");
  const workersComp     = row.querySelector(".workers-comp-field");
  const hrwl            = row.querySelector(".hrwl-field");

  expiryWrap.classList.add("hidden");
  publicLiability.classList.add("hidden");
  workersComp.classList.add("hidden");
  hrwl.classList.add("hidden");

  if (category === "insurance") {
    if (val === "Public Liability Insurance")  { expiryWrap.classList.remove("hidden"); publicLiability.classList.remove("hidden"); }
    if (val === "Workers Compensation Insurance") { expiryWrap.classList.remove("hidden"); workersComp.classList.remove("hidden"); }
  }
  if (category === "licence" && val === "High Risk Work Licence") {
    expiryWrap.classList.remove("hidden");
    hrwl.classList.remove("hidden");
  }
  // Only HRWL gets expiry in this induction — all other licence types are upload only

  if (!(category === "licence" && val === "High Risk Work Licence")) {
    row.querySelectorAll(".hrwl-code-check").forEach(i => i.checked = false);
  }
  if (!(category === "insurance" && (val === "Public Liability Insurance" || val === "Workers Compensation Insurance"))) {
    row.querySelectorAll(".policy-number").forEach(i => i.value = "");
    const coverage = row.querySelector(".coverage-amount");
    if (coverage) coverage.value = "";
  }
  if (expiryWrap.classList.contains("hidden")) expiryInput.value = "";
}

function removeDocumentRow(rowId) {
  const row = document.querySelector(`.document-row[data-row-id="${rowId}"]`);
  if (!row) return;
  const category = row.dataset.category;
  const rows = [...document.querySelectorAll(`.document-row[data-category="${category}"]`)];
  if (rows.length <= 1) { alert("Keep at least one row per section. Leave it blank if that section does not apply."); return; }
  row.remove();
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

function updateQueueSummary() {
  const items = [];
  // Fixed driver licence row
  const dlF = document.getElementById('dl_files');
  const dlC = document.getElementById('dl_camera');
  const dlFiles = (dlF && dlF.files && dlF.files.length) ? [...dlF.files]
                : (dlC && dlC.files && dlC.files.length) ? [...dlC.files] : [];
  dlFiles.forEach(f => items.push(`<span style="color:var(--green-dark);font-weight:600;">Driver Licence</span> — ${escapeHTML(f.name)}`));
  // Additional rows
  const rows = [...document.querySelectorAll('.document-row')];
  rows.forEach(row => {
    const docType = row.querySelector('.doc-type').value.trim();
    const fileInput = row.querySelector('.doc-files');
    const camInput  = row.querySelector('.doc-camera');
    const files = (fileInput && fileInput.files && fileInput.files.length) ? [...fileInput.files]
                : (camInput  && camInput.files  && camInput.files.length)  ? [...camInput.files]
                : [];
    if (docType && files.length) {
      files.forEach(f => items.push(`<span style="color:var(--green-dark);font-weight:600;">${escapeHTML(docType)}</span> — ${escapeHTML(f.name)}`));
    }
  });
  const summary  = document.getElementById('queueSummary');
  const empty    = document.getElementById('queueEmpty');
  const queueList = document.getElementById('queueList');
  if (items.length) {
    queueList.innerHTML = items.join('<br>');
    summary.style.display = 'block';
    empty.style.display   = 'none';
  } else {
    summary.style.display = 'none';
    empty.style.display   = 'block';
  }
}

function showSelectedFiles(rowId, source) {
  const row = document.querySelector(`.document-row[data-row-id="${rowId}"]`);
  if (!row) return;
  const input = source === "camera" ? row.querySelector(".doc-camera") : row.querySelector(".doc-files");
  enforceFileSizeLimit(input);
  const files = [...(input.files || [])];
  document.getElementById(`files_${rowId}`).innerHTML = files.length
    ? files.map(f => `${escapeHTML(f.name)} — ${(f.size/1024/1024).toFixed(2)} MB`).join("<br>")
    : "No files selected.";
}

function rowApplies(row) {
  const doc_type    = row.querySelector(".doc-type").value.trim();
  const filesMain   = [...row.querySelector(".doc-files").files];
  const filesCam    = [...row.querySelector(".doc-camera").files];
  const expiry      = row.querySelector(".doc-expiry").value;
  const hrwl        = [...row.querySelectorAll(".hrwl-code-check:checked")].length;
  const policies    = [...row.querySelectorAll(".policy-number")].map(i => i.value.trim()).filter(Boolean);
  const coverage    = row.querySelector(".coverage-amount") ? row.querySelector(".coverage-amount").value.trim() : "";
  return doc_type || filesMain.length || filesCam.length || expiry || hrwl || policies.length || coverage;
}

function resetDocumentSections() {
  document.getElementById("licenceRows").innerHTML = "";
  addDocumentRow("licence");
}

// Initialise document sections on load
resetDocumentSections();

// ── Quiz ──────────────────────────────────────────────────────────────────────
function startQuiz() { currentQ = 0; quizAnswers = new Array(CONFIG.quiz.length).fill(null); showScreen(13); renderQuiz(); }
function renderQuiz() {
  const q = CONFIG.quiz[currentQ];
  document.getElementById("quizCounter").textContent = `Question ${currentQ+1} of ${CONFIG.quiz.length}`;
  document.getElementById("quizQuestion").textContent = q.question;
  const opts = document.getElementById("quizOptions"); opts.innerHTML = "";
  q.options.forEach((opt,i) => { const div = document.createElement("div"); div.className = "option"; div.textContent = opt; div.onclick = () => selectAnswer(i,div); opts.appendChild(div); });
  const fb = document.getElementById("quizFeedback"); fb.className = "quiz-feedback"; fb.textContent = "";
  document.getElementById("quizNextBtn").style.display = "none";
  document.getElementById("quizSubmitBtn").style.display = "none";
}
function selectAnswer(i,el) {
  if (quizAnswers[currentQ] !== null) return;
  const q = CONFIG.quiz[currentQ]; const correct = i === q.correct; quizAnswers[currentQ] = correct;
  [...document.querySelectorAll(".option")].forEach((o,idx) => { if(idx===q.correct) o.classList.add("show-correct"); if(idx===i) o.classList.add(correct ? "correct" : "wrong"); });
  const fb = document.getElementById("quizFeedback"); fb.className = "quiz-feedback show " + (correct ? "pass" : "fail"); fb.textContent = (correct ? "Correct. " : "Not correct. ") + q.feedback;
  if (currentQ === CONFIG.quiz.length - 1) document.getElementById("quizSubmitBtn").style.display = "inline-flex";
  else document.getElementById("quizNextBtn").style.display = "inline-flex";
}
document.getElementById("quizNextBtn").onclick = () => { currentQ++; renderQuiz(); window.scrollTo({top:0,behavior:"smooth"}); };
document.getElementById("quizBackBtn").onclick = () => showScreen(11);
document.getElementById("quizSubmitBtn").onclick = () => {
  lastCorrect = quizAnswers.filter(Boolean).length;
  lastScore   = Math.round(lastCorrect / CONFIG.quiz.length * 100);
  lastPassed  = lastScore >= CONFIG.passMark;
  if (!lastPassed) { alert(`You scored ${lastScore}%. A minimum score of ${CONFIG.passMark}% is required. The quiz will restart.`); startQuiz(); return; }
  document.querySelectorAll("#ackList input").forEach(cb => cb.checked = false);
  document.getElementById("ackError").style.display = "none";
  document.getElementById("ackScoreBox").innerHTML = `<strong>Quiz Result</strong> ${lastScore}% — ${lastCorrect} of ${CONFIG.quiz.length} correct.`;
  showScreen(12);
};
document.getElementById("ackBackBtn").onclick = () => showScreen(13);

// ── File helper ───────────────────────────────────────────────────────────────
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
  return new Promise((res,rej) => { const r = new FileReader(); r.onload = () => res(r.result.split(",")[1]); r.onerror = rej; r.readAsDataURL(file); });
}

// ── Complete induction ────────────────────────────────────────────────────────
document.getElementById("completeInductionBtn").onclick = async () => {
  const all = [...document.querySelectorAll("#ackList input")].every(cb => cb.checked);
  document.getElementById("ackError").style.display = all ? "none" : "block";
  if (!all) return;

  const name                   = document.getElementById("driverName").value.trim();
  const company                = document.getElementById("driverCompany").value.trim();
  const rego                   = document.getElementById("driverRego").value.trim().toUpperCase();
  const phone                  = document.getElementById("phone").value.trim();
  const personId               = phone.replace(/\D/g,"");
  const company_contact        = document.getElementById("companyContact").value.trim();
  const company_contact_mobile = document.getElementById("companyContactMobile").value.trim();
  const company_contact_email  = document.getElementById("companyContactEmail").value.trim();
  const date                   = document.getElementById("driverDate").value;

  // Collect documents from all three sections
  const docList = [];
  const uploadDocuments = [];

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
    if (dlAttachments.length) uploadDocuments.push({ category: 'licence', document_type: 'Driver Licence', expiry_date: '', licence_class: '', policy_number: '', coverage_amount: '', attachments: dlAttachments });
  }

  const rows = [...document.querySelectorAll(".document-row")];

  for (const row of rows) {
    if (!rowApplies(row)) continue;
    const category    = row.dataset.category;
    const doc_type    = row.querySelector(".doc-type").value.trim();
    const expiry_date = row.querySelector(".doc-expiry").value;
    const hrwl_classes = [...row.querySelectorAll(".hrwl-code-check:checked")].map(i => i.value).join(", ");
    const coverage_amount = row.querySelector(".coverage-amount") ? row.querySelector(".coverage-amount").value.trim() : "";

    let policy_number = "";
    if (doc_type === "Public Liability Insurance") policy_number = row.querySelector(".public-liability-field .policy-number").value.trim();
    if (doc_type === "Workers Compensation Insurance") policy_number = row.querySelector(".workers-comp-field .policy-number").value.trim();

    // Collect files — prefer file picker, fall back to camera
    const fileInput = row.querySelector(".doc-files");
    const camInput  = row.querySelector(".doc-camera");
    const files = (fileInput && fileInput.files && fileInput.files.length) ? [...fileInput.files]
                : (camInput && camInput.files && camInput.files.length)   ? [...camInput.files]
                : [];

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

  // Update completion screen
  document.getElementById("recordName").textContent             = name || "Not recorded";
  document.getElementById("recordCompany").textContent          = company || "Not recorded";
  document.getElementById("recordCompanyContact").textContent   = company_contact || "Not recorded";
  document.getElementById("recordCompanyContactMobile").textContent = company_contact_mobile || "Not recorded";
  document.getElementById("recordCompanyContactEmail").textContent  = company_contact_email || "Not recorded";
  document.getElementById("recordScore").textContent            = lastScore;
  document.getElementById("recordDocs").textContent             = docList.length ? docList.join(", ") : "None submitted";
  document.getElementById("recordDate").textContent             = new Date().toLocaleString("en-AU");

  showScreen(14);

  // Fire induction webhook
  const inductionPayload = {
    induction_type:           "Feedstock Truck Driver",
    document_no:              CONFIG.documentNo,
    person_id:                personId,
    name:                     name,
    company:                  company,
    phone:                    phone,
    trade:                    "Feedstock Truck Driver",
    company_contact_name:     company_contact,
    company_contact_mobile:   company_contact_mobile,
    company_contact_email:    company_contact_email,
    emergency_name:           "",
    emergency_relationship:   "",
    emergency_phone:          "",
    date_inducted:            date,
    score:                    lastScore,
    correct:                  lastCorrect,
    total:                    CONFIG.quiz.length,
    acknowledged:             true,
    sharepoint_folder:        CONFIG.sharePointFolder,
    submitted_at:             new Date().toISOString(),
  };

  if (CONFIG.webhookURL && CONFIG.webhookURL !== "PASTE_POWER_AUTOMATE_WEBHOOK_URL_HERE") {
    try {
      await fetch(CONFIG.webhookURL, { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(inductionPayload, stripFormulaChars) });
    }
    catch(e) { console.warn("Induction webhook failed:", e); }
  }

  // Fire document upload flow (same flow as site register)
  if (uploadDocuments.length && CONFIG.docUploadURL) {
    const uploadPayload = {
      type:          "document_upload",
      record_id:     personId,
      person_id:     personId,
      mobile_number: phone,
      full_name:     name,
      company:       company,
      company_email: company_contact_email || "",
      notes:         "Uploaded during induction — " + CONFIG.documentNo,
      uploaded_at:   new Date().toISOString(),
      documents:     uploadDocuments
    };
    try {
      document.getElementById("uploadStatusMsg").textContent = "Uploading documents...";
      const res = await fetch(CONFIG.docUploadURL, { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(uploadPayload, stripFormulaChars) });
      document.getElementById("uploadStatusMsg").textContent = res.ok
        ? "Documents uploaded successfully."
        : "Document upload failed — please bring originals to the site office.";
    } catch(e) {
      console.warn("Document upload flow failed:", e);
      document.getElementById("uploadStatusMsg").textContent = "Document upload failed — please bring originals to the site office.";
    }
  }
};

showScreen(0);


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
