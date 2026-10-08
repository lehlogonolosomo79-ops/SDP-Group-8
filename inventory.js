function addInventory() {

    let type = document.getElementById("itemType").value;
    let manufacturer = document.getElementById("manufacturer").value;
    let model = document.getElementById("model").value;
    let serial = document.getElementById("serial").value;
    let value = document.getElementById("value").value;

    if (serial === "") {
        alert("Please enter a serial number.");
        return;
    }

    let duplicate = inventory.find(function(item) {
        return item.serial === serial;
    });

    if (duplicate) {
        alert("This serial number already exists.");
        return;
    }

    inventory.push({
        type: type,
        manufacturer: manufacturer,
        model: model,
        serial: serial,
        value: value,
        status: "Available"
    });

    saveData();

    document.getElementById("manufacturer").value = "";
    document.getElementById("model").value = "";
    document.getElementById("serial").value = "";
    document.getElementById("value").value = "";

    displayInventory();
}


function deleteInventory(index) {

    if (inventory[index].status !== "Available") {

        alert(
            "This item cannot be deleted because it has been allocated."
        );

        return;
    }

    inventory.splice(index, 1);

    saveData();

    displayInventory();
}


function displayInventory() {

    let list = document.getElementById("inventoryList");

    list.innerHTML = "";

    inventory.forEach(function(item, index) {

        list.innerHTML += `
            <tr>

                <td>${item.type}</td>
                <td>${item.manufacturer}</td>
                <td>${item.model}</td>
                <td>${item.serial}</td>
                <td>R ${Number(item.value).toLocaleString()}</td>
                <td>${item.status}</td>

                <td>
                    <button
                        class="delete"
                        onclick="deleteInventory(${index})">
                        Delete
                    </button>
                </td>

            </tr>
        `;

    });
}


displayInventory();
