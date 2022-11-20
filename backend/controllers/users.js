const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const {
  ERRORS,
  errorHandler,
  getUserIdFromToken,
} = require('../utils/constants');
const { JWT_SECRET } = require('../utils/config');

// all users
module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      if (users === null) {
        throw new ERRORS.NotFoundError('No users found');
      }
      res.send({ data: users });
    })
    .catch((err) => errorHandler(res, err));
};

module.exports.me = (req, res) => {
  User.findById(req.user._id)
    .orFail(() => {
      throw new ERRORS.NotFoundError('User not found');
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => errorHandler(res, err));
};

// the getUser request handler
module.exports.getUser = (req, res) => {
  User.findById(getUserIdFromToken(req))
    .orFail(() => {
      throw new ERRORS.NotFoundError('User not found');
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => errorHandler(res, err));
};

// the createUser request handler
module.exports.createUser = (req, res) => {
  const {
 name, about, avatar, password, email,
} = req.body;

  User.findOne({ email })
    .then((user) => {
      if (user === null) {
        bcrypt.hash(password, 10).then((hash) => {
          User.create({
            name,
            about,
            avatar,
            password: hash,
            email,
          })
            .then((newUser) => {
              newUser.password = 'Hidden';
              res.send({ data: newUser });
            })
            .catch((err) => errorHandler(res, err));
        });
      } else {
        throw new ERRORS.AlreadyExistsError(
          'User with this email already exists',
        );
      }
    })
    .catch((err) => errorHandler(res, err));
};

module.exports.updateProfile = (req, res) => {
  const { name, about } = req.body;

  if (!name || !about) {
    throw new ERRORS.CastError(
      'Validatoin Error: Missing required parameter [name, about]',
    );
  }

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .orFail(() => {
      throw new ERRORS.NotFoundError('User not found');
    })
    .then((user) => res.status(200).send({ user }))
    .catch((err) => errorHandler(res, err));
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;

  if (!avatar) {
    throw new ERRORS.CastError("Validation error. email can't be empty");
  }

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .orFail(() => {
      throw new ERRORS.NotFoundError('User not found');
    })
    .then((user) => res.status(200).send({ user }))
    .catch((err) => errorHandler(res, err));
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .select('+password')
    .orFail(() => {
      throw new ERRORS.NotFoundError('User not found');
    })
    .then((user) => {
      bcrypt
        .compare(password, user.password)
        .then((match) => {
          if (!match) {
            throw new ERRORS.AuthorizationError('Incorrect email or password.');
          }
          const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
            expiresIn: '7d',
          });
          res.send({ access_token: token });
        })
        .catch((err) => errorHandler(res, err));
    })
    .catch((err) => errorHandler(res, err));
};
