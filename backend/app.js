const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const cardsRoute = require('./routes/cards');
const userRoute = require('./routes/users');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/aroundb', {
  useNewUrlParser: true,
});

app.use((req, res, next) => {
  req.user = {
    _id: '631c9f906d065148a1f59786', // paste the _id of the test user created in the previous step
  };

  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/users', userRoute);
app.use('/cards', cardsRoute);

app.use('*', (req, res) => {
  res.status(404).send({ message: 'Requested resource not found' });
});

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
