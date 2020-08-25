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
}

// Create a real time clock
function clock() {
    // div element where clock is placed
    let time_div = document.getElementById("box_text");
    
    // Get time
    let time = new Date().toLocaleTimeString();
    
    // Set element text
    time_div.innerHTML = time;
}