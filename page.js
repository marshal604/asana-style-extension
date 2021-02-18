chrome.runtime.onMessage.addListener(function (message) {
  if (message.checked) {
    document.body.classList.add(message.id);
  } else {
    document.body.classList.remove(message.id);
  }
});
