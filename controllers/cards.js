const Card = require('../models/card');
const { defineErrorCode, defineErrorMessage } = require('../utils/utils');

module.exports.getCards = (req, res) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      defineErrorCode(err, res);

      res.send({ message: defineErrorMessage(err, res) });
    });
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const { _id: owner } = req.user;

  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      defineErrorCode(err, res);

      res.send({ message: defineErrorMessage(err, res) });
    });
};

module.exports.deleteCard = (req, res) => {
  const { cardId } = req.params;

  Card.findOneAndDelete({ _id: cardId, owner: req.user._id })
    .orFail()
    .populate(['owner', 'likes'])
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      defineErrorCode(err, res);

      res.send({ message: defineErrorMessage(err, res) });
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .populate('likes')
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      defineErrorCode(err, res);

      res.send({ message: defineErrorMessage(err, res) });
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .populate('likes')
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      defineErrorCode(err, res);

      res.send({ message: defineErrorMessage(err, res) });
    });
};
