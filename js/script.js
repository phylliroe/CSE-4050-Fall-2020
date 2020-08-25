var clicks = 0;

window.onload = function() {
    console.log("Printing to the console!");
    clock();
}

function button_click() {
    let button_results = document.getElementById("button_result_div");
    button_results.innerHTML = "<p>" + clicks + " button clicks</p>"
    clicks++;
}

function clock() {
    let time_div = document.getElementById("box_text");
    let time = new Date().toLocaleTimeString();
    time_div.innerHTML = time;
    setInterval(clock, 1000);
}