/**
 * main imports
 */
const express = require('express');
const logger = require('morgan')('[EXPRESS] :method :url :status :response-time ms - :res[content-length]');
const compression = require('compression')();
const path = require('path');
const hbs = require('express-handlebars');
const api = require('./src/server/routes');
const bodyParser = require('body-parser');
const cors = require('cors');

/**
 * app vars
 */
const app = express();
const pub = path.join(__dirname, 'public');
const index = path.join(pub, 'index.html');

// Allow the app to read JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// allow students to make requests to this
app.use(cors());

/**
 * express middleware
 */
app.engine('handlebars', hbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use('/api', api);
app.use('/public', express.static(pub));
app.use(compression);
app.use(logger);

// used for react - enables client-side routing
app.get('*', (req, res) => res.sendFile(index));

// export for bin/www
module.exports = app;
