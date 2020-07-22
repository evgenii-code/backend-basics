const router = require('express').Router();
const path = require('path');
const fs = require('fs');
const { isJsonString, rootPath } = require('../utils');

const filePath = path.join(rootPath, '/data/cards.json');
let cards;

const doesFileExist = (req, res, next) => {
  fs.readFile(filePath, { encoding: 'utf8' }, (err, data) => {
    if (err || !isJsonString(data)) {
      res.status(500).send({ message: err || `Ошибка чтения файла ${filePath}` });
      return;
    }

    cards = JSON.parse(data);
    next();
  });
};

const sendCards = (req, res) => {
  res.send(cards);
};

router.get('/cards', doesFileExist);
router.get('/cards', sendCards);

module.exports = router;
