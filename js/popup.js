'use strict';
var bkg = chrome.extension.getBackgroundPage();

loadValues()

function loadValues() {
  chrome.storage.sync.get(['minutes','status','sound'], function(obj) {
    let isOn = obj.status === 'ON'
    let isSoundOn = obj.sound === 'ON'
    loadSoundIcon(!isSoundOn)
    setStyled(isOn)
    if (!obj.minutes) {
      $("#time").val(5)
      showUpdateReminder(true)
    } else {
      $("#time").val(obj.minutes)
    }
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
    chrome.browserAction.setBadgeBackgroundColor({color:'#71cd9f'});
  } else {
    chrome.storage.sync.set({status: 'OFF',})
    chrome.browserAction.setBadgeText({text: 'OFF'});
    chrome.browserAction.setBadgeBackgroundColor({color:'#e92d4c'});
    showUpdateReminder(false)
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

function checkValue(){
  let timeVal = $('#time').val() 
  if(parseInt(timeVal) < 1 || parseInt(timeVal) > 59) {
    $('#timeError').show()
    $("#submit").attr('disabled', true)
  } else {
    $('#timeError').hide()
    $("#submit").attr('disabled', false)
    showUpdateReminder(true)
  }
}

function showUpdateReminder(show) {
  if (show) {
    $('#updateReminder').show()
  } else {
    $('#updateReminder').hide()
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

$('#time').change(checkValue)