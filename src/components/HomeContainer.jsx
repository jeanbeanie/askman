/* src/components/HomeContainer.jsx */
/* @flow */

import React from 'react';

type Props = {
  loadInitialData: ()=>{},
};

type State = {
  taskBody: string,
  taskDueTime: string,
  taskIsRepeatable: boolean
};

class HomeContainer extends React.Component <Props, State> {
  constructor(props: Props) {
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

  // when form is submitted for now display an alert with components state for testing purposes
  handleSubmit = (event) => {
    alert(`Task : ${this.state.taskBody} due at ${this.state.taskDueTime} is submitted!`);
    event.preventDefault();
  }

  render() {
    const weekdayList = ['sun', 'mon', 'tues', 'wed', 'thurs', 'fri', 'sat'];

    // map over weekdayList and return a list of label/inputs for selecting weekdays
    const weekdayInputs = weekdayList.map(day => (
      <label htmlFor={`taskWeekdays['${day}']`} key={`taskWeekdays['${day}']`}>
        {day[0].toUpperCase()} <input className="form-check-input" name={`taskWeekdays['${day}']`} id={`taskWeekdays['${day}']`} type="checkbox" />
      </label>
    ));

    // form element for selecting days of the week using the weekdayInputs
    const weekdayPicker = (
      <div className="col-sm form-group">
        <label htmlFor="weekdayPicker">
          Weekdays
          <div id="weekdayPicker" className="col-sm form-check form-check-inline input">
            {weekdayInputs}
          </div>
        </label>
      </div>
    );

    // select the date task must be completed by using the browser's built in datepicker
    const dayPicker = (
      <div className="col-sm form-group">
        <label htmlFor="dayPicker">
          Due Date
          <input className="form-control" name="dayPicker" id="dayPicker" type="date" />
        </label>
      </div>
    );

    // if taskIsRepeatable render weekday picker else render single date picker
    const dateOptions = this.state.taskIsRepeatable ? (weekdayPicker) : (dayPicker);

    return (
      <div className="text-center">

        <h1 id="headline"><span className="badge-pill title-badge">AskManager</span></h1>
        <strong id="subheadline">Set It and Forget It Asking Via SMS!</strong>
        <hr />

        <form onSubmit={this.handleSubmit}>

          <div className="row">
            {/* Subject body of task to be submitted */}
            <div className="col-sm form-group">
              <label htmlFor="taskBody">
              Task
                <input className="form-control" id="taskBody" name="taskBody" defaultValue={this.state.taskBody} onChange={this.handleChange} type="text" />
              </label>
            </div>

            {/* Weekly repeatable or single date picker */}
            {dateOptions}

            {/* Select for time task should be started */}
            <div className="col-sm form-group">
              <label htmlFor="taskDueTime">
              Due Time
                <input className="form-control" id="taskDueTime" name="taskDueTime" defaultValue={this.state.taskDueTime} onChange={this.handleChange} type="time" />
              </label>
            </div>
          </div>

          <div className="row">
            {/* Intros to choose from for task text */}
            <div className="col-sm form-group">
              <label htmlFor="taskIntros">
              Intros
                <input className="form-control" name="taskIntros" id="taskIntros" defaultValue="don't forget to, oh yea can you, I need a favor can you " type="text" />
              </label>
            </div>
          </div>

          <div className="row">
            {/* Endings to choose from for task text */}
            <div className="col-sm form-group">
              <label htmlFor="taskEndings">
              Endings
                <input className="form-control" name="taskEndings" id="taskEndings" defaultValue="thank you, thx so much, thanks, I appreciate it" type="text" />
              </label>
            </div>
          </div>

          <div className="row">
            {/* Phone number to send task text to */}
            <div className="col-sm form-group">
              <label htmlFor="phoneNumber">
              Phone Number (10 Digit)
                <input className="form-control" name="phoneNumber" id="phoneNumber" defaultValue="15555555555" type="tel" size="10" />
              </label>
            </div>

            {/* Names to be chosen from for use in task text */}
            <div className="col-sm form-group">
              <label htmlFor="recipientNames">
              Names
                <input className="form-control" name="recipientNames" id="recipientNames" defaultValue="babe, baby, bae, boo, love" type="text" />
              </label>
            </div>
          </div>

          {/* FORM SUBMIT*/}
          <input type="submit" className="btn" value="SUBMIT ASK" />
        </form>
      </div>
    );
  }
}
export default HomeContainer;
