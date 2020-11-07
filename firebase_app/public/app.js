//console.log("test");
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
        console.log(uid);

        let user_doc = fs.collection("lists").doc(uid);

        // Check if document for current signed in user exists
        user_doc.get()
            .then((docSnapshot) => {
                if (docSnapshot.exists) {
                    console.log("User doc exists!");
                    console.log(docSnapshot.data()["name"]);
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
        /*
        user_doc.get()
            .then((doc) => {
                if (doc.get("items") != null) {
                    console.log("has items");
                    console.log(doc.get("items")["one"]);

                    if ("two" in doc.get("items")) {
                        console.log("there's three");
                    }
                    else {console.log("no three");}

                    let m = doc.get("items");
                    console.log(m);
                }
            });
        */

        add_button.onclick = () => {
            let newest = "item" + count;
            button_click();
        
            console.log(newest);
        
            let d = document.getElementById(newest);
            console.log(d.textContent);
        
            let dat = {};
            dat[newest] = d.textContent;
            console.log(dat);

            user_doc.update(dat);

            //let children = document.getElementById("list").getElementsByTagName("div");
            //console.log(children.length);

            //get_items();
        

            user_doc.get()
            .then((docSnapshot) => {
                console.log(docSnapshot.data());
            });
        }
    }
    else {
        add_button.onclick = () => {
            button_click();
            console.log("not signed in");
        }
    }
});

function google_auth() {
    auth.signInWithPopup(provider);
}

function get_items() {
    let c = document.getElementById("list").getElementsByTagName("div");
    console.log(c.length);

    //let j = {};
    //for (let i = 0; i < c.length; i++) {
        //console.log(c[i].textContent);
    //    let p = c[i].textContent
        //let ps = c[i].getElementsByTagName("p");
        //console.log(ps[0].textContent);
    //    j[]
    //}
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

    //console.log(p.innerHTML);
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

