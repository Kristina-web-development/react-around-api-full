require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');
const { celebrate, Joi } = require('celebrate');
const cardsRoute = require('./routes/cards');
const userRoute = require('./routes/users');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const serverErrorHandler = require('./middlewares/servererror');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { validateLink, ERRORS } = require('./utils/constants');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/aroundb', {
  useNewUrlParser: true,
});
app.use('*',cors());
app.use(express.json());
app.use(requestLogger);

app.use('/users', userRoute);
app.use('/cards', cardsRoute);

app.use(helmet());
app.use(auth);
app.use(errorLogger);

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(2).max(30),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom(validateLink),
  }),
}), createUser);

app.use('*', (req,res,next) => {
  next(new ERRORS.NotFoundError('Requested resource not found'));
});

app.use(errors());
app.use(serverErrorHandler);

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
