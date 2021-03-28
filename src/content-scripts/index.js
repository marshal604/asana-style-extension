let textareaEventListener;
(async () => {
  const src = await import(chrome.extension.getURL('src/helpers/textarea-event-listener.js'));
  textareaEventListener = new src.TextareaEventListener();
})();

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
    if (id === StorageId.TaskAutoGenerateFr) return TaskInputListener(message);
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

function TaskInputListener(message) {
  const { name } = message;
  textareaEventListener.revoke();
  textareaEventListener.register(name);
}
