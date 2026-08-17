
const CONFIG = {
  insuranceUploadURL: "/api/doc-upload"
};

// Populate day and year dropdowns
(function(){
  const currentYear = new Date().getFullYear();
  ["plDay","wcDay"].forEach(id => {
    const el = document.getElementById(id);
    for(let d = 1; d <= 31; d++){
      const o = document.createElement("option");
      o.value = String(d).padStart(2,"0");
      o.textContent = d;
      el.appendChild(o);
    }
  });
  ["plYear","wcYear"].forEach(id => {
    const el = document.getElementById(id);
    for(let y = currentYear; y <= currentYear + 10; y++){
      const o = document.createElement("option");
      o.value = y;
      o.textContent = y;
      el.appendChild(o);
    }
  });

  // ── URL Parameter Prefill ──────────────────────────────────────────────────
  // Reads ?company=...&email=...&type=... from the link sent in reminder emails.
  // Locks prefilled fields so contractors cannot accidentally change them.
  (function prefillFromURL(){
    const params = new URLSearchParams(window.location.search);

    function prefillAndLock(id, value){
      if(!value) return;
      const el = document.getElementById(id);
      if(!el) return;
      el.value = value;
      el.readOnly = true;
      el.style.background = "#f0f4f0";
      el.style.color = "#555";
      el.style.cursor = "not-allowed";
    }

    const company = params.get("company");
    const email   = params.get("email");
    const type    = params.get("type");   // "pl" or "wc" (or full name)

    prefillAndLock("company",      company);
    prefillAndLock("contactEmail", email);

    // Highlight the relevant insurance section and scroll to it
    if(type){
      const t = type.toLowerCase();
      let sectionId = null;
      if(t === "pl" || t.includes("public")){
        sectionId = "plSection";
      } else if(t === "wc" || t.includes("worker")){
        sectionId = "wcSection";
      }
      if(sectionId){
        const section = document.getElementById(sectionId);
        if(section){
          section.style.border = "2px solid var(--green)";
          section.style.boxShadow = "0 0 0 4px rgba(56,142,60,0.12)";
          setTimeout(() => section.scrollIntoView({behavior:"smooth", block:"start"}), 400);
        }
      }
    }
  })();
})();

function getExpiryDate(prefix){
  const d = document.getElementById(prefix+"Day").value;
  const m = document.getElementById(prefix+"Month").value;
  const y = document.getElementById(prefix+"Year").value;
  if(!d || !m || !y) return null;
  return new Date(`${y}-${m}-${d}`);
}

function getExpiryString(prefix){
  const d = document.getElementById(prefix+"Day").value;
  const m = document.getElementById(prefix+"Month").value;
  const y = document.getElementById(prefix+"Year").value;
  if(!d || !m || !y) return "";
  return `${y}-${m}-${d}`;
}

function checkExpiryDropdown(prefix, noticeId){
  const expiry = getExpiryDate(prefix);
  const notice = document.getElementById(noticeId);
  if(!expiry){ notice.innerHTML = ""; return; }

  const today = new Date();
  today.setHours(0,0,0,0);

  if(expiry < today){
    notice.innerHTML = `<div class="notice notice-danger">⚠️ This policy appears to have already expired. Tuan Biomass cannot approve site access with an expired policy. Please provide a current certificate before submitting.</div>`;
  } else {
    const daysLeft = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
    if(daysLeft <= 30){
      notice.innerHTML = `<div class="notice notice-warn">⚠️ This policy expires in ${daysLeft} day${daysLeft === 1 ? "" : "s"}. Tuan Biomass may request a renewal certificate before your next visit.</div>`;
    } else {
      notice.innerHTML = "";
    }
  }
}

function msg(type, text){
  document.getElementById("message").innerHTML =
    text ? `<div class="notice notice-${type}">${text}</div>` : "";
}

function val(id){
  return document.getElementById(id).value.trim();
}

function showFiles(inputId, listId){
  const input = document.getElementById(inputId);
  enforceFileSizeLimit(input);
  const files = [...input.files];
  document.getElementById(listId).innerHTML = files.length
    ? files.map(f => `${escapeHTML(f.name)} — ${(f.size/1024/1024).toFixed(2)} MB`).join("<br>")
    : "No files selected.";
}

function validate(){
  // Only block submission if a date is entered and already expired
  const today = new Date(); today.setHours(0,0,0,0);
  const plExpiry = getExpiryDate("pl");
  if(plExpiry && plExpiry < today){
    msg("danger","Public Liability policy is expired. Please obtain a current certificate before submitting.");
    return false;
  }
  const wcExpiry = getExpiryDate("wc");
  if(wcExpiry && wcExpiry < today){
    msg("danger","Workers Compensation policy is expired. Please obtain a current certificate before submitting.");
    return false;
  }
  return true;
}

