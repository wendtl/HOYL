/*
 * The popup window that is displayed when a user clicks on the extension in the toolbar
 */

const backgroundPage = chrome.extension.getBackgroundPage();

// Populate fields in popup from locally saved data
window.onload = function() {
	chrome.storage.local.get(["wage"], function(items){
		var wageValue = items["wage"];
		if(wageValue !== undefined && wageValue !== null && wageValue !== 0) {
      hideForm();
		} else {
      showForm();
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


function clearForm() {
	document.getElementById('hourlyWage').value = "";
  document.getElementById('salariedWage').value = "";
  document.getElementById('hoursPerWeek').value = "";
}

function hideForm() {
  document.getElementById('wageForm').style.display = "none";
  document.getElementById('extensionState').innerHTML = "wage is set and extension is active!";
  document.getElementById('button').innerHTML = "Set New Wage";
}

function showForm() {
  document.getElementById('wageForm').style.display = "block";
  document.getElementById('extensionState').innerHTML = "enter wage to enable extension";
  document.getElementById('button').innerHTML = "Confirm";
}

function getComputedHourlyWage() {
  let hourlyWage;

	let hourlyWageField = document.getElementById('hourlyWage');
  if(hourlyWageField.value) {
    hourlyWage = hourlyWageField.value;
  } else {
    let salariedWageField = document.getElementById('salariedWage');
    let hoursPerWeekField = document.getElementById('hoursPerWeek');
    hourlyWage = salariedWageField.value/(hoursPerWeekField.value * 52);
  }

  return hourlyWage;
}

// onClick listener for the "Set Wage" button
document.addEventListener('DOMContentLoaded', function() {
	let link = document.getElementById('button');
	link.addEventListener('click', function() {

    if(document.getElementById('wageForm').style.display === "none") {
      showForm();
    } else { 
      saveWage(getComputedHourlyWage());
      clearForm();
      hideForm();
    }
	});
});

// onClick listener for HOYL's enable/disable toggle
document.addEventListener('DOMContentLoaded', function() {
	let link = document.getElementById('extensionToggle');
	link.addEventListener('click', function() {
		setExtensionEnabledState();
	});
});
