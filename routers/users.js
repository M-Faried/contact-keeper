const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const { register } = require('../controllers/usersCtrl');

// @route   POST api/users
// @des     Register a user
// @access  Public
const checkPost = [
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check(
    'password',
    'Please enter a password with 6 or more characters'
  ).isLength({ min: 6 }),
];
router.post('/', checkPost, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) res.status(400).json({ errors: errors.array() });
  else {
    register(req, res);
  }
});

module.exports = router;
