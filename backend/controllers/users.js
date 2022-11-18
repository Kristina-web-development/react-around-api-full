const User = require('../models/user');
const { NOT_FOUND, BAD_REQUEST, errorHandler, UNAUTHORIZED } = require('../utils/constants');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {JWT_SECRET} = require('../utils/config');

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

module.exports.me = (req, res) => {

  User.findById(req.user._id)
  .orFail(() => {
    const error = new Error('User not found');
    error.status = NOT_FOUND;
    throw error;
  })
  .then((user) => res.send({ data: user }))
  .catch((err) => errorHandler(res, err));
}

// the getUser request handler
module.exports.getUser = (req, res) => {
  
  const userToken = jwt.decode(req.headers.authorization.replace('Bearer ',''))
  console.log(userToken)
  User.findById(userToken['_id'])
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
  const {
 name, about, avatar, password, email,
} = req.body;
bcrypt.hash(password, 10).then((hash) => {
  User.create({
    name,
    about,
    avatar,
    password:hash,
    email,
  })
    .then((user) => res.send({ data: user }))
    .catch((err) => errorHandler(res, err));
});
}

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

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .select('+password')
    .orFail(() => {
      const error = new Error('User not found');
      error.status = NOT_FOUND;
      throw error;
    })
    .then((user) => {
      bcrypt
        .compare(password, user.password)
        .then((match) => {
          if (!match) {
            const error = new Error('Incorrect email or password.');
            error.status = UNAUTHORIZED;
            throw error;
          }
          const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
            expiresIn: '7d',
          });
          res.send({ access_token: token });
        })
        .catch((err) => errorHandler(res, err));
    });
};