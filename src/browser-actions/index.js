chrome.tabs.query({ currentWindow: true }, init);

function init([tab]) {
  initStorage();
  subscribeTaskStyleChange(tab);
  subscribeTaskTypingFr(tab);
}

function subscribeTaskStyleChange(tab) {
  const tabId = tab.id;
  const taskCompletedStyleInput = document.getElementById('ase-task-complete-style-input');
  taskCompletedStyleInput.onchange = function (el) {
    const checked = el.target.checked;
    chrome.storage.sync.set({ 'ase-task-complete-style-input': checked });
    chrome.tabs.sendMessage(tabId, {
      id: 'task-completed-style',
      checked,
      name: 'task-completed-style'
    });
  };
}
function subscribeTaskTypingFr(tab) {
  const tabId = tab.id;
  const taskTypingInput = document.getElementById('ase-fr-input');
  taskTypingInput.oninput = function (el) {
    const value = el.target.value;
    chrome.storage.sync.set({ 'ase-fr-input': value });
    chrome.tabs.sendMessage(tabId, {
      id: 'task-input-listener',
      name: value
    });
  };
}

function initStorage() {
  initFrInput();
  initTaskCompletedStyleInput();
}

function initFrInput() {
  const taskTypingInput = document.getElementById('ase-fr-input');
  const key = 'ase-fr-input';
  chrome.storage.sync.get(key, (result) => {
    const value = result[key] || '';
    taskTypingInput.value = value;
  });
}

function initTaskCompletedStyleInput() {
  const taskCompletedStyleInput = document.getElementById('ase-task-complete-style-input');
  const key = 'ase-task-complete-style-input';
  chrome.storage.sync.get(key, (result) => {
    const checked = result[key];
    taskCompletedStyleInput.checked = checked;
  });
}
