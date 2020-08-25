const bcrypt = require('bcryptjs');
const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'На сервере произошла ошибка' }));
};

module.exports.createUser = (req, res) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => res.status(201).send({ data: user }))
    .catch((err) => res.status(400).send({ message: err.message }));
};

module.exports.findUserById = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .orFail(() => new Error('Запрашиваемый ресурс не найден'))
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(404).send({ message: err.message }));
};

module.exports.updateProfile = (req, res) => {
  const { name, about } = req.body;
  const update = { $set: {} };
  const { _id: meId } = req.user;

  if (name !== undefined) update.$set.name = name;
  if (about !== undefined) update.$set.about = about;

  User.findByIdAndUpdate(
    meId,
    update,
    { new: true, runValidators: true },
  )
    .orFail(() => new Error('Запрашиваемый ресурс не найден'))
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(400).send({ message: err.message }));
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  const { _id: meId } = req.user;

  User.findByIdAndUpdate(
    meId,
    { $set: { avatar } },
    { new: true, runValidators: true },
  )
    .orFail(() => new Error('Запрашиваемый ресурс не найден'))
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(400).send({ message: err.message }));
};
