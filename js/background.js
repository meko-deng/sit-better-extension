'use strict';
var bkg = chrome.extension.getBackgroundPage();

chrome.alarms.onAlarm.addListener(function() {
  chrome.storage.sync.get(['status'], function(obj) {
    if(obj.status === 'ON') {
      chrome.browserAction.setBadgeText({text: 'ON'});
      chrome.browserAction.setBadgeBackgroundColor({color:'blue'});
      chrome.notifications.create({
        type:     'basic',
        iconUrl:  '48.png',
        title:    'Time to Hydrate',
        message:  'Everyday I\'m Guzzlin\'!',
        buttons: [
          {title: 'Keep it Flowing.'}
        ],
        priority: 0});
    } else {
      chrome.browserAction.setBadgeText({text: 'OFF'});
      chrome.browserAction.setBadgeBackgroundColor({color:'red'});
    }
  });
});

chrome.notifications.onButtonClicked.addListener(function() {
  chrome.storage.sync.get(['minutes'], function(item) {
    chrome.alarms.create({delayInMinutes: item.minutes});
  });
});

bkg.console.log('IN BACKGROUND');