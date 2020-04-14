'use strict';
var bkg = chrome.extension.getBackgroundPage();

bkg.console.log('IN POPUP');
bkg.console.log($("#default").prop('checked'))
loadValues()

function loadValues() {
  chrome.storage.sync.get(['minutes','status',], function(obj) {
    bkg.console.log('loading dom', obj)
    let isOn = obj.status === 'ON'
    setStyled(isOn)
    $("#time").val(obj.minutes)
    $("#default").prop('checked', isOn)
  })
}

function setStyled(isOn) {
  if(!isOn){
    $("#time").attr('disabled', true)
    $("#submit").attr('disabled', true)    
  } else {
    $("#time").attr('disabled', false)
    $("#submit").attr('disabled', false)
  }

}

function setAlarm(event) {
    let minutes = parseFloat($("#time").val())
    bkg.console.log("TIME",parseFloat($("#time").val()))
    chrome.alarms.create('postureAlarm',{
        delayInMinutes: minutes,
        periodInMinutes: minutes
    })
    
    chrome.storage.sync.set({
      status: 'ON',
      minutes: minutes
    })
    window.close()
}

function setCheckbox() {
  let isChecked =  $("#default").prop('checked')
  if (isChecked) {
    chrome.storage.sync.set({status: 'ON',})
    chrome.browserAction.setBadgeText({text: 'ON'});
    chrome.browserAction.setBadgeBackgroundColor({color:'blue'});
  } else {
    chrome.storage.sync.set({status: 'OFF',})
    chrome.browserAction.setBadgeText({text: 'OFF'});
    chrome.browserAction.setBadgeBackgroundColor({color:'red'});
  }
  setStyled(isChecked)
}

function clearAlarm() {
  bkg.console.log('Im geting called!')
  chrome.browserAction.setBadgeText({text: ''});
  chrome.alarms.clearAll();

  chrome.storage.sync.set({status: 'OFF'})
  window.close();
}

$("#submit").click(setAlarm)
$("#default").click(setCheckbox)