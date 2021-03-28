let textareaEventListener;
(async () => {
  const src = await import(chrome.extension.getURL('src/helpers/textarea-event-listener.js'));
  textareaEventListener = new src.TextareaEventListener();
})();

init();

function init() {
  subscribeMessage();
  initCompletedSubtaskStyle();
}

function initCompletedSubtaskStyle() {
  const key = 'ase-task-complete-style-input';
  chrome.storage.sync.get(key, (result) => {
    if (result[key]) return;
    document.body.classList.add('task-completed-style');
  });
}

function subscribeMessage() {
  chrome.runtime.onMessage.addListener(function (message) {
    const { id } = message;
    if (id === 'task-completed-style') return TaskStyleChange(message);
    if (id === 'task-input-listener') return TaskInputListener(message);
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
