const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { sendServerError } = require('../utils');

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    //Validating the email doesn't exist in the db
    let user = await User.findOne({ email });
    if (user) {
      res.status(400).json({ msg: 'User Already Exist!' });
      return;
    }

    //Creating a new user
    user = new User({ name, email, password });

    //Encrypting the password in the database.
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    //Saving the user to the database.
    await user.save();

    //Sending back the user token.
    sendUserToken(res, user._id);
  } catch (err) {
    sendServerError(res, err);
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    //Validating the user email exists
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ msg: 'Invalid Credenitals!' });
      return;
    }

    //Validating that the password match.
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ msg: 'Invalid Credentials!' });
      return;
    }

    //The user is valid, so we send the user token back.
    sendUserToken(res, user._id);
  } catch (err) {
    sendServerError(res, err);
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    sendServerError(res, err);
  }
};

///////////////////////////////////////////// Helper functions

const sendUserToken = (res, id) => {
  const payload = { user: { id } };

  //jwt.sign(payload, jwtSecret, options, callback);
  jwt.sign(
    payload,
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRY },
    (err, token) => {
      if (err) throw err;
      else res.json({ token });
    }
  );
};
