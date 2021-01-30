import React from "react";
import { useCalendar, shortDayNames } from "react-calendar-hook";
import "../App.css";

export default function Calendar() {
  const {
    items,
    day,
    month,
    year,
    prevMonth,
    nextMonth,
    selectDate
  } = useCalendar();

  return (
    <div className="Calendar">
      <div className="calendar">
        {/* Controls */}
        <div className="controls">
          <div>
            <button onClick={prevMonth}>Prev</button>
            <span>{` ${day.name} ${day.number}. ${month.name} ${year}  `}</span>
            <button onClick={nextMonth}>Next</button>
          </div>
        </div>

        {/* Calendar head with day names */}
        <div className="head">
          {shortDayNames.map(day => (
            <div className="day" key={`head-${day}`}>
              {day}
            </div>
          ))}
        </div>

        {/* Calendar */}
        <div className="body">
          {items.map(day => {
            const activeClass = !day.active ? "inactive" : "";
            const selectedClass = day.selected ? "selected" : "";
            return (
              <div
                className={`day ${activeClass} ${selectedClass}`}
                key={day.fullDate}
                onClick={() => {
                  selectDate(day.fullDate);
                  console.log(day);
                }}
              >
                {day.date}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}