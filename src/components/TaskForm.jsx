/* src/components/HomeContainer.jsx */
/* @flow */

import React from 'react';

type Props = {
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

const TaskForm = (props: Props) => {
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
  );
};

export default TaskForm;
