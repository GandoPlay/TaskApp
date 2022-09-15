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

import { DayPicker } from "react-day-picker";
import { format } from "date-fns";

const TaskModal = ({ type, array }) => {
  const [range, setRange] = useState();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [massage, setMassage] = useState("");
  const [addTask, setAddTask] = useState(type);

  useEffect(() => {
    if (addTask === "אבטש") {
      console.log("work");
    }
  }, []);

  const eventChangh = (event) => {
    setMassage(event.target.value);
    console.log(event.target.value);
  };
  const AddEvent = () => {
    if (massage && range.from) {
      array.push({
        title: `${type} : ${massage}`,
        start: range.from,
        end: range.to,
      });
      onClose();
    }
  };
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
          setAddTask(type);
          {
            console.log(addTask);
          }
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
          min={1}
          max={type==='אבטש'? 7 : 1}
          selected={range}
          onSelect={setRange}
          footer={footer}
        />
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
