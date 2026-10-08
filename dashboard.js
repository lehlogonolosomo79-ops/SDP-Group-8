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
