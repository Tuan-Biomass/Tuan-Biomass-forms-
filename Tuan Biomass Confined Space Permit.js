
  // ── HAZARD DATA FROM CONFINED SPACE REGISTER ──
  const HAZARD_DATA = {
    "CS0001": { name: "CS0001 — Cooler Bin (Class C)", hazards: ["Dust Exposure / Respiratory Hazards","Combustible Dust / Explosion Risk","Engulfment (pellets)","Temperature Extremes / Heat Stress","Confined Entry/Exit — Escape Risk","Mechanical Hazards (hydraulic floor)","Fall Hazards"] },
    "CS0002": { name: "CS0002 — Sweeper Bin (Class C)", hazards: ["Dust Exposure / Respiratory Hazards","Combustible Dust / Explosion Risk","Entanglement (conveyor screws/agitator)","Fall Hazards (stairs/elevated areas)"] },
    "CS0003": { name: "CS0003 — Fuel Bin (Class B)", hazards: ["Oxygen Deficiency / Asphyxiation Risk","Dust Explosion Risk (sawdust/pellet fines)","Entanglement (feed auger/flying Dutchman)","Respiratory Hazards (dust/particulate)","Limited Visibility","Temperature Extremes"] },
    "CS0004": { name: "CS0004 — Outlet Pipe (Dryer) (Class C)", hazards: ["High Temperature / Burns Risk","Mechanical Hazards (dryer drum)","Material Residues (hot/abrasive/hazardous)","Limited Visibility","Limited Accessibility","Noise Levels"] },
    "CS0005": { name: "CS0005 — ID Fan (Class C)", hazards: ["Rotating Blades / Entanglement","High Noise Levels","Limited Visibility","Dust / Particulate Exposure","Temperature Extremes"] },
    "CS0006": { name: "CS0006 — Dryer Drum (Class C)", hazards: ["Oxygen Deficiency / Asphyxiation Risk","Residual Heat / Burns Risk","Mechanical Hazards (rotating drum/agitators)","Material Residues (hot/abrasive/hazardous)","Dust / Particulate Exposure","Limited Visibility","High Noise Levels"] },
    "CS0007": { name: "CS0007 — Burner (Class B)", hazards: ["Oxygen Deficiency / Asphyxiation Risk","Toxic Gas Exposure (combustion byproducts)","High Temperatures / Burns Risk","Limited Visibility","Mechanical Hazards (combustion fans)","Burner Residue / Silicon Dioxide Exposure","Limited Accessibility"] },
    "CS0008": { name: "CS0008 — Sawdust Silo (Class C)", hazards: ["Oxygen Deficiency / Asphyxiation Risk","Limited Visibility","Collapse / Engulfment Risk (sawdust)","Mechanical Hazards (screw — entanglement)","Poor Ventilation / Toxic Gases","Combustible Dust / Fire/Explosion Risk","Temperature Extremes","Fall Hazards (elevated access)","Access Challenges / Rescue Complexity","Equipment Transport — Drop Hazard"] },
    "CS0009": { name: "CS0009 — Shaving Silo (Class C)", hazards: ["Oxygen Deficiency / Asphyxiation Risk","Limited Visibility","Collapse / Engulfment Risk (shavings)","Dust Explosion Risk (MC 7–12%)","Mechanical Hazards (screw — entanglement)","Poor Ventilation / Toxic Gases","Combustible Dust / Fire/Explosion Risk","Temperature Extremes","Fall Hazards (elevated access)","Access Challenges / Rescue Complexity","Equipment Transport — Drop Hazard"] },
    "CS0010": { name: "CS0010 — Morillon / Sawdust Silo (Class C)", hazards: ["Oxygen Deficiency / Asphyxiation Risk","Limited Visibility","Collapse / Engulfment Risk (sawdust)","Mechanical Hazards (screw — entanglement)","Poor Ventilation / Toxic Gases","Combustible Dust / Fire/Explosion Risk","Temperature Extremes","Fall Hazards (elevated access)","Access Challenges / Rescue Complexity","Equipment Transport — Drop Hazard"] },
    "CS0011": { name: "CS0011 — Bulk Silo North/South (Class C)", hazards: ["Oxygen Deficiency / Atmospheric Hazard","Dust Exposure (pellet dust — respiratory/explosion)","Engulfment (pellets)","Structural Hazards (buildup/falling debris)","Temperature Extremes","Mechanical Hazards (conveyors)","Fall Hazards (elevated access)","Access Challenges / Rescue Complexity","Equipment Transport — Drop Hazard"] },
    "CS0012": { name: "CS0012 — Truck Silo North/South (Class C)", hazards: ["Oxygen Deficiency / Atmospheric Hazard","Dust Exposure (pellet dust — respiratory/explosion)","Engulfment (pellets)","Structural Hazards (buildup/falling debris)","Temperature Extremes","Mechanical Hazards (conveyors)","Fall Hazards (elevated access)","Access Challenges / Rescue Complexity","Equipment Transport — Drop Hazard"] },
    "CS0013": { name: "CS0013 — Walking Floor (Class C)", hazards: ["Oxygen Deficiency / Asphyxiation Risk","Entrapment / Engulfment (floor slats)","Material Residues / Tripping Hazards","Mechanical Hazards (hydraulics/metering screw)","Temperature Extremes","Limited Visibility","Noise (machinery)","Limited Entry/Exit Points"] },
    "CS0014": { name: "CS0014 — Shredder Discharge Screw (Class C)", hazards: ["Oxygen Deficiency / Asphyxiation Risk","Rotating Parts / Entanglement","Material Residues (hot/abrasive/hazardous)","Dust Exposure / Respiratory Hazards","Limited Visibility","Mechanical Hazards (additional moving parts)","Temperature Extremes","Limited Accessibility","Noise Levels"] },
  };

  function loadHazardsFromRegister() {
    const sel = document.getElementById('hazardSpaceSelect');
    const key = sel.value;
    if (!key || !HAZARD_DATA[key]) return;
    const entry = HAZARD_DATA[key];
    document.getElementById('knownHazards').value = entry.hazards.join('\n');
    // Also populate the space ID field if empty
    const spaceField = document.getElementById('spaceId');
    if (!spaceField.value) {
      spaceField.value = entry.name;
      document.getElementById('spaceIdDisplay').textContent = entry.name;
    }
  }

  function syncSpaceDropdown(val) {
    const sel = document.getElementById('hazardSpaceSelect');
    const key = val.trim().substring(0,6).toUpperCase();
    if (HAZARD_DATA[key]) {
      sel.value = key;
    }
    document.getElementById('spaceIdDisplay').textContent = val || '—';
  }

  // ── PERMIT NUMBER TRACKING ──
  let permitLog = JSON.parse(localStorage.getItem('csPermitLog') || '[]');

  function updatePermitLogDisplay() {
    document.getElementById('permitCountDisplay').textContent = permitLog.length + ' permit' + (permitLog.length !== 1 ? 's' : '') + ' issued this session';
    if (permitLog.length > 0) {
      const last = permitLog[permitLog.length - 1];
      document.getElementById('lastPermitDisplay').textContent = last.number + ' (' + last.space + ')';
    }
  }

  function showPermitLog() {
    if (permitLog.length === 0) { alert('No permits issued yet this session.'); return; }
    let msg = 'PERMIT LOG\n' + '─'.repeat(40) + '\n';
    permitLog.forEach((p, i) => {
      msg += (i+1) + '. ' + p.number + ' | ' + p.space + ' | ' + p.date + ' | Issued: ' + p.issuedAt + '\n';
    });
    alert(msg);
  }

  function exportPermitLog() {
    if (permitLog.length === 0) { alert('No permits to export.'); return; }
    let csv = 'Permit No,Space ID,Date,Time Issued,Status\n';
    permitLog.forEach(p => {
      csv += [p.number, p.space, p.date, p.issuedAt, p.status].join(',') + '\n';
    });
    const blob = new Blob([csv], {type: 'text/csv'});
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'ConfSpace_PermitLog_' + new Date().toISOString().split('T')[0] + '.csv';
    a.click();
  }

  // Check button toggle
  function setCheck(id, val) {
    const item = document.getElementById(id);
    const btns = item.querySelectorAll('.check-btn');
    btns.forEach(b => {
      b.classList.remove('active-yes','active-no','active-na');
    });
    btns.forEach(b => {
      if (b.classList.contains(val)) {
        b.classList.add('active-' + val);
      }
    });
  }

 // Add entrant row
  let rowCount = 6;

  function addEntrantRow() {
    rowCount++;

    const row = `
      <tr>
        <td class="row-num">${rowCount}</td>
        <td style="min-width:120px">&nbsp;</td>
        <td style="min-width:90px">&nbsp;</td>
        <td style="min-width:60px">&nbsp;</td>
        <td style="min-width:55px">&nbsp;</td>
        <td style="min-width:60px">&nbsp;</td>
        <td style="min-width:55px">&nbsp;</td>
      </tr>
    `;

    document.getElementById('entryLogBody').insertAdjacentHTML('beforeend', row);
  }

  // Issue permit
  function issuePermit() {
    const permitNo = document.getElementById('permitNo').value || 'PENDING';
    const spaceId = document.getElementById('spaceId').value || '—';
    const dateVal = document.getElementById('entryDate').value || new Date().toISOString().split('T')[0];
    document.getElementById('statusDisplay').textContent = '✓ ISSUED — ' + permitNo;
    document.getElementById('spaceIdDisplay').textContent = spaceId;
    // Log the permit
    const entry = {
      number: permitNo,
      space: spaceId,
      date: dateVal,
      issuedAt: new Date().toLocaleTimeString(),
      status: 'ISSUED'
    };
    permitLog.push(entry);
    try { localStorage.setItem('csPermitLog', JSON.stringify(permitLog)); } catch(e) {}
    updatePermitLogDisplay();
  }

  // Cancel permit
  function cancelPermit() {
    if (confirm('Mark this permit as CANCELLED / VOID?')) {
      document.getElementById('statusDisplay').textContent = '✗ CANCELLED / VOID';
      if (permitLog.length > 0) {
        permitLog[permitLog.length-1].status = 'CANCELLED';
        try { localStorage.setItem('csPermitLog', JSON.stringify(permitLog)); } catch(e) {}
      }
    }
  }

  // Clear form
  function clearForm() {
    if (confirm('Clear all form data and start fresh?')) {
      document.querySelectorAll('input, textarea, select').forEach(el => {
        if (el.type === 'text' || el.type === 'date' || el.type === 'time' || el.type === 'number') {
          if (el.id !== 'permitNo') el.value = '';
        } else if (el.tagName === 'SELECT') {
          el.selectedIndex = 0;
        } else if (el.tagName === 'TEXTAREA') {
          el.value = '';
        }
      });
      document.querySelectorAll('.check-btn').forEach(b => {
        b.classList.remove('active-yes','active-no','active-na');
      });
      document.getElementById('statusDisplay').textContent = '— Not Yet Issued';
      document.getElementById('spaceIdDisplay').textContent = '—';
    }
  }

  // Auto-increment permit number suggestion
  function suggestNextPermitNo() {
    const last = permitLog.length > 0 ? permitLog[permitLog.length-1].number : null;
    if (last) {
      const match = last.match(/(\D*)(\d+)(\D*)$/);
      if (match) {
        const next = match[1] + String(parseInt(match[2]) + 1).padStart(match[2].length, '0') + match[3];
        const field = document.getElementById('permitNo');
        if (!field.value) field.placeholder = 'Suggested: ' + next;
      }
    }
  }

  // Live update space ID display
  document.getElementById('spaceId').addEventListener('input', function() {
    const val = this.value.trim();
    document.getElementById('spaceIdDisplay').textContent = val || '—';
  });

  // Auto-set today's date and init
  document.addEventListener('DOMContentLoaded', function() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('entryDate').value = today;
    updatePermitLogDisplay();
    suggestNextPermitNo();
  });




