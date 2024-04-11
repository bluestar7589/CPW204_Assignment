/**
 * To get the element with the ID
 * @param {string} id 
 * @returns {HTMLElement | null} The element with the specified ID or null if not found
 */
function $(id: string): HTMLElement | null {
    return document.getElementById(id);
}

/** 
 * This function runs after all the HTML is loaded
 */
window.onload = function (): void {
    // When the calculate button is clicked call the processEntry function
    let calculateButton: HTMLElement = $("calculate") as HTMLElement;
    if (calculateButton) {
        calculateButton.onclick = main;
    }
    resetForm();
    let milesInput: HTMLElement = $("miles") as HTMLElement;
    if (milesInput) {
        milesInput.addEventListener('dblclick', function (event) {
            // This code will run when the textbox is double clicked
            (milesInput as HTMLInputElement).value = "";
        });
    }
    let gallonsInput: HTMLElement = $("gallons") as HTMLElement;
    if (gallonsInput) {
        gallonsInput.addEventListener('dblclick', function (event) {
            // This code will run when the textbox is double clicked
            (gallonsInput as HTMLInputElement).value = "";
        });
    }
}

/**
 * Checks if form data is valid
 * @returns {boolean} Returns true if all data is valid on the form, or false if something is invalid
 */
function isValid(): boolean {
    //function should validate form entries
    //and return true or false corresponding to validity
    let miles: HTMLInputElement = $("miles") as HTMLInputElement;
    let gallons: HTMLInputElement = $("gallons") as HTMLInputElement;
    let isValidData = true;
    if (isNaN(Number(miles.value)) != false || parseFloat(miles.value) < 0 || miles.value === "") {
        let spanMiles: HTMLElement = miles.nextSibling as HTMLElement;
        spanMiles.textContent = "Input valid number only !!!";
        isValidData = false;
    }
    if (isNaN(Number(gallons.value)) != false || parseFloat(gallons.value) < 0 || gallons.value === "") {
        let spanGallons: HTMLElement = gallons.nextSibling as HTMLElement;
        spanGallons.textContent = "Input valid number only !!!";
        isValidData = false;
    }
    return isValidData;
}

/** 
 * This function should be called when the calculate button is clicked
 */
function main(): void {
    // clean up the form
    resetForm();
    // check if data is valid
    if (isValid()) {
        let miles: HTMLInputElement = $("miles") as HTMLInputElement;
        let gallons: HTMLInputElement = $("gallons") as HTMLInputElement;
        let mpg: string = "";
        // calculate MPG and return value to mpg
        mpg = (calculateMPG(miles.value, gallons.value) as string);
        // display results
        displayResults(mpg);
    }
}

/**
 * Displays given MPG on the form
 * @param {string|number} milesPerGallon String or number containing the miles per gallon
 */
function displayResults(milesPerGallon: string): void {
    //display the MPG result in a textbox
    let mpgInput: HTMLInputElement = $("mpg") as HTMLInputElement;
    mpgInput.value = milesPerGallon.toString();
}

/**
 * Calculates miles per gallon
 * @param {string|number} milesDrive The number of miles driven
 * @param {string|number} gallonsUsed The number of gallons used
 * @returns {string} The calculated miles per gallon
 */
function calculateMPG(milesDrive: string | number, gallonsUsed: string | number): string | number {
    //return the MPG as a number
    return (parseFloat(milesDrive as string) / parseFloat(gallonsUsed as string)).toFixed(2);
}

/**
 * Function that clears all the value from textboxes inside form
 */
function clearForm(): void {
    // to clear all the fields
    ($("miles") as HTMLInputElement).value = "";
    ($("gallons") as HTMLInputElement).value = "";
    ($("mpg") as HTMLInputElement).value = "";
    // to get focus on miles textbox for new input
    ($("miles") as HTMLInputElement).focus();
    // to reset the error span elements
    resetForm();
}

/**
 * To reset the span that keeps the error message.
 */
function resetForm(): void {
    let allSpan: NodeListOf<Element> = document.querySelectorAll("main span");
    allSpan.forEach(span => {
        span.textContent = "*";
    });
    let mpgInput: HTMLInputElement = $("mpg") as HTMLInputElement;
    if (mpgInput) {
        mpgInput.value = "";
    }
}
