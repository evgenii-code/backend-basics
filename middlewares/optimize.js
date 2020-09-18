const tinify = require('tinify');
const ServiceUnavailable = require('../errors/service-unavailable');
require('dotenv').config();

tinify.key = process.env.TINIFY_KEY;

module.exports = (req, res, next) => {
  const source = tinify.fromFile(req.file.path);

  source.toFile(req.file.path)
    .then(() => next())
    .catch(() => next(new ServiceUnavailable('Ошибка загрузки файла на Tinify')));
};