function checkGas(){
  const checks = [
    {input:'o2reading', result:'o2result', pass:v => v >= 19.5 && v <= 23.5},
    {input:'lelreading', result:'lelresult', pass:v => v < 5},
    {input:'coreading', result:'coresult', pass:v => v < 25},
    {input:'h2sreading', result:'h2sresult', pass:v => v < 10}
  ];

  checks.forEach(item => {
    const input = document.getElementById(item.input);
    const result = document.getElementById(item.result);
    const value = parseFloat(input.value);

    result.style.fontWeight = '700';
    result.style.fontFamily = "'IBM Plex Mono', monospace";

    if (input.value === '' || isNaN(value)) {
      result.textContent = '—';
      result.style.color = 'var(--grey-400)';
      return;
    }

    if (item.pass(value)) {
      result.textContent = '✓ PASS';
      result.style.color = 'var(--green)';
    } else {
      result.textContent = '✗ FAIL';
      result.style.color = 'var(--red)';
    }
  });
}



/* ---- CSP-safe event bindings (auto-generated) ---- */
document.querySelector('[data-csp-hook="cspHook1"]').addEventListener("click", function(event) {
  showPermitLog()
});

document.querySelector('[data-csp-hook="cspHook2"]').addEventListener("click", function(event) {
  exportPermitLog()
});

