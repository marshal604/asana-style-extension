let StorageId;
let Style;
async function importConstants() {
  const src = await import(chrome.extension.getURL('src/helpers/model.js'));
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
    if (result[key] === false) return;
    chrome.storage.sync.set({ [key]: defaultValue });
    const action = defaultValue ? 'add' : 'remove';
    document.body.classList[action](className);
  });
}

function subscribeMessage() {
  chrome.runtime.onMessage.addListener(function (message) {
    const { id } = message;
    if ([StorageId.TaskCompletedStyle, StorageId.DarkModeStyle].includes(id)) {
      return styleChange(message);
    }
  });
}

function styleChange(message) {
  const { checked, name } = message;
  const action = checked ? 'add' : 'remove';
  document.body.classList[action](name);
}