function fileToBase64(file){
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result).split(",")[1]);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

async function buildAttachments(inputId){
  const files = [...document.getElementById(inputId).files];
  const attachments = [];
  for(const file of files){
    attachments.push({
      file_name: file.name,
      content_type: file.type || "application/octet-stream",
      size: file.size,
      content_base64: await fileToBase64(file)
    });
  }
  return attachments;
}

async function submitInsurance(){
  if(!validate()) return;

  const btn = document.getElementById("submitBtn");
  btn.disabled = true;
  btn.textContent = "Uploading...";
  msg("warn","Uploading insurance documents...");

  const documents = [];

  const plFiles = await buildAttachments("plFiles");
  if(plFiles.length){
    documents.push({
      document_type: "Public Liability Insurance",
      policy_number: val("plPolicy"),
      coverage_amount: val("plCoverage"),
      expiry_date: getExpiryString("pl"),
      attachments: plFiles
    });
  }

  const wcFiles = await buildAttachments("wcFiles");
  if(wcFiles.length){
    documents.push({
      document_type: "Workers Compensation Insurance",
      policy_number: val("wcPolicy"),
      expiry_date: getExpiryString("wc"),
      attachments: wcFiles
    });
  }

  const payload = {
    type: "insurance_upload",
    submitted_at: new Date().toISOString(),
    company: val("company"),
    full_name: val("company"),
    company_email: val("contactEmail"),
    notes: val("notes"),
    documents: documents
  };

  try{
    const res = await fetch(CONFIG.insuranceUploadURL, {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify(payload, stripFormulaChars)
    });

    if(!res.ok){
      const errText = await res.text();
      console.error("Flow error:", res.status, errText);
      msg("danger","Upload failed ("+res.status+"). Contact Tuan Biomass before attending site.");
      btn.disabled = false;
      btn.textContent = "Submit Insurance";
      return;
    }

    msg("success","Insurance documents submitted. Tuan Biomass will review them before site access is approved.");
    clearForm();

  }catch(e){
    console.error(e);
    msg("danger","Upload failed. Check internet connection or contact Tuan Biomass.");
    btn.disabled = false;
    btn.textContent = "Submit Insurance";
  }
}

function clearForm(){
  document.querySelectorAll("input,select,textarea").forEach(el => { el.value = ""; });
  document.getElementById("plFileList").innerHTML = "No files selected.";
  document.getElementById("wcFileList").innerHTML = "No files selected.";
  document.getElementById("plExpiryNotice").innerHTML = "";
  document.getElementById("wcExpiryNotice").innerHTML = "";
}

function escapeHTML(str){
  return String(str || "").replace(/[&<>"']/g, m => ({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"
  }[m]));
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


/* ---- CSP-safe event bindings (auto-generated) ---- */
document.querySelector('[data-csp-hook="cspHook1"]').addEventListener("error", function(event) {
  this.style.display='none'
});

document.querySelector('[data-csp-hook="cspHook2"]').addEventListener("change", function(event) {
  checkExpiryDropdown('pl','plExpiryNotice')
});

document.querySelector('[data-csp-hook="cspHook3"]').addEventListener("change", function(event) {
  checkExpiryDropdown('pl','plExpiryNotice')
});

document.querySelector('[data-csp-hook="cspHook4"]').addEventListener("change", function(event) {
  checkExpiryDropdown('pl','plExpiryNotice')
});

document.querySelector('[data-csp-hook="cspHook5"]').addEventListener("change", function(event) {
  showFiles('plFiles','plFileList')
});

document.querySelector('[data-csp-hook="cspHook6"]').addEventListener("change", function(event) {
  checkExpiryDropdown('wc','wcExpiryNotice')
});

document.querySelector('[data-csp-hook="cspHook7"]').addEventListener("change", function(event) {
  checkExpiryDropdown('wc','wcExpiryNotice')
});

document.querySelector('[data-csp-hook="cspHook8"]').addEventListener("change", function(event) {
  checkExpiryDropdown('wc','wcExpiryNotice')
});

document.querySelector('[data-csp-hook="cspHook9"]').addEventListener("change", function(event) {
  showFiles('wcFiles','wcFileList')
});

document.querySelector('[data-csp-hook="cspHook10"]').addEventListener("click", function(event) {
  submitInsurance()
});