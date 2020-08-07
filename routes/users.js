const router = require('express').Router();
const {
  getUsers, createUser, findUserById, updateProfile, updateAvatar,
} = require('../controllers/users');

router.get('/users', getUsers);
router.post('/users', createUser);
router.get('/users/:userId', findUserById);
router.patch('/users/me', updateProfile);
router.patch('/users/me/avatar', updateAvatar);

module.exports = router;
