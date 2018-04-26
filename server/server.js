/* server/server.js */
/* @flow */

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Helmet } from 'react-helmet';
import express from 'express';
import { StaticRouter as Router } from 'react-router';
import { matchPath } from 'react-router-dom';

import Html from '../src/components/Html';
import App from '../src/components/App';
import routes from '../src/routes';


const app = express();

// Serve static files from directory './client'
app.use(express.static('client'));

app.get('*', (req, res) => {
  const promises = [];
  const context = {};

  // use 'some' method to imitate <Switch> behavior of selecting only
  // the first route to match
  routes.some((route) => {
    const match = matchPath(req.url, route);
    if (match) {
      promises.push(route.loadInitialData());
    }
    return match;
  });

  if (context.url) {
    // context.status was added if our custom Redirect or Status route component renders
    // redirect(context.status, context.url);

  } else {
    Promise.all(promises).then((data) => {
      // route specific initial data is either returned from promise or empty
      // TODO throw err on empty data!!
      const routeData = data[0] || [];

      // get the head data for use in your prerender.
      // Because this component keeps track of mounted instances,
      // you have to make sure to call renderStatic on server,
      // or you'll get a memory leak.
      const helmet = Helmet.renderStatic();

      // markup to be rendered by server with StaticRouter
      const markup = ReactDOMServer.renderToNodeStream(
        <Router location={req.url} context={context}>
          <Html helmet={helmet} initialData={routeData}>
            <App {...routeData} />
          </Html>
        </Router>);

      // render the application
      markup.pipe(res);
    });
  }
});

export default app;
