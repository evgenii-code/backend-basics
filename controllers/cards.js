const Card = require('../models/card');
const { defineError } = require('../utils/utils');
const ForbiddenError = require('../errors/forbidden-err');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((card) => res.send({ data: card }))
    .catch((err) => defineError(err, next));
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const { _id: owner } = req.user;

  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch((err) => defineError(err, next));
};

module.exports.deleteCard = (req, res, next) => {
  const { cardId } = req.params;

  Card.findOne({
    _id: cardId,
  })
    .orFail()
    .populate(['owner', 'likes'])
    .then((card) => {
      if (card.owner._id.toString() !== req.user._id) return next(new ForbiddenError('Недостаточно прав'));

      return card.deleteOne()
        .then((data) => {
          res.send({ data });
        })
        .catch((err) => defineError(err, next));
    })
    .catch((err) => defineError(err, next));
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .populate('likes')
    .then((card) => res.send({ data: card }))
    .catch((err) => defineError(err, next));
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .populate('likes')
    .then((card) => res.send({ data: card }))
    .catch((err) => defineError(err, next));
};
