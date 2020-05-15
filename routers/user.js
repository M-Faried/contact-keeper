const express = require('express');
const authentication = require('../middleware/authentication');
const { check } = require('express-validator');
const { checkValidationErrors } = require('../utils');
const controller = require('../controllers/userCtrl');

//Creating the router object.
const router = express.Router();

// @route   POST api/user/register
// @des     Register a new user.
// @access  Public
const checkRegisterData = [
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'A valid email is required').isEmail(),
  check(
    'password',
    'Please enter a password with 6 or more characters'
  ).isLength({ min: 6 }),
];
router.post('/register', checkRegisterData, (req, res) => {
  if (checkValidationErrors(req, res)) return;
  controller.register(req, res);
});

// @route   POST api/user/login
// @des     Authenticate user & get token.
// @access  Public
const checkLoginData = [
  check('email', 'Email is required').isEmail(),
  check('password', 'Password is required').exists(),
];
router.post('/login', checkLoginData, (req, res) => {
  if (checkValidationErrors(req, res)) return;
  controller.login(req, res);
});

// @route   Get api/user
// @des     Gets the logged in user.
// @access  Private
router.get('/', authentication, (req, res) => {
  controller.getUser(req, res);
});

module.exports = router;
