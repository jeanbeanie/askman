/* src/components/Html.jsx */
/* @flow */

import * as React from 'react';
import { app } from '../config';

type Props= {
  children: React.Node,
  initialData: {},
  helmet: {
    title: {
      toComponent: () => React.Node,
    },
    meta: {
      toComponent: () => React.Node,
    },
    link: {
      toComponent: () => React.Node,
    },
  }
};

const Html = (props: Props) => {
  // pull data from props for easier referencing
  const { helmet } = props;
  const data = props.initialData;
  const dataJSON = JSON.stringify(data);

  // check set environmental variable to determine path to bundle file
  const rootUrl = process.env.NODE_ENV === 'production' ? app.rootUrl : app.devRootUrl;

  return (
    <html className="no-js" lang="en">
      <head>
        {helmet.title.toComponent()}
        {helmet.meta.toComponent()}
        {helmet.link.toComponent()}
      </head>
      <body>
        <div id="app">
          {props.children}
        </div>

        <script id="initial-data" type="text/plain" data-json={dataJSON} />
        <script src={`${rootUrl}/client.js`} />

        <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossOrigin="anonymous" />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossOrigin="anonymous" />
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossOrigin="anonymous" />
      </body>
    </html>
  );
};

export default Html;
