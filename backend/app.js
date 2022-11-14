require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');

const { celebrate, Joi } = require('celebrate');
const cardsRoute = require('./routes/cards');
const userRoute = require('./routes/users');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const serverErrorHandler = require('./middlewares/servererror');
const { validateLink } = require('./utils/constants');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { MONGO_DB, PORT } = require('./utils/config');

const app = express();

mongoose.connect(MONGO_DB, {
  useNewUrlParser: true,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger);
app.use(errorLogger);

app.use(cors());
app.options('*', cors());
app.use(helmet());

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

app.use(auth);
app.use('/users', userRoute);
app.use('/cards', cardsRoute);

app.use('*', (req, res) => {
  res.status(404).send({ message: 'Requested resource not found' });
});
app.use(serverErrorHandler);
app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
