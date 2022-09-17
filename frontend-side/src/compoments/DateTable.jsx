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
  Text
} from "@chakra-ui/react";
import TaskModal from "./TaskModal";
import { useTasksData } from "../api/fetchAxios";
import { useEffect } from "react";

const roles = ["אבטש", "ניקיון", "לילה", "הנפצה", "מחסן", "שמירה", "אחר"];
const localizer = momentLocalizer(moment);


// const events = [
//   {
//     title: "אבטש",
//     allDay: true,
//     start: new Date(2022, 8, 6),
//     end: new Date(2022, 8, 13),
//   },
//   {
//     title: "ניקיון",
//     start: new Date(2022, 8, 14),
//     end: new Date(2022, 8, 15),
//   },
//   {
//     title: "תורנות",
//     start: new Date(2022, 8, 20),
//     end: new Date(2022, 8, 21),
//   },
// ];

function convertTaskElementToEventObject(element) {
  return (
  {
    title: `${element.type}: ${element.comment}`,
    allDay: true,
    start: new Date(element.startDate), 
    end: new Date(element.endDate),
  }
  )
}


function DateTable() {
  const tasks  = useTasksData()
  const [events, setEvents] = useState([]);
  useEffect(() => {
    console.log('heyy');
  },[events]);

  const convertTasksToEventArray=(tasks)=>{
    if(tasks.length>0){
    const eventsTask = []
    tasks.forEach(element=>eventsTask.push(convertTaskElementToEventObject(element)))
    return eventsTask;
    }
    else{
      return [];
    }
  }


  if (tasks.isLoading||!tasks.data) {
    return (
      <Text textAlign="center" fontSize="400%" mt="25%">
        Loading
      </Text>
    );
  }




  return (
    <Box>
      <Calendar
        className="calendardate"
        views={["month"]}
        localizer={localizer}
        events={convertTasksToEventArray(tasks.data)}
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
                <TaskModal key={index} type={role} events={events} setEvents = {setEvents}  />
              ))}
            </MenuList>
          </Menu>
        </Grid>
      </Flex>
    </Box>
  );
}

export default DateTable;