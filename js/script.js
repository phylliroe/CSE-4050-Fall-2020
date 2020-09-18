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
    // Print to the console
    console.log("Printing to the console!");

    // Json
    working_with_json();


    // Add the elements in an array to the webpage
    let my_array = ["This", "is", "an", "array"];
    let array_div =document.getElementById("array_div");
    
    for (const x in my_array) {
        array_div.innerHTML += "<p>" + my_array[x] + "</p>";
    }

    // Call clock() function 
    clock();
    
    // Refresh clock every second
    setInterval(clock, 1000);
}

// Count the number of times the button is clicked
// Disable the button after a certain number of clicks
function button_click() {
    // Maxmimum number of clicks allowed
    const max_clicks = 10;

    // Increment click count by 1
    clicks++;

    // Update the HTML
    let button_results = document.getElementById("button_result_div");
    button_results.innerHTML = "<p>" + clicks + " button clicks</p>"

    // Disable the button after a certain number of clicks    
    if (clicks === max_clicks) {
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

// Create a clock and display it on the page
// Get the current time and display it on the page
// Run this function every second to create a real time clock
function clock() {
    // div element where clock is placed
    let time_div = document.getElementById("box_text");
    
    // Get time using a date object
    let time = new Date().toLocaleTimeString();
    
    // Display the clock on the HTML
    time_div.innerHTML = time;
}

// Function for demonstrating JSON
function working_with_json() {
    let json_1_div = document.getElementById("json_1");
    let json_2_div = document.getElementById("json_2");
    let json_3_div = document.getElementById("json_3");

    // A simple JSON object
    let json_basic = {"fname":"Andrew", "lname":"Loop-Perez", "id":"006189799"};

    // A JSON array
    let json_array = [{"Name": "John Doe", "Age":25}, {"Name": "Jane Doe", "Age": 34}, {"Name": "Doe Doe"}];
    
    // JSON object where the values are also JSON objects
    let json_array_num = [
        {
            "Some Numbers": {
                "One":1,
                "Two": 2
            },
            "Another Number": {
                "Three": 3
            },
            "More Numbers": {
                "Four": 4,
                "Five":5
            },
            "Six": 6,
            "Seven":7
        }
    ];

    // A string that will be parsed into a JSON object
    let json_text = '{"text":"This is a string", "number":9}';

    // Print the JSON objects to the console
    console.log("Printing the JSON objects: ");
    console.log(json_basic);
    console.log(json_array);
    console.log(json_array_num);

    console.log(" ");

    // Print individual elemens of the JSON objects to the console
    console.log("Accessing elements: ");
    console.log(json_basic["fname"]);
    console.log(json_array[0]);
    console.log(json_array[1]["Age"])
    console.log(json_array_num[0]["Some Numbers"]);
    console.log(json_array_num[0]["Some Numbers"]["Two"]);

    // Stringify a JSON obkect and add it to the web page
    let json_stringified = JSON.stringify(json_basic);
    json_1_div.innerHTML += "<p>" + json_stringified + "</p>";

    // Loop through the JSON array and add the "Name" values to the web page
    let p = "<p> The Names Are: ";
    for (let i = 0; i < json_array.length; i++) {
        p += json_array[i]["Name"] + ", ";
    }
    p += "</p>"
    json_2_div.innerHTML = p;


    console.log(" ");

    // Parse the string into a JSON object and print it to the console 
    json_3_div.innerHTML += "<p>" + json_text + "</p>";

    let json_parsed = JSON.parse(json_text);
    console.log("Parsed JSON object: ");
    console.log(json_parsed);
}