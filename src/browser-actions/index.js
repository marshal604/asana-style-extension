chrome.tabs.query({ currentWindow: true, active: true }, init);

let StorageId;
async function importStorageId() {
  const src = await import(chrome.extension.getURL('src/helpers/model.js'));
  StorageId = src.StorageId;
}

async function init([tab]) {
  await importStorageId();
  initStorage();
  subscribeTaskStyleChange(tab);
}

function subscribeTaskStyleChange(tab) {
  const tabId = tab.id;
  const taskCompletedStyleInput = document.getElementById(StorageId.TaskCompletedStyle);
  taskCompletedStyleInput.onchange = function (el) {
    const checked = el.target.checked;
    const key = StorageId.TaskCompletedStyle;
    chrome.storage.sync.set({ [key]: checked });
    chrome.tabs.sendMessage(tabId, {
      id: key,
      checked,
      name: 'task-completed-style',
    });
  };
}

function initStorage() {
  initTaskCompletedStyleInput();
}

function initTaskCompletedStyleInput() {
  const taskCompletedStyleInput = document.getElementById(StorageId.TaskCompletedStyle);
  const key = StorageId.TaskCompletedStyle;
  chrome.storage.sync.get(key, (result) => {
    const checked = result[key];
    taskCompletedStyleInput.checked = checked;
  });
}
