let inventory = JSON.parse(localStorage.getItem("inventory")) || [];
let projects = JSON.parse(localStorage.getItem("projects")) || [];
let teams = JSON.parse(localStorage.getItem("teams")) || [];
let allocations = JSON.parse(localStorage.getItem("allocations")) || [];

function saveData() {
    localStorage.setItem("inventory", JSON.stringify(inventory));
    localStorage.setItem("projects", JSON.stringify(projects));
    localStorage.setItem("teams", JSON.stringify(teams));
    localStorage.setItem("allocations", JSON.stringify(allocations));
}


/* =========================
   TAB SYSTEM
========================= */

function showTab(tabName) {

    let tabs = document.querySelectorAll(".tab");

    tabs.forEach(function(tab) {

        tab.classList.remove("active");

    });

    document.getElementById(tabName).classList.add("active");

    updateEverything();
}


/* =========================
   INVENTORY
========================= */

function addInventory() {

    let type =
        document.getElementById("itemType").value;

    let manufacturer =
        document.getElementById("manufacturer").value;

    let model =
        document.getElementById("model").value;

    let serial =
        document.getElementById("serial").value;

    let value =
        document.getElementById("value").value;


    if (serial === "") {

        alert("Please enter a serial number.");

        return;
    }


    /* Check for duplicate serial number */

    let duplicate = inventory.find(function(item) {

        return item.serial === serial;

    });


    if (duplicate) {

        alert("This serial number already exists.");

        return;
    }


    /* Create inventory item */

    let item = {

        type: type,

        manufacturer: manufacturer,

        model: model,

        serial: serial,

        value: value,

        status: "Available"

    };


    inventory.push(item);


    /* Clear form */

    document.getElementById("manufacturer").value = "";

    document.getElementById("model").value = "";

    document.getElementById("serial").value = "";

    document.getElementById("value").value = "";


    updateEverything();
}


/* Delete inventory */

function deleteInventory(index) {

    if (inventory[index].status !== "Available") {

        alert(
            "This item cannot be deleted because it has been allocated."
        );

        return;
    }


    inventory.splice(index, 1);

    updateEverything();
}


/* Display inventory */

