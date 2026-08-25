
const CONFIG={
  siteContact:"Chris Foster",
  sitePhone:"0478 774 434",
  webhookURL:"/api/signin",
  inductionCheckURL:"/api/induction-check",
  ticketUploadURL:"/api/doc-upload",
  docCheckURL:"/api/doc-check",
  inductionURL:"/contractor/"
};
let state={inducted:null,outIssue:null,signoutId:null,ticketId:null};
const STORE_KEY="tuan_biomass_site_register_v4";
function todayISO(){const n=new Date(),p=x=>String(x).padStart(2,"0");return `${n.getFullYear()}-${p(n.getMonth()+1)}-${p(n.getDate())}`}
function timeNow(){const n=new Date(),p=x=>String(x).padStart(2,"0");return `${p(n.getHours())}:${p(n.getMinutes())}`}
function loadRecords(){try{return JSON.parse(localStorage.getItem(STORE_KEY))||[]}catch(e){return[]}}
function saveRecords(r){localStorage.setItem(STORE_KEY,JSON.stringify(r))}
function genId(){return crypto.randomUUID?crypto.randomUUID():'vis_'+Date.now().toString(36)+Math.random().toString(36).slice(2)}

function showPage(page){
  ["pageHome","pageSignin","pageTickets","pageSignout"].forEach(id=>document.getElementById(id).classList.add("hidden"));
  document.getElementById("page"+page.charAt(0).toUpperCase()+page.slice(1)).classList.remove("hidden");
  if(page==="tickets"&&!window._keepNotice){
    const notice=document.getElementById("uploadNotice");
    notice.innerHTML="Only upload documents that apply to you. Skip any section or row that does not apply.";
    notice.className="notice notice-warn";
  }
  window._keepNotice=false;
  if(page==="home")renderHome();
  if(page==="signin")setDefaultDateTime();
  window.scrollTo(0,0);
}
function setDefaultDateTime(){document.getElementById("signinDate").value=todayISO();document.getElementById("timeIn").value=timeNow()}

function selectRadio(group,val){
  state[group]=val;
  if(group==="inducted"){
    document.getElementById("opt-yes").classList.toggle("selected",val==="yes");
    document.getElementById("opt-no").classList.toggle("selected",val==="escorted");
    document.getElementById("escortContactField").classList.toggle("hidden",val!=="escorted");
    if(val!=="escorted")document.getElementById("escortContact").value="";
    const isEscorted = val==="escorted";
    document.getElementById("mobileLabel").textContent = isEscorted ? "Mobile Number (optional for escorted visitors)" : "Mobile Number *";
    document.getElementById("mobileHint").classList.toggle("hidden", !isEscorted);
    document.getElementById("lookupBtn").classList.toggle("hidden", isEscorted);
  }
  if(group==="outIssue"){
    document.getElementById("out-no").classList.toggle("selected",val==="no");
    document.getElementById("out-yes").classList.toggle("selected",val==="yes");
    document.getElementById("issueFields").classList.toggle("hidden",val!=="yes");
  }
}

function msg(id,type,text){document.getElementById(id).innerHTML=text?`<div class="notice notice-${type}">${text}</div>`:""}

async function autoFillFromMobile(){
  const mobile=document.getElementById("mobileNumber").value.trim();
  if(!mobile||mobile.length<8)return;
  const hint=document.getElementById("autofillHint");
  hint.innerHTML='<div class="autofill-hint">Looking up contractor details...</div>';
  try{
    const res=await fetch(CONFIG.inductionCheckURL,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({mobile_number:mobile,person_id:normaliseMobile(mobile),lookup_only:"true"}, stripFormulaChars)});
    if(!res.ok){hint.innerHTML="";return}
    const data=await res.json();
    if(data.full_name){
      document.getElementById("fullName").value=data.full_name;
      document.getElementById("company").value=data.company||"";
      hint.innerHTML='<div class="autofill-hint">✓ Details filled from contractor register</div>';
      if(data.inducted){selectRadio("inducted","yes")}
    }else{
      hint.innerHTML='<div class="autofill-hint">No existing record found — please enter details manually</div>';
    }
  }catch(e){hint.innerHTML="";console.warn("Autofill lookup failed:",e)}
}

