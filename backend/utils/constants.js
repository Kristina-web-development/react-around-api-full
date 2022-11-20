const validator = require('validator');
const jwt = require('jsonwebtoken');

const NOT_FOUND = 404;
const SERVER_ERROR = 500;
const BAD_REQUEST = 400;
const FORBIDDEN = 403;
const UNAUTHORIZED = 401;
const CONFLICT = 409;

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
    this.statusCode = NOT_FOUND;
  }
}

class ServerError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ServerError';
    this.statusCode = SERVER_ERROR;
  }
}

class CastError extends Error {
  constructor(message) {
    super(message);
    this.name = 'CastError';
    this.statusCode = BAD_REQUEST;
  }
}

class AuthorizationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'AuthorizationError';
    this.statusCode = UNAUTHORIZED;
  }
}

class NotAllowedError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotAllowedError';
    this.statusCode = FORBIDDEN;
  }
}

class AlreadyExistsError extends Error {
  constructor(message) {
    super(message);
    this.name = 'AlreadyExistsError';
    this.statusCode = CONFLICT;
  }
}

const ERRORS = {
  NotFoundError,
  ServerError,
  CastError,
  AuthorizationError,
  NotAllowedError,
  AlreadyExistsError,
};

const errorHandler = (res, err) => {
  res.status(err.statusCode).send({ message: err.message });
};

const validateLink = (value, helpers) => (validator.isURL(value) ? value : helpers.error('string.uri'));

const getUserIdFromToken = (req) => jwt.decode(req.headers.authorization.replace('Bearer ', ''))._id;

module.exports = {
  errorHandler,
  validateLink,
  getUserIdFromToken,
  ERRORS,
};
