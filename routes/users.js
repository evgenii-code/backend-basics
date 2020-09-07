const router = require('express').Router();
const { celebrate } = require('celebrate');
const { findUser, editUserSchema, editAvatarSchema } = require('../utils/validation-schemes');
const {
  getUsers,
  findUserById,
  updateProfile,
  updateAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:userId', celebrate(findUser), findUserById);
router.patch('/me', celebrate(editUserSchema), updateProfile);
router.patch('/me/avatar', celebrate(editAvatarSchema), updateAvatar);

module.exports = router;
