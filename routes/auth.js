const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/User');

const SECRET_KEY = 'your_jwt_secret_key'; 


router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.send('User already exists. <a href="/">Login</a>');

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    const token = jwt.sign({ email: newUser.email }, SECRET_KEY, { expiresIn: '1h' });

    res.send(`
      <script>
        localStorage.setItem('token', '${token}');
        window.location.href = '/userinfo';
      </script>
    `);
  } catch (err) {
    console.error('Signup error:', err);
    res.send('Signup failed. Try again.');
  }
});

// --- Login ---
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.send('Invalid credentials. <a href="/">Try again</a>');

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.send('Invalid credentials. <a href="/">Try again</a>');

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
    console.error('Login error:', err);
    res.send('Login failed. Try again.');
  }
});

module.exports = router;
