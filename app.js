const express = require('express');
const logger = require('morgan')('dev');
const compression = require('compression')();
const path = require('path');

const app = express();
const index = path.join(__dirname, 'index.html');
const pub = path.join(__dirname, 'public');

app.use('/public', express.static(pub));

app.use(compression);
app.use(logger);


app.get('*', (req, res) => res.sendFile(index));
module.exports = app;