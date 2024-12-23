// Here is where we import modules
// We begin by loading Express
const express = require('express');
const morgan = require('morgan');

const app = express();

// MIDDLEWARE
app.use(morgan('dev'));

// ROUTES

app.listen(3000, () => {
  console.log('Listening on port 3000');
});