chrome.tabs.query({ currentWindow: true }, init);

function init([tab]) {
  initStorage();
  subscribeTaskStyleChange(tab);
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
      name: 'task-completed-style',
    });
  };
}

function initStorage() {
  initTaskCompletedStyleInput();
}

function initTaskCompletedStyleInput() {
  const taskCompletedStyleInput = document.getElementById('ase-task-complete-style-input');
  const key = 'ase-task-complete-style-input';
  chrome.storage.sync.get(key, (result) => {
    const checked = result[key];
    taskCompletedStyleInput.checked = checked;
  });
}
