/* client/index.js */
/* @flow */

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppContainer } from 'react-hot-loader';
import App from '../src/components/App';
import './css/styles.css';

const initialData = JSON.parse(document.getElementById('initial-data').getAttribute('data-json'));

ReactDOM.hydrate(<AppContainer>
  <Router>
    <App {...initialData} />
  </Router>
</AppContainer>, document.getElementById('app'));

if (module.hot) {
  module.hot.accept('../src/components/App', () => {
    ReactDOM.hydrate(<AppContainer>
      <Router>
        <App {...initialData} />
      </Router>
    </AppContainer>, document.getElementById('app'));
  });
}
