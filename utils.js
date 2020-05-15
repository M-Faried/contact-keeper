const { validationResult } = require('express-validator');

exports.checkValidationErrors = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return true;
  }
  return false;
};

exports.sendServerError = (res, err) => {
  console.error(err.message);
  res.status(500).json({ msg: 'Server Error!' });
};

// Validating the format of the id as mongoose will throw an exception if the format wasn't valid and this will report a server error while it is a clinet error.
exports.isValidMongoID = (id) => id.match(/^[0-9a-fA-F]{24}$/);
