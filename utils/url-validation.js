const regexWebURL = require('regex-weburl');

module.exports.urlValidation = (value) => {
  if (!regexWebURL.test(value)) {
    throw new Error('URL should be valid');
  }

  return value;
};
