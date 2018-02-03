
/**
 * Keep the server in it's own file.
 */

// main deps
const http = require('http');
require('local-env-var');

// load our server stuff
const app = require('../app');
const log = require('../src/server/logger')('server');
const socket = require('../src/server/socket');

// default to a given port
const port = process.env.PORT || 5000;

// set express var here as we need to attach to http server
app.set('port', port);

// create server object for socket + express
const server = http.createServer(app);

// start a http server
server.listen(port);

// start the socket server
socket.init(server);
log('Websocket attached');

// inform us of the running server
/* eslint-disable */
server.on("listening", () => log(`running on port http://localhost:${port}`));

// when we crash, make it easier to read
// process.on('unhandledRejection', (reason, p) => {
//   console.log('Unhandled Rejection at:', p, 'reason:', reason);
//   // application specific logging, throwing an error, or other logic here
// });
