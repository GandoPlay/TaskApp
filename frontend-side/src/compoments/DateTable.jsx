import React, { useEffect } from "react";
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
import { useTasksData, removeTask, addTask } from "../api/taskAPI";
import { Role } from "../Constant";
 
const roles = ["אבטש", "ניקיון", "לילה", "הנפצה", "מחסן", "שמירה"];
const localizer = momentLocalizer(moment);

function convertTaskElementToEventObject(element) {
  const startDate = element.startDate;
  let endDate = element.startDate;
  if(element.type === Role.AVTASH){
    endDate = element.endDate;
  }
  return (
  {
    id: element._id,
    title: `${element.type}: ${element.comment}`,
    allDay: true,
    start: new Date(startDate), 
    end: new Date(endDate),
  }
  )
}


function DateTable() {
  const tasks  = useTasksData()
  const [events, setEvents] = useState([]);
  useEffect(() => {
    
    if(!tasks.isLoading&&tasks.data){
      setEvents(convertTasksToEventArray(tasks.data))
    }
  },[tasks.data]);
  const [selectedId, setSelectedId] = useState('');

 


  const removeEvent=()=>{
    if(selectedId!==''){
    const response = removeTask({id:selectedId})
    console.log(response);
    if(response.data){
      setEvents(events.filter(t=> t.id !== response.data));

    }
  }
}
  const convertTasksToEventArray=(tasks)=>{
    console.log(tasks);
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
    <Box  bgColor={"teal.300"}>
      
      <Calendar
        
        className="calendardate"
        views={["month"]}
        
        localizer={localizer}
        events={ events}
        startAccessor="start"
        endAccessor="end"
        
        controls={["calendar"]}
         select="range"
         onSelectEvent = {event => setSelectedId(event.id)}
         touchUi={true}
        style={{ height: 500, margin: "50px" }}
      />

      <Flex bgColor={'blue.500'}>
        <Grid  justifyContent="space-between">
          <Flex >
          <Button bgColor={'red.400'}  onClick={removeEvent}>מחק תורנות</Button>
          <Menu>

            <MenuButton  bgColor={'green.400'} as={Button}>בחר תורנות</MenuButton>
            <MenuList bgBlendMode={"-moz-initial"} zIndex={10}>
              {roles.map((role, index) => (
                <TaskModal  key={index} type={role}  />
              ))}
            </MenuList>
          </Menu>
          </Flex>
        </Grid>
      </Flex>
      
    </Box>
  );
}

export default DateTable;