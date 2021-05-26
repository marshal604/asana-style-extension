chrome.tabs.query({ currentWindow: true, active: true }, init);

let StorageId;
let Style;
async function importConstants() {
  const src = await import(chrome.extension.getURL('src/helpers/model.js'));
  StorageId = src.StorageId;
  Style = src.Style;
}

async function init([tab]) {
  await importConstants();
  initStorage();
  subscribeStyleChange({ tab, key: StorageId.TaskCompletedStyle, className: Style.TaskCompleted });
  subscribeStyleChange({ tab, key: StorageId.DarkModeStyle, className: Style.DarkMode });
}

function subscribeStyleChange({ tab, key, className }) {
  const tabId = tab.id;
  const styleInput = document.getElementById(key);
  styleInput.onchange = function (el) {
    const checked = el.target.checked;
    chrome.storage.sync.set({ [key]: checked });
    chrome.tabs.sendMessage(tabId, {
      id: key,
      checked,
      name: className,
    });
  };
}

function initStorage() {
  initStyleInput(StorageId.TaskCompletedStyle);
  initStyleInput(StorageId.DarkModeStyle);
}

function initStyleInput(key) {
  const styleInput = document.getElementById(key);
  chrome.storage.sync.get(key, (result) => {
    const checked = result[key];
    styleInput.checked = checked;
  });
}
