const router = require('express').Router();
const path = require('path');

const users = require(path.join(path.dirname(require.main.filename), '/data/users.json'));

let result;

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

router.get('/users/:_id', doesUserExist);
router.get('/users/:_id', sendUser);
router.get('/users', (req, res) => {
  res.send(users);
});

module.exports = router;
