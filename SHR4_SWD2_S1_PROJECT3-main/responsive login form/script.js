var form=document.getElementById("loginForm");
form.addEventListener("submit", login);
function login(x) {
    x.preventDefault();
    var username=document.getElementById("username").value.trim();
    var password=document.getElementById("password").value.trim();
    var message=document.getElementById("message");
    if (username.length < 3) {
        message.innerHTML = "Username must be at least 3 characters";
    }
    else if (password.length < 6) {
        message.innerHTML = "Password must be at least 6 characters";
    }
    else {
        message.innerHTML = "Login Successful";
        message.style.color = "green";
    }
}