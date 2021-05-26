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
