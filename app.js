/** 
 * main imports
 */
const express = require('express');
const logger = require('morgan')('dev');
const compression = require('compression')();
const path = require('path');
const api = require('./src/server/routes');

/**
 * app vars
 */
const app = express();
const index = path.join(__dirname, 'index.html');
const pub = path.join(__dirname, 'public');


/**
 * express middleware
 */
app.use('/api', api);
app.use('/public', express.static(pub));
app.use(compression);
app.use(logger);


// used for react - enables client-side routing
app.get('*', (req, res) => res.sendFile(index));

// export for bin/www
module.exports = app;