document.querySelector('[data-csp-hook="cspHook3"]').addEventListener("input", function(event) {
  syncSpaceDropdown(this.value)
});

document.querySelector('[data-csp-hook="cspHook4"]').addEventListener("change", function(event) {
  loadHazardsFromRegister()
});

document.querySelector('[data-csp-hook="cspHook5"]').addEventListener("input", function(event) {
  checkGas()
});

document.querySelector('[data-csp-hook="cspHook6"]').addEventListener("input", function(event) {
  checkGas()
});

document.querySelector('[data-csp-hook="cspHook7"]').addEventListener("input", function(event) {
  checkGas()
});

document.querySelector('[data-csp-hook="cspHook8"]').addEventListener("input", function(event) {
  checkGas()
});

document.querySelector('[data-csp-hook="cspHook9"]').addEventListener("click", function(event) {
  setCheck('ci1','yes')
});

document.querySelector('[data-csp-hook="cspHook10"]').addEventListener("click", function(event) {
  setCheck('ci1','no')
});

document.querySelector('[data-csp-hook="cspHook11"]').addEventListener("click", function(event) {
  setCheck('ci1','na')
});

document.querySelector('[data-csp-hook="cspHook12"]').addEventListener("click", function(event) {
  setCheck('ci2','yes')
});

