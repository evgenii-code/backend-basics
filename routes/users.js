const router = require('express').Router();
const { celebrate } = require('celebrate');
const { upload } = require('../utils/multer-config');
const optimize = require('../middlewares/optimize');
const {
  findUser,
  editUserSchema,
} = require('../utils/validation-schemes');
const {
  // getUsers,
  getAuthUser,
  findUserById,
  updateProfile,
  updateAvatar,
} = require('../controllers/users');

// router.get('/', getUsers); // get all user
router.get('/', getAuthUser); // get only current authorized user
router.get('/:userId', celebrate(findUser), findUserById);
router.patch('/me', celebrate(editUserSchema), updateProfile);
router.patch('/me/avatar', upload.single('file'), optimize, updateAvatar);

module.exports = router;
