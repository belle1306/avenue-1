import React, { useState } from 'react';
import Calendar from 'react-calendar';
// import moment from 'moment';
import 'react-calendar/dist/Calendar.css';

export default function OwnerCalendar(props) {
  const [value, onChange] = useState([new Date(props.startDate), new Date(props.endDate)]);

  return (
    <div>
      <Calendar
        onChange={onChange}
        defaultValue={value}
      />
    </div>
  );
}