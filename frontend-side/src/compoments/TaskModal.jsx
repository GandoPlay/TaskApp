import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Center,
  Input,
  Button,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { Day, DayPicker } from "react-day-picker";
import { format } from "date-fns";
import 'react-day-picker/dist/style.css';
import { addTask, useAddTasksData } from "../api/taskAPI";
import { Role } from "../Constant";
import addDays from "date-fns/addDays";
import he from "date-fns/esm/locale/he";
import { useForm } from "react-hook-form";



//Convert a single task from the backend into an item of the Events array.
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


const TaskModal = ({ type, events, setEvents}) => {
  const {handleSubmit,register,control} = useForm();

  //Setting the Range in the dayPicker.
  const [range, setRange] = useState();

  //the task we want to append to events array.
  const [newTask, setNewTask] = useState(undefined)


  const { isOpen, onOpen, onClose } = useDisclosure();

  //Query that will recive information the newTask.
  const Addtasks = useAddTasksData(newTask);

  //whenever the Query recieve new information => update the events 
  useEffect(() => {

    if(!Addtasks.isLoading&&Addtasks.data){
      setEvents([...events,convertTaskElementToEventObject(Addtasks.data)])
      setNewTask(undefined)

    }
  },[Addtasks.data,Addtasks.isLoading]);


  function handleAddTask(values) {
      const task = 
      {
        comment: values.Comment,
        startDate:type===Role.AVTASH?range.from.getTime():range.getTime(),
        endDate: type===Role.AVTASH?range.to.getTime(): range.getTime(),
        type: type
      }
      setNewTask(task)
      onClose();

      
  }

  function generateFooter() {
    let footer = <p>Please pick the first day.</p>;
    if (range?.from) {
      if (!range.to) {
        if(type==='אבטש'){
        range.to = addDays(range.from.getTime(),7)
        }
        footer = <p>{format(range.from, "PPP")}</p>;
      } else if (range.to) {
  
        footer = (
          <p>
            {format(range.from, "PPP")}–{format(range.to, "PPP")}
          </p>
        );
      }
    }
    return footer
    
  }


  
  return (
    <>
    
      <Button
        onClick={() => {
          onOpen();
        }}
      >
        {type}
      </Button>
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <Center>
          <DayPicker
          locale={he}
          
          mode = {type==='אבטש'?"range":"single"}
          min={type==='אבטש'? 7 :1}
          max={type==='אבטש'? 7 : 1}
          selected={range}
          showWeekNumber
          onSelect={setRange}
          footer={generateFooter()}
        />
          </Center>
          <ModalCloseButton />
          <form onSubmit={handleSubmit(handleAddTask)}>
          
          <ModalBody pb={6}></ModalBody>
          <Input
            id = "Comment"
            placeholder="אנא הוסף הערה לתורנות"
            type="text"
            {...register("Comment", {
              required: "This is required"
              
            })}
          />
          <Center>{type}</Center>
          <ModalFooter>
            <Button
            type="submit"
              colorScheme="blue"
              mr={3}
              variant="outline"
              // onClick={handleAddTask }
            >
              Save
            </Button>
            
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export  {TaskModal,convertTaskElementToEventObject };