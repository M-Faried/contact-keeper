require('dotenv').config({ path: './config/config.env' });

const express = require('express');
const morgan = require('morgan');
const path = require('path');
const colors = require('colors');
const connectDB = require('./config/db');

connectDB();

const app = express();
app.use(express.json({ extended: false }));

// Redirecting http calls to https.
app.use((req, res, next) => {
  if (req.headers['x-forwarded-proto'] === 'https') {
    // request was via https, so do no special handling
    return next();
  } else {
    // request was via http, so redirect to https
    const redirUrl = `https://${req.headers.host}${req.url}`;
    return res.redirect(redirUrl);
  }
});

// Adding morgan logger only when we are in the development environment
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

//Adding routers
app.use('/api/user', require('./routers/user'));
app.use('/api/contacts', require('./routers/contacts'));

//Server static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client', 'build')));
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
}

const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(`Server started at PORT: ${PORT}`.yellow.bold.underline)
);
