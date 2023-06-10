require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/', require('./app/routes'));

// Start the server
app.listen(PORT, () => {
  console.log('API listening on port', PORT);
});
