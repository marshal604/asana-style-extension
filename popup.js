chrome.tabs.query({ currentWindow: true }, init);

function init([tab]) {
  subscribeTaskStyleChange(tab);
}

function subscribeTaskStyleChange(tab) {
  const tabId = tab.id;
  const taskCompletedStyleInput = document.getElementById('ase-task-complete-style-input');
  taskCompletedStyleInput.onchange = function (el) {
    console.log('tab', tab);
    const checked = el.target.checked;
    chrome.tabs.sendMessage(tabId, {
      id: 'task-completed-style',
      checked
    });
  };
}
