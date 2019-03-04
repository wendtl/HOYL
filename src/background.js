/*
*  A single instance of this file runs in the background while the browser is open
*  The only function of this file place to store variables so all instances of hoyl.js are referencing the same ones
*  The 'wage' variable in local Chrome storage should be considered the original source, all other places wage is used should be derived from here
*/

var extensionEnabled = true;
var hourlyWage = getHourlyWage();

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    var response = {
      "wage": getHourlyWage(),
      "extensionEnabled": this.extensionEnabled 
    };

    console.log("HOYL: sending wage response to tab:", response);
    sendResponse(response);
  }
);

function getHourlyWage() {
  chrome.storage.local.get(
    ["wage"],
    function(items) {
      console.log("HOYL: hourly wage retrieved from Chrome storage:", items["wage"]);
      getWageCallback(items["wage"]);
    }
  );

  return this.hourlyWage;
}

function getWageCallback(wage) {
  this.hourlyWage = wage;
}

function setHourlyWage(wage) {
	chrome.storage.local.set(
    { "wage": wage },
    function logWageChange() {
      console.log("HOYL: hourly wage is now set to " + wage);
    }
  );
}
