   const loginBtn = document.getElementById("login-btn");
    const signupBtn = document.getElementById("signup-btn");
    const usernameGroup = document.getElementById("username-group");
    const form = document.getElementById("auth-form");
    const title = document.querySelector(".title");

    loginBtn.addEventListener("click", () => {
      usernameGroup.style.display = "none";
      form.action = "/login";
      title.textContent = "Login";
    });

    signupBtn.addEventListener("click", () => {
        //  namefield.style.maxHeight = '60px';
      usernameGroup.style.display = "block";
      form.action = "/signup";
      title.textContent = "Sign Up";
    });

    // Optional: Set login as default mode on load
    window.onload = () => {
      loginBtn.click();
    };

