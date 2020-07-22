const router = require('express').Router();
const path = require('path');
const fs = require('fs');
const { isJsonString, rootPath } = require('../utils');

const filePath = path.join(rootPath, '/data/users.json');
let result;
let users;

const doesFileExist = (req, res, next) => {
  fs.readFile(filePath, { encoding: 'utf8' }, (err, data) => {
    if (err || !isJsonString(data)) {
      res.status(500).send({ message: err || `Ошибка чтения файла ${filePath}` });
      return;
    }

    users = JSON.parse(data);
    next();
  });
};

const doesUserExist = (req, res, next) => {
  result = users.find((user) => user._id === req.params._id);

  if (!result) {
    res.status(404).send({ message: 'Нет пользователя с таким id' });
    return;
  }

  next();
};

const sendUser = (req, res) => {
  res.send(result);
};

router.get('/users/:_id', doesFileExist);
router.get('/users/:_id', doesUserExist);
router.get('/users/:_id', sendUser);
router.get('/users', doesFileExist);
router.get('/users', (req, res) => {
  res.send(users);
});

module.exports = router;
