const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { validateLink } = require('../utils/constants');

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  unlikeCard,
} = require('../controllers/cards');

router.get('/', getCards);
router.delete('/:cardId', celebrate({
  params: Joi.object()
    .keys({
      cardId: Joi.string().hex().length(24),
    })
    .unknown(true),
}), deleteCard);

router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().custom(validateLink),
  }),
}), createCard);
router.put('/likes/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24).required(),
  }),
}), likeCard);
router.delete('/likes/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24).required(),
  }),
}), unlikeCard);

module.exports = router;
