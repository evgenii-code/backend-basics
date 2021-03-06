const jwt = require('jsonwebtoken');
const AuthError = require('../errors/auth-err');

require('dotenv').config();

const { NODE_ENV = 'development', JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  // const { authorization } = req.headers;

  // if (!authorization || !authorization.startsWith('Bearer ')) {
  //   return next(new AuthError('Необходима авторизация'));
  // }

  // const token = authorization.replace('Bearer ', '');

  if (!req.cookies.jwt) {
    return next(new AuthError('Необходима авторизация'));
  }

  const token = req.cookies.jwt;

  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    return next(new AuthError('Необходима авторизация'));
  }

  req.user = payload;

  return next();
};
