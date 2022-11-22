const jwt = require('jsonwebtoken');
const Card = require('../models/card');
const {
  getUserIdFromToken,
  ERRORS,
} = require('../utils/constants');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => {
      if (cards === null) {
        throw new ERRORS.NotFoundError('No cards Found');
      }
      res.send({ data: cards });
    })
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;

  const owner = getUserIdFromToken(req)

  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {

  
  Card.findOneAndDelete({
    _id: req.params.cardId,
    owner: getUserIdFromToken(req),
  })
    .orFail(() => {
      /** From reviewer comment it is said that i need to return 403 in case
       *  When a user tries to delete card that he doesn't own
       */

      throw new ERRORS.NotAllowedError(
        'Card is not found or you are not the card owner',
      );
    })
    .then(() => res.send({ message: 'Card is deleted' }))
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  const userToken = jwt.decode(
    req.headers.authorization.replace('Bearer ', ''),
  );
  const userId = userToken._id;

  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: userId } },
    { new: true, runValidators: true },
  )
    .orFail(() => {
      throw new ERRORS.NotFoundError('Card not found');
    })
    .then((card) => res.send({ card }))
    .catch(next);
};

module.exports.unlikeCard = (req, res, next) => {
  const userToken = jwt.decode(
    req.headers.authorization.replace('Bearer ', ''),
  );
  const userId = userToken._id;
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: userId } },
    { new: true, runValidators: true },
  )
    .orFail(() => {
      throw new ERRORS.NotFoundError('Card not found');
    })
    .then((card) => res.send({ card }))
    .catch(next);
};
