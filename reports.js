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


