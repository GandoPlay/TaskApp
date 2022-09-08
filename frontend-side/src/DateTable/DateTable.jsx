import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState, useEffect, useRef } from "react";
import DatePicker from "react-datepicker";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { Input, Button, Select, Box, Flex, border } from "@chakra-ui/react";
import format from "date-fns/format";
import { DateRange } from "react-date-range";
import { addDays } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
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
  const [calender, setCalender] = useState("");
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);
  const [open, setOpen] = useState(false);
  const refOne = useRef(null);
  useEffect(() => {
    document.addEventListener("keydown", hideOnEscape, true);
    document.addEventListener("click", hideOnClickOutside, true);
  }, []);
  const AddEvent = () => {
    setAllEvent([...allEvent, newEvent]);
  };

  const hideOnEscape = (e) => {
    console.log(e.key);
    if (e.key === "Escape") {
      setOpen(false);
    }
  };
  const hideOnClickOutside = (e) => {
    // console.log(refOne.current);
    console.log(e.target);
  };
  return (
    <Box>
      <Calendar
        className="calendardate"
        views={["month"]}
        localizer={localizer}
        events={allEvent}
        startAccessor="start"
        endAccessor="end"
        controls={["calendar"]}
        select="range"
        touchUi={true}
        style={{ height: 500, margin: "50px" }}
      />

      <Flex>
        <Input
          placeholder="Add User"
          type="text"
          name="addTitle"
          id="addTitle"
          value={newEvent.title}
          onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
          size="md"
          width={"10%"}
        />

        {/* <DatePicker
          placeholderText="end Date"
          selected={newEvent.end}
          onChange={(end) => setNewEvent({ ...newEvent, end })}
        /> */}
        <Button colorScheme="teal" variant="outline" onClick={AddEvent}>
          Add Event
        </Button>

        <Select placeholder="Select" name="task" width={"10%"}>
          <option value="1">אבט"ש</option>
          <option value="2">שמירה</option>
          <option value="3">מחסן</option>
          <option value="4">אריזת מזון</option>
          <option value="5">הנפצה</option>
          <option value="6">אחר</option>
        </Select>
        {/* <DatePicker
           placeholderText="Start Date"
          selectsRange={true}
          // // Date={new Date().getDate() + 7}
          // selected={newEvent.start}
          // style={{ width: "200px", height: "50px", border: "3px" }}
        
          // onChange={onChange}
          // value={value}

          selected={startDate} onChange={(date ) => setStartDate(date)}
        />
         {console.log(startDate)} */}

        <Input
          width="23%"
          value={`  ${format(range[0].startDate, "MM/dd/yyyy")}to ${format(range[0].endDate,"MM/dd/yyyy")} `}
          readOnly
          className="inputBox"
          onClick={() => setOpen((open) => !open)}
        />

        {open && (
          <DateRange
            onChange={(item) => setRange([item.selection])}
            editableDateInputs={true}
            moveRangeOnFirstSelection={false}
            ranges={range}
            months={1}
            direction="horizontal"
            className="calenderElement"
          />
        )}
      </Flex>
    </Box>
  );
}

export default DateTable;
