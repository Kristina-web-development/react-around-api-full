const jwt = require('jsonwebtoken');
const {
  SERVER_ERROR, FORBIDDEN, UNAUTHORIZED
 } = require('../utils/constants');
 const { JWT_SECRET } = require('../utils/config');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  try {
    if (req.url.startsWith('/signin') || req.url.startsWith('/signup')) {
      next();
    } else {
      if (!authorization || !authorization.startsWith('Bearer ')) {
            const error = new Error('Authorization Required');
            error.status = UNAUTHORIZED;
            throw error;
      }

      const token = authorization.replace('Bearer ', '');
      let payload;

      try {
        payload = jwt.verify(token, JWT_SECRET);
      } catch (err) {
            const error = new Error('Authorization Required');
            error.status = UNAUTHORIZED;
            throw error;
      }

      req.user = payload; // assigning the payload to the request object

      next(); // sending the request to the next middleware
    }
  } catch (err) {
            const error = new Error('Server error');
            error.status = SERVER_ERROR;
            throw error;
  }
};
