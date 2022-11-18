const jwt = require('jsonwebtoken');
const {
  SERVER_ERROR, FORBIDDEN,
 } = require('../utils/constants');
 const { JWT_SECRET } = require('../utils/config');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  try {
    if (req.url.startsWith('/signin') || req.url.startsWith('/signup')) {
      next();
    } else {
      if (!authorization || !authorization.startsWith('Bearer ')) {
        return res
          .status(FORBIDDEN)
          .send({ message: 'Authorization Required' });
      }

      const token = authorization.replace('Bearer ', '');
      let payload;

      try {
        payload = jwt.verify(token, JWT_SECRET);
      } catch (err) {
        return res
          .status(FORBIDDEN)
          .send({ message: 'Authorization Required' });
      }

      req.user = payload; // assigning the payload to the request object

      next(); // sending the request to the next middleware
    }
  } catch (err) {
    return res.status(SERVER_ERROR).send(err);
  }
};
