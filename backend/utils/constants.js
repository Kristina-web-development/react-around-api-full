const validator = require('validator');

const NOT_FOUND = 404;
const SERVER_ERROR = 500;
const BAD_REQUEST = 400;
const FORBIDDEN = 403;
const UNAUTHORIZED = 401;

const errorHandler = (res, err) => {
  let errName = err.name || '';
  console.log(err);
  if (err.status === NOT_FOUND) {
    errName = 'NotFound';
  }

  let status = SERVER_ERROR;
  let message = 'Server error';

  switch (errName) {
    case 'NotFound': {
      status = NOT_FOUND;
      message = 'Not Found';
      break;
    }
    case 'CastError': {
      status = BAD_REQUEST;
      message = 'Check id';
      break;
    }
    case 'ValidationError': {
      status = BAD_REQUEST;
      message = 'Check data';
      break;
    }
    case 'AuthorizationError': {
      status = UNAUTHORIZED;
      message = 'Incorrect data';
      break;
    }
    default:
      break;
  }

  res.status(status).send({ message });
};

const validateLink = (value, helpers) => (
  validator.isURL(value) ? value : helpers.error('string.uri'));

module.exports = {
 NOT_FOUND, SERVER_ERROR, FORBIDDEN, BAD_REQUEST, UNAUTHORIZED, errorHandler, validateLink,
};