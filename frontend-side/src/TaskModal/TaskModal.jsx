import React, { useState,useEffect } from "react";
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

import { DayPicker } from "react-day-picker";
import TaskDayPicer from "../TaskDayPicer/TaskDayPicer";


const TaskModal = ({ type, array }) => {
  const [range, setRange] = useState();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [time, setTime] = useState();
  const [massage, setMassage] = useState("");
  const [addTask, setAddTask] = useState(type);

useEffect(()=>{

if(addTask === "אבטש" ){
  console.log("work");
}
},[])

  const eventChangh = (event) => {
    setMassage(event.target.value);
    console.log(event.target.value);
  };
  const AddEvent = () => {
    if (massage || range.from) {
      setTime([range.from].toString());
      console.log(massage);
      console.log([range.from].toString());
      console.log([range.to].toString());
      console.log({ array });
            array.push({
        title: `${type} : ${massage}`,
        start: range.from,
        end: range.to,
      });
      onClose();
    }
  };


  return (
    <>
        <Button onClick={()=>{
          onOpen()
          setAddTask(type)
      {console.log(addTask)}
        }}>{type}</Button>
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <Center>

            <TaskDayPicer range={range} setRange={setRange} setAddTask={setAddTask} />
          
           
          </Center>
          <ModalCloseButton />
          <ModalBody pb={6}></ModalBody>
          <Input
            placeholder="comment"
            type="text"
            id="massage"
            onChange={eventChangh}
            value={massage}
          />
          <Center>{type}</Center>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              variant="outline"
              onClick={AddEvent}
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

export default TaskModal;
