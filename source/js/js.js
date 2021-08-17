// fetch data from input fields
// document.getElementById(tableBody).innerHTML = "<tr><td colspan=4> Empty List</td></tr>";

add = document.getElementById('add');
add.addEventListener("click", GetAndUpdate);
update();

function GetAndUpdate() {
    var tit = document.getElementById('title').value;
    var desc = document.getElementById('description').value;
    if (localStorage.getItem('itemsJson') === "" || tit === "" && desc === "") {
        // itemJsonArray = [];
        // itemJsonArray.push([tit, desc]);
        localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
    } else {
        itemJsonArrayStr = localStorage.getItem('itemsJson');
        itemJsonArray = JSON.parse(itemJsonArrayStr);
        itemJsonArray.push([tit, desc]);
        localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
    }
    update();

}
function update() {

    if (localStorage.getItem('itemsJson') == null) {
        itemJsonArray = [];
        localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
        document.getElementById('tableBody').innerHTML = "<tr><span>No Items..</span></tr>";
    }
    else {
        itemJsonArrayStr = localStorage.getItem('itemsJson');
        itemJsonArray = JSON.parse(itemJsonArrayStr);
    }
    let tableBody = document.getElementById('tableBody');
    let str = "";
    itemJsonArray.forEach((element, index) => {
        str += `
            <tr>
            <td scope="row" width="20">
                <span class="mr-1" id='del'onclick="delete_item(${index})"><i class=" fa fa-trash text-danger"></i></span>
                <span class="ml-2" id='upd'onclick="update()"><i class=" fa fa-pencil text-primary"></i></span>
            </td>
            <td>${index + 1}</td>
            <td>${element[0]}</td>
            <td>${element[1]}</td>
            </tr>
            `
    });
    tableBody.innerHTML = str;
    tit = document.getElementById('title').value = "";
    desc = document.getElementById('description').value = "";
}

// delete item.
function delete_item(itemIndex) {

    itemJsonArrayStr = localStorage.getItem('itemsJson');
    itemJsonArray = JSON.parse(itemJsonArrayStr);
    itemJsonArray.splice(itemIndex, 1);
    localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
    update();
}

// clear All
function clearList() {

    if (!localStorage.getItem('itemsJson') == '') {

        if (confirm('!Are You Sure?')) {
            localStorage.clear();
        }
    } else {
        alert('!List Is Alredy Empty');
    }
    update();
}
 
