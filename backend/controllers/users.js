const User = require('../models/user');
const { NOT_FOUND, BAD_REQUEST, errorHandler } = require('../utils/constants');
// all users
module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      if (users === null) {
        res.status(NOT_FOUND).send({ message: 'No users found' });
      }
      res.send({ data: users });
    })
    .catch((err) => errorHandler(res, err));
};

// the getUser request handler
module.exports.getUser = (req, res) => {
  User.findById(req.params.id)
    .orFail(() => {
      const error = new Error('User not found');
      error.status = NOT_FOUND;
      throw error;
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => errorHandler(res, err));
};

// the createUser request handler
module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => errorHandler(res, err));
};

module.exports.updateProfile = (req, res) => {
  const { name, about } = req.body;

  if (!name || !about) {
    res.status(BAD_REQUEST).send({ message: 'Missing required parameter' });
  }

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .orFail(() => {
      const error = new Error('User not found');
      error.status = NOT_FOUND;
      throw error;
    })
    .then((user) => res.status(200).send({ user }))
    .catch((err) => errorHandler(res, err));
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;

  if (!avatar) {
    res.status(BAD_REQUEST).send({ message: 'Check avatar link' });
  }

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .orFail(() => {
      const error = new Error('User not found');
      error.status = NOT_FOUND;
      throw error;
    })
    .then((user) => res.status(200).send({ user }))
    .catch((err) => errorHandler(res, err));
};
