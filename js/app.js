/* ============================
   Antim — Application Logic
   ============================ */

(function () {
  'use strict';

  const API_URL = 'https://auto-workflow-api.supervity.ai/api/v1/workflow-runs/execute/stream';
  const DEFAULT_WORKFLOW_ID = '019d2e5a-5544-7000-ad28-9e75793cecd9';

  // ---- DOM refs ----
  const form          = document.getElementById('workflowForm');
  const submitBtn     = document.getElementById('submitBtn');
  const btnLabel      = submitBtn.querySelector('.btn-label');
  const btnArrow      = submitBtn.querySelector('.btn-arrow');
  const btnSpinner    = submitBtn.querySelector('.btn-spinner');
  const resultSection = document.getElementById('resultSection');
  const resultBody    = document.getElementById('resultBody');
  const resultContent = document.getElementById('resultContent');
  const resultBadge   = document.getElementById('resultBadge');
  const badgeText     = resultBadge.querySelector('.badge-text');
  const copyBtn       = document.getElementById('copyBtn');
  const tokenAlert    = document.getElementById('tokenAlert');

  // Settings modal
  const settingsBtn   = document.getElementById('settingsBtn');
  const settingsModal = document.getElementById('settingsModal');
  const closeSettings = document.getElementById('closeSettings');
  const cancelSettings= document.getElementById('cancelSettings');
  const saveSettings  = document.getElementById('saveSettings');
  const apiTokenInput = document.getElementById('apiToken');
  const workflowInput = document.getElementById('workflowId');
  const openFromAlert = document.getElementById('openSettingsFromAlert');

  // ---- Settings helpers ----
  function getToken() {
    return localStorage.getItem('antim_api_token') || '';
  }
  function getWorkflowId() {
    return localStorage.getItem('antim_workflow_id') || DEFAULT_WORKFLOW_ID;
  }
  function saveTokenAndWorkflow(token, wfId) {
    if (token) localStorage.setItem('antim_api_token', token);
    else localStorage.removeItem('antim_api_token');
    if (wfId) localStorage.setItem('antim_workflow_id', wfId);
    else localStorage.removeItem('antim_workflow_id');
  }

  // ---- Check token on load ----
  function checkToken() {
    if (!getToken()) {
      tokenAlert.style.display = 'flex';
    } else {
      tokenAlert.style.display = 'none';
    }
  }
  checkToken();

  // ---- Modal logic ----
  function openModal() {
    apiTokenInput.value = getToken();
    workflowInput.value = getWorkflowId();
    settingsModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeModal() {
    settingsModal.classList.remove('open');
    document.body.style.overflow = '';
  }

  settingsBtn.addEventListener('click', openModal);
  openFromAlert.addEventListener('click', openModal);
  closeSettings.addEventListener('click', closeModal);
  cancelSettings.addEventListener('click', closeModal);
  settingsModal.addEventListener('click', (e) => {
    if (e.target === settingsModal) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && settingsModal.classList.contains('open')) closeModal();
  });

  saveSettings.addEventListener('click', () => {
    saveTokenAndWorkflow(apiTokenInput.value.trim(), workflowInput.value.trim());
    checkToken();
    closeModal();
  });

  // ---- Copy button ----
  copyBtn.addEventListener('click', () => {
    const text = resultContent.textContent;
    if (!text) return;
    navigator.clipboard.writeText(text).then(() => {
      const original = copyBtn.innerHTML;
      copyBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m20 6-11 11-5-5"/></svg> Copied';
      setTimeout(() => { copyBtn.innerHTML = original; }, 2000);
    });
  });

  // ---- Form validation ----
  function validateForm() {
    let valid = true;
    form.querySelectorAll('[required]').forEach((el) => {
      if (!el.value.trim()) {
        el.classList.add('invalid');
        valid = false;
      } else {
        el.classList.remove('invalid');
      }
    });
    return valid;
  }
  form.querySelectorAll('[required]').forEach((el) => {
    el.addEventListener('input', () => el.classList.remove('invalid'));
    el.addEventListener('change', () => el.classList.remove('invalid'));
  });

  // ---- Set states ----
  function setLoading(loading) {
    submitBtn.disabled = loading;
    btnLabel.textContent = loading ? 'Processing…' : 'Generate Guidance';
    btnArrow.style.display = loading ? 'none' : '';
    btnSpinner.style.display = loading ? '' : 'none';
  }

  function setBadge(state) {
    resultBadge.className = 'result-badge ' + state;
    const labels = { processing: 'Processing', completed: 'Completed', error: 'Error' };
    badgeText.textContent = labels[state] || state;
  }

  // ---- Submit handler ----
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const token = getToken();
    if (!token) {
      openModal();
      return;
    }

    // Gather data
    const formData = new FormData(form);
    const payload = {};
    const assets = formData.getAll('assets');
    payload['assets'] = assets.join(', ');
    for (const [key, value] of formData.entries()) {
      if (key !== 'assets') payload[key] = value;
    }

    // Build multipart form data for the API
    const apiForm = new FormData();
    apiForm.append('workflowId', getWorkflowId());
    for (const [key, value] of Object.entries(payload)) {
      apiForm.append('inputs[' + key + ']', value);
    }

    // UI
    setLoading(true);
    resultSection.style.display = '';
    resultContent.textContent = '';
    resultBody.querySelector('.result-placeholder').style.display = '';
    copyBtn.style.display = 'none';
    setBadge('processing');
    resultSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + token,
          'x-source': 'v1',
        },
        body: apiForm,
      });

      if (!response.ok) {
        const errText = await response.text();
        throw new Error('API returned ' + response.status + ': ' + errText.substring(0, 300));
      }

      // Hide placeholder, show content
      resultBody.querySelector('.result-placeholder').style.display = 'none';

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        resultContent.textContent += chunk;
        resultBody.scrollTop = resultBody.scrollHeight;
      }

      setBadge('completed');
      copyBtn.style.display = '';

    } catch (err) {
      resultBody.querySelector('.result-placeholder').style.display = 'none';
      resultContent.textContent += '\n\nError: ' + err.message;
      setBadge('error');
    } finally {
      setLoading(false);
    }
  });
})();
