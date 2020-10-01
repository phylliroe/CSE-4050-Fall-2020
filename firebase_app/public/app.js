//console.log("test");
console.log("The script is working!");

var count = 1;

function button_click() {
    let list = document.getElementById("list");
    let new_div = document.createElement("div");
    let new_button = document.createElement("button");
    let linebreak = document.createElement("br");

    list.appendChild(new_div);
    list.appendChild(new_button);
    list.appendChild(linebreak);

    new_button.textContent = "BUTTON";
    //new_button.setAttribute("class", "sub_btn");
    //new_button.className = "sub_btn"
    new_button.classList.add("sub_btn");

    let id = "div" + count;
    new_div.setAttribute("id", "div1");
    //new_div.setAttribute("class", "list_item");
    new_div.className = "list_item";

    new_div.innerHTML = "<p>NEW</p>";

    //list.appendChild(new_div);
    //list.appendChild(new_button);

    //new_div.innerHTML += "<br>";
    //console.log(id);
    count++;
}