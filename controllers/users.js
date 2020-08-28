const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { defineErrorCode, defineErrorMessage } = require('../utils/utils');

const { NODE_ENV = 'development', JWT_SECRET } = process.env;

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      defineErrorCode(err, res);

      res.send({ message: defineErrorMessage(err, res) });
    });
};

module.exports.createUser = (req, res) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;

  if (!password) return res.status(400).send({ message: 'Не передан пароль' });

  return bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => {
      res.status(201).send({ data: user.toJSON() });
    })
    .catch((err) => {
      defineErrorCode(err, res);

      res.send({ message: defineErrorMessage(err, res) });
    });
};

module.exports.findUserById = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      defineErrorCode(err, res);

      res.send({ message: defineErrorMessage(err, res) });
    });
};

module.exports.updateProfile = (req, res) => {
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
    .catch((err) => {
      defineErrorCode(err, res);

      res.send({ message: defineErrorMessage(err, res) });
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { $set: { avatar } },
    { new: true, runValidators: true },
  )
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      defineErrorCode(err, res);

      res.send({ message: defineErrorMessage(err, res) });
    });
};

module.exports.login = (req, res) => {
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
    .catch((err) => {
      res.status(401).send({ message: err.message });
    });
};
