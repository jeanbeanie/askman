/* src/components/RedirectWithStatus.jsx */
/* @flow */

import React from 'react';
import { Route, Redirect } from 'react-router-dom';

type Props = {
  from: string,
  to: string,
  status: {value: number},
};

const RedirectWithStatus = ({ from, to, status }: Props) => (
  <Route render={({ staticContext }) => {
    if (staticContext) {
      staticContext.status = status;
    }
    return <Redirect from={from} to={to} />;
  }}
  />
);

export default RedirectWithStatus;
