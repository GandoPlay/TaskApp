import React, { useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import Loading from "./animationsCompoments/LoadingComp";
import moment from "moment";
import useStore from "../appStore";
import {
  Button,
  Box,
  Flex,
  Grid,
  MenuList,
  Menu,
  MenuButton,
  Center,
  Text,
  Collapse,
  color,
} from "@chakra-ui/react";
import { TaskModal, convertTaskElementToEventObject } from "./TaskModal";
import {
  useUsersDetails,
  useTasksData,
  useRemoveTasksData,
  addTask,
  removeTask,
  useAdminTasksData,
} from "../api/taskAPI";
import { RoleColors } from "../Constant";
import "moment/locale/he";
import { ErrorModal } from "./ErrorModal";

moment.locale("he");

const roles = ["אבטש", "ניקיון", "לילה", "הנפצה"];
const localizer = momentLocalizer(moment);

function DateTable() {
  const isAdmin = useStore((state) => state.isAdmin);
  //Query that recvive all the tasks of the user.
  const tasks = useTasksData(isAdmin);

  const UsersDetails = useUsersDetails(isAdmin);
  //selectedId represent the id that the user is selecting right now.
  const [selectedId, setSelectedId] = useState("");


  const [selectedOwner,setSelectedOwner] = useState("");
  // events represent the tasks that will   appear at the user's calendar.
  const [events, setEvents] = useState([]);

  
  //Query that will return the id of the task that the user want to delete (also changes the events array.)
  const removeTasks = useRemoveTasksData(selectedId,selectedOwner,isAdmin);

  const Admintasks = useAdminTasksData(isAdmin);
  
  
  // until the user get that proper data => this useEffect is responsible for updating the events array.
  useEffect(() => {
    if (!tasks.isLoading && tasks.data) {
      setEvents(convertTasksToEventArray(tasks.data));
    }

    if(!Admintasks.isLoading && Admintasks.data){
    setEvents(AllUsersToTasksArray(Admintasks.data));
    }
  }, [tasks.data,Admintasks.data]);


    

  function AllUsersToTasksArray(users) {
    const eventsTask = [];
    users.forEach((user) =>
      eventsTask.push(...convertTasksToEventArray(user.tasks, user.username))
    );
    return eventsTask;
  }
  //when the user recive from the server an id - that's the id we remove from the events array.
  useEffect(() => {
    if (!removeTasks.isLoading && removeTasks.data) {
      setEvents(events.filter((t) => t.id !== removeTasks.data.id));
      setSelectedId("");
      setSelectedOwner("");
    }
  }, [removeTasks.data]);

  //only when the button is Click we want to refatch.0
  const removeEvent = () => {
    if (selectedId !== "") {
      removeTasks.refetch();
    }
  };

  // this function convert the backend information about the tasks into an event Arary
  const convertTasksToEventArray = (tasks, username = "") => {
    if (tasks && tasks.length > 0) {
      const eventsTask = [];
      tasks.forEach((element) =>
        eventsTask.push(convertTaskElementToEventObject(element, username))
      );
      return eventsTask;
    } else {
      return [];
    }
  };

  if (isAdmin) {
    if (UsersDetails.isLoading || !UsersDetails.data) {
      return (
        <>
        <Loading></Loading>
        </>

      );
    }
  }
  if (tasks.isLoading || !tasks.data) {
    return (
      <Loading></Loading>
    );
  }

  function handleSelect(event) {
    setSelectedId(event.id);
    setSelectedOwner(event.owner)
  }
  return (
    <>

    <Grid textColor={'black'} bgColor={"seagreen"} h={"100vh"} >
      <Calendar
        className="calendardate"
        views={["month"]}
        localizer={localizer}
        onSelectSlot={() => {
          setSelectedId("");
        }}
        events={events}
        startAccessor="start"
        endAccessor="end"
        selectable
        controls={["calendar"]}
        select="range"
        culture="he"
        showAllEvents={true}
        selected={selectedId}
        onSelectEvent={(event) => handleSelect(event)}
        eventPropGetter={(event) => {
          // const randomColor = Math.floor(Math.random()*16777215).toString(16);
          const backgroundColor = RoleColors[event.type];
          return { style: { backgroundColor } };
        }}
        touchUi={true}  
        style={{ height: 500, margin: "50px" }}
      />
      <Flex justify={"center"} marginBottom={'10%'}>
        <Button  bgColor={"red.400"} onClick={removeEvent}>
          מחק תורנות
        </Button>
        <Menu>
          <MenuButton bgColor={"green.400"} as={Button}>
            בחר תורנות
          </MenuButton>
          <MenuList bgBlendMode={"-moz-initial"} zIndex={10}>
            {roles.map((role, index) => (
              <TaskModal
                key={index}
                type={role}
                events={events}
                setEvents={setEvents}
                UsersDetails={UsersDetails}
              />
            ))}
          </MenuList>
        </Menu>
      </Flex>
      <ErrorModal/>
    </Grid >
    </>
  );
}

export default DateTable;
