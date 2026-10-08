function addProject() {

    let client = document.getElementById("client").value.trim();

    if (client === "") {
        alert("Please enter a client name.");
        return;
    }

    let project = {

        id: "P" + (projects.length + 1),

        client: client,

        address:
            document.getElementById("address").value,

        scope:
            document.getElementById("scope").value,

        roof:
            document.getElementById("roof").value,

        notes:
            document.getElementById("notes").value,

        status:
            document.getElementById("projectStatus").value
    };

    projects.push(project);

    // Clear form
    document.getElementById("client").value = "";
    document.getElementById("address").value = "";
    document.getElementById("scope").value = "";
    document.getElementById("notes").value = "";

    // Refresh project list
    displayProjects();
}


// Delete project
function deleteProject(index) {

    projects.splice(index, 1);

    displayProjects();
}


// Display projects
function displayProjects() {

    let list = document.getElementById("projectList");

    list.innerHTML = "";

    projects.forEach(function(project, index) {

        list.innerHTML += `

            <tr>

                <td>${project.id}</td>

                <td>${project.client}</td>

                <td>${project.address}</td>

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


    // Update allocation project dropdown if it exists
    let dropdown =
        document.getElementById("allocationProject");

    if (dropdown) {

        dropdown.innerHTML = "";

        projects.forEach(function(project, index) {

            dropdown.innerHTML += `

                <option value="${index}">
                    ${project.id} - ${project.client}
                </option>

            `;
        });
    }
}


// Load projects when page opens
displayProjects();
