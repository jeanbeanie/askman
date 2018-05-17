/* src/components/Layout.jsx */
/* @flow */

import * as React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

type Props = {
  children: React.Node,
};

const Layout = (props: Props) => (
  <div className="container" id="layout-container">

    <nav className="navbar justify-content-end">
      <Link to="/" className="nav-link">AskMan</Link>
      <Link to="/add" className="nav-link">+ Add New</Link>
    </nav>

    <div className="jumbotron text-center">
      <h1 id="headline"><span className="badge-pill title-badge">AskManager</span></h1>
      <strong id="subheadline">Set It and Forget It Asking Via SMS!</strong>
      <hr />
      {props.children}
    </div>
  </div>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
