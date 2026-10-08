function addTeam() {

    let name = document.getElementById("teamName").value.trim();
    let lead = document.getElementById("leadTech").value.trim();

    if (name === "" || lead === "") {
        alert("Please complete the team details.");
        return;
    }

    teams.push({
        name: name,
        lead: lead
    });

    saveData();

    document.getElementById("teamName").value = "";
    document.getElementById("leadTech").value = "";

    displayTeams();
}


/* Delete team */

function deleteTeam(index) {

    teams.splice(index, 1);

    saveData();

    displayTeams();
}


/* Display teams */

function displayTeams() {

    let list = document.getElementById("teamList");

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
}


/* Start */

displayTeams();
