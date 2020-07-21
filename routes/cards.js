const router = require('express').Router();
const path = require('path');

const cards = require(path.join(path.dirname(require.main.filename), '/data/cards.json'));

const sendCards = (req, res) => {
  res.send(cards);
};

router.get('/cards', sendCards);

module.exports = router;
