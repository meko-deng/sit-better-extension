'use strict';
var bkg = chrome.extension.getBackgroundPage();

loadValues()

function loadValues() {
  chrome.storage.sync.get(['minutes','status','sound'], function(obj) {
    let isOn = obj.status === 'ON'
    let isSoundOn = obj.sound === 'ON'
    loadSoundIcon(!isSoundOn)
    setStyled(isOn)
    $("#time").val(obj.minutes)
    $("#default").prop('checked', isOn)
  })
}

function setStyled(isOn) {
  if(!isOn){
    $("#time").attr('disabled', true)
    $("#submit").attr('disabled', true)
    $('#time-text').addClass('disabled')
    $('#sound-on').addClass('sound-disabled')
    $('#sound-off').addClass('sound-disabled')
  } else {
    $("#time").attr('disabled', false)
    $("#submit").attr('disabled', false)
    $('#time-text').removeClass('disabled')
    $('#sound-on').removeClass('sound-disabled')
    $('#sound-off').removeClass('sound-disabled')
  }
}

function loadSoundIcon(isSoundOn) {
  if(isSoundOn) {
    $('#sound-on').hide()
    $('#sound-off').show()
  } else {
    $('#sound-on').show()
    $('#sound-off').hide()
  }
}

function setAlarm(event) {
    let minutes = parseFloat($("#time").val())
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

function toggleSound() {
  let isSoundOn = $('#sound-on').is(':visible')
  if (isSoundOn) {
    loadSoundIcon(isSoundOn)
    chrome.storage.sync.set({sound: 'OFF'}) // should be here or in setAlarm?
  } else {
    loadSoundIcon(isSoundOn)
    chrome.storage.sync.set({sound: 'ON'})
  }
}

function clearAlarm() {
  chrome.browserAction.setBadgeText({text: ''});
  chrome.alarms.clearAll();

  chrome.storage.sync.set({status: 'OFF'})
  window.close();
}

$("#submit").click(setAlarm)
$("#default").click(setCheckbox)
$('#sound-on').click(toggleSound)
$('#sound-off').click(toggleSound)