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
import {TaskModal,convertTaskElementToEventObject} from "./TaskModal";
import { useTasksData, useRemoveTasksData, addTask, removeTask } from "../api/taskAPI";
import { Role } from "../Constant";
const roles = ["אבטש", "ניקיון", "לילה", "הנפצה", "מחסן", "שמירה"];
const localizer = momentLocalizer(moment);




function DateTable() {
  //Query that recvive all the tasks of the user.
  const tasks  = useTasksData()

  //selectedId represent the id that the user is selecting right now.
  const [selectedId, setSelectedId] = useState('');

  // events represent the tasks that will appear at the user's calendar. 
  const [events, setEvents] = useState([]);

  //Query that will return the id of the task that the user want to delete (also changes the events array.)
  const removeTasks = useRemoveTasksData(selectedId,events,setEvents)


  // until the user get that proper data => this useEffect is responsible for updating the events array.
  useEffect(() => {
    if(!tasks.isLoading&&tasks.data){
      setEvents(convertTasksToEventArray(tasks.data))
    }
  },[tasks.data]);


  //when the user recive from the server an id - that's the id we remove from the events array.
  useEffect(() => {
    
    if(!removeTasks.isLoading&&removeTasks.data){
      setEvents(events.filter(t=> t.id !== removeTasks.data.id));
      setSelectedId('');

    }
  },[removeTasks.data]);

 

  //only when the button is Click we want to refatch.0
  const removeEvent=()=>{
    if(selectedId!==''){
      removeTasks.refetch()
    }
  }

  // this function convert the backend information about the tasks into an event Arary
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
                <TaskModal  key={index} type={role} events = {events} setEvents = {setEvents}  />
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