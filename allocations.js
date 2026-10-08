function allocateItem() {

    let itemIndex =
        document.getElementById("allocationItem").value;

    let projectIndex =
        document.getElementById("allocationProject").value;


    if (itemIndex === "" || projectIndex === "") {

        alert("Please select an item and project.");

        return;
    }


    let item =
        inventory[itemIndex];

    let project =
        projects[projectIndex];


    if (!item || !project) {

        alert("Invalid selection.");

        return;
    }


    /* Check stock */

    if (item.status !== "Available") {

        alert("This item is already allocated.");

        return;
    }


    /* Automatically deduct stock */

    item.status = "Allocated";


    /* Create allocation record */

    allocations.push({

        serial:
            item.serial,

        project:
            project.id,

        client:
            project.client,

        status:
            "Allocated"

    });


    updateEverything();


    alert(
        item.serial +
        " has been allocated to " +
        project.id
    );

}


/* Display allocations */

function displayAllocations() {

    let list =
        document.getElementById("allocationList");

    list.innerHTML = "";


    allocations.forEach(function(allocation) {

        list.innerHTML += `

            <tr>

                <td>${allocation.serial}</td>

                <td>${allocation.project}</td>

                <td>${allocation.client}</td>

                <td>${allocation.status}</td>

            </tr>

        `;

    });


    /* Display available inventory */

    let dropdown =
        document.getElementById("allocationItem");

    dropdown.innerHTML = "";


    inventory.forEach(function(item, index) {

        if (item.status === "Available") {

            dropdown.innerHTML += `

                <option value="${index}">

                    ${item.serial} -
                    ${item.type}

                </option>

            `;

        }

    });

}
