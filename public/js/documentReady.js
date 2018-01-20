$(document).ready(() => {
    if (sessionStorage.userID != "null"){
        document.getElementById("signin").innerHTML = "Profile";
        document.getElementById("signin").setAttribute("href","/edit-profile");

        document.getElementById("signup").innerHTML = "Logout";
        document.getElementById("signup").setAttribute("href", "/")
        document.getElementById("signup").classList.add("logoutButton")
    }

    document.getElementsByClassName("logoutButton")[0].addEventListener("click", event => {
        sessionStorage.userID = 'null';
    });    
})


