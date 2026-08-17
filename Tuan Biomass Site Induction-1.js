
const slides=[...document.querySelectorAll('.sl')];
const N=slides.length;
let cur=0;
const qs={};

// INIT QUIZZES
document.querySelectorAll('.qsl').forEach(qz=>{
  const idx=parseInt(qz.id.replace('s',''));
  const correct=parseInt(qz.dataset.c);
  const tip=qz.dataset.t;
  const opts=qz.querySelectorAll('.qopt');
  const fb=qz.querySelector('.qfb');
  const btn=qz.querySelector('.qsub');
  const att=qz.querySelector('.qatt');
  let chosen=null,attempts=0,passed=false;

  opts.forEach(o=>{
    o.addEventListener('click',()=>{
      if(passed)return;
      opts.forEach(x=>x.classList.remove('sel'));
      o.classList.add('sel');
      chosen=parseInt(o.dataset.i);
      btn.disabled=false;
    });
  });

  btn.addEventListener('click',()=>{
    if(chosen===null||passed)return;
    attempts++;
    if(chosen===correct){
      passed=true;qs[idx]=true;
      opts.forEach(o=>{
        if(parseInt(o.dataset.i)===correct){
          o.classList.remove('sel');o.classList.add('cor');
          o.innerHTML+=`<span class="otk">✓</span>`;
        }else{
          o.classList.remove('sel');
          o.style.opacity='.4';o.style.cursor='default';
        }
      });
      fb.className='qfb show good';
      fb.innerHTML='✓ &nbsp; Correct! &nbsp; '+tip;
      btn.textContent='Continue →';
      btn.disabled=false;
      btn.onclick=()=>go(cur+1);
      att.textContent='';
      updateSB();
    }else{
      const el=qz.querySelector(`.qopt[data-i="${chosen}"]`);
      el.classList.remove('sel');el.classList.add('wrg');
      el.innerHTML+=`<span class="otk">✗</span>`;
      setTimeout(()=>{
        el.classList.remove('wrg');
        el.innerHTML=el.innerHTML.replace('<span class="otk">✗</span>','');
      },1100);
      fb.className='qfb show bad';
      fb.innerHTML='✗ &nbsp; Not quite — try again.';
      btn.disabled=true;chosen=null;
      att.textContent=attempts>1?`Attempt ${attempts}`:'';
    }
  });
});

function slideIdNum(n){const id=(slides[n]?.id||'').replace('s',''); const num=parseInt(id); return Number.isNaN(num)?n:num}
function isQ(n){return slides[n]?.classList.contains('qsl')}
function isSign(n){return slides[n]?.dataset.sign==='true'}
function signPass(){
  const ids=['workerName','signDate'];
  const filled=ids.every(id=>document.getElementById(id)?.value.trim());
  const ticked=document.getElementById('declareBox')?.checked;
  const declItems=[...document.querySelectorAll('.decl-item')];
  const allDecl=declItems.length===0||declItems.every(cb=>cb.checked);
  return !!(filled&&ticked&&allDecl);
}
function downloadPDFAgain(){
  const name=document.getElementById('workerName').value.trim()||'Worker';
  const date=document.getElementById('signDate').value;
  const now=new Date();
  const timeStr=now.toLocaleTimeString('en-AU',{hour:'2-digit',minute:'2-digit',hour12:true});
  const dateFormatted=date?new Date(date+'T00:00:00').toLocaleDateString('en-AU',{day:'2-digit',month:'long',year:'numeric'}):now.toLocaleDateString('en-AU',{day:'2-digit',month:'long',year:'numeric'});
  generateInductionPDF(name, dateFormatted, timeStr);
}

