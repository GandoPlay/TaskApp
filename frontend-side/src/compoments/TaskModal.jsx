import React, { useState } from "react";
import useStore from "../appStore";

import {
  Image,
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
  Text,
  MenuButton,
  MenuList,
  MenuItem,
  Menu,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { Day, DayPicker } from "react-day-picker";
import { format } from "date-fns";
import "react-day-picker/dist/style.css";
import { addTask, useAddTasksData } from "../api/taskAPI";
import { Role } from "../Constant";
import addDays from "date-fns/addDays";
import he from "date-fns/esm/locale/he";
import { useForm } from "react-hook-form";

function getKeyByValue(object, value) {
  return Object.keys(object).find((key) => object[key] === value);
}

//Convert a single task from the backend into an item of the Events array.
function convertTaskElementToEventObject(element, username = "") {
  const startDate = element.startDate;
  let endDate = element.startDate;
  let type = undefined;
  if (element.type === Role.AVTASH) {
    endDate = element.endDate;
  }
  // if (username) {
  //   <Text fontSize={'20px'}>${username} ${element.type}: ${element.comment}</Text>
  //   return (
  //     username
  //   )
  // }

  return {
    id: element._id,
    title: `${username} ${element.type}: ${element.comment}`,
    allDay: true,
    // color: 'red',
    // colorEvento:'green',
    start: new Date(startDate),
    end: new Date(endDate),
    type: getKeyByValue(Role, element.type),
  };
}

const TaskModal = ({ type, events, setEvents, UsersDetails }) => {
  const isAdmin = useStore((state) => state.isAdmin);

  const { handleSubmit, register, control } = useForm();

  //Setting the Range in the dayPicker.
  const [range, setRange] = useState();

  const [userId, setUserId] = useState("");
  const [username, setUsername] = useState("");

  //the task we want to append to events array.
  const [newTask, setNewTask] = useState(undefined);

  const { isOpen, onOpen, onClose } = useDisclosure();

  //Query that will recive information the newTask.
  const Addtasks = useAddTasksData(newTask, isAdmin);

  //whenever the Query recieve new information => update the events
  useEffect(() => {
    if (!Addtasks.isLoading && Addtasks.data) {
      console.log(Addtasks.data);
      setEvents([
        ...events,
        convertTaskElementToEventObject(Addtasks.data, username),
      ]);
      setUsername();
      setNewTask(undefined);
      setUserId();
    }
  }, [Addtasks.data, Addtasks.isLoading]);

  function handleAddTask(values) {
    const task = {
      comment: values.Comment,
      startDate: type === Role.AVTASH ? range.from.getTime() : range.getTime(),
      endDate: type === Role.AVTASH ? range.to.getTime() : range.getTime(),
      type: type,
    };
    if (isAdmin) {
      console.log("userId is ", userId);
      task._id = userId;
    }
    setNewTask(task);
    onClose();
  }

  function generateFooter() {
    let footer = <p>Please pick the first day.</p>;
    if (range?.from) {
      if (!range.to) {
        if (type === "אבטש") {
          range.to = addDays(range.from.getTime(), 7);
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
    return footer;
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
              fromDate={new Date()}
              mode={type === "אבטש" ? "range" : "single"}
              min={type === "אבטש" ? 7 : 1}
              max={type === "אבטש" ? 7 : 1}
              selected={range}
              showWeekNumber
              onSelect={setRange}
              footer={generateFooter()}
            />
          </Center>
          <ModalCloseButton />
          <form onSubmit={handleSubmit(handleAddTask)}>
            <ModalBody pb={6}></ModalBody>
            <Center>
              <Menu>
                <MenuButton required={true} as={Button}>
                  בחר חייל
                </MenuButton>
                <MenuList>
                  {UsersDetails.data.map((key) => {
                    return (
                      <MenuItem
                        key={key._id}
                        onClick={() => {
                          setUserId(key._id);
                        }}
                        minH="48px"
                      >
                        <span key={key}>{key.username}</span>
                      </MenuItem>
                    );
                  })}
                </MenuList>
              </Menu>
            </Center>
            <Input
              id="Comment"
              placeholder="אנא הוסף הערה לתורנות"
              type="text"
              {...register("Comment", {
                required: "This is required",
              })}
            />

            <Center>{type}</Center>
            <ModalFooter>
              <Button
                isDisabled={!userId}
                type="submit"
                colorScheme="blue"
                mr={3}
                variant="outline"
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

export { TaskModal, convertTaskElementToEventObject };
