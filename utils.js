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

module.exports = {
  isJsonString,
  rootPath,
  linkValidator,
};
