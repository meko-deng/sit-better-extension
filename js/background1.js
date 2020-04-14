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
//       //   clients.openWindow("/inbox");
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


// "use strict";

// chrome.alarms.onAlarm.addListener(function() {
//   chrome.browserAction.setBadgeText({text: ""});
//   chrome.notifications.create({
//       type:     "basic",
//       iconUrl:  "48.png",
//       title:    "Time to Hydrate",
//       message:  "Everyday I\"m Guzzlin\"!",
//       buttons: [
//         {title: "Keep it Flowing."}
//       ],
//       priority: 0});
// });

// chrome.notifications.onButtonClicked.addListener(function() {
//   chrome.storage.sync.get(["minutes"], function(item) {
//     chrome.browserAction.setBadgeText({text: "ON"});
//     chrome.alarms.create({delayInMinutes: item.minutes});
//   });
// });
// "use strict";

// function setAlarm(event) {
//   let minutes = parseFloat(event.target.value);
//   chrome.browserAction.setBadgeText({text: "ON"});
//   chrome.alarms.create({delayInMinutes: 0.05});
//   chrome.storage.sync.set({minutes: 0.05});
//   window.close();
// }

// function clearAlarm() {
//   chrome.browserAction.setBadgeText({text: ""});
//   chrome.alarms.clearAll();
//   window.close();
// }

// //An Alarm delay of less than the minimum 1 minute will fire
// // in approximately 1 minute incriments if released
// document.getElementById("sampleSecond").addEventListener("click", setAlarm);
// document.getElementById("15min").addEventListener("click", setAlarm);
// document.getElementById("30min").addEventListener("click", setAlarm);
// document.getElementById("cancelAlarm").addEventListener("click", clearAlarm);

let checked = "CHECKED"
let notChecked = "NOT CHECKED"
let disabled = "DISABLED"

var userPrefs = {
  enabled: $("default"),
  postureTime: $("time"),
  sound:$("sound"),

  init: function(time) {
    localStorage.setItem("enabled", checked)
    localStorage.setItem("postureTime", time)
    localStorage.setItem("sound", notChecked)
    localStorage.setItem("saved", "true")

    this.enabled.prop(checked, true)
    this.postureTime.val(time)
  },

  getPreferences: function() {
    let perferences = {
      enabledOption: localStorage.enabled,
      postureTimeOption: localStorage.postureTime,
      soundOption: localStorage.sound
    }

    return perferences
  },

  disableQuestions: function(bool) {
    this.postureTime.prop(disabled, bool),
    this.sound.prop(disabled, bool)
    // $("li:not(.primary)").toggleClass("gray", bool);
  },

  loadDom: function() {
    let preferences = this.getPreferences()
    if(preferences.enabledOption === checked) {
      this.enabled.prop(checked, true)
    } else {
      userPrefs.disableQuestions(true)
    }
    this.postureTime.val(preferences.postureTimeOption)
    if(preferences.soundOption == checked) {
      this.sound.prop(checked, true);
    }
  },

  save: function() {
    localStorage.setItem("postureTime", this.postureTime.val())
    if (this.enabled.is(`:${checked}`)) {
      localStorage.setItem("enabled", checked)
    } else {
      localStorage.setItem("enabled", notChecked)
    }
    if (this.sound.is(`:${checked}`)) {
      localStorage.setItem("sound", checked)
    } else {
      localStorage.setItem("sound", notChecked)
    }
    
    updateStatus()
    setTimeout(function() { checkStatus(); }, 1000);
  },

  validateTime: function() {
    $(".settime").hide();
    $("input").removeClass("error-highlight");
    let postureTimeVal = this.postureTime.val();
    var validation = true;

    // if(!postureTimeVal.match(/\d/) || postureTimeVal <= 0 || postureTimeVal > 59) {
    //   this.postureTime.addClass("error-highlight");
    //   validation = false;
    // } 
    
    // if(!validation) {
    //   $(".settime").show();
    //   return false;
    // } else {
    //   return true;
    // }
    return true
  }
}

function updateStatus() {
  $("#notification").html("Options saved");
}

function checkStatus() {
  var currentStatus = localStorage.enabled;
  if(currentStatus == notChecked) {
    $("#notification").html("Reminders are currently <strong>disabled</strong>");
  } else {
    $("#notification").html("Reminders are currently <strong>enabled</strong>");
  }
}

var app = {};

app.global = {
  systemState: "active",
  firefoxCompat: false
};

/* Firefox does not implement getPermissionLevel, so return "granted" permissions by default */
if (!("getPermissionLevel" in chrome.notifications)) {
  chrome.notifications.getPermissionLevel = function(callback) {
    callback("granted");
  };

  app.global.firefoxCompat = true;
}

