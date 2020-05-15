const express = require('express');
const { check, validationResult } = require('express-validator');
const authentication = require('../middleware/authentication');
const { login } = require('../controllers/usersCtrl');
const User = require('../models/User');

const router = express.Router();

// @route   Get api/auth
// @des     Get the logged in user.
// @access  Private
router.get('/', authentication, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/auth
// @des     Authenticate user & get token
// @access  Public
const postValidations = [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists(),
];
router.post('/', postValidations, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) res.status(400).json({ errors: errors.array() });
  else {
    await login(req, res);
  }
});

module.exports = router;
