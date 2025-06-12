 let signupbtn = document.querySelector(".signupbtn");
let signInbtn = document.querySelector(".signinbtn");
let namefield = document.querySelector(".namefield");
    const form = document.getElementById("auth-form");
let title = document.querySelector(".title");
// let underline = document.querySelector(".underline");

  document.body.style.backgroundColor = 'lightblue';
  console.log("Error shown at:", document.getElementById("error-message"));




signInbtn.addEventListener("click",()=>{
    namefield.style.maxHeight = '0';
    title.innerHTML = "Sign In";
      form.action = "/login";
    signupbtn.classList.add('disable');
    signInbtn.classList.remove('disable');
    // underline.style.transform = 'translateX(35px)';
})
signupbtn.addEventListener("click",()=>{
    namefield.style.maxHeight = '60px';
    title.innerHTML = "Sign Up";
      form.action = "/signup";
    signupbtn.classList.remove('disable');
    signInbtn.classList.add('disable');
    // underline.style.transform = 'translateX(0px)';
})