const express = require('express');
const colors = require('colors');
const connectDB = require('./config/db');

const app = express();

connectDB();
app.use(express.json({ extended: false }));

app.use('/api/users', require('./routers/users'));
app.use('/api/auth', require('./routers/auth'));
app.use('/api/contacts', require('./routers/contacts'));

const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(`Server started at PORT: ${PORT}`.yellow.bold.underline)
);
