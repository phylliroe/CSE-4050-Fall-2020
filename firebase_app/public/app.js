//console.log("test");
console.log("The script is working!");

const auth = firebase.auth();
const sign_in_button = document.getElementById("sign_in");
const provider = new firebase.auth.GoogleAuthProvider();

//sign_in_button.onclick = () => auth.signInWithPopup(provider);

var count = 1;

function google_auth() {
    auth.signInWithPopup(provider);
}

function button_click() {
    let input = document.getElementById("item_text").value;
  
    if (!input || !input.trim().length) {
        alert("No input");
    }
    else {
        let list = document.getElementById("list");
        
        let new_div = document.createElement("div");
        let text_box_val = document.getElementById("item_text").value;
        
        let add_button = document.createElement("button");
        let delete_button = document.createElement("button");
        let linebreak = document.createElement("br");

        let p = document.createElement("p");

        list.appendChild(new_div);
        
        //new_div.appendChild(delete_button);

        let item_id = "item" + count;
        new_div.setAttribute("id", item_id);
        //new_div.setAttribute("class", "list_item");
        new_div.className = "list_item";
        
        //new_div.innerHTML = "<p class='item_name'>" + text_box_val + "</p>";

        //test(new_div.id);

        p.className = "item_name";
        p.innerText = text_box_val;

        new_div.appendChild(p);

        create_add_button(new_div.id);
        create_delete_button(new_div.id);

        //list.appendChild(linebreak);
        
        count++;
    }

    clear_text();
}

function clear_text() {
    document.getElementById("item_text").value = "";
}

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

function create_delete_button(elem) {
    let e = document.getElementById(elem);
    //let br = document.createElement("br");
    //e.appendChild(document.createElement("br"));

    let delete_button = document.createElement("button");
    //delete_button.textContent = "REMOVE";
    delete_button.classList.add("del_btn");
    delete_button.onclick = delete_click;

    let delete_btn_id = "delete" + count;
    delete_button.setAttribute("id", delete_btn_id);

    delete_button.innerHTML = '<i class="fa fa-trash"></i>';

    delete_button.setAttribute("title", "Delete Item");

    e.appendChild(delete_button);
}

/*
list div
    new div 1
        delete button 1
    br
    new div 2
        delete button 2
    br

Remove the new div and the following br
*/
function delete_click() {
    let next = this.parentNode.nextSibling;
    //this.parentNode.parentNode.removeChild(next);
    this.parentNode.parentNode.removeChild(this.parentNode);
}

// Remove a given element
function delete_item(id) {
    document.getElementById("list").removeChild(node);
}