const path = require('path');

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
  defineErrorCode,
  defineErrorMessage,
};
