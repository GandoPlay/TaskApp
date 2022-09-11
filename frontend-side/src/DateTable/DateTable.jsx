import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { Input, Button, Select, Box, Flex, border } from "@chakra-ui/react";

import { DateRange } from "react-date-range";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
// import { addDays } from "date-fns";
// import "react-date-range/dist/styles.css";
// import "react-date-range/dist/theme/default.css";
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
  const [allEvent, setAllEvent] = useState(events);
  // const [calender, setCalender] = useState("");

  const [range, setRange] = useState();

  //   const [open, setOpen] = useState(false);
  //   const refOne = useRef(null);
  //   useEffect(() => {
  //     document.addEventListener("keydown", hideOnEscape, true);
  //     document.addEventListener("click", hideOnClickOutside, true);
  //   }, []);
  const AddEvent = () => {
    // setAllEvent([...allEvent, newEvent]);
  };

  //   const hideOnEscape = (e) => {
  //     console.log(e.key);
  //     if (e.key === "Escape") {
  //       setOpen(false);
  //     }
  //   };
  //   const hideOnClickOutside = (e) => {
  //     // console.log(refOne.current);
  //     // console.log((e.target += 7));
  //   };
  //   const [values, setValues] = useState([
  //     new DateObject().subtract(4, "days"),

  //     // new DateObject().add(11, "days")
  //   ]);

  let footer = <p>Please pick the first day.</p>;
  if (range?.from) {
    if (!range.to) {
      footer = <p>{format(range.from, "PPP")}</p>;
    } else if (range.to) {
      footer = (
        <p>
          {format(range.from, "PPP")}–{format(range.to, "PPP")}
        </p>
      );
    }
  }

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
        <DayPicker
          mode="range"
          min={6}
          max={7}
          selected={range}
          onSelect={setRange}
          footer={footer}
        />
      <Flex>
        <Button colorScheme="teal" variant="outline" onClick={AddEvent}>
          Add Event
        </Button>
        <Select placeholder="Select" name="task" width={"15%"}>
          <option value="1">אבט"ש</option>
          <option value="2">שמירה</option>
          <option value="3">מחסן</option>
          <option value="4">אריזת מזון</option>
          <option value="5">הנפצה</option>
          <option value="6">אחר</option>
        </Select>

        {console.log(range)}

        {/* 
        <DatePicker
       
       placeholderText="date"
       range
      //  value={}
        onChange={(selectedDates)=>{
          console.log({selectedDates});
          if(!selectedDates[1]) return;
          selectedDates[1].day = selectedDates[0].day+7
        }}  

        /> */}
        {/* <DatePicker
  value={values}
  onChange={setValues}
  range
/> */}

        {/* 
        <DatePicker
           placeholderText="Start Date"
          selectsRange={true}
          // // Date={new Date().getDate() + 7}
           selected={newEvent.start}
          // style={{ width: "200px", height: "50px", border: "3px" }}

           onChange={onChange}
          // value={value}
          range
          weekPicker
          // selected={startDate} onChange={(date ) => setStartDate(date)}
        /> */}

        {/* {console.log(startDate)} */}
        {/* 
        <Input
          width="31%"
          //לסדר את הלוח שנה שיקבל רק 7 ימים ולא מלא
          value={`  ${format(range[0].startDate, "MM/dd/yyyy")} 
          to
           ${format(range[0].endDate, `MM/dd/yyyy` )} `}
          readOnly
          className="inputBox"
          onClick={() => setOpen((open) => !open)}
        /> */}

        {/* {console.log(range[0].startDate)}
        {console.log(range[0].endDate)} 

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
        )}  */}
      </Flex>
    </Box>
  );
}

export default DateTable;
