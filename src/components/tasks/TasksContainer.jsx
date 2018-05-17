/* src/components/tasks/TasksContainer.jsx */
/* @flow */

import React from 'react';

type Props = {
  loadInitialData: ()=>{},
};

type State = {
  tasks: [
    {
      smsBody: string,
      smsNumber: string,
    }
  ],
};

const exampleTasks = [
  {
    smsBody: 'Here is the first text message body!',
    smsNumber: '16666666666',
  },
  {
    smsBody: 'Here is some other text message body!',
    smsNumber: '16666666666',
  },
  {
    smsBody: 'Here is the final text message body!',
    smsNumber: '16666666666',
  },
]

class TasksContainer extends React.Component <Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      tasks: exampleTasks,
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

  render() {
    const tasks = this.state.tasks.map((task, i) => (
      <tr key={task.smsBody}>
        <th>{i+1}</th>
        <td>{task.smsBody}</td>
        <td>{task.smsNumber}</td>
        <td>SMTWTFS</td>
        <td>+Edit</td>
        <td>-Delete</td>
      </tr>
    ));

    return (
      <div className="text-center">
        <table className="table table-dark">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Task</th>
              <th scope="col">Number</th>
              <th scope="col">Due Time</th>
              <th scope="col" />
              <th scope="col" />
            </tr>
          </thead>
          <tbody>
            {tasks}
          </tbody>
        </table>
      </div>
    );
  }
}

export default TasksContainer;
