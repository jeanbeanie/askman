/* src/components/HomeContainer.jsx */
/* @flow */

import React from 'react';


class HomeContainer extends React.Component <{}> {
  constructor(props: {}) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.loadInitialData();
  }

  loadInitialData() {
    const promises = [];
    promises.push(this.props.loadInitialData())
    Promise.all(promises).then((data) => {
      this.setState(data[0]);
    }).catch(err => console.log('Error loading data in HomeContainer', err));
  }

  render() {
    const { title } = this.state || this.props;
    return (
      <div className="text-center">
        <h1>{title}</h1>
        <img id="homeImage" src="img/sprout.png" alt="MERN starter seed app" />
      </div>
    );
  }
}
export default HomeContainer;
