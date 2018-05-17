/* src/components/tasks/TaskContainer.jsx */
/* @flow */

import React from 'react';

import RandomText from './RandomText';
import TaskForm from './TaskForm';
import DatePicker from './DatePicker';

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

class TaskContainer extends React.Component <Props, State> {
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

export default TaskContainer;
