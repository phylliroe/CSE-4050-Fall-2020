/*
    Name: Andrew Loop-Perez
    ID: 006198799
    Course: CSE 4050
    Assignment: JavaScript
    Term: Fall 2020
    Filename: script.js
*/

// Counts the number of times the button is clicked
var clicks = 0;

// When the window loads, print a message to the web console
// and call the clock() function
window.onload = function() {
    console.log("Printing to the console!");
    
    // Call clock() function 
    clock();
    
    // Refresh clock every second
    setInterval(clock, 1000);
}

// Count the number of times the button is clicked
function button_click() {
    let button_results = document.getElementById("button_result_div");
    button_results.innerHTML = "<p>" + clicks + " button clicks</p>"
    
    // Increment click count by 1
    clicks++;

    // Disable the button after a certain number of clicks
    const max_clicks = 15;
    
    if (clicks > max_clicks) {
        alert("You're clicking too much! I'm turning turning the button off!");
        let the_button = document.getElementById("btn");

        the_button.innerHTML = "DISABLED";
        the_button.disabled = true;
    }
}

// Add the values in the input boxes and display them in the "Results" text area
// Called when the "Submit" button is clicked
function add_input() {
    // Convert input values to numbers and add them.
    let a = Number(document.getElementById("val_a").value);
    let b = Number(document.getElementById("val_b").value);
    let result = a + b;
 
    // Display the result
    document.getElementById("add_result").value = result;
}

// Create a real time clock and display it on the page
function clock() {
    // div element where clock is placed
    let time_div = document.getElementById("box_text");
    
    // Get time
    let time = new Date().toLocaleTimeString();
    
    // Set element text
    time_div.innerHTML = time;
}