function validateSignIn(){
  const isEscorted = state.inducted==="escorted";
  for(const [id,m] of [["fullName","Please enter the person's full name."],["company","Please enter the company name."],["signinDate","Please select the date."],["timeIn","Please enter the time in."]]){
    if(!document.getElementById(id).value.trim()){msg("signinMessage","danger",m);return false}
  }
  if(!isEscorted && !document.getElementById("mobileNumber").value.trim()){
    msg("signinMessage","danger","Please enter the mobile number. This is the system ID for inducted contractors.");return false
  }
  if(!state.inducted){msg("signinMessage","danger","Please select the site access type.");return false}
  if(isEscorted&&!document.getElementById("escortContact").value.trim()){msg("signinMessage","danger","Please enter the site contact responsible for the visitor.");return false}
  return true
}

async function submitSignIn(){
  if(!validateSignIn())return;
  const fullName=document.getElementById("fullName").value.trim();
  const company=document.getElementById("company").value.trim();
  const mobileNumber=document.getElementById("mobileNumber").value.trim();
  const isEscorted = state.inducted==="escorted";
  const personId = mobileNumber ? normaliseMobile(mobileNumber) : genId();
  const rego=document.getElementById("rego").value.trim().toUpperCase();
  const date=document.getElementById("signinDate").value;
  const arrivalTime=document.getElementById("timeIn").value;
  if(state.inducted==="yes"){
    msg("signinMessage","warn","Checking induction status...");
    try{
      const check=await checkInductionStatus(fullName,company,mobileNumber,date,arrivalTime);
      if(!check.inducted){
        const reason=check.message==="Induction expired"?"Your induction has expired.":"No induction record was found.";
        msg("signinMessage","warn",`${reason} Opening the induction form now...`);
        setTimeout(()=>redirectToInduction(fullName,company,rego,mobileNumber),900);
        return;
      }
    }catch(e){
      msg("signinMessage","danger","Could not check the induction register. DEBUG: "+(e && e.message ? e.message : String(e))+" — Contact the site office before allowing access.");
      return;
    }
  }
  const record={id:genId(),entry_id:"",type:"sign_in",person_id:personId,mobile_number:mobileNumber,status:"on_site",induction_valid:"Y",date:date,full_name:fullName,company:company,arrival_time:arrivalTime,departure_time:"",hours_on_site:"",inducted_previously:state.inducted==="yes"?"yes":"no",visitor:isEscorted?"Y":"N",access_type:state.inducted,escorted_only:isEscorted,site_contact_responsible:isEscorted?document.getElementById("escortContact").value.trim():"",vehicle_rego:rego,tickets_uploaded:[],safety_issue:"",issue_details:"",notes:"",signed_in_at:new Date().toISOString(),signed_out_at:""};
  msg("signinMessage","warn","Signing in...");
  try{
    const res=await fetch(CONFIG.webhookURL,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({type:"sign_in",...record}, stripFormulaChars)});
    if(res.ok){const data=await res.json();if(data.entry_id){record.entry_id=data.entry_id;sessionStorage.setItem(`entryID_${record.id}`,data.entry_id);localStorage.setItem(`entryID_${record.id}`,data.entry_id)}}
  }catch(e){console.warn("Sign-in webhook error:",e)}
  const records=loadRecords();records.push(record);saveRecords(records);
  if(CONFIG.docCheckURL&&state.inducted==="yes"&&mobileNumber){
    try{
      console.log("[DocCheck] Calling docCheckURL for",mobileNumber,"inducted:",state.inducted);
      const docRes=await fetch(CONFIG.docCheckURL,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({full_name:fullName,company:company,person_id:personId,mobile_number:mobileNumber,date:date,arrival_time:arrivalTime}, stripFormulaChars)});
      console.log("[DocCheck] Response status:",docRes.status);
      if(docRes.ok){
        const docData=await docRes.json();
        console.log("[DocCheck] Response data:",JSON.stringify(docData));
        if(docData.docs_expired==="true"){
          clearSignInForm();
          showPage("home");
          const newRec=records[records.length-1];
          state.ticketId=newRec.id;
          document.getElementById("ticketPerson").innerHTML=`<strong>${escapeHTML(newRec.full_name)}</strong> — ${escapeHTML(newRec.company)}`;
          resetDocumentSections();
          let rawDocs=docData.expired_docs;
          let expiredList="one or more documents";
          try{
            if(typeof rawDocs==="string"){
              // Strip curly/smart quotes and backticks before parsing
              rawDocs=rawDocs.replace(/[\u2018\u2019\u201c\u201d`]/g,'"');
              rawDocs=JSON.parse(rawDocs);
            }
            if(Array.isArray(rawDocs)&&rawDocs.length){
              const names=rawDocs.map(d=>{
                if(typeof d==="string") return d.replace(/^[`"]/,"").trim();
                const v=Object.values(d)[0]||"";
                return v.replace(/^[`"]/,"").trim();
              }).filter(Boolean);
              if(names.length) expiredList=names.join(", ");
            }
          }catch(e){console.warn("expired_docs parse error:",e,rawDocs);}
          const notice=document.getElementById("uploadNotice");
          notice.innerHTML=`⚠️ <strong>Your documents need updating before you can proceed to site.</strong><br>The following are expired or missing: <strong>${escapeHTML(expiredList)}</strong>.<br>Upload current copies below — one row per document.`;
          notice.className="notice notice-danger";
          msg("ticketMessage","","");
          window._keepNotice=true;
          showPage("tickets");
          return;
        }
      }
    }catch(e){console.warn("Doc check error:",e)}
  }
  clearSignInForm();showPage("home");
}

async function checkInductionStatus(fullName,company,mobileNumber,date,arrivalTime){
  if(!CONFIG.inductionCheckURL||CONFIG.inductionCheckURL==="PASTE_YOUR_INDUCTION_CHECK_FLOW_URL_HERE")return{inducted:true,source:"local demo mode"};
  const res=await fetch(CONFIG.inductionCheckURL,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({full_name:fullName,company:company,mobile_number:mobileNumber,person_id:normaliseMobile(mobileNumber),date:date,arrival_time:arrivalTime}, stripFormulaChars)});
  if(!res.ok){
    let detail="";
    try{ detail=await res.text(); }catch(e){ detail="(could not read response body)"; }
    throw new Error(`HTTP ${res.status} ${res.statusText} — ${detail.slice(0,200)}`);
  }
  return await res.json();
}

function redirectToInduction(fullName,company,rego,mobileNumber){
  const params=new URLSearchParams({name:fullName,company:company,mobile:mobileNumber,person_id:normaliseMobile(mobileNumber),rego:rego||"",return:"site-register"});
  window.location.href=`${CONFIG.inductionURL}?${params.toString()}`;
}

function clearSignInForm(){
  ["fullName","company","mobileNumber","rego","escortContact"].forEach(id=>document.getElementById(id).value="");
  document.getElementById("escortContactField").classList.add("hidden");
  document.getElementById("mobileHint").classList.add("hidden");
  document.getElementById("lookupBtn").classList.remove("hidden");
  document.getElementById("mobileLabel").textContent="Mobile Number *";
  document.getElementById("autofillHint").innerHTML="";
  document.querySelectorAll("input[type=radio]").forEach(r=>r.checked=false);
  document.querySelectorAll(".radio-opt").forEach(o=>o.classList.remove("selected"));
  state.inducted=null;msg("signinMessage","","");setDefaultDateTime();
}

function startSignOut(id){
  const rec=loadRecords().find(r=>r.id===id);
  if(!rec)return;
  state.signoutId=id;state.outIssue=null;
  document.getElementById("signoutPerson").innerHTML=`<strong>${escapeHTML(rec.full_name)}</strong> — ${escapeHTML(rec.company)} — signed in at ${escapeHTML(rec.arrival_time)}`;
  document.getElementById("issueDetails").value="";
  document.querySelectorAll("input[name=outIssue]").forEach(r=>r.checked=false);
  ["out-no","out-yes"].forEach(id=>document.getElementById(id).classList.remove("selected"));
  document.getElementById("issueFields").classList.add("hidden");
  msg("signoutMessage","","");showPage("signout");
}

async function completeSignOut(){
  if(!state.signoutId)return;
  if(!state.outIssue){msg("signoutMessage","danger","Please select whether there was a safety issue, incident or injury while on site.");return}
  let issueDetailsStr="";
  if(state.outIssue==="yes"){
    issueDetailsStr=document.getElementById("issueDetails").value.trim();
    if(!issueDetailsStr){msg("signoutMessage","danger","Please describe the issue, incident or injury.");return}
  }
  const records=loadRecords();
  const rec=records.find(r=>r.id===state.signoutId);
  if(!rec)return;
  const departureTime=timeNow();
  rec.status="signed_out";rec.departure_time=departureTime;rec.signed_out_at=new Date().toISOString();rec.safety_issue=state.outIssue;rec.issue_details=issueDetailsStr;
  saveRecords(records);
  const entryID=sessionStorage.getItem(`entryID_${rec.id}`)||localStorage.getItem(`entryID_${rec.id}`)||rec.entry_id||"";
  msg("signoutMessage","warn","Signing out...");
  try{
    const res=await fetch(CONFIG.webhookURL,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({type:"sign_out",status:"signed_out",entry_id:entryID,person_id:rec.person_id,mobile_number:rec.mobile_number,full_name:rec.full_name,company:rec.company,date:rec.date,arrival_time:rec.arrival_time,time_out:departureTime,safety_issue:state.outIssue,safety_issue_details:issueDetailsStr,notes:rec.notes||""}, stripFormulaChars)});
    if(!res.ok){msg("signoutMessage","danger","Sign out could not be recorded. Please contact the site office.");return}
  }catch(e){msg("signoutMessage","danger","Sign out could not be recorded. Please contact the site office.");console.error("Sign-out webhook error:",e);return}
  sessionStorage.removeItem(`entryID_${rec.id}`);
  state.signoutId=null;state.outIssue=null;showPage("home");
}

function renderHome(){const active=loadRecords().filter(r=>r.date===todayISO()&&r.status==="on_site");document.getElementById("statOnSite").textContent=active.length;const c=document.getElementById("activeList");if(!active.length){c.innerHTML=`<div class="empty">No visitors or contractors are currently signed in.</div>`;return}const rows=active.map(r=>`<tr><td>${escapeHTML(r.date)}</td><td><strong>${escapeHTML(r.full_name)}</strong></td><td>${escapeHTML(r.company)}</td><td>${escapeHTML(r.mobile_number||"-")}</td><td>${escapeHTML(r.arrival_time)}</td><td>${r.vehicle_rego?escapeHTML(r.vehicle_rego):"-"}</td><td>${r.site_contact_responsible?escapeHTML(r.site_contact_responsible):"-"}</td><td class="action-cell"><div class="small-actions"><button class="btn btn-warning" data-action="start-ticket-upload" data-id="${r.id}">Upload Documents</button><button class="btn btn-danger" data-action="start-sign-out" data-id="${r.id}">Sign Out</button></div></td></tr>`).join("");c.innerHTML=`<div class="table-wrap"><table><thead><tr><th>Date</th><th>Name</th><th>Company</th><th>Mobile / ID</th><th>Time In</th><th>Rego</th><th>Responsible Person</th><th>Action</th></tr></thead><tbody>${rows}</tbody></table></div>`}


function documentTypeOptions(category){
  const options={
    risk:["SWMS","JSA / Risk Assessment","Other Document"],
    insurance:["Public Liability Insurance","Workers Compensation Insurance"],
    licence:["High Risk Work Licence","Driver Licence","Front End Loader Licence","Telehandler Licence","Working at Heights Certificate","Confined Space Certificate"]
  };
  return `<option value="">Select...</option>${options[category].map(v=>`<option>${escapeHTML(v)}</option>`).join("")}`;
}

function sectionRowsId(category){
  return category==="risk"?"riskRows":category==="insurance"?"insuranceRows":"licenceRows";
}

function resetDocumentSections(){
  document.getElementById("ticketNotes").value="";
  document.getElementById("riskRows").innerHTML="";
  document.getElementById("insuranceRows").innerHTML="";
  document.getElementById("licenceRows").innerHTML="";
  addDocumentRow("risk");
  addDocumentRow("insurance");
  addDocumentRow("licence");
}

async function startTicketUpload(id){
  const rec=loadRecords().find(r=>r.id===id);
  if(!rec)return;
  state.ticketId=id;
  document.getElementById("ticketPerson").innerHTML=`<strong>${escapeHTML(rec.full_name)}</strong> — ${escapeHTML(rec.company)} — mobile ID: ${escapeHTML(rec.mobile_number||rec.person_id||"-")}`;
  resetDocumentSections();
  msg("ticketMessage","","");
  // Show page first, then run doc check and update notice
  showPage("tickets");
  const notice=document.getElementById("uploadNotice");
  notice.innerHTML="Checking your documents... please wait.";
  notice.className="notice notice-warn";
  if(CONFIG.docCheckURL&&rec.mobile_number){
    try{
      const docRes=await fetch(CONFIG.docCheckURL,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({full_name:rec.full_name,company:rec.company,person_id:rec.person_id,mobile_number:rec.mobile_number,date:rec.date,arrival_time:rec.arrival_time}, stripFormulaChars)});
      if(docRes.ok){
        const docData=await docRes.json();
        if(docData.docs_expired==="true"){
          let rawDocs=docData.expired_docs;
          let expiredList="one or more documents";
          try{
            if(typeof rawDocs==="string"){
              // Strip curly/smart quotes and backticks before parsing
              rawDocs=rawDocs.replace(/[\u2018\u2019\u201c\u201d`]/g,'"');
              rawDocs=JSON.parse(rawDocs);
            }
            if(Array.isArray(rawDocs)&&rawDocs.length){
              const names=rawDocs.map(d=>{
                if(typeof d==="string") return d.replace(/^[`"]/,"").trim();
                const v=Object.values(d)[0]||"";
                return v.replace(/^[`"]/,"").trim();
              }).filter(Boolean);
              if(names.length) expiredList=names.join(", ");
            }
          }catch(e){console.warn("expired_docs parse error:",e,rawDocs);}
          notice.innerHTML=`⚠️ <strong>Your documents need updating before you can proceed to site.</strong><br>The following are expired or missing: <strong>${escapeHTML(expiredList)}</strong>.<br>Upload current copies below — one row per document.`;
          notice.className="notice notice-danger";
        } else {
          notice.innerHTML="Only upload documents that apply to you. Skip any section or row that does not apply.";
          notice.className="notice notice-warn";
        }
      }
    }catch(e){
      notice.innerHTML="Only upload documents that apply to you. Skip any section or row that does not apply.";
      notice.className="notice notice-warn";
    }
  }
}


function hrwlCodeBoxes(rowId){
  const codes=[
    "LF","LO",
    "DG","RB","RI","RA",
    "SB","SI","SA",
    "WP",
    "CB","CD","CN","C2","C6","C1","C0","CP","CT","CS","CV",
    "HM","HP","RS","PB",
    "BS","BA","ES","TO"
  ];
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
      <div class="hrwl-code-grid">${hrwlCodeBoxes(rowId)}</div>
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

  if(category==="licence" && (val==="High Risk Work Licence" || val==="Driver Licence")){
    expiryWrap.classList.remove("hidden");
    if(val==="High Risk Work Licence") hrwl.classList.remove("hidden");
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
  const category=row.dataset.category;
  const rows=[...document.querySelectorAll(`.document-row[data-category="${category}"]`)];
  if(rows.length<=1){msg("ticketMessage","danger","Keep at least one row in each section. Leave it blank if that section does not apply.");return}
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

function syncExpiry(el) {
  const wrap  = el.closest(".expiry-wrap");
  if (!wrap) return;
  const month = wrap.querySelector(".doc-expiry-month") ? wrap.querySelector(".doc-expiry-month").value : "";
  const year  = wrap.querySelector(".doc-expiry-year")  ? wrap.querySelector(".doc-expiry-year").value  : "";
  const dayEl = wrap.querySelector(".doc-expiry-day");
  const day   = dayEl ? (dayEl.value || "01") : "01";
  wrap.querySelector(".doc-expiry").value = (year && month) ? `${year}-${month}-${day}` : "";
}

function fileToBase64(file){return new Promise((resolve,reject)=>{const reader=new FileReader();reader.onload=()=>resolve(String(reader.result).split(",")[1]);reader.onerror=reject;reader.readAsDataURL(file)})}

function rowApplies(row){
  const document_type=row.querySelector(".doc-type").value.trim();
  const files=[...row.querySelector(".doc-files").files];
  const expiry_date=row.querySelector(".doc-expiry").value;
  const hrwl_classes=[...row.querySelectorAll(".hrwl-code-check:checked")].map(i=>i.value).join(", ");
  const policy_numbers=[...row.querySelectorAll(".policy-number")].map(i=>i.value.trim()).filter(Boolean);
  const coverage=row.querySelector(".coverage-amount") ? row.querySelector(".coverage-amount").value.trim() : "";
  return document_type || files.length || expiry_date || hrwl_classes || policy_numbers.length || coverage;
}

async function submitTickets(){
  if(!state.ticketId)return;
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
    }

    if(document_type==="Workers Compensation Insurance"){
      if(!policy_number){msg("ticketMessage","danger","Please enter the Workers Compensation policy number.");return}
      if(!expiry_date){msg("ticketMessage","danger","Please enter the Workers Compensation expiry date.");return}
    }

    if(document_type==="High Risk Work Licence"){
      if(!hrwl_classes){msg("ticketMessage","danger","Please select at least one High Risk Work Licence code.");return}
      if(!expiry_date){msg("ticketMessage","danger","Please enter the High Risk Work Licence expiry date.");return}
    }

    documents.push({category,document_type,expiry_date,hrwl_classes,policy_number,coverage_amount,files})
  }

  if(!documents.length){msg("ticketMessage","danger","Please upload at least one document, or cancel if nothing applies.");return}

  msg("ticketMessage","warn","Uploading document files...");
  const records=loadRecords();
  const rec=records.find(r=>r.id===state.ticketId);
  if(!rec)return;

  const uploadDocs=[];
  for(const doc of documents){
    const attachments=[];
    for(const file of doc.files){
      attachments.push({file_name:file.name,content_type:file.type||"application/octet-stream",size:file.size,content_base64:await fileToBase64(file)})
    }
    uploadDocs.push({
      category:doc.category,
      document_type:doc.document_type,
      expiry_date:doc.expiry_date,
      licence_class:doc.hrwl_classes,
      policy_number:doc.policy_number,
      coverage_amount:doc.coverage_amount,
      attachments
    })
  }

  const upload={type:"document_upload",record_id:rec.id,person_id:rec.person_id||rec.mobile_number||rec.id,mobile_number:rec.mobile_number||"",full_name:rec.full_name,company:rec.company,notes:notes,uploaded_at:new Date().toISOString(),documents:uploadDocs};

  let ok=true;
  if(CONFIG.ticketUploadURL&&CONFIG.ticketUploadURL!=="PASTE_YOUR_TICKET_UPLOAD_FLOW_URL_HERE"){
    try{
      const res=await fetch(CONFIG.ticketUploadURL,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(upload, stripFormulaChars)});
      ok=res.ok
    }catch(e){
      console.error("Ticket upload error:",e);
      ok=false
    }
  }
  if(!ok){msg("ticketMessage","danger","Upload failed. Try again or contact the site office.");return}

  rec.tickets_uploaded=rec.tickets_uploaded||[];
  for(const doc of documents){
    rec.tickets_uploaded.push({
      category:doc.category,
      document_type:doc.document_type,
      expiry_date:doc.expiry_date,
      hrwl_classes:doc.hrwl_classes,
      policy_number:doc.policy_number,
      coverage_amount:doc.coverage_amount,
      notes:notes,
      file_names:doc.files.map(f=>f.name),
      uploaded_at:upload.uploaded_at
    })
  }
  saveRecords(records);
  state.ticketId=null;
  showPage("home")
}

function normaliseMobile(value){let d=String(value||"").replace(/\D/g,"");if(d.startsWith("61")&&d.length===11)d="0"+d.slice(2);return d}
function escapeHTML(str){return String(str||"").replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]))}

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
window.addEventListener("load",()=>{setDefaultDateTime();renderHome()});


