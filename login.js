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
