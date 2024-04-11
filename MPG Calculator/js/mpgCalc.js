"use strict";
function $(id) {
    return document.getElementById(id);
}
window.onload = function () {
    let calculateButton = $("calculate");
    if (calculateButton) {
        calculateButton.onclick = main;
    }
    resetForm();
    let milesInput = $("miles");
    if (milesInput) {
        milesInput.addEventListener('dblclick', function (event) {
            milesInput.value = "";
        });
    }
    let gallonsInput = $("gallons");
    if (gallonsInput) {
        gallonsInput.addEventListener('dblclick', function (event) {
            gallonsInput.value = "";
        });
    }
};
function isValid() {
    let miles = $("miles");
    let gallons = $("gallons");
    let isValidData = true;
    if (isNaN(Number(miles.value)) != false || parseFloat(miles.value) < 0 || miles.value === "") {
        let spanMiles = miles.nextSibling;
        spanMiles.textContent = "Input valid number only !!!";
        isValidData = false;
    }
    if (isNaN(Number(gallons.value)) != false || parseFloat(gallons.value) < 0 || gallons.value === "") {
        let spanGallons = gallons.nextSibling;
        spanGallons.textContent = "Input valid number only !!!";
        isValidData = false;
    }
    return isValidData;
}
function main() {
    resetForm();
    if (isValid()) {
        let miles = $("miles");
        let gallons = $("gallons");
        let mpg = "";
        mpg = calculateMPG(miles.value, gallons.value);
        displayResults(mpg);
    }
}
function displayResults(milesPerGallon) {
    let mpgInput = $("mpg");
    mpgInput.value = milesPerGallon.toString();
}
function calculateMPG(milesDrive, gallonsUsed) {
    return (parseFloat(milesDrive) / parseFloat(gallonsUsed)).toFixed(2);
}
function clearForm() {
    $("miles").value = "";
    $("gallons").value = "";
    $("mpg").value = "";
    $("miles").focus();
    resetForm();
}
function resetForm() {
    let allSpan = document.querySelectorAll("main span");
    allSpan.forEach(span => {
        span.textContent = "*";
    });
    let mpgInput = $("mpg");
    if (mpgInput) {
        mpgInput.value = "";
    }
}
