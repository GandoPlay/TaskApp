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
import { format } from "date-fns";

import { DayPicker } from "react-day-picker";

const TaskModal = ({ type ,array }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [range, setRange] = useState();
  const [time, setTime] = useState();
  const [massage, setMassage] = useState("");

  const eventChangh = (event) => {
    setMassage(event.target.value);

    console.log({ massage });
    console.log(time);
  };
  const AddEvent = () => {
  
    if (massage || range.from) {
      setTime([range.from].toString());
      console.log(massage);
      console.log([range.from].toString());
      console.log([range.to].toString());
      console.log({array});
    array.push({title:type,start:range.from,end:range.to})
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
      <Button onClick={onOpen}>{type}</Button>
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <Center>
            <DayPicker
              mode="range"
              min={7}
              max={8}
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
