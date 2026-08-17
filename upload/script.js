
const CONFIG={
  inductionCheckURL:"/api/induction-check",
  ticketUploadURL:"/api/doc-upload"
};

function todayISO(){
  const n=new Date(),p=x=>String(x).padStart(2,"0");
  return `${p(n.getDate())}/${p(n.getMonth()+1)}/${n.getFullYear()}`;
}

function formatDate(input){
  let value=String(input.value||"").replace(/\D/g,"").slice(0,8);

  if(value.length>4){
    value=value.replace(/(\d{2})(\d{2})(\d{1,4})/,"$1/$2/$3");
  }else if(value.length>2){
    value=value.replace(/(\d{2})(\d{1,2})/,"$1/$2");
  }

  input.value=value;
}

function isValidDate(value){
  if(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/.test(value)){
    const [year,month,day]=value.split("-").map(Number);
    const d=new Date(year,month-1,day);
    return d.getFullYear()===year && d.getMonth()===month-1 && d.getDate()===day;
  }
  if(!/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/.test(value))return false;
  const [day,month,year]=value.split("/").map(Number);
  const d=new Date(year,month-1,day);
  return d.getFullYear()===year && d.getMonth()===month-1 && d.getDate()===day;
}

function validateDateInput(input){
  if(input.value && !isValidDate(input.value)){
    input.setCustomValidity("Enter date as DD/MM/YYYY");
    input.reportValidity();
  }else{
    input.setCustomValidity("");
  }
}

function msg(id,type,text){
  document.getElementById(id).innerHTML=text?`<div class="notice notice-${type}">${text}</div>`:"";
}

function normaliseMobile(value){
  let d=String(value||"").replace(/\D/g,"");
  if(d.startsWith("61")&&d.length===11)d="0"+d.slice(2);
  return d;
}

