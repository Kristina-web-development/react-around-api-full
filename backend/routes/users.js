const router = require('express').Router();
const {
  getUser,
  getUsers,
  updateProfile,
  updateAvatar
} = require('../controllers/users');

// route definitions
router.get('/', getUsers);
router.get('/:id', getUser);
router.get('/me',getUser)
router.patch('/me', updateProfile);
router.patch('/me/avatar', updateAvatar);

module.exports = router;
