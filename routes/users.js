const router = require('express').Router();
const { celebrate } = require('celebrate');
const { findUser, editUserSchema, editAvatarSchema } = require('../utils/validation-schemes');
const {
  // getUsers,
  getAuthUser,
  findUserById,
  updateProfile,
  updateAvatar,
} = require('../controllers/users');

// router.get('/', getUsers); // get all user
router.get('/', getAuthUser); // ger only current authorized user
router.get('/:userId', celebrate(findUser), findUserById);
router.patch('/me', celebrate(editUserSchema), updateProfile);
router.patch('/me/avatar', celebrate(editAvatarSchema), updateAvatar);

module.exports = router;
