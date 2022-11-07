const router = require('express').Router();

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  unlikeCard,
} = require('../controllers/cards');

router.get('/', getCards);
router.delete('/:cardId', deleteCard);
router.post('/', createCard);
router.put('/likes/:cardId', likeCard);
router.delete('/likes/:cardId', unlikeCard);

module.exports = router;
