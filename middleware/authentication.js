const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  //Get the token from the header.
  const token = req.header('x-auth-token');

  //Check if the token exists
  if (!token) {
    res.status(401).json({ msg: 'Missing Token. Authorization Denied!' });
    return;
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Invalid Token. Authorization Denied!' });
  }
};
