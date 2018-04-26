/* src/components/App.jsx */
/* @flow */

import React from 'react';
import { Route, Switch } from 'react-router-dom';
import routes from '../routes';

import HelmetContainer from './HelmetContainer';
import Layout from './Layout';

class App extends React.Component<{}> {
  renderRoute() {
    return (
      <Switch>
        {
          routes.map((route, i) => {
            const routeProps = { ...route, component: undefined };

            return (
              <Route
                key={i}
                {...routeProps}
                render={() => (
                  <div>
                    <HelmetContainer {...this.props} />
                    <route.component
                      loadInitialData={route.loadInitialData}
                      {...this.props}
                    />
                  </div>
                )}
              />
            );
          })
        }
      </Switch>
    );
  }

  render() {
    return (
      <Layout>
        {this.renderRoute()}
      </Layout>
    );
  }
}

export default App;
