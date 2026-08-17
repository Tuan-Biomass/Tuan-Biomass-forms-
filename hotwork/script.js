
  // ── PERMIT LOG ──
  let permitLog = [
      ];

  function updatePermitLogDisplay() {
    document.getElementById('permitCountDisplay').textContent = permitLog.length + ' permit' + (permitLog.length !== 1 ? 's' : '') + ' issued this session';
    if (permitLog.length > 0) {
      const last = permitLog[permitLog.length - 1];
      document.getElementById('lastPermitDisplay').textContent = last.number + ' (' + last.location + ')';
    }
  }

  function showPermitLog() {
    if (permitLog.length === 0) { alert('No permits issued yet this session.'); return; }
    let msg = 'HOT WORK PERMIT LOG\n' + '─'.repeat(50) + '\n';
    permitLog.forEach((p, i) => {
      msg += (i+1) + '. ' + p.number + ' | ' + p.location + ' | ' + p.date + ' | ' + p.status + '\n';
    });
    alert(msg);
  }

  function exportPermitLog() {
    if (permitLog.length === 0) { alert('No permits to export.'); return; }
    let csv = 'Permit No,Location,Date,Time Issued,Status\n';
    permitLog.forEach(p => {
      csv += [p.number, p.location, p.date, p.issuedAt, p.status].join(',') + '\n';
    });
    const blob = new Blob([csv], { type: 'text/csv' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'HotWork_PermitLog_' + new Date().toISOString().split('T')[0] + '.csv';
    a.click();
  }

  // ── CHECKLIST BUTTONS ──
  function setCheck(id, val) {
    const item = document.getElementById(id);
    const btns = item.querySelectorAll('.check-btn');
    btns.forEach(b => b.classList.remove('active-yes','active-no','active-na'));
    btns.forEach(b => { if (b.classList.contains(val)) b.classList.add('active-' + val); });
  }

  // ── TOOL TOGGLES ──
  function toggleTool(el) { el.classList.toggle('active'); }

  // ── PREREQ TOGGLES ──
  function togglePrereq(id) { document.getElementById(id).classList.toggle('confirmed'); }

  // ── PERMIT NUMBER SYNC ──
  function syncPermitNo(val) {
    document.getElementById('permitNoDisplay').textContent = val || '—';
  }

  // ── ISSUE PERMIT ──
  function issuePermit() {
    const permitNo = document.getElementById('permitNo').value || 'PENDING';
    const dateVal = document.getElementById('permitDate').value || new Date().toISOString().split('T')[0];
    const locationInputs = document.querySelectorAll('.field input[type=text]');
    const location = locationInputs[4] ? (locationInputs[4].value || '—') : '—';

    document.getElementById('statusDisplay').textContent = '✓ ISSUED — ' + permitNo;
    document.getElementById('permitNoDisplay').textContent = permitNo;

    const entry = {
      number: permitNo,
      location: location,
      date: dateVal,
      issuedAt: new Date().toLocaleTimeString(),
      status: 'ISSUED'
    };
    permitLog.push(entry);
    updatePermitLogDisplay();
  }

  // ── CANCEL PERMIT ──
  function cancelPermit() {
    if (confirm('Mark this permit as CANCELLED / VOID?')) {
      document.getElementById('statusDisplay').textContent = '✗ CANCELLED / VOID';
      if (permitLog.length > 0) {
        permitLog[permitLog.length - 1].status = 'CANCELLED';
      }
    }
  }

  // ── CLEAR FORM ──
  function clearForm() {
    if (confirm('Clear all form data and start fresh?')) {
      document.querySelectorAll('input[type=text], input[type=date], input[type=time], textarea').forEach(el => {
        el.value = '';
      });
      document.querySelectorAll('.check-btn').forEach(b => b.classList.remove('active-yes','active-no','active-na'));
      document.querySelectorAll('.tool-toggle').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('[id^=pq]').forEach(p => p.classList.remove('confirmed'));
      document.getElementById('statusDisplay').textContent = '— Not Yet Issued';
      document.getElementById('permitNoDisplay').textContent = '—';
      document.getElementById('permitDate').value = new Date().toISOString().split('T')[0];
    }
  }

  // ── INIT ──
  document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('permitDate').value = new Date().toISOString().split('T')[0];
    updatePermitLogDisplay();
  });


/* ---- CSP-safe event bindings (auto-generated) ---- */
document.querySelector('[data-csp-hook="cspHook1"]').addEventListener("input", function(event) {
  syncPermitNo(this.value)
});

document.querySelector('[data-csp-hook="cspHook2"]').addEventListener("click", function(event) {
  showPermitLog()
});

document.querySelector('[data-csp-hook="cspHook3"]').addEventListener("click", function(event) {
  exportPermitLog()
});

