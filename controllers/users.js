const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { defineError } = require('../utils/utils');
const ValidationError = require('../errors/validation-err');

require('dotenv').config();

const { NODE_ENV = 'development', JWT_SECRET } = process.env;

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((user) => res.send({ data: user }))
    .catch((err) => defineError(err, next));
};

module.exports.createUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;

  if (!password) return next(new ValidationError('Не передан пароль'));

  return bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => res.status(201).send({ data: user }))
    .catch((err) => defineError(err, next));
};

module.exports.findUserById = (req, res, next) => {
  const { userId } = req.params;

  User.findOne({ _id: userId })
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch((err) => defineError(err, next));
};

module.exports.updateProfile = (req, res, next) => {
  const { name, about } = req.body;
  const update = { $set: {} };

  if (name !== undefined) update.$set.name = name;
  if (about !== undefined) update.$set.about = about;

  User.findByIdAndUpdate(
    req.user._id,
    update,
    { new: true, runValidators: true },
  )
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch((err) => defineError(err, next));
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { $set: { avatar } },
    { new: true, runValidators: true },
  )
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch((err) => defineError(err, next));
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );

      res
        .cookie('jwt', token, {
          httpOnly: true,
          sameSite: true,
        })
        .end();
    })
    .catch((err) => defineError(err, next));
};
