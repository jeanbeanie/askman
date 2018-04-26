/* src/components/HelmetContainer.jsx */
/* @flow */

import * as React from 'react';
import { Helmet } from 'react-helmet';

type Props = {
  metaTitle: string,
  metaDescription: string,
  metaKeywords: string,
  metaAuthor: string,
};

const HelmetContainer = (props: Props) => (
  <Helmet>
    <title>{props.metaTitle}</title>
    <meta charSet="utf-8" />
    <meta name="description" content={props.metaDescription} />
    <meta name="keywords" content={props.metaKeywords} />
    <meta name="author" content={props.metaAuthor} />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossOrigin="anonymous" />
    <link rel="stylesheet" href="css/styles.css" />
  </Helmet>
);

export default HelmetContainer;
