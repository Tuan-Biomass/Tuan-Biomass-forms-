  document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('formDate').value = new Date().toISOString().split('T')[0];
    document.getElementById('reqTime').value = new Date().toTimeString().substring(0,5);
    // init worker copy date
    const d = new Date();
    document.getElementById('wc-date').textContent = d.toLocaleDateString('en-AU', {day:'2-digit',month:'2-digit',year:'numeric'});
  });

  document.getElementById('equipment').addEventListener('input', function() {
    const v = this.value || '\u2014';
    document.getElementById('equipDisplay').textContent = v;
    document.getElementById('wc-equipment').textContent = v;
  });

  document.getElementById('formRef').addEventListener('input', function() {
    document.getElementById('wc-ref').textContent = this.value || '\u2014';
  });

  document.getElementById('formDate').addEventListener('input', function() {
    if (this.value) {
      const d = new Date(this.value + 'T00:00:00');
      document.getElementById('wc-date').textContent = d.toLocaleDateString('en-AU', {day:'2-digit',month:'2-digit',year:'numeric'});
    } else {
      document.getElementById('wc-date').textContent = '\u2014';
    }
  });

  document.getElementById('lmName').addEventListener('input', function() {
    document.getElementById('wc-lm').textContent = this.value || '\u2014';
  });

  document.getElementById('workerName').addEventListener('input', function() {
    document.getElementById('wc-worker').textContent = this.value || '\u2014';
  });

  function setCheck(id, val) {
    const item = document.getElementById(id);
    item.querySelectorAll('.check-btn').forEach(b => b.classList.remove('active-yes','active-no','active-na'));
    item.querySelectorAll('.check-btn').forEach(b => { if (b.classList.contains(val)) b.classList.add('active-' + val); });
  }

  function selectReason(radio) {
    document.querySelectorAll('.reason-tile').forEach(t => t.classList.remove('selected'));
    const tile = radio.closest('.reason-tile');
    if (tile) tile.classList.add('selected');
  }

  function toggleMatrix() {
    document.getElementById('matrixBody').classList.toggle('visible');
    document.getElementById('matrixChevron').classList.toggle('open');
  }

  // ── PERMIT LOG ──
  let formLog = [];

  function updateLogBar() {
    document.getElementById('countBadge').textContent = formLog.length + ' form' + (formLog.length !== 1 ? 's' : '') + ' issued this session';
    if (formLog.length > 0) {
      const last = formLog[formLog.length - 1];
      document.getElementById('lastIssuedLabel').textContent = last.ref + ' (' + last.worker + ')';
    }
  }

  // ── PERMIT REGISTER (Power Automate) ──
  const PERMIT_REGISTER_URL = '/api/permit-register';
  async function submitToPermitRegister(payload) {
    const res = await fetch(PERMIT_REGISTER_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error('Register request failed');
    return res.json();
  }

  async function issueForm() {
    const equip = document.getElementById('equipment').value || '\u2014';
    const worker = document.getElementById('workerName').value || '\u2014';
    const dateVal = document.getElementById('formDate').value || new Date().toISOString().split('T')[0];
    const issuedAt = new Date().toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'});

    document.getElementById('statusDisplay').textContent = 'Issuing\u2026';
    document.getElementById('equipDisplay').textContent = equip;

    try {
      const result = await submitToPermitRegister({
        permit_type: 'Isolation',
        permit_number: '',
        reference: equip,
        issued_by: (document.getElementById('lmName') || {}).value || '',
        recipient: worker,
        date: dateVal,
        time_issued: issuedAt,
        status: 'ISSUED'
      });

      const ref = result.permit_number || 'PENDING';
      document.getElementById('formRef').value = ref;
      document.getElementById('wc-ref').textContent = ref;
      document.getElementById('statusDisplay').textContent = 'ISSUED \u2014 ' + ref;

      formLog.push({ ref, equip, worker, date: dateVal, issuedAt, status: 'ISSUED' });
      updateLogBar();
    } catch (e) {
      document.getElementById('statusDisplay').textContent = 'Could not reach the permit register \u2014 check connection and try again.';
    }
  }

  function openLog() {
    if (formLog.length === 0) { alert('No forms issued yet this session.'); return; }
    let msg = 'ISOLATION FORM LOG\n' + '\u2500'.repeat(44) + '\n';
    formLog.forEach((f, i) => {
      msg += (i+1) + '.  ' + f.ref + '  |  ' + f.equip + '  |  Worker: ' + f.worker + '  |  ' + f.date + '  ' + f.issuedAt + '  |  ' + f.status + '\n';
    });
    alert(msg);
  }

  function exportCSV() {
    if (formLog.length === 0) { alert('No forms to export.'); return; }
    let csv = 'Form Ref,Equipment,Worker,Date,Time Issued,Status\n';
    formLog.forEach(f => { csv += [f.ref, '"'+f.equip+'"', '"'+f.worker+'"', f.date, f.issuedAt, f.status].join(',') + '\n'; });
    const blob = new Blob([csv], {type:'text/csv'});
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'IsolationFormLog_' + new Date().toISOString().split('T')[0] + '.csv';
    a.click();
  }

  function voidForm() {
    if (confirm('Mark this form as VOID?')) {
      document.getElementById('statusDisplay').textContent = 'VOID';
      if (formLog.length > 0) {
        formLog[formLog.length-1].status = 'VOID';
        updateLogBar();
        submitToPermitRegister({
          permit_type: 'Isolation',
          permit_number: formLog[formLog.length-1].ref,
          reference: formLog[formLog.length-1].equip,
          issued_by: (document.getElementById('lmName') || {}).value || '',
          recipient: formLog[formLog.length-1].worker,
          date: formLog[formLog.length-1].date,
          time_issued: new Date().toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'}),
          status: 'VOID'
        }).catch(() => {
          document.getElementById('statusDisplay').textContent += ' (register sync failed — check connection)';
        });
      }
    }
  }

  function clearForm() {
    if (confirm('Clear all data and start a new form?')) {
      document.querySelectorAll('input[type="text"], textarea').forEach(el => el.value = '');
      document.querySelectorAll('input[type="checkbox"], input[type="radio"]').forEach(el => el.checked = false);
      document.querySelectorAll('.check-btn').forEach(b => b.classList.remove('active-yes','active-no','active-na'));
      document.querySelectorAll('.reason-tile').forEach(t => t.classList.remove('selected'));
      document.getElementById('statusDisplay').textContent = '\u2014 Not Yet Issued';
      document.getElementById('equipDisplay').textContent = '\u2014';
      document.getElementById('wc-ref').textContent = '\u2014';
      document.getElementById('wc-equipment').textContent = '\u2014';
      document.getElementById('wc-lm').textContent = '\u2014';
      document.getElementById('wc-worker').textContent = '\u2014';
      document.getElementById('formDate').value = new Date().toISOString().split('T')[0];
      document.getElementById('reqTime').value = new Date().toTimeString().substring(0,5);
      const d = new Date();
      document.getElementById('wc-date').textContent = d.toLocaleDateString('en-AU', {day:'2-digit',month:'2-digit',year:'numeric'});
    }
  }

  // ── CSP-SAFE EVENT WIRING (no inline onclick/onchange/onfocus) ──
  document.addEventListener('DOMContentLoaded', function() {
    // Yes/No/N-A checklist buttons — delegated by reading the parent .check-item's id
    // and the button's own class (yes/no/na), matching setCheck(id, val)'s expectations.
    document.querySelectorAll('.check-item .check-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const item = btn.closest('.check-item');
        const val = btn.classList.contains('yes') ? 'yes' : btn.classList.contains('no') ? 'no' : 'na';
        if (item) setCheck(item.id, val);
      });
    });

    // Reason radio tiles
    document.querySelectorAll('input[name="reason"]').forEach(radio => {
      radio.addEventListener('change', function() { selectReason(this); });
    });

    // "Other" text fields auto-check their paired radio/checkbox on focus
    const otherPairs = [
      ['reason-other-text', 'reason-other-radio'],
      ['ppe-other-text', 'ppe-other-cb'],
      ['iso-other-text', 'iso-other-cb']
    ];
    otherPairs.forEach(([textId, boxId]) => {
      const textEl = document.getElementById(textId);
      const boxEl = document.getElementById(boxId);
      if (textEl && boxEl) textEl.addEventListener('focus', () => { boxEl.checked = true; });
    });

    // Matrix toggle
    const matrixToggle = document.querySelector('.matrix-toggle');
    if (matrixToggle) matrixToggle.addEventListener('click', toggleMatrix);

    // Action bar buttons
    const issueBtn = document.querySelector('.action-bar .btn-primary');
    if (issueBtn) issueBtn.addEventListener('click', issueForm);
    const printBtn = document.querySelector('.action-bar .btn-print');
    if (printBtn) printBtn.addEventListener('click', () => window.print());
    const clearBtn = document.querySelector('.action-bar .btn-ghost');
    if (clearBtn) clearBtn.addEventListener('click', clearForm);
    const voidBtn = document.querySelector('.action-bar .btn-danger');
    if (voidBtn) voidBtn.addEventListener('click', voidForm);

    // Permit log bar buttons
    const viewLogBtn = document.querySelector('.log-btn:not(.export)');
    if (viewLogBtn) viewLogBtn.addEventListener('click', openLog);
    const exportBtn = document.querySelector('.log-btn.export');
    if (exportBtn) exportBtn.addEventListener('click', exportCSV);
  });
