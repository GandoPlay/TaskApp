import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import {
  Button,
  Box,
  Flex,
  Grid,
  MenuList,
  Menu,
  MenuButton,
} from "@chakra-ui/react";
import TaskModal from "../TaskModal/TaskModal";
import { useEffect } from "react";


const roles = ["אבטש", "ניקיון", "לילה", "הנפצה", "מחסן", "שמירה", "אחר"];
const localizer = momentLocalizer(moment);

const events = [
  {
    title: "אבטש",
    allDay: true,
    start: new Date(2022, 8, 6),
    end: new Date(2022, 8, 13),
  },
  {
    title: "ניקיון",
    start: new Date(2022, 8, 14),
    end: new Date(2022, 8, 15),
  },
  {
    title: "תורנות",
    start: new Date(2022, 8, 20),
    end: new Date(2022, 8, 21),
  },
];

function DateTable() {
  const [allEvent, setAllEvent] = useState(events);
  const [massage, setMassage] = useState("");
  const [time, setTime] = useState();
  const [range, setRange] = useState();

  //  const { isOpen, onOpen, onClose } = useDisclosure();



  const eventChangh = (event) => {
    setMassage(event.target.value);
    console.log({ massage });
    console.log(time);
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
        <Grid justifyContent="space-around">
          <Menu>
            <MenuButton as={Button}>בחר תורנות</MenuButton>
            <MenuList zIndex={10}>
              {roles.map((role, index) => (
                // <MenuItem key={index}  onClick={onOpen} bg="red">
                <TaskModal key={index} type={role} array={events}  />
                // </MenuItem>
              ))}
            </MenuList>
          </Menu>
        </Grid>
      </Flex>
    </Box>
  );
}

export default DateTable;
