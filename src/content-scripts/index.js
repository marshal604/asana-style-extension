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
    if (result[key]) return;
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
  if (checked) {
    document.body.classList.remove(name);
  } else {
    document.body.classList.add(name);
  }
}