app.init = function() { app.reminder.init(); };

app.reminder = {
  init: function() {
    chrome.alarms.onAlarm.addListener(app.reminder.postureListener);
    if(localStorage.saved) {
      userPrefs.loadDom()
      checkStatus()
    } else {
      userPrefs.init(15)
    }

    if (localStorage.firstRun === "done") {
      return
    } else {
      app.reminder.run()
      localStorage.setItem("firstRun", "done")
    }
  },

  run: function() {
    let prefs = userPrefs.getPreferences()
    let time = prefs.postureTimeOption
    chrome.alarms.clearAll();
    if (prefs.enabledOption != checked) {
      userPrefs.disableQuestions(true)
      return
    } else {
      this.timedReminder(time)
    }
  },

  timedReminder: function(time) {
    chrome.alarms.create("posture", {
      delayInMinutes: parseInt(time),
      periodInMinutes: parseInt(time)
    });
  },

  postureListener: function(alarm) {
    var queryTime = app.reminder.setIdleTime();
    if(alarm.name === "posture") {
      chrome.idle.queryState(queryTime, function(newState) {
        if(newState === "active") {
          app.reminder.displayMessage();
        } 
      });
    }
  },

  setIdleTime: function() {
    var prefs = userPrefs.getPreferences();
    var time = prefs.postureTimeOption;
    var queryTime = 30; //seconds
    if(time > 5) {
      queryTime = (time * 60) - ((time * 60) - 240); //4 minutes
    }
    return queryTime;
  },
  renderMessage: function() {
    var postureBeginning =["Straighten up, ", "Shoulders back, ", "How\"s your posture, ", "Check your posture, ", "Sit up straight, ", "Check yourself, ", "No hunchbacks, ", "At attention, ", "Stop slumping, ", "Mother told you not to slouch, ", "Sit up, ", "Posture Reminder, ", "Posture police, ", "Stop slouching, ", "Back straight, ", "Dump the slump, ", "Posture check, ", "Improve your posture, ", "No bent spines, ", "Mind your posture, "],
       postureEnd = ["young grasshopper.", "buddy.", "amigo.", "Quasimodo.", "boss.", "partner.", "chap.", "pal.", "soldier", "chum.", "mate.", "friend.", "comrade.", "cuz.", "homie."],
       begInt = Math.floor(Math.random() * postureBeginning.length),
       endInt = Math.floor(Math.random() * postureEnd.length),
       fullMessage = postureBeginning[begInt] + postureEnd[endInt];
      return fullMessage;
    },
  displayMessage: function() {
      var prefs = userPrefs.getPreferences();
      var fadeTime = parseInt(prefs.fadeTimeOption) * 1000;
      // var notificationSound = new Audio("/../audio/notification.mp3");
      var opt = {
        type: "basic",
        title: "Your PostureMinder",
        message: this.renderMessage(),
        iconUrl: "48.png",
        requireInteraction: false
      };

      // remove property for compatibility with Firefox
      if (app.global.firefoxCompat) {
        delete opt.requireInteraction;
        Object.freeze(opt);
      }

      chrome.notifications.getPermissionLevel(function(permission) {
        if(permission === "granted") {
            // if(prefs.closeOption == 1) {
            //     opt.requireInteraction = false;
            //     setTimeout(function() {
            //       chrome.notifications.clear("sitNotification");
            //     }, fadeTime);
            //   } else {
            //     opt.requireInteraction = true;
            //   }

              chrome.notifications.create("sitNotification", opt);
              // if(prefs.soundOption === "checked") {
              //   notificationSound.play();
              // }
          } else {
              $("#notification").text("Desktop notifications must be allowed in order for this extension to run.");
              return false;
            }
      });

  },
}

$("#submit").click(function(e) {
  e.preventDefault();
$(".savemsg").hide();
if(userPrefs.validateTime() === false) {
  return;
} else {
  userPrefs.save();
  app.reminder.run();
}
});

app.init();

//Make sure event listeners are set after extension is added or updated
chrome.runtime.onInstalled.addListener(function () {
  chrome.alarms.onAlarm.removeListener(app.reminder.postureListener);
  chrome.alarms.onAlarm.addListener(app.reminder.postureListener);
  app.reminder.run();
});

chrome.runtime.onStartup.addListener(function() {
  chrome.alarms.onAlarm.removeListener(app.reminder.postureListener);
  chrome.alarms.onAlarm.addListener(app.reminder.postureListener);
  app.reminder.run();
});