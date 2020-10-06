//console.log("test");
console.log("The script is working!");

var count = 1;

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

        list.appendChild(new_div);
        //list.appendChild(linebreak);
        //list.appendChild(add_button);
        //list.appendChild(delete_button);
        //list.appendChild(linebreak);


        //new_div.appendChild(delete_button);

        let item_id = "item" + count;
        new_div.setAttribute("id", item_id);
        //new_div.setAttribute("class", "list_item");
        new_div.className = "list_item";
        
        new_div.innerHTML = "<p class='item_name'>" + text_box_val + "</p>";

        test(new_div.id);

        list.appendChild(linebreak);

        //list.appendChild(add_button);
        //list.appendChild(delete_button);
        //new_div.appendChild(linebreak);

        //add_button.textContent = "ADD";
        //add_button.setAttribute("class", "sub_btn");
        //add_button.className = "sub_btn"
        //add_button.classList.add("sub_btn");


        //delete_button.textContent = "REMOVE";
        //delete_button.classList.add("sub_btn");

        //delete_button.onclick = delete_click;

        //let id = "div" + count;
        
        //new_div.setAttribute("id", "div1");
        //new_div.setAttribute("class", "list_item");
        //new_div.className = "list_item";

        //new_div.innerHTML = "<p>NEW</p>";


        //let delete_btn_id = "delete" + count;
        //delete_button.setAttribute("id", delete_btn_id);
        //list.appendChild(new_div);
        //list.appendChild(add_button);

        //new_div.innerHTML += "<br>";
        //console.log(id);
        count++;
    }

    clear_text();
}

function clear_text() {
    document.getElementById("item_text").value = "";
}

function test(elem) {
    let e = document.getElementById(elem);

    //let br = document.createElement("br");
    //e.appendChild(document.createElement("br"));

    let delete_button = document.createElement("button");
    delete_button.textContent = "REMOVE";
    delete_button.classList.add("sub_btn");
    delete_button.onclick = delete_click;

    let delete_btn_id = "delete" + count;
    delete_button.setAttribute("id", delete_btn_id);

    delete_button.innerHTML = '<i class="fa fa-trash"></i>';

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
    this.parentNode.parentNode.removeChild(next);
    this.parentNode.parentNode.removeChild(this.parentNode);
}

// Remove a given element
function delete_item(id) {
    document.getElementById("list").removeChild(node);
}