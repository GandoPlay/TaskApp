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
  const [range, setRange] = useState();
  const [comment, setComment] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [newTask, setNewTask] = useState({})
  const Addtasks = useAddTasksData(newTask);


  useEffect(() => {
    
    if(!Addtasks.isLoading&&Addtasks.data){
      setEvents([...events,convertTaskElementToEventObject(Addtasks.data)])
    }
  },[Addtasks.data]);


  function handleAddTask() {
      const task = 
      {
        comment: comment,
        startDate:range.from.getTime(),
        endDate: type===Role.AVTASH?range.to.getTime(): range.from.getTime(),
        type: type
      }
      
      Addtasks.refetch(task)
      onClose();

      
  }

  const updateComment = (event) => {
    setComment(event.target.value);
  }

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
          mode = "range"
          min={type==='אבטש'? 6 :1}
          max={type==='אבטש'? 7 : 1}
          selected={range}
          onSelect={setRange}
          footer={footer}
        />
          </Center>
          <ModalCloseButton />
          <ModalBody pb={6}></ModalBody>
          <Input
            placeholder="אנא הוסף הערה לתורנות"
            type="text"
            id="massage"
            onChange={updateComment}
            value={comment}
          />
          <Center>{type}</Center>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              variant="outline"
              onClick={handleAddTask }
            >
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export  {TaskModal,convertTaskElementToEventObject };