function pinIt(info, tab) {
    chrome.tabs.sendMessage(tab.id, {method: "getSelection"}, function () {
      chrome.storage.local.get('pinryUrl', function (obj) {
        console.log(obj);
        var description = tab.title.substr(0, 500);
        var url = obj.pinryUrl + "/pins/pin-form/?pin-image-url=" + encodeURIComponent(info.srcUrl) +
          "&pin-description=" + encodeURIComponent(tab.title + "\n" + tab.url);
          chrome.windows.create({
              url: url,
              type: "popup",
              width: 784,
              height: 800
          });
      });
    });
}
chrome.contextMenus.create({
    title: "Pin it!",
    contexts: ["image"],
    onclick: pinIt
});
