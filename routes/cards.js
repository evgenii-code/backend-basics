const router = require('express').Router();
const { celebrate } = require('celebrate');
const { upload } = require('../utils/multer-config');
const optimize = require('../middlewares/optimize');
const {
  // createCardScheme,
  cardIdScheme,
} = require('../utils/validation-schemes');
const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');
// const { authSchema } = require('../utils/validation-schemes'); // no joi validation for cookie
const auth = require('../middlewares/auth');

router.get('/', getCards);
// router.use(celebrate(authSchema), auth); // no joi validation for cookie
router.use(auth);
// router.post('/', celebrate(createCardScheme), createCard);
router.post('/', upload.single('picture'), optimize, createCard);
router.delete('/:cardId', celebrate(cardIdScheme), deleteCard);
router.put('/:cardId/likes', celebrate(cardIdScheme), likeCard);
router.delete('/:cardId/likes', celebrate(cardIdScheme), dislikeCard);

module.exports = router;
