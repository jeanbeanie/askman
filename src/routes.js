/* src/components/routes.js */
/* @flow */

import HomeContainer from './components/HomeContainer';
import NotFound from './components/NotFound';
import { metaData } from './config';

const loadInitialData = (props?: {}) =>
  // overwrite default meta data with passed in props
  ({
    ...metaData,
    ...props,
  });

// loadInitialData property is required and must return obj
const routes: Array<{loadInitialData: () => {}}> = [
  {
    path: '/',
    exact: true,
    component: HomeContainer,
    loadInitialData: () => loadInitialData(),
  },
  {
    component: NotFound,
    loadInitialData: () => loadInitialData({ title: '404 Status' }),
  },
];

export default routes;
