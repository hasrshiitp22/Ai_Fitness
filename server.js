const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const path = require('path');
const getIndianDietPlan = require('./public/userinfo/meal');
const User = require('./models/User');
const bcrypt = require('bcrypt');
require('dotenv').config();
const authRoutes = require('./routes/auth');
const verifyToken = require('./middleware/verifyToken');
const connectDB = require('./config/db');

const SECRET_KEY = 'your_jwt_secret_key';

const app = express();
const port = 8080 || 3000;

// Middleware
connectDB();
app.use(express.static('public'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Auth Routes
app.use('/', authRoutes);

// Landing Page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'landingpage', 'landingpage.html'));
});

// Workout & Diet HTML
app.get('/workout', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'workout', 'workout.html'));
});

app.get('/diet', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'userinfo', 'meal.html'));
});

// Diet API
app.get('/api/diet', async (req, res) => {
  const dietPlan = await getIndianDietPlan();
  res.send(dietPlan);
});

// Serve user info form
app.get('/userinfo', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'userinfo', 'userinfo.html'));
});

// Save user profile data
app.post('/userinfo', async (req, res) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).send('No token');

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const email = decoded.email;
    const { name, age, weight, height } = req.body;

    if (!name || !age || !weight || !height) {
      return res.status(400).send('Missing fields');
    }

    await User.updateOne({ email }, { name, age, weight, height });
    res.redirect('/dashboard');
  } catch (err) {
    console.error(err);
    res.status(400).send('Error saving info.');
  }
});

// Profile data API (called by profile.html)
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

// Page routes
app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'webpage1', 'webpage1.html'));
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'About', 'About.html'));
});

app.get('/contactUs', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'ContactUs', 'contactus.html'));
});

app.get('/profile', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'Profile', 'profile.html'));
});

app.get('/ToDoList', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'TODOList', 'todolist.html'));
});

// Diet PDF download routes
app.get('/1500_2000_calorie_meal_plan', (req, res) => {
  res.download(path.join(__dirname, 'public', 'userinfo', '1500_2000_calorie_meal_plan.pdf'), 'LEVEL_UP_DIET(1500kcal).pdf');
});
app.get('/2000_2500_calorie_meal_plan', (req, res) => {
  res.download(path.join(__dirname, 'public', 'userinfo', '2000_2500_calorie_meal_plan.pdf'), 'LEVEL_UP_DIET(2000kcal).pdf');
});
app.get('/2500_3000_calorie_meal_plan', (req, res) => {
  res.download(path.join(__dirname, 'public', 'userinfo', '2500_3000_calorie_meal_plan.pdf'), 'LEVEL_UP_DIET(2500kcal).pdf');
});
app.get('/3000_plus_calorie_meal_plan', (req, res) => {
  res.download(path.join(__dirname, 'public', 'userinfo', '3000_plus_calorie_meal_plan.pdf'), 'LEVEL_UP_DIET(3000kcal).pdf');
});

// Start server
app.listen(port, '0.0.0.0', () => {
  console.log(`Server running at http://localhost:${port}`);
});
