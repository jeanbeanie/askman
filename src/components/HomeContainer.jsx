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
    return (
      <div className="text-center">
        <h1 id="headline">AskManager</h1>
        <strong id="subheadline">Set It and Forget It Asking Via SMS!</strong>
        <hr />
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
          <input type="submit" className="btn btn-lg" value="Submit Ask" />
        </form>
      </div>
    );
  }
}
export default HomeContainer;
