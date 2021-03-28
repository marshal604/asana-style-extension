chrome.tabs.query({ currentWindow: true }, init);

let StorageId;
async function importStorageId() {
  const src = await import(chrome.extension.getURL('src/helpers/model.js'));
  StorageId = src.StorageId;
}

async function init([tab]) {
  await importStorageId();
  initStorage();
  subscribeTaskStyleChange(tab);
  subscribeTaskTypingFr(tab);
}

function subscribeTaskStyleChange(tab) {
  const tabId = tab.id;
  const taskCompletedStyleInput = document.getElementById('ase-task-complete-style-input');
  taskCompletedStyleInput.onchange = function (el) {
    const checked = el.target.checked;
    const key = StorageId.TaskCompletedStyle;
    chrome.storage.sync.set({ [key]: checked });
    chrome.tabs.sendMessage(tabId, {
      id: key,
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
    const key = StorageId.TaskAutoGenerateFr;
    chrome.storage.sync.set({ [key]: value });
    chrome.tabs.sendMessage(tabId, {
      id: key,
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
  const key = StorageId.TaskAutoGenerateFr;
  chrome.storage.sync.get(key, (result) => {
    const value = result[key] || '';
    taskTypingInput.value = value;
  });
}

function initTaskCompletedStyleInput() {
  const taskCompletedStyleInput = document.getElementById('ase-task-complete-style-input');
  const key = StorageId.TaskCompletedStyle;
  chrome.storage.sync.get(key, (result) => {
    const checked = result[key];
    taskCompletedStyleInput.checked = checked;
  });
}
