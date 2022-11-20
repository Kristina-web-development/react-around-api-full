const validator = require('validator');
const jwt = require("jsonwebtoken")

const NOT_FOUND = 404;
const SERVER_ERROR = 500;
const BAD_REQUEST = 400;
const FORBIDDEN = 403;
const UNAUTHORIZED = 401;
const CONFLICT = 409

class NotFoundError extends Error{
  constructor(message) {
    super(message);
    this.name = "NotFoundError"
    this.statusCode = NOT_FOUND;
  }
}

class ServerError extends Error{
  constructor(message) {
    super(message);
    this.name = "ServerError"
    this.statusCode = SERVER_ERROR;
  }
}

class CastError extends Error{
  constructor(message) {
    super(message);
    this.name = "CastError"
    this.statusCode = BAD_REQUEST;
  }
}

class AuthorizationError extends Error{
  constructor(message) {
    super(message);
    this.name = "AuthorizationError"
    this.statusCode = UNAUTHORIZED;
  }
}

class NotAllowedError extends Error{
  constructor(message) {
    super(message);
    this.name = "NotAllowedError"
    this.statusCode = FORBIDDEN;
  }
}

class AlreadyExistsError extends Error{
  constructor(message) {
    super(message);
    this.name = "AlreadyExistsError"
    this.statusCode = CONFLICT;
  }
}

const ERRORS = {
  NotFoundError,
  ServerError,
  CastError,
  AuthorizationError,
  NotAllowedError,
  AlreadyExistsError
}




const errorHandler = (res, err) => {
  let errName = err.name || '';
  console.log(err)
  // console.log(err.name)
  // if (err.status === NOT_FOUND) {
  //   errName = 'NotFound';
  // }

  // let status = SERVER_ERROR;
  // let message = 'Server error';

  // switch (errName) {
  //   case 'NotFoundError': {
  //     status = NOT_FOUND;
  //     message = err.message || 'Not Found';
  //     break;
  //   }
  //   case 'CastError': {
  //     status = BAD_REQUEST;
  //     message = err.message || 'Check id';
  //     break;
  //   }
  //   case 'ValidationError': {
  //     status = BAD_REQUEST;
  //     message = err.message || 'Check data';
  //     break;
  //   }
  //   case 'AuthorizationError': {
  //     status = UNAUTHORIZED;
  //     message = err.message || 'Incorrect data';
  //     break;
  //   }
  //   case 'NotAllowedError': {
  //     status = FORBIDDEN;
  //     message = err.message || "Not allowed"
  //     break;
  //   }
  //   default:
  //     break;
  // }

  res.status(err.statusCode).send({message:  err['message']});
};

const validateLink = (value, helpers) => (
  validator.isURL(value) ? value : helpers.error('string.uri'));

const getUserIdFromToken = (req) => {
    
    return jwt.decode(req.headers.authorization.replace('Bearer ',''))['_id']
}

module.exports = {
  errorHandler, validateLink, getUserIdFromToken, ERRORS
};