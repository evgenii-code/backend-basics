const router = require('express').Router();
const { celebrate } = require('celebrate');
const { createCardScheme, cardIdScheme } = require('../utils/validation-schemes');
const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');
const { authSchema } = require('../utils/validation-schemes');
const auth = require('../middlewares/auth');

router.get('/', getCards);
router.use(celebrate(authSchema), auth);
router.post('/', celebrate(createCardScheme), createCard);
router.delete('/:cardId', celebrate(cardIdScheme), deleteCard);
router.put('/:cardId/likes', celebrate(cardIdScheme), likeCard);
router.delete('/:cardId/likes', celebrate(cardIdScheme), dislikeCard);

module.exports = router;
