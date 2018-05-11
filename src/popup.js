var backgroundPage = chrome.extension.getBackgroundPage();
var hourlyWage = null;
var extensionEnabled = true;

// Populate fields in popup from locally saved data
window.onload = function() {
	chrome.storage.local.get(["hourlyWage"], function(items){
		document.getElementById('hourlyWage').value = items["hourlyWage"];
		toggleExtension();
	});
	document.getElementById('extensionToggle').checked = backgroundPage.extensionEnabled;
	extensionEnabled = backgroundPage.extensionEnabled;
}

// Store hourly wage variable locally
function saveWage() {
	this.hourlyWage = document.getElementById('hourlyWage').value;
	backgroundPage.hourlyWage = this.hourlyWage;
	chrome.storage.local.set({ "hourlyWage": document.getElementById('hourlyWage').value }, function(){
		console.log("Set hourly wage to " + document.getElementById('hourlyWage').value);
	});
}

// Toggle the variable in background.js
function toggleExtension() {
	this.extensionEnabled = document.getElementById('extensionToggle').checked;
	backgroundPage.extensionEnabled = document.getElementById('extensionToggle').checked;
}

// onClick listener for the "Set Wage" button
document.addEventListener('DOMContentLoaded', function() {
	var link = document.getElementById('setWageButton');
	link.addEventListener('click', function() {
		if(document.getElementById('hourlyWage') != null && document.getElementById('hourlyWage') != 0) {
			saveWage();
		}
	});
});

// onClick listener for HOYL's enable/disable toggle
document.addEventListener('DOMContentLoaded', function() {
	var link = document.getElementById('extensionToggle');
	link.addEventListener('click', function() {
		toggleExtension();
	});
});
