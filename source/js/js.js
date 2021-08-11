// fetch data from input fields
// document.getElementById(tableBody).innerHTML = "<tr><td colspan=4> Empty List</td></tr>";
function GetAndUpdate() {
    tit = document.getElementById('title').value;
    desc = document.getElementById('description').value;
    if (localStorage.getItem('itemsJson') == null) {
        itemJsonArray = [];
        itemJsonArray.push([tit, desc]);
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
        itemJsonArray = [""];
        localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
        document.getElementById('tableBody').innerHTML = "<tr><td colspan=4> Empty List</td></tr>";
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
                <span class="ml-2" id='upd'onclick="update()"><i class=" fa fa-pen text-primary"></i></span>
            </td>
            <td>${index + 1}</td>
            <td>${element[0]}</td>
            <td>${element[1]}</td>
            </tr>
            `
    });
    tableBody.innerHTML = str;
}
add = document.getElementById('add');
add.addEventListener("click", GetAndUpdate);
update();



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

    if (confirm('! Are You Sure?')) {
        localStorage.clear();
        update();
    }
}