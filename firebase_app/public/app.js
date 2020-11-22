console.log("The script is working!");

// Counter variable used for assigning list item and button IDs
var count = 1;

// Sign user in with Google
const auth = firebase.auth();
const add_button = document.getElementById("add_btn");
const sign_in_button = document.getElementById("sign_in");
const provider = new firebase.auth.GoogleAuthProvider();

// Firestore
const fs = firebase.firestore();

auth.onAuthStateChanged(user => {
    if (user) {
        console.log(user.uid);
        console.log(user.displayName);

        document.getElementById("user").hidden = false;
        document.getElementById("user_name").innerHTML = "Hello " + user.displayName;
        document.getElementById("list").innerHTML = "";
    }
    else {
        document.getElementById("user").hidden = true;
        document.getElementById("user_name").innerHTML = "";
    }
});

auth.onAuthStateChanged(user => {
    if(user) {
        const uid = user.uid;
        let user_doc = fs.collection("lists").doc(uid);

        // Check if document for current signed in user exists
        user_doc.get()
            .then((docSnapshot) => {
                if (docSnapshot.exists) {
                    console.log("User doc exists!");
                    load_items(docSnapshot.data());
                } 
                else {
                    console.log("doc does not exists");
                    console.log("Creating new user document");

                    // Create user document
                    user_doc.set({
                        name: user.displayName,
                        id: user.uid
                    });
                }
            });

        add_button.onclick = () => {
            let newest = "item" + count;
            button_click(document.getElementById("item_text").value);
        
            let d = document.getElementById(newest);    
            let dat = {};
            dat[newest] = d.textContent;

            user_doc.update(dat);
        }
    }
    else {
        add_button.onclick = () => {
            button_click(document.getElementById("item_text").value);
            console.log("not signed in");
        }
    }
});

function google_auth() {
    auth.signInWithPopup(provider);
}

// Load user items from Cloud Firestore
function load_items(data) {
    console.log("loading...");

    let len = Object.keys(data).length;

    for (let i = 1; i <= len; i++) {
        let item_name = "item" + i;
        button_click(data[item_name]);
    }
}

// Add a new list item when the button is clicked (or the ENTER key is pressed)
function button_click(text_box_val) {
    // Print message if input is blank or only consists of white space
    if (!text_box_val || !text_box_val.trim().length) {
        alert("No input");
    }
    else {
        let list = document.getElementById("list");        
        
        // Create new elements 
        let new_div = document.createElement("div");
        let add_button = document.createElement("button");
        let delete_button = document.createElement("button");
        let linebreak = document.createElement("br");
        let p = document.createElement("p");

        // Append new list item
        list.appendChild(new_div);

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

         // sub tasks
         //let sub_div = document.createElement("div");
         //sub_div.className = "sub_div";
         //sub_div.innerHTML = '<ul name="child_list" class="sub_list"><li>ooo</li></ul>';
         let sl = document.createElement("ul");
         //sub_div.style.display = "none";
         //new_div.appendChild(sub_div);
        sl.style.display = "none";
        new_div.appendChild(sl);

        count++;
    }
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
    add_button.onclick = add_click;
    let add_button_id = "add" + count;
    add_button.setAttribute("id", add_button_id);
    add_button.innerHTML = '<i class="fa fa-plus"></i>';
    add_button.setAttribute("title", "Add Subtask");
    e.appendChild(add_button);

}

function add_click() {
    console.log("add clicked");

    //let e = this.parentNode.childNodes[3].childNodes[0];

    let e = this.parentNode.childNodes[3];
    console.log(e);
    if (e.style.display === "none"){
        e.style.display = "block";
    }
    //let child_div = document.createElement("div");
    //child_div.className = "child_item";

    let chld_text = prompt("Enter Sub Task: ");
    let new_li = document.createElement("li");
    new_li.appendChild(document.createTextNode(chld_text));
    e.appendChild(new_li);
    //child_div.innerHTML = '<p class="child_p">' + chld_text + '</p>';
    //child_div.innerHTML = "<ul><li>a</li><li>b</li></ul>";
    //this.parentNode.appendChild(child_div);
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
    console.log(this.parentNode.id);
    // Button is a child of the item div, which is a child of the list div
    // Call the removeChild function for the list div and give it the current item div
   
    // If user is signed in, delete item from firestore document
    auth.onAuthStateChanged(user => {
        if (user) {
            let user_doc = fs.collection("lists").doc(user.uid);
            let item = this.parentNode.id;

            user_doc.update({
                [item]: firebase.firestore.FieldValue.delete()
            });
        }
    });

    // Delete item from list
    this.parentNode.parentNode.removeChild(this.parentNode);
    set_new_id();
    set_remaining_items();
}

// Get the current list of items and return as JSON
function get_items() {
    let item_names = document.getElementsByClassName("item_name");
    let num = 1;
    let list_json = {}
    
    for(let i of item_names){
        let item_num = "item" + num;
        list_json[item_num] = i.innerHTML;
        num++;
    }

    count = (Object.keys(list_json).length + 1);
    return list_json;

}

// Set new id's for list items to accomidate for deleted items
function set_new_id() {
    let list = document.getElementById("list");
    let items = list.getElementsByTagName("div");
    let num = 1;

    for (let i = 0; i < items.length; i++) {
        let e = items[i];
        let new_id = "item" + num;
        e.id = new_id;
        num++;
    }
}

// Apply changes in list to the firestore document
function set_remaining_items() {
    auth.onAuthStateChanged(user => {
        if(user) {
            let user_doc = fs.collection("lists").doc(user.uid);
            let items = get_items();
            user_doc.set(items);
        }
    });
}