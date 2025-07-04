const { verify } = require("jsonwebtoken");
const verifyToken = require("../middleware/verifyToken");

const token = localStorage.getItem('token');
if(!token) return resizeBy.send("not found");
try{

const resp =  await fetch("api/userinfo",{
   headers:{authorization:"bearer"+token}
})
if(!res.ok){
return res.send("invaild ")
}
data= await resp.json()
document.getElementById('name').textContent="data.name";
}catch(err){
   return res.send("error");
}
function logout(){
   localStorage.removeItem('token');
   window.location.href="/";
}

module.exports= function (req,res,next){
   const token = req.headers[authorization]?.split(' ')[1];
   if(!token) return res.send("");
   try{
       const decoded = JsonWebTokenError.verify(token.secretkey);
       req.user = decoded;
       
}catch{
        
}
}