document.querySelector('[data-csp-hook="cspHook4"]').addEventListener("click", function(event) {
  togglePrereq('pq1')
});

document.querySelector('[data-csp-hook="cspHook5"]').addEventListener("click", function(event) {
  togglePrereq('pq2')
});

document.querySelector('[data-csp-hook="cspHook6"]').addEventListener("click", function(event) {
  toggleTool(this)
});

document.querySelector('[data-csp-hook="cspHook7"]').addEventListener("click", function(event) {
  toggleTool(this)
});

document.querySelector('[data-csp-hook="cspHook8"]').addEventListener("click", function(event) {
  toggleTool(this)
});

document.querySelector('[data-csp-hook="cspHook9"]').addEventListener("click", function(event) {
  toggleTool(this)
});

document.querySelector('[data-csp-hook="cspHook10"]').addEventListener("click", function(event) {
  toggleTool(this)
});

document.querySelector('[data-csp-hook="cspHook11"]').addEventListener("click", function(event) {
  toggleTool(this)
});

document.querySelector('[data-csp-hook="cspHook12"]').addEventListener("click", function(event) {
  toggleTool(this)
});

document.querySelector('[data-csp-hook="cspHook13"]').addEventListener("click", function(event) {
  toggleTool(this)
});

document.querySelector('[data-csp-hook="cspHook14"]').addEventListener("click", function(event) {
  toggleTool(this)
});

document.querySelector('[data-csp-hook="cspHook15"]').addEventListener("click", function(event) {
  toggleTool(this)
});

document.querySelector('[data-csp-hook="cspHook16"]').addEventListener("click", function(event) {
  toggleTool(this)
});

document.querySelector('[data-csp-hook="cspHook17"]').addEventListener("click", function(event) {
  setCheck('hw01','yes')
});

document.querySelector('[data-csp-hook="cspHook18"]').addEventListener("click", function(event) {
  setCheck('hw01','no')
});

document.querySelector('[data-csp-hook="cspHook19"]').addEventListener("click", function(event) {
  setCheck('hw01','na')
});

document.querySelector('[data-csp-hook="cspHook20"]').addEventListener("click", function(event) {
  setCheck('hw02','yes')
});

document.querySelector('[data-csp-hook="cspHook21"]').addEventListener("click", function(event) {
  setCheck('hw02','no')
});

document.querySelector('[data-csp-hook="cspHook22"]').addEventListener("click", function(event) {
  setCheck('hw02','na')
});

document.querySelector('[data-csp-hook="cspHook23"]').addEventListener("click", function(event) {
  setCheck('hw03','yes')
});

document.querySelector('[data-csp-hook="cspHook24"]').addEventListener("click", function(event) {
  setCheck('hw03','no')
});

document.querySelector('[data-csp-hook="cspHook25"]').addEventListener("click", function(event) {
  setCheck('hw03','na')
});

document.querySelector('[data-csp-hook="cspHook26"]').addEventListener("click", function(event) {
  setCheck('hw04','yes')
});

document.querySelector('[data-csp-hook="cspHook27"]').addEventListener("click", function(event) {
  setCheck('hw04','no')
});

document.querySelector('[data-csp-hook="cspHook28"]').addEventListener("click", function(event) {
  setCheck('hw04','na')
});

document.querySelector('[data-csp-hook="cspHook29"]').addEventListener("click", function(event) {
  setCheck('hw04b','yes')
});

document.querySelector('[data-csp-hook="cspHook30"]').addEventListener("click", function(event) {
  setCheck('hw04b','no')
});

document.querySelector('[data-csp-hook="cspHook31"]').addEventListener("click", function(event) {
  setCheck('hw04b','na')
});

document.querySelector('[data-csp-hook="cspHook32"]').addEventListener("click", function(event) {
  setCheck('hw04c','yes')
});

document.querySelector('[data-csp-hook="cspHook33"]').addEventListener("click", function(event) {
  setCheck('hw04c','no')
});

document.querySelector('[data-csp-hook="cspHook34"]').addEventListener("click", function(event) {
  setCheck('hw04c','na')
});

document.querySelector('[data-csp-hook="cspHook35"]').addEventListener("click", function(event) {
  setCheck('hw05','yes')
});

document.querySelector('[data-csp-hook="cspHook36"]').addEventListener("click", function(event) {
  setCheck('hw05','no')
});

document.querySelector('[data-csp-hook="cspHook37"]').addEventListener("click", function(event) {
  setCheck('hw05','na')
});

document.querySelector('[data-csp-hook="cspHook38"]').addEventListener("click", function(event) {
  setCheck('hw06','yes')
});

