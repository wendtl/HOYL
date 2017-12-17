/*
*  Pretty much just a place to store variables so all instances of HOYL are referencing the same ones
*/

var hourlyWage = null;
var extensionEnabled = true;

// Listen for instances of HOYL asking for the hourly wage
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        chrome.storage.local.get(["hourlyWage"], function(items) {
            if(items["hourlyWage"] != null) {
                setHourlyWage(items["hourlyWage"]);
            }
        });
        sendResponse({"wage": hourlyWage, "extensionEnabled": extensionEnabled});
    }
);

// Helper function to set global wage variable
function setHourlyWage(wage) {
	this.payPerHour = wage;
}