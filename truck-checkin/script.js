

/* =========================================================
   ROUTES
========================================================= */

const CONFIG = {

  checkURL:
    "/api/truck-driver-check",

  checkInURL:
    "/api/truck-check-in"

};


/* =========================================================
   TRUCK VISIT SETTINGS
========================================================= */

const ASSUMED_DURATION_MINUTES = 33;


/* =========================================================
   CURRENT DRIVER
========================================================= */

let currentDriver = null;


/* =========================================================
   DATE / TIME
========================================================= */

function todayISO(){

  const n = new Date();

  const p = x =>
    String(x).padStart(2,"0");

  return `${n.getFullYear()}-${p(n.getMonth()+1)}-${p(n.getDate())}`;

}


function timeNow(){

  const n = new Date();

  const p = x =>
    String(x).padStart(2,"0");

  return `${p(n.getHours())}:${p(n.getMinutes())}`;

}


function estimatedDepartureTime(minutesToAdd){

  const n =
    new Date(
      Date.now() +
      minutesToAdd * 60000
    );

  const p = x =>
    String(x).padStart(2,"0");

  return `${p(n.getHours())}:${p(n.getMinutes())}`;

}


/* =========================================================
   HELPERS
========================================================= */

function escapeHTML(str){

  return String(str || "")
    .replace(
      /[&<>"']/g,
      m => ({
        "&":"&amp;",
        "<":"&lt;",
        ">":"&gt;",
        '"':"&quot;",
        "'":"&#39;"
      }[m])
    );

}


function stripFormulaChars(key,value){

  if(
    typeof value === "string" &&
    /^[=+\-@]/.test(value)
  ){
    return "'" + value;
  }

  return value;

}


/* =========================================================
   EXPIRED DOCUMENT NAMES
========================================================= */

function getExpiredDocumentNames(rawDocs){

  if(!rawDocs){
    return [];
  }

  try{

    let docs = rawDocs;

    if(typeof docs === "string"){
      docs = JSON.parse(docs);
    }

    if(!Array.isArray(docs)){
      return [];
    }

    return docs
      .map(doc => {

        if(typeof doc === "string"){
          return doc.trim();
        }

        if(doc && doc.document_type){
          return String(doc.document_type).trim();
        }

        if(doc && doc["Insurance Type"]){
          return String(doc["Insurance Type"]).trim();
        }

        if(doc && typeof doc === "object"){
          const values = Object.values(doc).filter(Boolean);

          if(values.length){
            return String(values[0]).trim();
          }
        }

        return "";

      })
      .filter(Boolean);

  }catch(e){

    console.warn(
      "Could not read expired document details:",
      e
    );

    return [];

  }

}


/* =========================================================
   PIN ENTRY
========================================================= */

function pinBoxes(){

  return [
    ...document.querySelectorAll(".pin-box")
  ];

}


function initPinBoxes(){

  const boxes = pinBoxes();


  boxes.forEach((box,i) => {


    box.addEventListener("input",() => {

      box.value =
        box.value
          .replace(/\D/g,"")
          .slice(0,1);

      box.classList.toggle(
        "filled",
        !!box.value
      );


      if(
        box.value &&
        i < boxes.length - 1
      ){
        boxes[i+1].focus();
      }


      maybeAutoSubmit();

    });


    box.addEventListener("keydown",e => {

      if(
        e.key === "Backspace" &&
        !box.value &&
        i > 0
      ){
        boxes[i-1].focus();
      }

    });


    box.addEventListener("paste",e => {

      e.preventDefault();


      const digits =
        (
          e.clipboardData.getData("text") || ""
        )
        .replace(/\D/g,"")
        .slice(0,4)
        .split("");


      boxes.forEach((b,j) => {

        b.value =
          digits[j] || "";

        b.classList.toggle(
          "filled",
          !!b.value
        );

      });


      const last =
        boxes[
          Math.min(
            digits.length,
            4
          ) - 1
        ];


      if(last){
        last.focus();
      }


      maybeAutoSubmit();

    });

  });


  boxes[0].focus();

}


function maybeAutoSubmit(){

  const code =
    pinBoxes()
      .map(b => b.value)
      .join("");


  if(code.length === 4){

    pinBoxes()
      .forEach(
        b => b.blur()
      );

    runCheck(code);

  }

}


window.addEventListener(
  "DOMContentLoaded",
  initPinBoxes
);


/* =========================================================
   RESET
========================================================= */

function resetToEntry(){

  currentDriver = null;


  document
    .getElementById("pageResult")
    .classList
    .add("hidden");


  document
    .getElementById("pageEntry")
    .classList
    .remove("hidden");


  const boxes =
    pinBoxes();


  boxes.forEach(b => {

    b.value = "";

    b.classList
      .remove("filled");

  });


  document
    .getElementById("entryHint")
    .textContent =
      "Your code is the last 4 digits of your mobile number";


  setTimeout(
    () => boxes[0].focus(),
    50
  );

}


/* =========================================================
   DRIVER LOOKUP
========================================================= */

async function runCheck(code){

  document
    .getElementById("pageEntry")
    .classList
    .add("hidden");


  document
    .getElementById("pageResult")
    .classList
    .remove("hidden");


  document
    .getElementById("resultChecking")
    .classList
    .remove("hidden");


  document
    .getElementById("resultBody")
    .classList
    .add("hidden");


  let data;


  try{

    const res =
      await fetch(
        CONFIG.checkURL,
        {

          method:"POST",

          headers:{
            "Content-Type":"application/json"
          },

          body:
            JSON.stringify(
              {

                mobile_last4:
                  code,

                date:
                  todayISO(),

                arrival_time:
                  timeNow()

              },
              stripFormulaChars
            )

        }
      );


    if(!res.ok){

      throw new Error(
        `HTTP ${res.status}`
      );

    }


    data =
      await res.json();


  }catch(e){

    showNoMatch(
      `We couldn't reach the check-in system. DEBUG: ${
        e && e.message
          ? e.message
          : e
      }`
    );

    return;

  }


  if(
    Array.isArray(data.matches) &&
    data.matches.length > 1
  ){

    showMultipleMatches(
      data.matches,
      code
    );

    return;

  }


  if(!data.full_name){

    showNoMatch(
      "No truck driver record was found for that code."
    );

    return;

  }


  currentDriver = {

    code:
      code,

    full_name:
      data.full_name,

    company:
      data.company || "",

    person_id:
      data.person_id || code

  };


  showWelcome(data);

}


/* =========================================================
   DUPLICATE PIN
========================================================= */

function showMultipleMatches(matches,code){

  document
    .getElementById("resultChecking")
    .classList
    .add("hidden");


  document
    .getElementById("resultBody")
    .classList
    .remove("hidden");


  document
    .getElementById("welcomeName")
    .textContent =
      "Which driver are you?";


  document
    .getElementById("welcomeCompany")
    .textContent =
      "More than one driver matches that code";


  document
    .getElementById("statusBox")
    .innerHTML = "";


  const list =
    document
      .getElementById("matchList");


  list.classList
    .remove("hidden");


  list.innerHTML =
    matches
      .map(
        (m,i) =>
          `<button
            class="match-opt"
            data-action="select-match" data-index="${i}"
          >
            ${escapeHTML(m.full_name)}
            —
            ${escapeHTML(m.company || "")}
          </button>`
      )
      .join("");


  window._pendingMatches =
    matches;

  window._pendingCode =
    code;


  document
    .getElementById("resultActions")
    .innerHTML =
      `<button
        class="btn btn-secondary"
        data-action="reset-to-entry"
      >
        Not me — start over
      </button>`;

}


function selectMatch(i){

  const m =
    window._pendingMatches[i];


  currentDriver = {

    code:
      window._pendingCode,

    full_name:
      m.full_name,

    company:
      m.company || "",

    person_id:
      m.person_id ||
      window._pendingCode

  };


  document
    .getElementById("matchList")
    .classList
    .add("hidden");


  showWelcome(m);

}


/* =========================================================
   NO MATCH
========================================================= */

function showNoMatch(reason){

  document
    .getElementById("resultChecking")
    .classList
    .add("hidden");


  document
    .getElementById("resultBody")
    .classList
    .remove("hidden");


  document
    .getElementById("welcomeName")
    .textContent =
      "Driver not found";


  document
    .getElementById("welcomeCompany")
    .textContent = "";


  document
    .getElementById("matchList")
    .classList
    .add("hidden");


  document
    .getElementById("statusBox")
    .innerHTML =
      `<div class="status-box status-danger">
        ${escapeHTML(reason)}
        Please see the site office or operators.
      </div>`;


  document
    .getElementById("resultActions")
    .innerHTML =
      `<button
        class="btn btn-secondary"
        data-action="reset-to-entry"
      >
        Try a different code
      </button>`;

}


/* =========================================================
   DRIVER STATUS
========================================================= */

function showWelcome(data){

  document
    .getElementById("resultChecking")
    .classList
    .add("hidden");


  document
    .getElementById("resultBody")
    .classList
    .remove("hidden");


  document
    .getElementById("matchList")
    .classList
    .add("hidden");


  document
    .getElementById("welcomeName")
    .textContent =
      `Welcome, ${data.full_name}`;


  document
    .getElementById("welcomeCompany")
    .textContent =
      data.company || "";


  const inducted =
    data.inducted !== false;


  const docsExpired =
    data.docs_expired === true ||
    String(data.docs_expired).toLowerCase() === "true";


  const expiredDocumentNames =
    getExpiredDocumentNames(
      data.expired_docs
    );


/* =========================================================
   INDUCTION EXPIRED
========================================================= */

  if(!inducted){

    document
      .getElementById("statusBox")
      .innerHTML =
        `<div class="status-box status-warn">
          You're checked in, however your site induction has expired
          or hasn't been completed.
          Please see the site office or operators before continuing work on site.
        </div>`;


    document
      .getElementById("resultActions")
      .innerHTML =
        `<button
          class="btn btn-secondary"
          data-action="reset-to-entry"
        >
          Done
        </button>`;


    logCheckIn(
      "induction_expired"
    );


    return;

  }


/* =========================================================
   INSURANCE / LICENCE DETAILS EXPIRED
========================================================= */

  if(docsExpired){

    let documentMessage =
      "Your company's insurance or licence details require updating.";

    if(expiredDocumentNames.length === 1){

      documentMessage =
        `${escapeHTML(expiredDocumentNames[0])} requires updating.`;

    }

    if(expiredDocumentNames.length > 1){

      documentMessage =
        `The following details require updating: <strong>${
          expiredDocumentNames
            .map(name => escapeHTML(name))
            .join(", ")
        }</strong>.`;

    }


    document
      .getElementById("statusBox")
      .innerHTML =
        `<div class="status-box status-warn">
          <strong>You're checked in.</strong>
          <br><br>
          ${documentMessage}
          <br><br>
          Your company has been notified and asked to provide current details.
          <br><br>
          Please see the site office or operators if required.
        </div>`;


    document
      .getElementById("resultActions")
      .innerHTML =
        `<button
          class="btn btn-primary"
          data-action="reset-to-entry"
        >
          Done
        </button>`;


    logCheckIn(
      "documents_expired"
    );


    return;

  }


/* =========================================================
   ALL CLEAR
========================================================= */

  document
    .getElementById("statusBox")
    .innerHTML =
      `<div class="status-box status-ok">
        You're checked in and all clear.
        Head to site safely.
      </div>`;


  document
    .getElementById("resultActions")
    .innerHTML =
      `<button
        class="btn btn-primary"
        data-action="reset-to-entry"
      >
        Done
      </button>`;


  logCheckIn(
    "clear"
  );

}


/* =========================================================
   LOG CHECK-IN
========================================================= */

async function logCheckIn(outcome){

  if(!currentDriver){
    return;
  }


  try{

    const res =
      await fetch(
        CONFIG.checkInURL,
        {

          method:"POST",

          headers:{
            "Content-Type":"application/json"
          },

          body:
            JSON.stringify(
              {

                type:
                  "truck_check_in",

                person_id:
                  currentDriver.person_id,

                mobile_last4:
                  currentDriver.code,

                full_name:
                  currentDriver.full_name,

                company:
                  currentDriver.company,

                date:
                  todayISO(),

                arrival_time:
                  timeNow(),

                assumed_duration_minutes:
                  ASSUMED_DURATION_MINUTES,

                estimated_departure_time:
                  estimatedDepartureTime(
                    ASSUMED_DURATION_MINUTES
                  ),

                outcome:
                  outcome

              },
              stripFormulaChars
            )

        }
      );


    if(!res.ok){

      console.warn(
        "Truck check-in returned HTTP",
        res.status
      );

    }


  }catch(e){

    console.warn(
      "Truck check-in log error:",
      e
    );

  }

}



/* ---- CSP-safe event bindings (auto-generated) ---- */
document.querySelector('[data-csp-hook="cspHook1"]').addEventListener("error", function(event) {
  this.style.display='none'
});


/* ---- CSP-safe delegated click handling for dynamically-rendered buttons ---- */
document.addEventListener("click", function(event) {
  const target = event.target.closest("[data-action]");
  if (!target) return;

  const action = target.dataset.action;

  if (action === "reset-to-entry") {
    resetToEntry();
  } else if (action === "select-match") {
    selectMatch(Number(target.dataset.index));
  }
});
