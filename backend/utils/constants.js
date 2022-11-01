const NOT_FOUND = 404;
const SERVER_ERROR = 500;
const BAD_REQUEST = 400;

const errorHandler = (res, err) => {
  let errName = err.name || '';

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
    default:
      break;
  }

  res.status(status).send({ message });
};

module.exports = { NOT_FOUND, BAD_REQUEST, errorHandler };
