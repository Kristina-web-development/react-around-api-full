const router = require("express").Router();
const { celebrate, Joi } = require("celebrate");
const { validateLink } = require("../utils/constants");
const {
  getUser,
  getUsers,
  updateProfile,
  updateAvatar,
} = require("../controllers/users");

// route definitions
router.get("/", getUsers);
router.get(
  "/:id",
  celebrate({
    params: Joi.object().keys({
      id: Joi.string().min(24).max(24).required(),
    }),
  }),
  getUser
);
router.get("/me", getUser);
router.patch(
  "/me",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      about: Joi.string().required().min(2),
    }),
  }),
  updateProfile
);
router.patch(
  "/me/avatar",
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().custom(validateLink),
    }),
  }),
  updateAvatar
);

module.exports = router;
