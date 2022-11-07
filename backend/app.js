const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const cardsRoute = require('./routes/cards');
const userRoute = require('./routes/users');
const {login, createUser} = require('./controllers/users');
const auth = require('./middlewares/auth');

const { requestLogger, errorLogger } = require('./middlewares/logger'); 

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/aroundb', {
  useNewUrlParser: true,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger);
app.use(errorLogger);

app.use(cors());
app.options('*',cors());
app.use(auth);
app.use('/users', userRoute);
app.use('/cards', cardsRoute);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Server will crash now');
  }, 0);
}); 

app.post('/signin', login);
app.post('/signup', createUser); 

app.use('*', (req, res) => {
  res.status(404).send({ message: 'Requested resource not found' });
});

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