function escapeHTML(str){
  return String(str||"").replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
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

function documentTypeOptions(category){
  const options={
    risk:["SWMS","JSA / Risk Assessment","Other Document"],
    insurance:["Public Liability Insurance","Workers Compensation Insurance"],
    licence:["High Risk Work Licence","Driver Licence","Front End Loader Licence","Telehandler Licence","Working at Heights Certificate","Confined Space Certificate","Trade Certificate"]
  };
  return `<option value="">Select...</option>${options[category].map(v=>`<option>${escapeHTML(v)}</option>`).join("")}`;
}

function sectionRowsId(category){
  return category==="risk"?"riskRows":category==="insurance"?"insuranceRows":"licenceRows";
}

function resetDocumentSections(){
  document.getElementById("riskRows").innerHTML="";
  document.getElementById("insuranceRows").innerHTML="";
  document.getElementById("licenceRows").innerHTML="";
  addDocumentRow("licence");
  addDocumentRow("risk");
  addDocumentRow("insurance");
}

function hrwlCodeBoxes(){
  const codes=["LF","LO","DG","RB","RI","RA","SB","SI","SA","WP","CB","CD","CN","C2","C6","C1","C0","CP","CT","CS","CV","HM","HP","RS","PB","BS","BA","ES","TO"];
  return codes.map(code=>`
    <label class="hrwl-code" title="${code}">
      <input type="checkbox" class="hrwl-code-check" value="${code}">
      ${code}
    </label>
  `).join("");
}

function addDocumentRow(category){
  const container=document.getElementById(sectionRowsId(category));
  const rowId=`doc_${category}_${Date.now()}_${Math.floor(Math.random()*10000)}`;
  const div=document.createElement("div");
  div.className="doc-row document-row";
  div.dataset.rowId=rowId;
  div.dataset.category=category;
  div.innerHTML=`
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
      <input class="file-input doc-files" type="file" multiple accept="image/*,.pdf,.doc,.docx" data-action="show-selected-files">
      <div class="file-list" id="files_${rowId}">No documents selected.</div>
    </div>

    <div class="doc-field">
      <button class="btn btn-secondary doc-remove" data-action="remove-document-row">Remove</button>
    </div>

    <div class="extra-field public-liability-field hidden">
      <label>Public Liability Policy Number *</label>
      <input type="text" class="policy-number" placeholder="Enter policy number">
      <br><br>
      <label>Coverage Amount *</label>
      <input type="text" class="coverage-amount" placeholder="e.g. $20 million">
    </div>

    <div class="extra-field workers-comp-field hidden">
      <label>Workers Compensation Policy Number *</label>
      <input type="text" class="policy-number" placeholder="Enter policy number">
    </div>

    <div class="hrwl-field hidden">
      <label>High Risk Work Licence Classes *</label>
      <div class="doc-note">Select the two-letter HRWL codes shown on the licence card.</div>
      <div class="hrwl-code-grid">${hrwlCodeBoxes()}</div>
    </div>
  `;
  container.appendChild(div);
  handleDocumentTypeChange(rowId);
}

function handleDocumentTypeChange(rowId){
  const row=document.querySelector(`.document-row[data-row-id="${rowId}"]`);
  if(!row)return;

  const val=row.querySelector(".doc-type").value;
  const category=row.dataset.category;

  const expiryWrap=row.querySelector(".expiry-wrap");
  const expiryInput=row.querySelector(".doc-expiry");
  const publicLiability=row.querySelector(".public-liability-field");
  const workersComp=row.querySelector(".workers-comp-field");
  const hrwl=row.querySelector(".hrwl-field");

  expiryWrap.classList.add("hidden");
  publicLiability.classList.add("hidden");
  workersComp.classList.add("hidden");
  hrwl.classList.add("hidden");

  if(category==="insurance"){
    if(val==="Public Liability Insurance"){
      expiryWrap.classList.remove("hidden");
      publicLiability.classList.remove("hidden");
    }
    if(val==="Workers Compensation Insurance"){
      expiryWrap.classList.remove("hidden");
      workersComp.classList.remove("hidden");
    }
  }

  if(category==="licence" && val==="High Risk Work Licence"){
    expiryWrap.classList.remove("hidden");
    hrwl.classList.remove("hidden");
  }

  if(!(category==="licence" && val==="High Risk Work Licence")){
    row.querySelectorAll(".hrwl-code-check").forEach(i=>i.checked=false);
  }

  if(!(category==="insurance" && (val==="Public Liability Insurance" || val==="Workers Compensation Insurance"))){
    row.querySelectorAll(".policy-number").forEach(i=>i.value="");
  }

  if(!(category==="insurance" && val==="Public Liability Insurance")){
    const coverage=row.querySelector(".coverage-amount");
    if(coverage)coverage.value="";
  }

  if(expiryWrap.classList.contains("hidden")){
    expiryInput.value="";
  }
}

function removeDocumentRow(rowId){
  const row=document.querySelector(`.document-row[data-row-id="${rowId}"]`);
  if(!row)return;
  row.remove();
  msg("ticketMessage","","");
}

function showSelectedFiles(rowId){
  const row=document.querySelector(`.document-row[data-row-id="${rowId}"]`);
  if(!row)return;
  const input=row.querySelector(".doc-files");
  enforceFileSizeLimit(input);
  const files=[...input.files];
  document.getElementById(`files_${rowId}`).innerHTML=files.length?files.map(f=>`${escapeHTML(f.name)} — ${(f.size/1024/1024).toFixed(2)} MB`).join("<br>"):"No documents selected.";
}

function fileToBase64(file){
  return new Promise((resolve,reject)=>{
    const reader=new FileReader();
    reader.onload=()=>resolve(String(reader.result).split(",")[1]);
    reader.onerror=reject;
    reader.readAsDataURL(file);
  });
}

function rowApplies(row){
  const document_type=row.querySelector(".doc-type").value.trim();
  const files=[...row.querySelector(".doc-files").files];
  const expiry_date=row.querySelector(".doc-expiry").value;
  const hrwl_classes=[...row.querySelectorAll(".hrwl-code-check:checked")].map(i=>i.value).join(", ");
  const policy_numbers=[...row.querySelectorAll(".policy-number")].map(i=>i.value.trim()).filter(Boolean);
  const coverage=row.querySelector(".coverage-amount") ? row.querySelector(".coverage-amount").value.trim() : "";
  return document_type || files.length || expiry_date || hrwl_classes || policy_numbers.length || coverage;
}

function validatePersonDetails(){
  if(!document.getElementById("fullName").value.trim()){msg("ticketMessage","danger","Please enter the person's full name.");return false}
  if(!document.getElementById("company").value.trim()){msg("ticketMessage","danger","Please enter the company name.");return false}
  if(!document.getElementById("mobileNumber").value.trim()){msg("ticketMessage","danger","Please enter the mobile number.");return false}
  const uploadDate=document.getElementById("uploadDate").value.trim();
  if(!uploadDate){msg("ticketMessage","danger","Please enter the upload date as DD/MM/YYYY.");return false}
  if(!isValidDate(uploadDate)){msg("ticketMessage","danger","Upload Date must be entered as DD/MM/YYYY.");return false}
  return true;
}

async function autofillFromMobile(mobile) {
  mobile = mobile.trim();
  if (mobile.length < 8) return;
  const hint = document.getElementById("autofillHint");
  hint.innerHTML = "<span style='color:#6b7280'>Looking up details...</span>";
  try {
    const res = await fetch(CONFIG.inductionCheckURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mobile_number: mobile, person_id: mobile, lookup_only: "true" })
    });
    if (!res.ok) { hint.innerHTML = ""; return; }
    const d = await res.json();
    if (d.full_name) {
      document.getElementById("fullName").value = d.full_name || "";
      document.getElementById("company").value = d.company || "";
      if (d.company_contact_email) document.getElementById("companyEmail").value = d.company_contact_email;
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

async function submitTickets(){
  if(!validatePersonDetails())return;

  const fullName=document.getElementById("fullName").value.trim();
  const company=document.getElementById("company").value.trim();
  const companyEmail=document.getElementById("companyEmail").value.trim();
  const mobileNumber=document.getElementById("mobileNumber").value.trim();
  const personId=normaliseMobile(mobileNumber);
  const uploadDate=document.getElementById("uploadDate").value;
  const notes=document.getElementById("ticketNotes").value.trim();
  const rows=[...document.querySelectorAll(".document-row")];
  const documents=[];

  for(const row of rows){
    if(!rowApplies(row))continue;

    const category=row.dataset.category;
    const document_type=row.querySelector(".doc-type").value.trim();
    const expiry_date=row.querySelector(".doc-expiry").value;
    const files=[...row.querySelector(".doc-files").files];
    const hrwl_classes=[...row.querySelectorAll(".hrwl-code-check:checked")].map(i=>i.value).join(", ");
    const coverage_amount=row.querySelector(".coverage-amount") ? row.querySelector(".coverage-amount").value.trim() : "";

    let policy_number="";
    if(document_type==="Public Liability Insurance"){
      policy_number=row.querySelector(".public-liability-field .policy-number").value.trim();
    }
    if(document_type==="Workers Compensation Insurance"){
      policy_number=row.querySelector(".workers-comp-field .policy-number").value.trim();
    }

    if(!document_type){msg("ticketMessage","danger","Please select a document type for each row you are uploading, or leave the row blank.");return}
    if(!files.length){msg("ticketMessage","danger",`Please upload at least one file or photo for ${escapeHTML(document_type)}.`);return}

    if(document_type==="Public Liability Insurance"){
      if(!policy_number){msg("ticketMessage","danger","Please enter the Public Liability policy number.");return}
      if(!coverage_amount){msg("ticketMessage","danger","Please enter the Public Liability coverage amount.");return}
      if(!expiry_date){msg("ticketMessage","danger","Please enter the Public Liability expiry date.");return}
      if(!isValidDate(expiry_date)){msg("ticketMessage","danger","Public Liability expiry date must be entered as DD/MM/YYYY.");return}
    }

    if(document_type==="Workers Compensation Insurance"){
      if(!policy_number){msg("ticketMessage","danger","Please enter the Workers Compensation policy number.");return}
      if(!expiry_date){msg("ticketMessage","danger","Please enter the Workers Compensation expiry date.");return}
      if(!isValidDate(expiry_date)){msg("ticketMessage","danger","Workers Compensation expiry date must be entered as DD/MM/YYYY.");return}
    }

    if(document_type==="High Risk Work Licence"){
      if(!hrwl_classes){msg("ticketMessage","danger","Please select at least one High Risk Work Licence code.");return}
      if(!expiry_date){msg("ticketMessage","danger","Please enter the High Risk Work Licence expiry date.");return}
      if(!isValidDate(expiry_date)){msg("ticketMessage","danger","High Risk Work Licence expiry date must be entered as DD/MM/YYYY.");return}
    }

    documents.push({category,document_type,expiry_date,hrwl_classes,policy_number,coverage_amount,files});
  }

  if(!documents.length){msg("ticketMessage","danger","Please upload at least one document.");return}

  msg("ticketMessage","warn","Uploading document files...");

  const uploadDocs=[];
  for(const doc of documents){
    const attachments=[];
    for(const file of doc.files){
      attachments.push({file_name:file.name,content_type:file.type||"application/octet-stream",size:file.size,content_base64:await fileToBase64(file)});
    }
    uploadDocs.push({
      category:doc.category,
      document_type:doc.document_type,
      expiry_date:doc.expiry_date,
      licence_class:doc.hrwl_classes,
      policy_number:doc.policy_number,
      coverage_amount:doc.coverage_amount,
      attachments
    });
  }

  const upload={
    type:"document_upload",
    person_id:personId,
    mobile_number:mobileNumber,
    full_name:fullName,
    company:company,
    company_email:companyEmail,
    upload_date:uploadDate,
    notes:notes,
    uploaded_at:new Date().toISOString(),
    documents:uploadDocs
  };

  try{
    const res=await fetch(CONFIG.ticketUploadURL,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(upload, stripFormulaChars)});
    if(!res.ok){msg("ticketMessage","danger","Upload failed. Try again or contact the site office.");return}
  }catch(e){
    console.error("Document upload error:",e);
    msg("ticketMessage","danger","Upload failed. Check the connection and try again.");
    return;
  }

  msg("ticketMessage","success","Documents uploaded successfully.");
  resetForm(false);
}

