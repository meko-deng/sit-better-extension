'use strict';
var bkg = chrome.extension.getBackgroundPage();

chrome.alarms.onAlarm.addListener(function() {
  chrome.storage.sync.get(['status', 'sound'], function(obj) {
    if(obj.status === 'ON') {
      chrome.browserAction.setBadgeText({text: 'ON'});
      chrome.browserAction.setBadgeBackgroundColor({color:'blue'});
      var notificationSound = new Audio("/../audio/pull-out.mp3");
      chrome.notifications.create({
        type:     'basic',
        iconUrl:  '48.png',
        title:    'Keep your back straight!',
        message:  'A friendly reminder to sit up straight.',
        priority: 0});
      if (obj.sound === 'ON') {
        notificationSound.play();
      }
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