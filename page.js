init();

function init() {
  subscribeMessage();
  initCompletedSubtaskStyle();
}

function initCompletedSubtaskStyle() {
  document.body.classList.add('task-completed-style');
}

function subscribeMessage() {
  chrome.runtime.onMessage.addListener(function (message) {
    if (message.checked) {
      document.body.classList.add(message.id);
    } else {
      document.body.classList.remove(message.id);
    }
  });
}
