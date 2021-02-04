import React, { useState } from 'react';
import Calendar from 'react-calendar';
// import moment from 'moment';
import 'react-calendar/dist/Calendar.css';

export default function OwnerCalendar(props) {
  console.log(props, "we want this")
  const [value, onChange] = useState([new Date(props.startDate), new Date(props.endDate)]);
  console.log(value,"value<<<");

  // const format
  // const changDate =(e)=>{setDateState(e)}

  return (
    <div>
      <Calendar
        onChange={onChange}
        value={value}
      />
    </div>
  );
}