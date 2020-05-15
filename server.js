const express = require('express');
const colors = require('colors');
const connectDB = require('./config/db');

const app = express();

connectDB();
app.use(express.json({ extended: false }));

app.use('/api/user', require('./routers/user'));
app.use('/api/contacts', require('./routers/contacts'));

const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(`Server started at PORT: ${PORT}`.yellow.bold.underline)
);
