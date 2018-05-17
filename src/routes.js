/* src/components/routes.js */
/* @flow */

import TaskContainer from './components/tasks/TaskContainer';
import TasksContainer from './components/tasks/TasksContainer';
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
    component: TasksContainer,
    loadInitialData: () => loadInitialData(),
  },
  {
    path: '/add',
    exact: true,
    component: TaskContainer,
    loadInitialData: () => loadInitialData(),
  },
  {
    component: NotFound,
    loadInitialData: () => loadInitialData({ title: '404 Status' }),
  },
];

export default routes;
