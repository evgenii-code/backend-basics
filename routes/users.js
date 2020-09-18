const router = require('express').Router();
const { celebrate } = require('celebrate');
const { upload } = require('../utils/multer-config');
const optimize = require('../middlewares/optimize');
const {
  findUser,
  editUserSchema,
  // editAvatarSchema,
} = require('../utils/validation-schemes');
const {
  // getUsers,
  getAuthUser,
  findUserById,
  updateProfile,
  updateAvatarFromFile,
} = require('../controllers/users');

// router.get('/', getUsers); // get all user
router.get('/', getAuthUser); // get only current authorized user
router.get('/:userId', celebrate(findUser), findUserById);
router.patch('/me', celebrate(editUserSchema), updateProfile);
router.patch('/me/avatar', upload.single('file'), optimize, updateAvatarFromFile);

module.exports = router;
