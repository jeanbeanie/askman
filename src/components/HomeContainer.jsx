/* src/components/HomeContainer.jsx */
/* @flow */

import React from 'react';


class HomeContainer extends React.Component <{}, {}> {
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

  handleSubmit = (event) => {
    alert('Form submitted');
    event.preventDefault();
  }

  render() {
    const { title } = this.state || this.props;
    return (
      <div className="text-center">
        <h1>{title}</h1>
        <form onSubmit={this.handleSubmit}>
          <label>
            Task
            <input className="form-control" type="text" defaultValue="take out the trash" />
          </label>
          <br />
          <label>
            Due Date
            <input className="form-control" type="date" />
          </label>
          <br />
          <label>
            Phone Number (10 Digit)
            <input className="form-control" defaultValue="15555555555" type="tel" size="10"/>
          </label>
          <br />
          <input type="submit" value="Submit Ask" />
        </form>
      </div>
    );
  }
}
export default HomeContainer;
