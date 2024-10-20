let StorageId;
let Style;
async function importConstants() {
  const src = await import(chrome.runtime.getURL('src/helpers/model.js'));
  StorageId = src.StorageId;
  Style = src.Style;
}

init();

async function init() {
  await importConstants();
  subscribeMessage();
  initSlideToggle(StorageId.TaskCompletedStyle, Style.TaskCompleted, true);
  initSlideToggle(StorageId.DarkModeStyle, Style.DarkMode, false);
}

function initSlideToggle(key, className, defaultValue = true) {
  chrome.storage.sync.get(key, (result) => {
    const value = result[key];
    const isUndefined = value === undefined;
    if (!isUndefined && !value) return;
    const checked = isUndefined ? defaultValue : value;
    chrome.storage.sync.set({ [key]: checked });
    const action = checked ? 'add' : 'remove';
    document.body.classList[action](className);
  });
}

function subscribeMessage() {
  chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    const { id } = message;
    if ([StorageId.TaskCompletedStyle, StorageId.DarkModeStyle].includes(id)) {
      styleChange(message);
    }
    sendResponse({});
    return true;
  });
}

function styleChange(message) {
  const { checked, name } = message;
  const action = checked ? 'add' : 'remove';
  document.body.classList[action](name);
}
