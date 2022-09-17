import React, { useState, useEffect } from "react";
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

import { Day, DayPicker } from "react-day-picker";
import { format } from "date-fns";
import 'react-day-picker/dist/style.css';
import { addTask } from "../api/fetchAxios";

const TaskModal = ({ type, events , setEvents}) => {
  const [range, setRange] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [comment, setComment] = useState("");

  // useEffect(() => {

  // },[]);



  function handleAddTask() {
    console.log('add to backend');
      const task = 
      {
        comment: comment,
        startDate: range.from.getTime(),
        endDate: range.to.getTime(),
        type: type
      }
      addTask(task)
      setEvents([...events, task])
      onClose();

      
  }

  const updateComment = (event) => {
    setComment(event.target.value);
  }
  // const AddEvent = () => {
  //   if (message && range.from) {
  //     array.push({
  //       title: `${type} : ${message}`,
  //       start: range.from,
  //       end: range.to,
  //     });
  //     onClose();
  //   }
  // };
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
          mode="range"
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

export default TaskModal;