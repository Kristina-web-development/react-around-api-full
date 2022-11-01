const router = require('express').Router();
const {
  getUser,
  getUsers,
  createUser,
  updateProfile,
  updateAvatar,
} = require('../controllers/users');

// route definitions
router.get('/', getUsers);
router.get('/:id', getUser);
router.post('/', createUser);
router.patch('/me', updateProfile);
router.patch('/me/avatar', updateAvatar);

module.exports = router;