/* ---- CSP-safe event bindings (auto-generated) ---- */
document.querySelector('[data-csp-hook="cspHook1"]').addEventListener("error", function(event) {
  this.style.display='none'
});

document.querySelector('[data-csp-hook="cspHook2"]').addEventListener("click", function(event) {
  showPage('signin')
});

document.querySelector('[data-csp-hook="cspHook3"]').addEventListener("click", function(event) {
  showPage('home')
});

document.querySelector('[data-csp-hook="cspHook4"]').addEventListener("click", function(event) {
  selectRadio('inducted','yes')
});

document.querySelector('[data-csp-hook="cspHook5"]').addEventListener("click", function(event) {
  selectRadio('inducted','escorted')
});

document.querySelector('[data-csp-hook="cspHook6"]').addEventListener("blur", function(event) {
  autoFillFromMobile()
});

document.querySelector('[data-csp-hook="cspHook7"]').addEventListener("click", function(event) {
  autoFillFromMobile()
});

document.querySelector('[data-csp-hook="cspHook8"]').addEventListener("click", function(event) {
  showPage('home')
});

document.querySelector('[data-csp-hook="cspHook9"]').addEventListener("click", function(event) {
  submitSignIn()
});

document.querySelector('[data-csp-hook="cspHook10"]').addEventListener("click", function(event) {
  showPage('home')
});

