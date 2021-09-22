
add = document.getElementById('add');
add.addEventListener("click", GetDetails);
update();

// fetch data from input fields
function GetDetails() {
    var tit = document.getElementById('title').value;
    var desc = document.getElementById('description').value;
    var date = document.getElementById('date').value;
    var time = document.getElementById('time').value;
    if (localStorage.getItem('itemsJson') === "" || tit === "" && desc === "" && date === "" && time === "") {
        alert("Atleast one field needed!");
        localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
    } else {
        itemJsonArrayStr = localStorage.getItem('itemsJson');
        itemJsonArray = JSON.parse(itemJsonArrayStr);
        itemJsonArray.push([tit, desc, date, time]);
        localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
    }
    update();

}

function update() { // to update list frequently after any operation

    if (localStorage.getItem('itemsJson') == null) {
        itemJsonArray = [];
        localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
        document.getElementById('tableBody').innerHTML = "<tr><span>No work were added..</span></tr>";
    } else {
        itemJsonArrayStr = localStorage.getItem('itemsJson');
        itemJsonArray = JSON.parse(itemJsonArrayStr);
    }

    let tableBody = document.getElementById('tableBody');
    let str = "";
    itemJsonArray.forEach((element, index) => {
        str += `
            <tr>
            <td scope="row" width="20">
                <span class="mr-1" id='del'onclick="delete_item(${index})" style="cursor:pointer">
                    <i class=" fa fa-trash text-danger"></i>
                </span>
                <span class="ml-2" id='upd'onclick="edit()" style="cursor:pointer">
                    <i class=" fa fa-pencil text-primary"></i>
                </span>
            </td>
            <td>${index + 1}</td>
            <td>${element[0]}</td>
            <td>${element[1]}</td>
            <td>${element[2]}</td>
            <td>${element[3]}</td>
            </tr>
            `
    });
    tableBody.innerHTML = str;
    tit = document.getElementById('title').value = "";
    desc = document.getElementById('description').value = "";
    date = document.getElementById('date').value = "";
    time = document.getElementById('time').value = "";
}

// delete item.
function delete_item(itemIndex) {

    itemJsonArrayStr = localStorage.getItem('itemsJson');
    itemJsonArray = JSON.parse(itemJsonArrayStr);
    itemJsonArray.splice(itemIndex, 1);
    // splice() : to remove a item from the Json array
    localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
    update();
}

// clear All
function clearList() {

    if (!localStorage.getItem('itemsJson') == '') {
        // it checks for the list is not empty or not.

        if (confirm('!Are You Sure?')) {
            localStorage.clear(); // to clear the list
        }
    } else {
        alert('!List Is Alredy Empty');
    }
    update();
}
