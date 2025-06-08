  let signupbtn = document.querySelector(".signupbtn");
let signInbtn = document.querySelector(".signinbtn");
let namefield = document.querySelector(".namefield");
const forms = document.getElementById("auth-form");
let titles = document.querySelector(".title");
// let underline = document.querySelector(".underline");

  document.body.style.backgroundColor = 'lightblue';



signInbtn.addEventListener("click",()=>{
    namefield.style.maxHeight = '0';
    titles.innerHTML = "Sign In";
          forms.action = "/login";
    signupbtn.classList.add('disable');
    signInbtn.classList.remove('disable');
    // underline.style.transform = 'translateX(35px)';
})
signupbtn.addEventListener("click",()=>{
    namefield.style.maxHeight = '60px';
    titles.innerHTML = "Sign Up";
      forms.action = "/signup";
    signupbtn.classList.remove('disable');
    signInbtn.classList.add('disable');
    // underline.style.transform = 'translateX(0px)';
})  
   
   
   
   
   
   
   
   
   
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

