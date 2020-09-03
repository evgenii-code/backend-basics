const router = require('express').Router();
const { celebrate } = require('celebrate');
const { createCardScheme, cardIdScheme } = require('../utils/validation-schemes');
const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

router.get('/', getCards);
router.post('/', celebrate(createCardScheme), createCard);
router.delete('/:cardId', celebrate(cardIdScheme), deleteCard);
router.put('/:cardId/likes', celebrate(cardIdScheme), likeCard);
router.delete('/:cardId/likes', celebrate(cardIdScheme), dislikeCard);

module.exports = router;
