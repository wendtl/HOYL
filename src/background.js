/*
*  A single instance of this file runs in the background while the browser is open
*  The only function of this file place to store variables so all instances of hoyl.js are referencing the same ones
*  The 'wage' variable in local Chrome storage should be considered the original source, all other places wage is used should be derived from here
*/

var extensionEnabled = readExtensionState();
var hourlyWage = readHourlyWage();

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    var response = {
      "wage": this.hourlyWage,
      "extensionEnabled": this.extensionEnabled 
    };

    console.log("HOYL: sending wage response to tab:", response);
    sendResponse(response);
  }
);

function readHourlyWage() {
  chrome.storage.local.get(
    ["wage"],
    function(items) {
      console.log("HOYL: hourly wage retrieved from Chrome storage:", items["wage"]);
      getWageCallback(items["wage"]);
    }
  );
}

function setHourlyWage(wage) {
	chrome.storage.local.set(
    { "wage": wage },
    () => console.log("HOYL: hourly wage is now set to " + wage)
  );
}

function setExtensionState(isEnabled) {
	chrome.storage.local.set(
    { "enabled": isEnabled },
    () => console.log("HOYL: Extension is now " + (isEnabled ? "enabled" : "disabled"))
  );
}

function readExtensionState() {
  chrome.storage.local.get(
    ["enabled"],
    function(items) {
      console.log("HOYL: extension state retrieved from Chrome storage:", items["enabled"]);
      readExtensionStateCallback(items["enabled"]);
    }
  );
}

function getWageCallback(wage) {
  this.hourlyWage = wage;
}

function readExtensionStateCallback(state) {
  this.extensionEnabled = state;
}
