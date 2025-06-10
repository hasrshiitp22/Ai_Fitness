const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../models/User'); 
const jwt = require('jsonwebtoken');

const SECRET_KEY = 'your_jwt_secret_key';



router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.send('User already exists. <a href="/">Login</a>');
    }


    const hashedPassword = await bcrypt.hash(password, 10);


    const newUser = new User({
      username,
      email,
      password: hashedPassword
    });

    await newUser.save();
  
    // Redirect 
    res.redirect('/userinfo'); 
    
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).send('Signup failed. Try again.');
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.send('Invalid credentials e. <a href="/">Try again</a>');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.send('Invalid credentials p. <a href="/">Try again</a>');
    }

   const token = jwt.sign(
  { id: user._id, email: user.email, username: user.username },
  SECRET_KEY,
  { expiresIn: '1h' }
);


    res.send(`
      <script>
        localStorage.setItem('token', '${token}');
        window.location.href = '/dashboard';
      </script>
    `);
  } catch (err) {
    console.error(err);
    res.status(500).send('Login failed. Try again.');
  }
});

module.exports = router;
