// chrome.runtime.onInstalled.addListener(function () {
//   chrome.storage.sync.set({ color: "#3aa757" }, function () {
//     console.log("The color is green.");
//   });

//   chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
//     chrome.declarativeContent.onPageChanged.addRules([
//       {
//         conditions: [
//           new chrome.declarativeContent.PageStateMatcher({
//             pageUrl: { hostEquals: "developer.chrome.com" },
//           }),
//         ],
//         actions: [new chrome.declarativeContent.ShowPageAction()],
//       },
//     ]);
//   });
// });
/*
  Displays a notification with the current time. Requires "notifications"
  permission in the manifest file (or calling
  "Notification.requestPermission" beforehand).
*/
// function show() {
//   var time = /(..)(:..)/.exec(new Date()); // The prettyprinted time.
//   var hour = time[1] % 12 || 12; // The prettyprinted hour.
//   var period = time[1] < 12 ? "a.m." : "p.m."; // The period of the day.
//   new Notification(hour + time[2] + " " + period, {
//     icon: "48.png",
//     image: "48.png",
//     body: "Time to make the toast.",
//     // actions: [
//     //   {
//     //     action: "done",
//     //     title: "Did it!",
//     //   },
//     // ],
//   });

// }

// window.addEventListener(
//   "notificationclick",
//   function (event) {
//     event.notification.close();
//     if (event.action === "done") {
//       // Archive action was clicked
//       console.log("DONE");
//     } else {
//       // Main body of notification was clicked
//       //   clients.openWindow('/inbox');
//       console.log("CLOSED");
//     }
//   },
//   false
// );

// // Conditionally initialize the options.
// if (!localStorage.isInitialized) {
//   localStorage.isActivated = true; // The display activation.
//   localStorage.frequency = 1; // The display frequency, in minutes.
//   localStorage.isInitialized = true; // The option initialization.
// }

// // Test for notification support.
// if (window.Notification) {
//   // While activated, show notifications at the display frequency.
//   if (JSON.parse(localStorage.isActivated)) {
//     show();
//   }

//   var interval = 0; // The display interval, in minutes.

//   setInterval(function () {
//     interval++;

//     if (
//       JSON.parse(localStorage.isActivated) &&
//       localStorage.frequency <= interval
//     ) {
//       show();
//       interval = 0;
//     }
//   }, 60000);
// }


// Copyright 2017 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
'use strict';

chrome.alarms.onAlarm.addListener(function() {
  chrome.browserAction.setBadgeText({text: ''});
  chrome.notifications.create({
      type:     'basic',
      iconUrl:  '48.png',
      title:    'Time to Hydrate',
      message:  'Everyday I\'m Guzzlin\'!',
      buttons: [
        {title: 'Keep it Flowing.'}
      ],
      priority: 0});
});

chrome.notifications.onButtonClicked.addListener(function() {
  chrome.storage.sync.get(['minutes'], function(item) {
    chrome.browserAction.setBadgeText({text: 'ON'});
    chrome.alarms.create({delayInMinutes: item.minutes});
  });
});