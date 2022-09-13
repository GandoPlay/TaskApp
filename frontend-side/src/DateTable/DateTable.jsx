import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import {
  Input,
  Button,
  Select,
  Box,
  Flex,
  border,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  MenuItem,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Center,
  Grid,
  MenuList,
  Menu,
  MenuButton,
} from "@chakra-ui/react";
import { DateRange } from "react-date-range";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
// import { addDays } from "date-fns";
// import "react-date-range/dist/styles.css";
// import "react-date-range/dist/theme/default.css";

const Role = ["אבטש", "ניקיון", "לילה", "הנפצה", "מחסן", "שמירה", "אחר"];

const localizer = momentLocalizer(moment);

const events = [
  {
    title: "neriya",
    allDay: true,
    start: new Date(2022, 8, 6),
    end: new Date(2022, 8, 10),
  },
  {
    title: "raz",
    start: new Date(2022, 8, 12),
    end: new Date(2022, 8, 15),
  },
  {
    title: "ben",
    start: new Date(2022, 8, 20),
    end: new Date(2022, 8, 23),
  },
];

function DateTable() {
  const [allEvent, setAllEvent] = useState(events);
  // const [calender, setCalender] = useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [massage, setMassage] = useState("");
  const [time, setTime] = useState();
  const [range, setRange] = useState();

  const AddEvent = () => {
    // setAllEvent([...allEvent, newEvent]);
    if (massage || range.from) {
      setTime([range.from].toString());
      // console.log({ range });
      // alert(massage + [range.from].toString + [range.to].toString );
      console.log(massage);
      console.log([range.from].toString());
      console.log([range.to].toString());
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
  const eventChangh = (event) => {
    setMassage(event.target.value);

    console.log({ massage });
    console.log(time);
  };
  // const changhDay =(range)=>{

  //   console.log(range);
  // }
  return (
    <Box>
      <Calendar
        className="calendardate"
        views={["month"]}
        localizer={localizer}
        events={allEvent}
        startAccessor="start"
        endAccessor="end"
        controls={["calendar"]}
        select="range"
        touchUi={true}
        style={{ height: 500, margin: "50px" }}
      />

      <Flex>
        <Grid justifyContent="space-around">
          <Menu>
            {/*  שאני לוחץ על תורנות הוא השמור לי את התורנות בתוך המודל*/}
            <MenuButton as={Button}>Actions</MenuButton>
            <MenuList>
              {Role.map((item, index) => (
                <MenuItem key={index}  onClick={onOpen}>
                  {item}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
        </Grid>

        {/* <Button onClick={onOpen}>Open Modal</Button> */}
        <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <Center>
              <DayPicker
                //  onChange={setTime}
                mode="range"
                min={6}
                max={7}
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
            <ModalFooter>
              {/* //צריך לעשות שלוחצים על שמירה הוא ישמור לי את הטורנות ואת הימים שלו */}
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
      </Flex>
    </Box>
  );
}

export default DateTable;
