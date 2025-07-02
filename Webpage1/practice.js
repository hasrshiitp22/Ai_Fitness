const { application } = require("express");

document.getElementById('u').addEventListener("submit",async function(e) {
    e.preventdefault();
    const token = localStorage.getItem('token');
    if(!token) return;
    const k = new FormData(e.target);
    const data = Object.fromEntries(k.entries);
    const response = await fetch('/userinfo',{
        method:'POST',
        headers:{
        'content':'application/json',
        'Authorization':'bearer'+token
        },
        body:JSON.stringify(data)
        });
        window.location.href="/dashboard";
    })

    application.post('/useerinfo',async(req,res)=>{
      if(!token) return res.send('no token');
      try{
        const decoded = Jwjt.verify(token,secretkey);
        
      }
    })