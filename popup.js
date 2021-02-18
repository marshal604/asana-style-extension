function init(tab) {
  const tabId = tab.id;
  const taskCompletedStyleInput = document.getElementById('ase-task-complete-style-input');
  taskCompletedStyleInput.onchange = function (el) {
    const checked = el.target.checked;
    chrome.tabs.sendMessage(tabId, {
      id: 'task-completed-style',
      checked
    });
  };
}

chrome.tabs.getSelected(null, init);
