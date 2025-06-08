const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const path = require('path');
const User = require('./models/User');
const bcrypt = require('bcrypt');
const authRoutes = require('./routes/auth');



const app = express();
app.use(express.static('public'))

app.use(express.json());

const port = 8080;
const mongoose = require('mongoose');
app.use(bodyParser.urlencoded({ extended: true }));


// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/authApp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log(' Connected to MongoDB'))
.catch(err => console.error('ongoDB connection error:', err));




// Secret key for JWT
const SECRET_KEY = 'your_jwt_secret_key';

const users = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Serve landing page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', './landingpage/landingpage.html'));
});
app.get('/workout',(req,res)=>{
  res.sendFile(path.join(__dirname, 'public','workout','workout.html'))
})

// Signup route
app.use('/', authRoutes);




// Middleware to verify token
function verifyToken(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1] || '';

  if (!token) return res.status(401).send('Access Denied. No token provided.');

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return res.status(401).send('Invalid Token');

    req.user = decoded;
    next();
  });
}

app.get('/userinfo', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'userinfo', 'userinfo.html'));
});

// Show user info form
app.post('/userinfo', async (req, res) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(401).send('No token');
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const email = decoded.email;
    const { name, age, weight,height } = req.body;

    if (!name || !age || !weight || !height) {
      return res.status(400).send('Missing fields');
    }

    await User.updateOne({ email }, { name, age, weight,height });
    res.redirect('/dashboard');
  } catch (err) {
    console.error(err);
    res.status(400).send('Error saving info.');
  }
});


//  all pages route
app.get('/dashboard', (req, res) => {
   res.sendFile(path.join(__dirname, 'public', 'webpage1', 'webpage1.html'));

  
});
app.get('/about',(req, res)=> {
  res.sendFile(path.join(__dirname,'public','About','About.html'));
});
app.get('/contactUs',(req, res) =>{
  res.sendFile(path.join(__dirname,'public','ContactUs','contactus.html'))
})

app.get('/profile', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'Profile', 'profile.html'));
});
app.get('/ToDoList',(req, res)=>{
  res.sendFile(path.join(__dirname,'public', 'TODOList','todolist.html'));
});



app.get('/api/userinfo', verifyToken, async (req, res) => {
  try {
    const email = req.user.email;
    const user = await User.findOne({ email }, { password: 0, _id: 0, __v: 0 });
    if (!user) return res.status(404).send('User not found');
    res.json(user);
  } catch (err) {
    console.error(err);

    res.status(500).send('Error fetching user info');
  }
});
//to-do-list
// function doPost(e) {
//   var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
//   var task = e.parameter.task;
//   var dueDate = e.parameter.dueDate;

//   sheet.appendRow([task, dueDate, ""]);
  
//   return ContentService.createTextOutput("Success").setMimeType(ContentService.MimeType.TEXT);
// }


app.listen(port, '0.0.0.0', () => {
 console.log(`Server running at http://localhost:${port}`);
});