function resetForm(clearMessage=true){
  document.getElementById("fullName").value="";
  document.getElementById("company").value="";
  document.getElementById("mobileNumber").value="";
  document.getElementById("uploadDate").value=todayISO();
  document.getElementById("ticketNotes").value="";
  resetDocumentSections();
  if(clearMessage)msg("ticketMessage","","");
  window.scrollTo(0,0);
}

window.addEventListener("load",()=>{
  document.getElementById("uploadDate").value=todayISO();
  resetDocumentSections();
});


/* ---- CSP-safe event bindings (auto-generated) ---- */
document.querySelector('[data-csp-hook="cspHook1"]').addEventListener("error", function(event) {
  this.style.display='none'
});

document.querySelector('[data-csp-hook="cspHook2"]').addEventListener("blur", function(event) {
  autofillFromMobile(this.value)
});

document.querySelector('[data-csp-hook="cspHook3"]').addEventListener("input", function(event) {
  formatDate(this)
});

document.querySelector('[data-csp-hook2="cspHook4"]').addEventListener("blur", function(event) {
  validateDateInput(this)
});

document.querySelector('[data-csp-hook="cspHook5"]').addEventListener("click", function(event) {
  addDocumentRow('licence')
});

document.querySelector('[data-csp-hook="cspHook6"]').addEventListener("click", function(event) {
  addDocumentRow('risk')
});

document.querySelector('[data-csp-hook="cspHook7"]').addEventListener("click", function(event) {
  addDocumentRow('insurance')
});

document.querySelector('[data-csp-hook="cspHook8"]').addEventListener("click", function(event) {
  resetForm()
});

document.querySelector('[data-csp-hook="cspHook9"]').addEventListener("click", function(event) {
  submitTickets()
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
    showSelectedFiles(rowId);
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
