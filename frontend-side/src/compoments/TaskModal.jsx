import React, { useState } from "react";
import useStore from "../appStore";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Center,
  Input,
  Button,
  MenuButton,
  MenuList,
  MenuItem,
  Menu,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import "react-day-picker/dist/style.css";
import { addTask, useAddTasksData } from "../api/taskAPI";
import { Role } from "../Constant";
import addDays from "date-fns/addDays";
import he from "date-fns/esm/locale/he";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";

function getKeyByValue(object, value) {
  return Object.keys(object).find((key) => object[key] === value);
}
/**
 *
 * @param element a task
 * @param username string, a username of a user.
 * @returns Converted single task from the backend into an item of the Events array
 */
function convertTaskElementToEventObject(element, username = "") {
  const startDate = element.startDate;
  let endDate = element.startDate;
  if (element.type === Role.AVTASH) {
    endDate = element.endDate;
  }

  return {
    id: element._id,
    title: `${username} ${element.type}: ${element.comment}`,
    allDay: true,
    start: new Date(startDate),
    end: new Date(endDate),
    type: getKeyByValue(Role, element.type),
    owner: element.owner,
  };
}

const TaskModal = ({ type, events, setEvents, UsersDetails, refetch }) => {
  const isAdmin = useStore((state) => state.isAdmin);
  const setIsError = useStore((state) => state.setIsError);

  const { handleSubmit, register } = useForm();

  //Setting the Range in the dayPicker.
  const [range, setRange] = useState();

  const [userId, setUserId] = useState("");
  const [username, setUsername] = useState("");

  //the task we want to append to events array.
  const [newTask, setNewTask] = useState(undefined);

  const {
    isOpen: isTaskModalOpen,
    onOpen: onTaskModalOpen,
    onClose: onTaskModalClose,
  } = useDisclosure();

  //Query that will recive information the newTask.
  const Addtasks = useAddTasksData(newTask, isAdmin);
  // const queryClient = useQueryClient();
  // const [mutate, info] = useMutation(addTask, {
  //   onSuccess: (data) => {
  //     queryClient.setQueryData("tasks", (oldQueryData) => {
  //       return {
  //         ...oldQueryData,
  //         data: [...oldQueryData.data, data.data],
  //       };
  //     });
  //   },
  // });

  function appendTaskToCalandar(data) {
    if (data.error) {
      setIsError(true);
    } else {
      console.log("here");

      setEvents([...events, convertTaskElementToEventObject(data, username)]);
    }
    setUsername("");
    setUserId("");
  }
  // whenever the Query recieve new information => update the events
  useEffect(() => {
    if (!Addtasks.isLoading && Addtasks.data) {
      if (Addtasks.data.error) {
        setIsError(true);
      } else {
        setEvents([
          ...events,
          convertTaskElementToEventObject(Addtasks.data, username),
        ]);
      }
      setUsername("");
      setNewTask(undefined);
      setUserId("");
    }
  }, [Addtasks.data, Addtasks.isLoading]);

  function ChooseUser() {
    return (
      <>
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
                      setUsername(key.username);
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
      </>
    );
  }
  /**
   * @param values object thats contain Comment about the task
   * @description this function add the new Task in SetNewTask state and close the modal.
   *  */
  function handleAddTask(values) {
    const task = {
      comment: values.Comment,
      startDate: type === Role.AVTASH ? range.from.getTime() : range.getTime(),
      endDate: type === Role.AVTASH ? range.to.getTime() : range.getTime(),
      type: type,
    };
    if (isAdmin) {
      task.ownerId = userId;
    }
    // mutate(
    //   { task: task, isAdmin: isAdmin },
    //   { onSuccess: (data) => appendTaskToCalandar(data) }
    // );
    // try {
    //   mutate({
    //     task: task,
    //     isAdmin: isAdmin,
    //   });
    // } catch (e) {}
    setNewTask(task);
    onTaskModalClose();
  }
  /**
   * @description this function generate the footer of the modal.
   *  */
  function generateFooter() {
    let footer = <p>אנא בחר את התאריך המבוקש</p>;
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
          onTaskModalOpen();
        }}
      >
        {type}
      </Button>
      <Modal
        closeOnOverlayClick={false}
        isOpen={isTaskModalOpen}
        onClose={onTaskModalClose}
      >
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
            {isAdmin ? ChooseUser() : ""}
            <Center>
              {username !== "" ? username + " החייל הנבחר הינו" : ""}
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
              <Button type="submit" colorScheme="blue" mr={3} variant="outline">
                שמור
              </Button>

              <Button onClick={onTaskModalClose}>בטל</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export { TaskModal, convertTaskElementToEventObject };
