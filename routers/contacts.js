const express = require('express');
const authentication = require('../middleware/authentication');
const { check, validationResult } = require('express-validator');
const controller = require('../controllers/contactsCtrl');

// Creating the router object.
router = express.Router();

// @route   GET api/contacts
// @des     Get all user contacts
// @access  Private
router.get('/', authentication, (req, res) => {
  controller.getAllContacts(req, res);
});

// @route   POST api/contacts
// @des     Add a contact
// @access  Private
const checkPost = [
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'Email is required').isEmail(),
];
router.post('/', [authentication, checkPost], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
  } else {
    controller.addContact(req, res);
  }
});

// @route   PUT api/contacts/:id
// @des     Update a contact
// @access  Private
const checkPut = [check('email', 'Invalid Email Format').optional().isEmail()];
router.put('/:id', [authentication, checkPut], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
  } else if (!isValidID(req.params.id)) {
    res.status(400).json({ msg: 'Invalid ID Format!' });
  } else {
    controller.updateContact(req, res);
  }
});

// @route   DELETE api/contacts/:id
// @des     Delete a contact
// @access  Private
router.delete('/:id', authentication, (req, res) => {
  if (!isValidID(req.params.id)) {
    res.status(400).json({ msg: 'Invalid ID Format!' });
  } else {
    controller.deleteContact(req, res);
  }
});

// Validating the format of the id as mongoose will throw an exception if the format wasn't valid and this will report a server error while it is a clinet error.
const isValidID = (id) => id.match(/^[0-9a-fA-F]{24}$/);

module.exports = router;
