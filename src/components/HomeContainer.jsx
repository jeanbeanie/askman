/* src/components/HomeContainer.jsx */
/* @flow */

import React from 'react';

type State = {
  taskBody: string,
  taskDueTime: string,
  taskIsRepeatable: boolean
};

class HomeContainer extends React.Component <{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      taskBody: 'take out the trash',
      taskDueTime: '12:00',
      taskIsRepeatable: true,
    };
  }

  componentDidMount() {
    this.loadInitialData();
  }

  loadInitialData() {
    const promises = [];
    promises.push(this.props.loadInitialData());
    Promise.all(promises).then((data) => {
      this.setState(data[0]);
    }).catch(err => console.log('Error loading data in HomeContainer', err));
  }

  handleChange = (event) => {
    // grab target element from the passed in event
    const { target } = event;
    // grab the name and changed value from the target element
    const { value, name } = target;
    // set the state property that matches the named element to the updated value
    this.setState({
      [name]: value,
    });
  }

  handleSubmit = (event) => {
    alert(`Task : ${this.state.taskBody} due at ${this.state.taskDueTime} is submitted!`);
    event.preventDefault();
  }

  render() {
    /* TODO map over weekdays array to return mulltiple inputs
    const weekdays = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];

    const WeekdayCheckbox = (
      <label>
        S <input className="form-check-input" type="checkbox" />
      </label>
    );

    const weekdayInputs = (
      weekdays.map((day) =>
        <WeekdayCheckbox />
      )
    )
    */

    const weekdayPicker = (
      <div className="col-sm form-group">
        <label>
          Weekdays
          <div className="col-sm form-check form-check-inline input">

            <label>
              S <input className="form-check-input" type="checkbox" />
            </label>
            <label>
              M <input className="form-check-input" type="checkbox" />
            </label>
            <label>
              T <input className="form-check-input" type="checkbox" />
            </label>
            <label>
              W <input className="form-check-input" type="checkbox" />
            </label>
            <label>
              T <input className="form-check-input" type="checkbox" />
            </label>
            <label>
              F <input className="form-check-input" type="checkbox" />
            </label>
            <label>
              S <input className="form-check-input" type="checkbox" />
            </label>

          </div>
        </label>
      </div>
    );

    const dayPicker = (
      <div className="col-sm form-group">
        <label>
          Due Date
          <input className="form-control" type="date" />
        </label>
      </div>
    );

    const dateOptions = this.state.taskIsRepeatable ? (weekdayPicker) : (dayPicker);

    return (
      <div className="text-center">

        <h1 id="headline"><span className="badge-pill title-badge">AskManager</span></h1>
        <strong id="subheadline">Set It and Forget It Asking Via SMS!</strong>
        <hr />

        <form onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="col-sm form-group">
              <label>
              Task
                <input className="form-control" name="taskBody" defaultValue={this.state.taskBody} onChange={this.handleChange} type="text" />
              </label>
            </div>
            {dateOptions}

            <div className="col-sm form-group">
              <label>
              Due Time
                <input className="form-control" name="taskDueTime" defaultValue={this.state.taskDueTime} onChange={this.handleChange} type="time" />
              </label>
            </div>

          </div>
          <div className="row">

            <div className="col-sm form-group">
              <label>
              Intros
                <input className="form-control" defaultValue="don't forget to, oh yea can you, I need a favor can you " type="text" />
              </label>
            </div>
          </div>
          <div className="row">

            <div className="col-sm form-group">
              <label>
              Endings
                <input className="form-control" defaultValue="thank you, thx so much, thanks, I appreciate it" type="text" />
              </label>
            </div>


          </div>

          <div className="row">
            <div className="col-sm form-group">
              <label>
              Phone Number (10 Digit)
                <input className="form-control" defaultValue="15555555555" type="tel" size="10" />
              </label>
            </div>
            <div className="col-sm form-group">
              <label>
              Names
                <input className="form-control" defaultValue="babe, baby, bae, boo, love" type="text" />
              </label>
            </div>

          </div>
          <input type="submit" className="btn" value="SUBMIT ASK" />
        </form>
      </div>
    );
  }
}
export default HomeContainer;
