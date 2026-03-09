// Loggin in with correct credentials: 
const loginSection = document.getElementById("login-section");
const mainSection = document.getElementById("main-section");
document.getElementById("login-btn")
.addEventListener("click", () => {
    const username = document.getElementById("username");
    const password = document.getElementById("password");
    if(username.value === "admin" && password.value === "admin123"){
        loginSection.classList.add("hidden");
        mainSection.classList.remove("hidden");
    }
    else{
        alert("Wrong username or password");
        username.value = "";
        password.value = "";
    }
});


