chrome.browserAction.onClicked.addListener(function (tab) {  //toggle marvin overlay when the marvin icon is clicked
    chrome.tabs.sendMessage(tab.id, { greeting: 'toggle marvin' }); 
});