const path = require('path');
const NotFoundError = require('../errors/not-found-err');
const ValidationError = require('../errors/validation-err');
const ConflictError = require('../errors/conflict-err');

const linkRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;
const linkValidator = {
  validator(v) {
    return linkRegex.test(v);
  },
  message: (props) => `${props.value} is not a valid URL!`,
};

const isJsonString = (str) => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};

const rootPath = path.dirname(require.main.filename);

const defineErrorCode = (err, res) => {
  if (err.name === 'MongoError' && err.code === 11000) return res.status(409);
  if (err.name === 'ValidationError' || err.name === 'CastError') return res.status(400);
  if (err.name === 'DocumentNotFoundError') return res.status(404);

  return res.status(500);
};

const defineError = (err, next) => {
  if (err.name === 'MongoError' && err.code === 11000) next(new ConflictError('Пользователь с таким email уже существует'));
  if (err.name === 'ValidationError') return next(new ValidationError('Ошибка валидации'));
  if (err.name === 'CastError') return next(new ValidationError('Передан неверный id'));
  if (err.name === 'DocumentNotFoundError') return next(new NotFoundError('Запрашиваемый ресурс не найден'));

  return next(err);
};

const defineErrorMessage = (err, res) => {
  switch (res.statusCode) {
    case 404:
      return 'Запрашиваемый ресурс не найден';
    case 401:
      return 'Необходима авторизация';
    case 409:
      return 'Данный email уже используется';
    case 500:
      return 'На сервере произошла ошибка';
    default:
      return err.message;
  }
};

module.exports = {
  isJsonString,
  rootPath,
  linkValidator,
  defineError,
  defineErrorCode,
  defineErrorMessage,
};
