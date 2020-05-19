const express = require('express');
const colors = require('colors');
const morgan = require('morgan');
const config = require('config');
const connectDB = require('./config/db');

const app = express();

connectDB();
app.use(express.json({ extended: false }));

// Adding morgan logger only when we are in the development environment
if (config.nodeEnv === 'development') app.use(morgan('dev'));

app.use('/api/user', require('./routers/user'));
app.use('/api/contacts', require('./routers/contacts'));

const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(`Server started at PORT: ${PORT}`.yellow.bold.underline)
);