document.querySelector('[data-csp-hook="cspHook13"]').addEventListener("click", function(event) {
  setCheck('ci2','no')
});

document.querySelector('[data-csp-hook="cspHook14"]').addEventListener("click", function(event) {
  setCheck('ci2','na')
});

document.querySelector('[data-csp-hook="cspHook15"]').addEventListener("click", function(event) {
  setCheck('ci3','yes')
});

document.querySelector('[data-csp-hook="cspHook16"]').addEventListener("click", function(event) {
  setCheck('ci3','no')
});

document.querySelector('[data-csp-hook="cspHook17"]').addEventListener("click", function(event) {
  setCheck('ci3','na')
});

document.querySelector('[data-csp-hook="cspHook18"]').addEventListener("click", function(event) {
  setCheck('ci4','yes')
});

document.querySelector('[data-csp-hook="cspHook19"]').addEventListener("click", function(event) {
  setCheck('ci4','no')
});

document.querySelector('[data-csp-hook="cspHook20"]').addEventListener("click", function(event) {
  setCheck('ci4','na')
});

document.querySelector('[data-csp-hook="cspHook21"]').addEventListener("click", function(event) {
  setCheck('ci5','yes')
});

document.querySelector('[data-csp-hook="cspHook22"]').addEventListener("click", function(event) {
  setCheck('ci5','no')
});

document.querySelector('[data-csp-hook="cspHook23"]').addEventListener("click", function(event) {
  setCheck('ci5','na')
});

document.querySelector('[data-csp-hook="cspHook24"]').addEventListener("click", function(event) {
  setCheck('ci6','yes')
});

document.querySelector('[data-csp-hook="cspHook25"]').addEventListener("click", function(event) {
  setCheck('ci6','no')
});

document.querySelector('[data-csp-hook="cspHook26"]').addEventListener("click", function(event) {
  setCheck('ci6','na')
});

document.querySelector('[data-csp-hook="cspHook27"]').addEventListener("click", function(event) {
  setCheck('ci7','yes')
});

document.querySelector('[data-csp-hook="cspHook28"]').addEventListener("click", function(event) {
  setCheck('ci7','no')
});

document.querySelector('[data-csp-hook="cspHook29"]').addEventListener("click", function(event) {
  setCheck('ci7','na')
});

document.querySelector('[data-csp-hook="cspHook30"]').addEventListener("click", function(event) {
  setCheck('ci8','yes')
});

document.querySelector('[data-csp-hook="cspHook31"]').addEventListener("click", function(event) {
  setCheck('ci8','no')
});

document.querySelector('[data-csp-hook="cspHook32"]').addEventListener("click", function(event) {
  setCheck('ci8','na')
});

document.querySelector('[data-csp-hook="cspHook33"]').addEventListener("click", function(event) {
  setCheck('ci9','yes')
});

document.querySelector('[data-csp-hook="cspHook34"]').addEventListener("click", function(event) {
  setCheck('ci9','no')
});

document.querySelector('[data-csp-hook="cspHook35"]').addEventListener("click", function(event) {
  setCheck('ci9','na')
});

