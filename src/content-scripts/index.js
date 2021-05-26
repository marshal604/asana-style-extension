let StorageId;
async function importStorageId() {
  const src = await import(chrome.extension.getURL('src/helpers/model.js'));
  StorageId = src.StorageId;
}

init();

async function init() {
  await importStorageId();
  subscribeMessage();
  initCompletedSubtaskStyle();
}

function initCompletedSubtaskStyle() {
  const key = StorageId.TaskCompletedStyle;
  chrome.storage.sync.get(key, (result) => {
    if (result[key] === false) return;
    chrome.storage.sync.set({ [key]: true });
    document.body.classList.add('task-completed-style');
  });
}

function subscribeMessage() {
  chrome.runtime.onMessage.addListener(function (message) {
    const { id } = message;
    if (id === StorageId.TaskCompletedStyle) return TaskStyleChange(message);
  });
}

function TaskStyleChange(message) {
  const { checked, name } = message;
  const action = checked ? 'add' : 'remove';
  document.body.classList[action](name);
}
