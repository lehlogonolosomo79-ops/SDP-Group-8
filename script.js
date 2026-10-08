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


