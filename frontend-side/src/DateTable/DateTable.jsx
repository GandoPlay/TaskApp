import React from "react";
import "./DateTable.css";
import "react-datepicker/dist/react-datepicker.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState } from "react";
import DatePicker from "react-datepicker";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import start from "moment";

const localizer = momentLocalizer(moment);
const events = [
  {
    title: "neriya",
    allDay: true,
    start: new Date(2022, 8, 6),
    end: new Date(2022, 8, 10),
  },
  {
    title: "raz",
    start: new Date(2022, 8, 12),
    end: new Date(2022, 8, 15),
  },
  {
    title: "ben",
    start: new Date(2022, 8, 20),
    end: new Date(2022, 8, 23),
  },
];

function DateTable() {
  const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
  const [allEvent, setAllEvent] = useState(events);

  const AddEvent = () => {
    setAllEvent([...allEvent, newEvent]);
  };

  return (
    <div className="">
      <div className="date">
        <Calendar
          className="calendardate"
          views={["month"]}
          localizer={localizer}
          events={allEvent}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500, margin: "50px" }}
        />
      </div>
      <div className="buttons">
        <input
          type="text"
          name="addTitle"
          id="addTitle"
          placeholder="Add User"
          value={newEvent.title}
          onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
        />
        <DatePicker
          placeholderText="Start Date"
          style={{ marginRight: "10px" }}
          selected={newEvent.start}
          onChange={(start) => setNewEvent({ ...newEvent, start })}
        />
        <DatePicker
          placeholderText="end Date"
          selected={newEvent.end}
          onChange={(end) => setNewEvent({ ...newEvent, end })}
        />
        <button style={{ marginTop: "10px" }} onClick={AddEvent}>
          {" "}
          Add Event
        </button>
        {/* <select name="task" id="task">
          <option value="1">אבט"ש</option>
          <option value="2">שמירה</option>
          <option value="3">מחסן</option>
          <option value="4">אריזת מזון</option>
          <option value="5">הנפצה</option>
          <option value="6">אחר</option>
        </select> */}
      </div>
    </div>
  );
}

export default DateTable;
