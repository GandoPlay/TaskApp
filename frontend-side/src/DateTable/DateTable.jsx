import React from "react";
import { Calendar } from "react-big-calendar";

import { calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./DateTable.css";
// import locales from "date-fns";
const locales = {
  "en-US": require("date-fns/locale/en-US"),
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales
});

const events = [
  {
    titel: "neriya",
    allDay: true,
    start: new Date(2022, 8, 6),
    end: new Date(2022, 8, 10),
  },
  {
    titel: "raz",
    start: new Date(2022, 8, 12),
    end: new Date(2022, 8, 15),
  },
  {
    titel: "ben",
    start: new Date(2022, 8, 20),
    end: new Date(2022, 8, 23),
  },
];

function DateTable() {
  return (
    <div className="">
      <div className="date">
      
        <Calendar
          className="calendardate"
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height:500, margin: "50px" }}
        />
      </div>
      <div className="buttons">
        <input type="date" name="time" id="time" />

        <select name="task" id="task">
          <option value="1">אבט"ש</option>
          <option value="2">שמירה</option>
          <option value="3">מחסן</option>
          <option value="4">אריזת מזון</option>
          <option value="5">הנפצה</option>
          <option value="6">אחר</option>
        </select>
      </div>
    </div>
  );
}

export default DateTable;
