// // 'use strict';

// // function setAlarm(event) {
// //   let minutes = parseFloat(event.target.value);
// //   chrome.browserAction.setBadgeText({text: 'ON'});
// //   chrome.alarms.create({delayInMinutes: 0.05});
// //   chrome.storage.sync.set({minutes: 0.05});
// //   window.close();
// // }

// // function clearAlarm() {
// //   chrome.browserAction.setBadgeText({text: ''});
// //   chrome.alarms.clearAll();
// //   window.close();
// // }

// // //An Alarm delay of less than the minimum 1 minute will fire
// // // in approximately 1 minute incriments if released
// // document.getElementById('sampleSecond').addEventListener('click', setAlarm);
// // document.getElementById('15min').addEventListener('click', setAlarm);
// // document.getElementById('30min').addEventListener('click', setAlarm);
// // document.getElementById('cancelAlarm').addEventListener('click', clearAlarm);

// let checked = 'CHECKED'
// let notChecked = 'NOT CHECKED'
// let disabled = 'DISABLED'

// var userPrefs = {
//   enabled: $('$default'),
//   postureTime: $('time'),
//   sound:$('sound'),

//   init: function(time) {
//     localStorage.setItem('enabled', checked)
//     localStorage.setItem('postureTime', time)
//     localStorage.setItem('sound', notChecked)
//     localStorage.setItem('saved', 'true')

//     this.enabled.prop(checked, true)
//     this.postureTime.val(time)
//   },

//   getPreferences: () => {
//     let perferences = {
//       enabledOption: localStorage.enabled,
//       postureTimeOption: localStorage.postureTime,
//       soundOption: localStorage.sound
//     }

//     return perferences
//   },

//   disableQuestions: (bool) => {
//     this.postureTime.prop(disabled, bool),
//     this.sound.prop(disabled, bool)
//     // $('li:not(.primary)').toggleClass('gray', bool);
//   },

//   loadDom: () => {
//     let preferences = this.getPreferences()
//     if(preferences.enabledOption === checked) {
//       this.enabledOption.prop(checked, true)
//     } else {
//       userPrefs.disableQuestions(true)
//     }
//     this.postureTime.val(preferences.postureTimeOption)
//     if(preferences.soundOption == checked) {
//       this.sound.prop(checked, true);
//     }
//   },

//   save: () => {
//     localStorage.setItem('postureTime', this.postureTime.val())
//     if (this.enabled.is(`:${checked}`)) {
//       localStorage.setItem('enabled', checked)
//     } else {
//       localStorage.setItem('enabled', notChecked)
//     }
//     if (this.sound.is(`:${checked}`)) {
//       localStorage.setItem('sound', checked)
//     } else {
//       localStorage.setItem('sound', notChecked)
//     }
    
//     updateStatus()
//     setTimeout(function() { checkStatus(); }, 1000);
//   },

//   validateTime: () => {
//     $('.settime').hide();
//     $('input').removeClass('error-highlight');
//     let postureTimeVal = this.postureTime.val();
//     var validation = true;

//     if(!postureTimeVal.match(/\d/) || postureTimeVal <= 0 || postureTimeVal > 59) {
//       this.postureTime.addClass('error-highlight');
//       validation = false;
//     } 
    
//     if(!validation) {
//       $('.settime').show();
//       return false;
//     } else {
//       return true;
//     }
//   }
// }

// function updateStatus() {
//   $('#notification').html('Options saved');
// }

// function checkStatus() {
//   var currentStatus = localStorage.enabled;
//   if(currentStatus == notChecked) {
//     $('#notification').html('Reminders are currently <strong>disabled</strong>');
//   } else {
//     $('#notification').html('Reminders are currently <strong>enabled</strong>');
//   }
// }