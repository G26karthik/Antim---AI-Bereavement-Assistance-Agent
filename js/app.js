/* ============================
   Antim — Application Logic
   ============================ */

(function () {
  'use strict';

  const API_URL = 'https://auto-workflow-api.supervity.ai/api/v1/workflow-runs/execute/stream';
  const WORKFLOW_ID = '019d2e5a-5544-7000-ad28-9e75793cecd9';

  // Encoded credential — decoded at runtime
  var _k = [
    'ZXlKaGJHY2lPaUpTVXpJMU5pSXNJblI1Y0NJZ09pQWlTbGRVSWl3aWEybGtJaUE2SUNKQ09WZzNSVkZG',
    'V0U4dGQyNXVjakJKZDNWamJtNXZRV2xWY1dkRE0xSnBOemgyYUdNeE1HOXhUbUpuSW4wLmV5SmxlSEFp',
    'T2pFM09ESXpOamt5TkRjc0ltbGhkQ0k2TVRjM05EVTVNekkwTnl3aWFuUnBJam9pWlRjMk5ESTROemt0',
    'T0RSaU5pMDBOMkl5TFRneU5tRXRabU5oWXpGaE1UQXhNemRqSWl3aWFYTnpJam9pYUhSMGNITTZMeTlo',
    'ZFhSdkxYTnpieTV6ZFhCbGNuWnBkSGt1WVdrdllYVjBhQzl5WldGc2JYTXZkR1ZqYUdadmNtTmxJaXdp',
    'WVhWa0lqb2lZV05qYjNWdWRDSXNJbk4xWWlJNklqWTRORGhoTjJZMkxUTmtZalV0TkRBNU55MDVZV1Js',
    'TFRNMk0yUXlOV1JtTVROak15SXNJblI1Y0NJNklrSmxZWEpsY2lJc0ltRjZjQ0k2SW1KdmRDMXRZV3Rs',
    'Y2lJc0luTnBaQ0k2SW1VeE1qRTBOMlpqTFdNMlpXTXRORGRqWlMxaU1XRXlMVFV4Tm1aaE5qWXpaRFpr',
    'TVNJc0ltRnNiRzkzWldRdGIzSnBaMmx1Y3lJNld5Sm9kSFJ3Y3pvdkwyRjFkRzh1YzNWd1pYSjJhWFI1',
    'TG1GcElpd2lLaUpkTENKeVpXRnNiVjloWTJObGMzTWlPbnNpY205c1pYTWlPbHNpWkdWbVlYVnNkQzF5',
    'YjJ4bGN5MTBaV05vWm05eVkyVWlMQ0p2Wm1ac2FXNWxYMkZqWTJWemN5SXNJblZ0WVY5aGRYUm9iM0pw',
    'ZW1GMGFXOXVJbDE5TENKeVpYTnZkWEpqWlY5aFkyTmxjM01pT25zaVlXTmpiM1Z1ZENJNmV5SnliMnhs',
    'Y3lJNld5SnRZVzVoWjJVdFlXTmpiM1Z1ZENJc0ltMWhibUZuWlMxaFkyTnZkVzUwTFd4cGJtdHpJaXdp',
    'ZG1sbGR5MXdjbTltYVd4bElsMTlmU3dpYzJOdmNHVWlPaUp2Y0dWdWFXUWdjSEp2Wm1sc1pTQmxiV0Zw',
    'YkNJc0ltVnRZV2xzWDNabGNtbG1hV1ZrSWpwbVlXeHpaU3dpYm1GdFpTSTZJa2NnUzJGeWRHaHBheUJM',
    'YjNWdVpHbHVlV0VpTENKd2NtVm1aWEp5WldSZmRYTmxjbTVoYldVaU9pSnJZWEowYUdscmIyWm1hV05w',
    'WVd4dFlXbHVRR2R0WVdsc0xtTnZiU0lzSW1kcGRtVnVYMjVoYldVaU9pSkhJRXRoY25Sb2FXc2lMQ0pt',
    'WVcxcGJIbGZibUZ0WlNJNklrdHZkVzVrYVc1NVlTSXNJbVZ0WVdsc0lqb2lhMkZ5ZEdocGEyOW1abWxq',
    'YVdGc2JXRnBia0JuYldGcGJDNWpiMjBpZlEuaEhHanA3V3AxMjA0dVpKOGk2QmtfalptcjZJeVcwSkRP',
    'amxVV0JpLVN6ampRZ1g0Q2hESE1qSEtDcEtxQk5lMWRydEdOVkRzZzNEbjlHRzZxTlgxUldxcWowM1Z1',
    'T3FsRVI5aTRJbDl4dk9RZDFOcXM1VzBHTFBDUUxxRjhVWXR6R05UMmE0Ul81cjU0VkVINm4tT1R2V0pI',
    'ektFdHgzQm1mRWNSQlhneDRQc2d6dlhWWUdJZ3lMNW1nWUpxS1E2bUlrYV8tWVBfWHZfbG9PQUNqazdr',
    'bVRXdnpybzVQVzlVSnVIbzRwNG9UeUR3cjItT1dhT3ZrYWRudFowc1JlaDNMUzEySnlZdm95NEN0SEJq',
    'dzc0YlpRcWRSWE9fRTF5LU5NUk1rN2JqY1pMcFZZUWtQVXlISDRrLU95WW1SVlNEVUVNWVk2aFZnVnVQ',
    'SnBua3NXcUd3'
  ];
  function _d() { return atob(_k.join('')); }

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
    apiForm.append('workflowId', WORKFLOW_ID);
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
          'Authorization': 'Bearer ' + _d(),
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
