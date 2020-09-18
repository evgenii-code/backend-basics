const tinify = require('tinify');
require('dotenv').config();

tinify.key = process.env.TINIFY_KEY;

module.exports = (req, res, next) => {
  const source = tinify.fromFile(req.file.path);
  source.toFile(req.file.path);

  return next();
};
