/**
 * main imports
 */
const express = require('express');
const logger = require('morgan')('[EXPRESS] :method :url :status :response-time ms - :res[content-length]');
const compression = require('compression')();
const path = require('path');
const api = require('./src/server/routes');
// const logger = require('./src/server/logger')('express');

/**
 * app vars
 */
const app = express();
const pub = path.join(__dirname, 'public');
const index = path.join(pub, 'index.html');

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