function sendInductionEmail(){
  try{
    emailjs.init('nxPZjTfa1Pb-libH1');
    const name=document.getElementById('workerName').value.trim();
    const date=document.getElementById('signDate').value;
    const now=new Date();
    const timeStr=now.toLocaleTimeString('en-AU',{hour:'2-digit',minute:'2-digit',hour12:true});
    const dateFormatted=date?new Date(date+'T00:00:00').toLocaleDateString('en-AU',{day:'2-digit',month:'long',year:'numeric'}):now.toLocaleDateString('en-AU',{day:'2-digit',month:'long',year:'numeric'});
    emailjs.send('service_pepvbtq','template_yjcwbij',{
      worker_name: name,
      sign_date: dateFormatted,
      sign_time: timeStr,
      site: 'Tuan Biomass',
      result: 'Pass',
      to_email: 'christopher.foster@albioma.com'
    }).then(()=>{
      console.log('Induction notification sent for: '+name);
    }).catch(err=>{
      console.error('EmailJS error:',err);
    });
  }catch(e){
    console.error('Email init error:',e);
  }
}
function generateInductionPDF(name, dateFormatted, timeStr){
  try{
    const {jsPDF}=window.jspdf;
    const doc=new jsPDF({orientation:'portrait',unit:'mm',format:'a4'});
    const green=[27,77,46];
    const lgreen=[234,244,234];
    const white=[255,255,255];
    const grey=[74,74,74];
    const W=210, M=20;

    // Header
    doc.setFillColor(...green);
    doc.rect(0,0,W,40,'F');
    doc.setFillColor(106,176,76);
    doc.rect(0,0,6,40,'F');
    doc.setTextColor(...white);
    doc.setFontSize(9);
    doc.setFont('helvetica','normal');
    doc.text('ALBIOMA GROUP',M,12);
    doc.setFontSize(20);
    doc.setFont('helvetica','bold');
    doc.text('Site Induction Record',M,25);
    doc.setFontSize(10);
    doc.setFont('helvetica','normal');
    doc.text('Tuan Biomass - Safety Induction',M,34);
    doc.setFontSize(8);
    doc.text('ID-003-2025-v1.0',W-M,34,{align:'right'});

    // Pass badge
    doc.setFillColor(...lgreen);
    doc.rect(M,48,W-(M*2),18,'F');
    doc.setDrawColor(...green);
    doc.setLineWidth(0.5);
    doc.rect(M,48,W-(M*2),18,'S');
    doc.setTextColor(...green);
    doc.setFontSize(13);
    doc.setFont('helvetica','bold');
    doc.text('INDUCTION PASSED',W/2,60,{align:'center'});

    // Details box
    doc.setFillColor(248,251,248);
    doc.rect(M,74,W-(M*2),72,'F');
    doc.setDrawColor(200,220,200);
    doc.rect(M,74,W-(M*2),72,'S');

    const fields=[
      ['Worker Name', name],
      ['Date Completed', dateFormatted],
      ['Time Completed', timeStr],
      ['Site', 'Tuan Biomass'],
      ['Induction Type', 'Site Safety Induction'],
      ['Result', 'Pass - All knowledge checks completed'],
    ];
    doc.setFontSize(9);
    fields.forEach(([label,val],i)=>{
      const y=86+(i*10);
      if(i%2===0){doc.setFillColor(240,247,240);doc.rect(M+1,y-6,W-(M*2)-2,10,'F');}
      doc.setFont('helvetica','bold');doc.setTextColor(...green);
      doc.text(label+':',M+6,y);
      doc.setFont('helvetica','normal');doc.setTextColor(...grey);
      doc.text(String(val),M+58,y);
    });

    // Declaration box
    doc.setFillColor(...lgreen);
    doc.rect(M,154,W-(M*2),38,'F');
    doc.setDrawColor(...green);
    doc.rect(M,154,W-(M*2),38,'S');
    doc.setFont('helvetica','bold');doc.setFontSize(9);doc.setTextColor(...green);
    doc.text('DECLARATION CONFIRMED',M+6,164);
    doc.setFont('helvetica','normal');doc.setFontSize(8);doc.setTextColor(...grey);
    const decl='The worker named above has read, understood and agreed to all sections of the Tuan Biomass Safety Induction, including all site hazards, PPE requirements, Lockout/Tagout procedures, Albioma Golden Rules and Lifesaving Eleven.';
    doc.text(doc.splitTextToSize(decl,W-(M*2)-12),M+6,173);

    // Checklist
    doc.setFillColor(248,251,248);
    doc.rect(M,200,W-(M*2),64,'F');
    doc.setDrawColor(200,220,200);
    doc.rect(M,200,W-(M*2),64,'S');
    doc.setFont('helvetica','bold');doc.setFontSize(9);doc.setTextColor(...green);
    doc.text('INDUCTION CHECKLIST',M+6,210);
    const checks=[
      'Golden Rules and Lifesaving Eleven reviewed',
      'Major site hazards reviewed (dust, fire, mobile plant, heights, confined spaces)',
      'PPE zone requirements reviewed',
      'Lockout/Tagout (LOTO) procedures reviewed',
      'Incident and hazard reporting requirements reviewed',
      'All knowledge check questions answered correctly',
      'Worker declaration signed',
    ];
    doc.setFont('helvetica','normal');doc.setFontSize(8);
    checks.forEach((c,i)=>{
      const y=220+(i*7);
      doc.setFillColor(...green);
      doc.rect(M+6,y-3.5,3.5,3.5,'F');
      doc.setTextColor(...grey);
      doc.text(c,M+13,y);
    });

    // Footer
    doc.setFillColor(...green);
    doc.rect(0,275,W,22,'F');
    doc.setFillColor(106,176,76);
    doc.rect(0,275,6,22,'F');
    doc.setTextColor(...white);doc.setFontSize(8);doc.setFont('helvetica','normal');
    doc.text('Safety Manager: Chris Foster  |  christopher.foster@albioma.com  |  0478 774 434',M,283);
    doc.text('Plant Manager: David Knight  |  david.knight@albioma.com  |  0439 013 224',M,290);
    doc.setFontSize(7);doc.setTextColor(180,210,180);
    doc.text('Generated: '+dateFormatted+' '+timeStr,W-M,290,{align:'right'});

    const safeName=name.replace(/[^a-zA-Z0-9]/g,'_');
    const safeDate=dateFormatted.replace(/\s+/g,'').replace(/\//g,'-');
    doc.save('Induction_'+safeName+'_'+safeDate+'.pdf');
  }catch(e){
    alert('PDF error: '+e.message);
    console.error('PDF generation error:',e);
  }
}

function submitDeclaration(){
  if(signPass()){
    const name=document.getElementById('workerName').value.trim();
    const date=document.getElementById('signDate').value;
    const now=new Date();
    const timeStr=now.toLocaleTimeString('en-AU',{hour:'2-digit',minute:'2-digit',hour12:true});
    const dateFormatted=date?new Date(date+'T00:00:00').toLocaleDateString('en-AU',{day:'2-digit',month:'long',year:'numeric'}):now.toLocaleDateString('en-AU',{day:'2-digit',month:'long',year:'numeric'});
    sendInductionEmail();
    generateInductionPDF(name, dateFormatted, timeStr);
    go(cur+1);
  }else{updateSignStatus();}
}
function qPass(n){return !isQ(n) || qs[slideIdNum(n)]===true}
function canLeaveForward(n){return qPass(n)&&(!isSign(n)||signPass())}
function updateSignStatus(){
  const st=document.getElementById('sigstatus');
  if(!st)return;
  if(signPass()){
    st.textContent='Sign-off complete. Click Next to finish.';
    st.classList.add('ok');
  }else{
    st.textContent='Complete all fields and tick the declaration to continue.';
    st.classList.remove('ok');
  }
}

function showOnly(n){
  slides.forEach((sl,i)=>{
    sl.classList.toggle('act', i===n);
    sl.style.display = i===n ? 'block' : 'none';
  });
}

function go(n){
  if(n<0||n>=N)return;
  if(n>cur&&!canLeaveForward(cur))return;
  cur=n;
  showOnly(cur);
  document.getElementById('sa').scrollTop=0;
  // Populate worker name on completion slide
  const completeMsg=document.getElementById('completeMsg');
  if(completeMsg){
    const name=document.getElementById('workerName')?.value.trim();
    if(name) completeMsg.textContent=name+' has completed the Tuan Biomass Safety Induction.';
  }
  updateUI();
}

function updateUI(){
  document.getElementById('pbi').style.width=((cur/(N-1))*100)+'%';
  document.getElementById('sct').textContent=`${cur+1} / ${N}`;
  const nb=document.getElementById('bn');
  const blocked=!canLeaveForward(cur);
  nb.disabled=cur===N-1||blocked;
  nb.textContent=cur===N-1?'Finished':(isSign(cur)?'Finish →':'Next →');
  nb.title=blocked?(isSign(cur)?'Complete the sign-off to continue':'Answer the quiz correctly to continue'):'';
  updateSignStatus();
  document.getElementById('bp').disabled=cur===0;
  updateSB();
}

function updateSB(){
  document.querySelectorAll('.sbi').forEach(el=>{
    const n=parseInt(el.dataset.s);
    el.classList.toggle('act',n===cur);
    if(qs[n])el.classList.add('done');
  });
}

document.getElementById('bn').addEventListener('click',()=>go(cur+1));
document.getElementById('bp').addEventListener('click',()=>go(cur-1));
document.querySelectorAll('.sbi').forEach(el=>{
  el.addEventListener('click',()=>go(parseInt(el.dataset.s)));
});
const menuBtn=document.getElementById('sbt');
if(menuBtn){menuBtn.addEventListener('click',()=>{
  const sb=document.getElementById('sb');
  if(sb)sb.classList.toggle('col');
});}
['workerName','signDate','declareBox'].forEach(id=>{
  const el=document.getElementById(id);
  if(el)el.addEventListener('input',updateUI);
  if(el)el.addEventListener('change',updateUI);
});
document.querySelectorAll('.decl-item').forEach(cb=>{
  cb.addEventListener('change',updateUI);
});
const dateEl=document.getElementById('signDate');
if(dateEl&&!dateEl.value)dateEl.value=new Date().toISOString().slice(0,10);
document.addEventListener('keydown',e=>{
  if(e.key==='ArrowRight'||e.key==='ArrowDown')go(cur+1);
  if(e.key==='ArrowLeft'||e.key==='ArrowUp')go(cur-1);
});

document.body.classList.add('show-one-slide');
showOnly(cur);
updateUI();


/* ---- CSP-safe event bindings (auto-generated) ---- */
document.querySelector('[data-csp-hook="cspHook1"]').addEventListener("click", function(event) {
  submitDeclaration()
});