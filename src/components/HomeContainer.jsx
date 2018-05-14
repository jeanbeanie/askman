/* src/components/HomeContainer.jsx */
/* @flow */

import React from 'react';

const RandomText = (props) => {
  return (
    <div>
      <h1 id="headline"><span className="badge-pill title-badge">AskManager</span></h1>
      <strong id="subheadline">Set It and Forget It Asking Via SMS!</strong>
      <hr />
      <div className="row">
        {/* Example randomly generated SMS text using form fields */}
        <h6>
          <strong id="subheadline">Example Random Text : </strong> {props.randomText}
        </h6>
        <button className="btn input" onClick={props.generateText}>GENERATE</button>
      </div>
      <hr />
    </div>
  )
}

type DatePickerProps = {
  onChange: ()=> void,
  taskIsRepeatable: boolean,
}

const DatePicker = (props: DatePickerProps) => {
  const weekdayList = ['sun', 'mon', 'tues', 'wed', 'thurs', 'fri', 'sat'];

  // map over weekdayList and return a list of label/inputs for selecting weekdays
  const weekdayInputs = weekdayList.map((day, i) => (
    <label htmlFor={`taskWeekdays['${i}']`} key={`taskWeekdays['${day}']`}>
      {day[0].toUpperCase()} <input className="form-check-input" onChange={props.onChange} name="taskWeekdays" id={i} type="checkbox" />
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
      <label htmlFor="taskDueDate">
        Due Date
        {/* TODO : valid date should be today and future only */}
        <input onChange={props.onChange} name="taskDueDate" className="form-control" id="taskDueDate" type="date" />
      </label>
    </div>
  );

  // if taskIsRepeatable render weekday picker else render single date picker
  return props.taskIsRepeatable ? (weekdayPicker) : (dayPicker);
};

type TaskFormProps = {
  onSubmit: ()=> void,
  onChange: ()=> void,
  datePicker: {},
  taskBody: string,
  taskDueTime: string,
  taskIntros: string,
  taskEndings: string,
  phoneNumber: string,
  recipientNames: string,
}

const TaskForm = (props: TaskFormProps) => {
  return (
    <form onSubmit={props.onSubmit} >

      <div className="row">
        {/* Subject body of task to be submitted */}
        <div className="col-sm form-group">
          <label htmlFor="taskBody">
          Task
            <input className="form-control" id="taskBody" name="taskBody" defaultValue={props.taskBody} onChange={props.onChange} type="text" />
          </label>
        </div>

        {/* Weekly repeatable or single date picker */}
        {props.datePicker}

        {/* Select for time task should be started */}
        <div className="col-sm form-group">
          <label htmlFor="taskDueTime">
          Due Time
            <input className="form-control" id="taskDueTime" name="taskDueTime" defaultValue={props.taskDueTime} onChange={props.onChange} type="time" />
          </label>
        </div>
      </div>

      <div className="row">
        {/* Intros to choose from for task text */}
        <div className="col-sm form-group">
          <label htmlFor="taskIntros">
          Intros
            <input className="form-control" name="taskIntros" id="taskIntros" onChange={props.onChange} defaultValue={props.taskIntros} type="text" />
          </label>
        </div>
      </div>

      <div className="row">
        {/* Endings to choose from for task text */}
        <div className="col-sm form-group">
          <label htmlFor="taskEndings">
          Endings
            <input className="form-control" name="taskEndings" id="taskEndings" onChange={props.onChange} defaultValue={props.taskEndings} type="text" />
          </label>
        </div>
      </div>

      <div className="row">
        {/* Phone number to send task text to */}
        <div className="col-sm form-group">
          <label htmlFor="phoneNumber">
          Phone Number (10 Digit)
            <input className="form-control" name="phoneNumber" id="phoneNumber" defaultValue={props.phoneNumber} onChange={props.onChange} type="tel" size="10" />
          </label>
        </div>

        {/* Names to be chosen from for use in task text */}
        <div className="col-sm form-group">
          <label htmlFor="recipientNames">
          Names
            <input className="form-control" name="recipientNames" id="recipientNames" defaultValue={props.recipientNames} onChange={props.onChange} type="text" />
          </label>
        </div>
      </div>

      {/* FORM SUBMIT */}
      <input type="submit" className="btn" value="SUBMIT ASK" />
    </form>
  )
}

type Props = {
  loadInitialData: ()=>{},
};

type State = {
  taskBody: string,
  taskIntros: string,
  taskEndings: string,
  taskDueDate: string,
  randomText: string,
  taskWeekdays: Array<number>,
  taskDueTime: string,
  phoneNumber: string,
  recipientNames: string,
  taskIsRepeatable: boolean
};

class HomeContainer extends React.Component <Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      taskBody: 'take out the trash',
      taskDueTime: '12:00',
      taskDueDate: '',
      randomText: 'Example random text',
      phoneNumber: '15555555555',
      recipientNames: 'babe, baby, bae, boo, love',
      taskIntros: 'don\'t forget to, oh yea can you, I need a favor can you',
      taskEndings: 'thank you, thx so much, thanks, I appreciate it',
      taskIsRepeatable: true,
      taskWeekdays: Array(7).fill(false),
    };
  }

  componentDidMount() {
    this.loadInitialData();
    this.generateRandomText();
  }

  generateRandomText = (): void => {
    // create func for returning random int based on arr length
    const randInt = x => Math.floor(Math.random() * Math.floor(x));

    // selecting one random word from string of words
    const returnRandomWord = (string) => {
      const wordsArray = string.split(',');
      return wordsArray[randInt(wordsArray.length)];
    };

    // get task from current state
    const { taskBody } = this.state;

    // for strings of comma seperated words, get single rand word
    const intro = returnRandomWord(this.state.taskIntros);
    const ending = returnRandomWord(this.state.taskEndings);
    const name = returnRandomWord(this.state.recipientNames);

    // create a random example text to delight the user
    const randomText = `${intro} ${taskBody}, ${ending} ${name}!`;

    // update state to reflect the newly created random text example
    this.setState({ randomText });
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
    // grab the name from the target element
    const { name } = target;
    // grab targets changed value, or checked status if checkbox
    let value = target.type === 'checkbox' ? target.checked : target.value;

    if (name === 'taskWeekdays') {
      // get a copy of the current weekdays array
      const { taskWeekdays } = this.state;
      // overwrite the value that corresponds to the target weekday
      taskWeekdays[target.id] = value;
      // prepare updated array for upcoming setState
      value = taskWeekdays;
    }

    // set the state property that matches the named element to the updated value
    this.setState({
      [name]: value,
    });
  }

  // display state in console for testing purposes
  handleSubmit = (event) => {
    console.log('State: ', this.state);
    event.preventDefault();
  }

  render() {
    return (
      <div className="text-center">

        <RandomText
          randomText={this.state.randomText}
          generateText={this.generateRandomText}
        />

        <TaskForm
          {...this.state}
          datePicker={
            <DatePicker
              onChange={this.handleChange}
              taskIsRepeatable={this.state.taskIsRepeatable}
            />}
          onSubmit={this.handleSubmit}
          onChange={this.handleChange}
        />

      </div>
    );
  }
}
export default HomeContainer;
