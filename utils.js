const path = require('path');

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
};
