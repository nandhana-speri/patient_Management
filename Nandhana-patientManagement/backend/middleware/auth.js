const jwt = require('jsonwebtoken');
const users = require('../models/login');
const { string } = require('joi');

module.exports = async (req, res, next) => {
  // try {
  if (
    req.originalUrl.startsWith('/auth') ||
    req.originalUrl.startsWith('/contact/post')
  )
    return next();
  const token = req.header('Authorization')
    ? req.header('Authorization').replace('Bearer ', '')
    : null;

  if (token === 'null' || !token) {
    return next();
  }

  const decoded = jwt.verify(token, 'secret_key');

  if (!decoded) {
    return res.json({
      success: false,
      msg: 'Invalid Token',
    });
  }
  if (decoded.exp < Date.now()) {
    return res.json({ success: false, msg: 'Token Expired' });
  }
  console.log(decoded);
  const isUserExists = await users.findOne({ where: { id: decoded.id } });
  if (!isUserExists) {
    return res.json({ success: false, msg: 'Access Denied' });
  }
  let matchvalidity = isUserExists.id.concat(isUserExists.email);

  if (matchvalidity != decoded.validity) {
    return res.json({ success: false, msg: 'Access Denied' });
  }
  req.user = decoded;
  return next();
};
