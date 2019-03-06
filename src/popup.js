/*
 * The popup window that is displayed when a user clicks on the extension in the toolbar
 */

const backgroundPage = chrome.extension.getBackgroundPage();

// Populate fields in popup from locally saved data
window.onload = function() {
	chrome.storage.local.get(["wage","enabled"], function(items){
		var wageValue = items["wage"];
    console.log("receieved from background page:", items);
		if(wageValue !== undefined && wageValue !== null && wageValue !== 0) {
      hideForm();
		} else {
      showForm();
    }
		document.getElementById('extensionToggle').checked = items["enabled"];
	});
}

function saveWage(wage) {
	backgroundPage.setHourlyWage(wage);
  console.log("HOYL: wage sent to background page: " + wage);
}

function setExtensionEnabledState(state) {
	backgroundPage.setExtensionState(state);
  console.log("HOYL: new extension state sent to background page: " + state);
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

document.addEventListener('DOMContentLoaded', function() {
	let button = document.getElementById('button');
	button.addEventListener('click', function() {
    if(document.getElementById('wageForm').style.display === "none") {
      showForm();
      return
    }

    let hourlyWage = getComputedHourlyWage();
    if(hourlyWage !== 0 && hourlyWage !== null && hourlyWage !== undefined && hourlyWage !== "NaN") {
      document.getElementById('extensionToggle').checked = true
		  setExtensionEnabledState(true);
      saveWage(hourlyWage);
      clearForm();
      hideForm();
    } else {
      document.getElementById('extensionState').innerHTML = "Numbers only. Try Again.";
    }
	});
});

document.addEventListener('DOMContentLoaded', function() {
	let toggle = document.getElementById('extensionToggle');
	toggle.addEventListener('click', function() {
		setExtensionEnabledState(toggle.checked);
	});
});