function displayInventory() {

    let list =
        document.getElementById("inventoryList");

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


/* =========================
   TEAMS
========================= */

function addTeam() {

    let name =
        document.getElementById("teamName").value;

    let lead =
        document.getElementById("leadTech").value;


    if (name === "" || lead === "") {

        alert("Please complete the team details.");

        return;
    }


    teams.push({

        name: name,

        lead: lead

    });


    document.getElementById("teamName").value = "";

    document.getElementById("leadTech").value = "";


    updateEverything();
}


/* Delete team */

function deleteTeam(index) {

    teams.splice(index, 1);

    updateEverything();
}


/* Display teams */

function displayTeams() {

    let list =
        document.getElementById("teamList");

    list.innerHTML = "";


    teams.forEach(function(team, index) {

        list.innerHTML += `

            <tr>

                <td>${team.name}</td>

                <td>${team.lead}</td>

                <td>

                    <button
                        class="delete"
                        onclick="deleteTeam(${index})">

                        Delete

                    </button>

                </td>

            </tr>

        `;

    });


    /* Update team dropdown */

    let dropdown =
        document.getElementById("projectTeam");

    dropdown.innerHTML = "";


    teams.forEach(function(team, index) {

        dropdown.innerHTML += `

            <option value="${index}">
                ${team.name}
            </option>

        `;

    });

}


/* =========================
   PROJECTS
========================= */

function addProject() {

    let client =
        document.getElementById("client").value;


    if (client === "") {

        alert("Please enter a client name.");

        return;
    }


    let project = {

        id: "P" + (projects.length + 1),

        client:
            client,

        address:
            document.getElementById("address").value,

        scope:
            document.getElementById("scope").value,

        roof:
            document.getElementById("roof").value,

        notes:
            document.getElementById("notes").value,

        team:
            document.getElementById("projectTeam").value,

        status:
            document.getElementById("projectStatus").value

    };


    projects.push(project);


    /* Clear form */

    document.getElementById("client").value = "";

    document.getElementById("address").value = "";

    document.getElementById("scope").value = "";

    document.getElementById("notes").value = "";


    updateEverything();
}


/* Delete project */

function deleteProject(index) {

    projects.splice(index, 1);

    updateEverything();
}


/* Display projects */

function displayProjects() {

    let list =
        document.getElementById("projectList");

    list.innerHTML = "";


    projects.forEach(function(project, index) {

        let teamName = "Not Assigned";


        if (teams[project.team]) {

            teamName =
                teams[project.team].name;

        }


        list.innerHTML += `

            <tr>

                <td>${project.id}</td>

                <td>${project.client}</td>

                <td>${project.address}</td>

                <td>${teamName}</td>

                <td>${project.status}</td>

                <td>

                    <button
                        class="delete"
                        onclick="deleteProject(${index})">

                        Delete

                    </button>

                </td>

            </tr>

        `;

    });


    /* Update project dropdown */

    let dropdown =
        document.getElementById("allocationProject");

    dropdown.innerHTML = "";


    projects.forEach(function(project, index) {

        dropdown.innerHTML += `

            <option value="${index}">

                ${project.id} -
                ${project.client}

            </option>

        `;

    });

}


/* =========================
   ALLOCATIONS
========================= */

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


/* =========================
   REPORTS
========================= */

function displayReports() {

    let types = [

        "Solar Panel",

        "Inverter",

        "Battery"

    ];


    let report =
        document.getElementById("stockReport");

    report.innerHTML = "";


    types.forEach(function(type) {

        let total =
            inventory.filter(function(item) {

                return item.type === type;

            }).length;


        let available =
            inventory.filter(function(item) {

                return (
                    item.type === type &&
                    item.status === "Available"
                );

            }).length;


        let allocated =
            inventory.filter(function(item) {

                return (
                    item.type === type &&
                    item.status === "Allocated"
                );

            }).length;


        let installed =
            inventory.filter(function(item) {

                return (
                    item.type === type &&
                    item.status === "Installed"
                );

            }).length;


        report.innerHTML += `

            <tr>

                <td>${type}</td>

                <td>${total}</td>

                <td>${available}</td>

                <td>${allocated}</td>

                <td>${installed}</td>

            </tr>

        `;

    });


    /* Completed installations */

    let completed =
        document.getElementById("completedReport");

    completed.innerHTML = "";


    projects.forEach(function(project) {

        if (project.status === "Completed") {

            let team =
                "Not Assigned";


            if (teams[project.team]) {

                team =
                    teams[project.team].name;

            }


            completed.innerHTML += `

                <tr>

                    <td>${project.id}</td>

                    <td>${project.client}</td>

                    <td>${team}</td>

                </tr>

            `;

        }

    });

}


/* =========================
   DASHBOARD
========================= */

function updateDashboard() {

    document.getElementById("totalInventory").innerText =
        inventory.length;


    document.getElementById("availableInventory").innerText =

        inventory.filter(function(item) {

            return item.status === "Available";

        }).length;


    document.getElementById("totalProjects").innerText =
        projects.length;


    document.getElementById("completedProjects").innerText =

        projects.filter(function(project) {

            return project.status === "Completed";

        }).length;

}


/* =========================
   UPDATE SYSTEM
========================= */

function updateEverything() {

    displayInventory();

    displayTeams();

    displayProjects();

    displayAllocations();

    displayReports();

    updateDashboard();

}


/* =========================
   SAMPLE DATA
========================= */

/* Teams */
if (teams.length === 0) {
teams.push({

    name: "Team A",

    lead: "Thabo Mokoena"

});


teams.push({

    name: "Team B",

    lead: "Lerato Molefe"

});
}

/* Inventory */
if (inventory.length === 0) {
inventory.push({

    type: "Battery",

    manufacturer: "SolarMax",

    model: "Lithium Pro",

    serial: "BAT-001",

    value: 50000,

    status: "Available"

});


inventory.push({

    type: "Inverter",

    manufacturer: "SolaX",

    model: "Hybrid 10kW",

    serial: "INV-001",

    value: 32000,

    status: "Available"

});


inventory.push({

    type: "Solar Panel",

    manufacturer: "JA Solar",

    model: "450W Mono",

    serial: "PAN-001",

    value: 4500,

    status: "Available"

});
}

/* Start system */

function updateEverything() {

    saveData();

    displayInventory();
    displayTeams();
    displayProjects();
    displayAllocations();
    displayReports();
    updateDashboard();

}
updateEverything();

const username = "admin";
const password = "admin123";


document.getElementById("loginForm").addEventListener("submit", function(event) {

    event.preventDefault();

    let enteredUsername =
        document.getElementById("username").value.trim();

    let enteredPassword =
        document.getElementById("password").value;

    let message =
        document.getElementById("loginMessage");


    if (
        enteredUsername === username &&
        enteredPassword === password
    ) {

        localStorage.setItem("loggedIn", "true");

        localStorage.setItem(
            "currentUser",
            enteredUsername
        );

        window.location.href = "Dashboard.html";

    } else {

        message.innerText =
            "Incorrect username or password.";

        message.style.color = "#d62828";

    }

});