document.querySelector('[data-csp-hook="cspHook39"]').addEventListener("click", function(event) {
  setCheck('hw06','no')
});

document.querySelector('[data-csp-hook="cspHook40"]').addEventListener("click", function(event) {
  setCheck('hw06','na')
});

document.querySelector('[data-csp-hook="cspHook41"]').addEventListener("click", function(event) {
  setCheck('hw07','yes')
});

document.querySelector('[data-csp-hook="cspHook42"]').addEventListener("click", function(event) {
  setCheck('hw07','no')
});

document.querySelector('[data-csp-hook="cspHook43"]').addEventListener("click", function(event) {
  setCheck('hw07','na')
});

document.querySelector('[data-csp-hook="cspHook44"]').addEventListener("click", function(event) {
  setCheck('hw08','yes')
});

document.querySelector('[data-csp-hook="cspHook45"]').addEventListener("click", function(event) {
  setCheck('hw08','no')
});

document.querySelector('[data-csp-hook="cspHook46"]').addEventListener("click", function(event) {
  setCheck('hw08','na')
});

document.querySelector('[data-csp-hook="cspHook47"]').addEventListener("click", function(event) {
  setCheck('hw10','yes')
});

document.querySelector('[data-csp-hook="cspHook48"]').addEventListener("click", function(event) {
  setCheck('hw10','no')
});

document.querySelector('[data-csp-hook="cspHook49"]').addEventListener("click", function(event) {
  setCheck('hw10','na')
});

document.querySelector('[data-csp-hook="cspHook50"]').addEventListener("click", function(event) {
  setCheck('hw11','yes')
});

document.querySelector('[data-csp-hook="cspHook51"]').addEventListener("click", function(event) {
  setCheck('hw11','no')
});

document.querySelector('[data-csp-hook="cspHook52"]').addEventListener("click", function(event) {
  setCheck('hw11','na')
});

document.querySelector('[data-csp-hook="cspHook53"]').addEventListener("click", function(event) {
  setCheck('hw12','yes')
});

document.querySelector('[data-csp-hook="cspHook54"]').addEventListener("click", function(event) {
  setCheck('hw12','no')
});

document.querySelector('[data-csp-hook="cspHook55"]').addEventListener("click", function(event) {
  setCheck('hw12','na')
});

document.querySelector('[data-csp-hook="cspHook56"]').addEventListener("click", function(event) {
  setCheck('hw13','yes')
});

document.querySelector('[data-csp-hook="cspHook57"]').addEventListener("click", function(event) {
  setCheck('hw13','no')
});

document.querySelector('[data-csp-hook="cspHook58"]').addEventListener("click", function(event) {
  setCheck('hw13','na')
});

document.querySelector('[data-csp-hook="cspHook59"]').addEventListener("click", function(event) {
  setCheck('hw14','yes')
});

document.querySelector('[data-csp-hook="cspHook60"]').addEventListener("click", function(event) {
  setCheck('hw14','no')
});

document.querySelector('[data-csp-hook="cspHook61"]').addEventListener("click", function(event) {
  setCheck('hw14','na')
});

document.querySelector('[data-csp-hook="cspHook62"]').addEventListener("click", function(event) {
  setCheck('hw15','yes')
});

document.querySelector('[data-csp-hook="cspHook63"]').addEventListener("click", function(event) {
  setCheck('hw15','no')
});

document.querySelector('[data-csp-hook="cspHook64"]').addEventListener("click", function(event) {
  setCheck('hw15','na')
});

document.querySelector('[data-csp-hook="cspHook65"]').addEventListener("click", function(event) {
  setCheck('hw16','yes')
});

document.querySelector('[data-csp-hook="cspHook66"]').addEventListener("click", function(event) {
  setCheck('hw16','no')
});

document.querySelector('[data-csp-hook="cspHook67"]').addEventListener("click", function(event) {
  setCheck('hw16','na')
});

document.querySelector('[data-csp-hook="cspHook68"]').addEventListener("click", function(event) {
  setCheck('hw19','yes')
});

document.querySelector('[data-csp-hook="cspHook69"]').addEventListener("click", function(event) {
  setCheck('hw19','no')
});

document.querySelector('[data-csp-hook="cspHook70"]').addEventListener("click", function(event) {
  setCheck('hw19','na')
});

document.querySelector('[data-csp-hook="cspHook71"]').addEventListener("click", function(event) {
  issuePermit()
});

document.querySelector('[data-csp-hook="cspHook72"]').addEventListener("click", function(event) {
  window.print()
});

document.querySelector('[data-csp-hook="cspHook73"]').addEventListener("click", function(event) {
  clearForm()
});

document.querySelector('[data-csp-hook="cspHook74"]').addEventListener("click", function(event) {
  cancelPermit()
});