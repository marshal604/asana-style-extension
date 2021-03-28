init();

function init() {
  subscribeTabUpdate();
}

function subscribeTabUpdate() {
  let completed = false;
  let isUrl = true;
  const reset = () => {
    completed = false;
    isUrl = false;
  };
  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.url) isUrl = true;
    if (changeInfo.status === 'complete') completed = true;
    if (!isUrl || !completed) return;
    reset();
    setTimeout(() => {
      const key = 'ase-fr-input';
      chrome.storage.sync.get(key, (result) => {
        const value = result[key];
        chrome.tabs.sendMessage(tabId, {
          id: 'task-input-listener',
          name: value
        });
      });
    }, 1500);
  });
}
