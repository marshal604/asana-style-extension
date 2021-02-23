const init = () => {
  initCompletedSubtaskStyle();
};

const initCompletedSubtaskStyle = () => {
  document.body.classList.add('task-completed-style');
};

chrome.runtime.onMessage.addListener(function (message) {
  if (message.checked) {
    document.body.classList.add(message.id);
  } else {
    document.body.classList.remove(message.id);
  }
});

init();
