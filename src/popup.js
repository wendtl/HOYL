const backgroundPage = chrome.extension.getBackgroundPage();

// Populate fields in popup from locally saved data
window.onload = function() {
	chrome.storage.local.get(["wage"], function(items){
		var wageValue = items["wage"];
		if(wageValue !== undefined && wageValue !== null) {
			document.getElementById('hourlyWage').value = wageValue;
		}
		setExtensionEnabledState();
	});
	document.getElementById('extensionToggle').checked = backgroundPage.extensionEnabled;
}

// Store hourly wage variable in persistent local chrome storage
function saveWage(wage) {
  var hourlyWage = document.getElementById('hourlyWage').value;
	backgroundPage.setHourlyWage(wage);
}

// Toggle the variable in background.js
function setExtensionEnabledState() {
	backgroundPage.extensionEnabled = document.getElementById('extensionToggle').checked;
}

function getComputedHourlyWage() {
  var hourlyWage;

	var hourlyWageField = document.getElementById('hourlyWage');
  var salariedWageField = document.getElementById('salariedWage');
  var hoursPerWeekField = document.getElementById('hoursPerWeek');

  if(hourlyWageField.value) {
    hourlyWage = hourlyWageField.value;
  } else {
    hourlyWage = salariedWageField.value/(hoursPerWeekField.value * 52);
  }

  hourlyWageField.value = "";
  salariedWageField.value = "";
  hoursPerWeekField.value = "";

  return hourlyWage;
}

// onClick listener for the "Set Wage" button
document.addEventListener('DOMContentLoaded', function() {
	var link = document.getElementById('setWageButton');
	link.addEventListener('click', function() {
    saveWage(getComputedHourlyWage());
	});
});

// onClick listener for HOYL's enable/disable toggle
document.addEventListener('DOMContentLoaded', function() {
	var link = document.getElementById('extensionToggle');
	link.addEventListener('click', function() {
		setExtensionEnabledState();
	});
});