document.querySelector('[data-csp-hook="cspHook36"]').addEventListener("click", function(event) {
  setCheck('ci10','yes')
});

document.querySelector('[data-csp-hook="cspHook37"]').addEventListener("click", function(event) {
  setCheck('ci10','no')
});

document.querySelector('[data-csp-hook="cspHook38"]').addEventListener("click", function(event) {
  setCheck('ci10','na')
});

document.querySelector('[data-csp-hook="cspHook39"]').addEventListener("click", function(event) {
  setCheck('ci11','yes')
});

document.querySelector('[data-csp-hook="cspHook40"]').addEventListener("click", function(event) {
  setCheck('ci11','no')
});

document.querySelector('[data-csp-hook="cspHook41"]').addEventListener("click", function(event) {
  setCheck('ci11','na')
});

document.querySelector('[data-csp-hook="cspHook42"]').addEventListener("click", function(event) {
  setCheck('ci12','yes')
});

document.querySelector('[data-csp-hook="cspHook43"]').addEventListener("click", function(event) {
  setCheck('ci12','no')
});

document.querySelector('[data-csp-hook="cspHook44"]').addEventListener("click", function(event) {
  setCheck('ci12','na')
});

document.querySelector('[data-csp-hook="cspHook45"]').addEventListener("click", function(event) {
  setCheck('ci13','yes')
});

document.querySelector('[data-csp-hook="cspHook46"]').addEventListener("click", function(event) {
  setCheck('ci13','no')
});

document.querySelector('[data-csp-hook="cspHook47"]').addEventListener("click", function(event) {
  setCheck('ci13','na')
});

document.querySelector('[data-csp-hook="cspHook48"]').addEventListener("click", function(event) {
  setCheck('ci14','yes')
});

document.querySelector('[data-csp-hook="cspHook49"]').addEventListener("click", function(event) {
  setCheck('ci14','no')
});

document.querySelector('[data-csp-hook="cspHook50"]').addEventListener("click", function(event) {
  setCheck('ci14','na')
});

document.querySelector('[data-csp-hook="cspHook51"]').addEventListener("click", function(event) {
  setCheck('ci15','yes')
});

document.querySelector('[data-csp-hook="cspHook52"]').addEventListener("click", function(event) {
  setCheck('ci15','no')
});

document.querySelector('[data-csp-hook="cspHook53"]').addEventListener("click", function(event) {
  setCheck('ci15','na')
});

document.querySelector('[data-csp-hook="cspHook54"]').addEventListener("click", function(event) {
  window.print()
});

document.querySelector('[data-csp-hook="cspHook55"]').addEventListener("click", function(event) {
  clearForm()
});

document.querySelector('[data-csp-hook="cspHook56"]').addEventListener("click", function(event) {
  cancelPermit()
});

document.querySelector('[data-csp-hook="cspHook57"]').addEventListener("click", function(event) {
  issuePermit()
});

document.querySelector('[data-csp-hook="cspHook58"]').addEventListener("click", function(event) {
  addEntrantRow()
});

document.querySelector('[data-csp-hook="cspHook59"]').addEventListener("click", function(event) {
  setCheck('cl1','yes')
});

document.querySelector('[data-csp-hook="cspHook60"]').addEventListener("click", function(event) {
  setCheck('cl1','no')
});

document.querySelector('[data-csp-hook="cspHook61"]').addEventListener("click", function(event) {
  setCheck('cl2','yes')
});

document.querySelector('[data-csp-hook="cspHook62"]').addEventListener("click", function(event) {
  setCheck('cl2','no')
});

document.querySelector('[data-csp-hook="cspHook63"]').addEventListener("click", function(event) {
  setCheck('cl3','yes')
});

document.querySelector('[data-csp-hook="cspHook64"]').addEventListener("click", function(event) {
  setCheck('cl3','no')
});

document.querySelector('[data-csp-hook="cspHook65"]').addEventListener("click", function(event) {
  setCheck('cl4','yes')
});

document.querySelector('[data-csp-hook="cspHook66"]').addEventListener("click", function(event) {
  setCheck('cl4','no')
});

document.querySelector('[data-csp-hook="cspHook67"]').addEventListener("click", function(event) {
  setCheck('cl4','na')
});

document.querySelector('[data-csp-hook="cspHook68"]').addEventListener("click", function(event) {
  setCheck('cl5','yes')
});

document.querySelector('[data-csp-hook="cspHook69"]').addEventListener("click", function(event) {
  setCheck('cl5','no')
});