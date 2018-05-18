/* src/components/DatePicker.jsx */
/* @flow */

import React from 'react';

type Props = {
  onChange: ()=> void,
  taskIsRepeatable: boolean,
}

const DatePicker = (props: Props) => {
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
        <input onChange={props.onChange} defaultValue={props.defaultDate} name="taskDueDate" className="form-control" id="taskDueDate" type="date" />
      </label>
    </div>
  );

  // if taskIsRepeatable render weekday picker else render single date picker
  return props.taskIsRepeatable ? (weekdayPicker) : (dayPicker);
};

export default DatePicker;
