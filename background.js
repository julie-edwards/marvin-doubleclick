chrome.browserAction.onClicked.addListener(function (tab) {  //when you click ze bütton, toggle ze marvin.
    chrome.tabs.sendMessage(tab.id, { greeting: 'toggle marvin' }); 
});