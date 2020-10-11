//console.log("test");
console.log("The script is working!");

// Counter variable used for assigning list item and button IDs
var count = 1;

// Sign user in with Google
const auth = firebase.auth();
const sign_in_button = document.getElementById("sign_in");
const provider = new firebase.auth.GoogleAuthProvider();

function google_auth() {
    auth.signInWithPopup(provider);
}

// Add a new list item when the button is clicked (or the ENTER key is pressed)
function button_click() {
    let input = document.getElementById("item_text").value;
  
    // Print message if input is blank or only consists of white space
    if (!input || !input.trim().length) {
        alert("No input");
    }
    else {
        let list = document.getElementById("list");        
        let text_box_val = document.getElementById("item_text").value;
        
        // Create new elements 
        let new_div = document.createElement("div");
        let add_button = document.createElement("button");
        let delete_button = document.createElement("button");
        let linebreak = document.createElement("br");
        let p = document.createElement("p");

        // Append new list item
        list.appendChild(new_div);
        
        //new_div.appendChild(delete_button);

        // Set item div ID and class
        let item_id = "item" + count;
        new_div.setAttribute("id", item_id);
        new_div.className = "list_item";
        

        // Set list item text
        p.className = "item_name";
        p.innerText = text_box_val;
        new_div.appendChild(p);

        // Add buttons to item div
        create_add_button(new_div.id);
        create_delete_button(new_div.id);
        
        count++;
    }

    // Clear input box text
    clear_text();
}

// Clear input box
function clear_text() {
    document.getElementById("item_text").value = "";
}

// Create an add button and add it to the list div
// Button does not do anything yet
function create_add_button(elem) {
    let e = document.getElementById(elem);
    let add_button = document.createElement("button");
    add_button.classList.add("sub_btn");
    let add_button_id = "add" + count;
    add_button.setAttribute("id", add_button_id);
    add_button.innerHTML = '<i class="fa fa-plus"></i>';
    add_button.setAttribute("title", "Add Subtask");
    e.appendChild(add_button);

}

// Create delete button
function create_delete_button(elem) {
    let e = document.getElementById(elem);
    let delete_button = document.createElement("button");
    delete_button.classList.add("del_btn");
    delete_button.onclick = delete_click;

    let delete_btn_id = "delete" + count;
    delete_button.setAttribute("id", delete_btn_id);

    delete_button.innerHTML = '<i class="fa fa-trash"></i>';

    delete_button.setAttribute("title", "Delete Item");

    e.appendChild(delete_button);
}

// Delete item from list
// Called on delete button click
function delete_click() {
    // Button is a child of the item div, which is a child of the list div
    // Call the removeChild function for the list div and give it the current item div
    this.parentNode.parentNode.removeChild(this.parentNode);
}

