const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../models/User');

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) res.status(400).json({ msg: 'User Already Exist!' });
    else {
      user = new User({ name, email, password });
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
      await user.save();
      sendUserToken(res, user._id);
    }
  } catch (err) {
    sendServerError(res, err);
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ msg: 'Invalid Credenitals!' });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ msg: 'Invalid Credentials!' });
      return;
    }

    sendUserToken(res, user._id);
  } catch (err) {
    sendServerError(res, err);
  }
};

const sendUserToken = (res, id) => {
  const payload = {
    user: {
      id,
    },
  };

  jwt.sign(
    payload,
    config.jwtSecret,
    { expiresIn: config.tokenExpiration },
    (err, token) => {
      if (err) throw err;
      else res.json({ token });
    }
  );
};

const sendServerError = (res, err) => {
  console.error(err.message);
  res.status(500).send('Server Error!');
};
