const Card = require('../models/card');
const { NOT_FOUND, errorHandler } = require('../utils/constants');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => {
      if (cards === null) {
        res.status(NOT_FOUND).send({ message: 'No cards found' });
      }
      res.send({ data: cards });
    })
    .catch((err) => errorHandler(res, err));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch((err) => errorHandler(res, err));
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .orFail(() => {
      const error = new Error('Card is not found');
      error.status = NOT_FOUND;
      throw error;
    })
    .then(() => res.send({ message: 'Card is deleted' }))
    .catch((err) => errorHandler(res, err));
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true, runValidators: true },
  )
    .orFail(() => {
      const error = new Error('Card not found');
      error.statusCode = NOT_FOUND;
      throw error;
    })
    .then((card) => res.send({ card }))
    .catch((err) => errorHandler(res, err));
};

module.exports.unlikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true, runValidators: true },
  )
    .orFail(() => {
      const error = new Error('Card not found');
      error.statusCode = NOT_FOUND;
      throw error;
    })
    .then((card) => res.send({ card }))
    .catch((err) => errorHandler(res, err));
};
