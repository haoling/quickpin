function pinIt(info, tab) {
    chrome.tabs.sendMessage(tab.id, {method: "getSelection"}, function () {
      chrome.storage.local.get('pinryUrl', function (obj) {
        console.log(info);
        console.log(obj);
        var srcUrl = info.srcUrl;
        if (info.linkUrl != undefined && info.linkUrl.match(/\.(jpe?g|png|gif)$/)) srcUrl = info.linkUrl;
        var description = tab.title.substr(0, 500);
        var url = obj.pinryUrl + "/pins/pin-form/?pin-image-url=" + encodeURIComponent(srcUrl) +
          "&pin-description=" + encodeURIComponent(tab.title + "\n" + tab.url) +
          "&referer=" + encodeURIComponent(tab.url);
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
