/* server/index.js */
/* @flow */

import http from 'http';
import app from './server';

const { port } = require('../src/config').app;

const server = http.createServer(app);

let currentApp = app;
server.listen(port);

if (module.hot) {
  module.hot.accept('./server', () => {
    const nextApp = require('./server').default;

    server.removeListener('request', currentApp);
    server.on('request', nextApp);
    currentApp = nextApp;
  });
}