document.querySelector('[data-csp-hook="cspHook11"]').addEventListener("click", function(event) {
  addDocumentRow('licence')
});

document.querySelector('[data-csp-hook="cspHook12"]').addEventListener("click", function(event) {
  addDocumentRow('risk')
});

document.querySelector('[data-csp-hook="cspHook13"]').addEventListener("click", function(event) {
  addDocumentRow('insurance')
});

document.querySelector('[data-csp-hook="cspHook14"]').addEventListener("click", function(event) {
  showPage('home')
});

document.querySelector('[data-csp-hook="cspHook15"]').addEventListener("click", function(event) {
  submitTickets()
});

document.querySelector('[data-csp-hook="cspHook16"]').addEventListener("click", function(event) {
  showPage('home')
});

document.querySelector('[data-csp-hook="cspHook17"]').addEventListener("click", function(event) {
  selectRadio('outIssue','no')
});

document.querySelector('[data-csp-hook="cspHook18"]').addEventListener("click", function(event) {
  selectRadio('outIssue','yes')
});

document.querySelector('[data-csp-hook="cspHook19"]').addEventListener("click", function(event) {
  showPage('home')
});

document.querySelector('[data-csp-hook="cspHook20"]').addEventListener("click", function(event) {
  completeSignOut()
});


/* ---- CSP-safe delegated event handling ---- */
document.addEventListener("click", function(event) {
  const target = event.target.closest("[data-action]");
  if (!target) return;

  const action = target.dataset.action;

  if (action === "start-ticket-upload") {
    startTicketUpload(target.dataset.id);
  } else if (action === "start-sign-out") {
    startSignOut(target.dataset.id);
  } else if (action === "remove-document-row") {
    const row = target.closest(".document-row");
    removeDocumentRow(row ? row.dataset.rowId : null);
  }
});

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
