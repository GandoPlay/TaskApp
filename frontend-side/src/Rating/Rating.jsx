import React from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { useUsersData } from "../api/fetchAxios";
import {
  Table,
  Thead,
  TableContainer,
  SimpleGrid,
  Box,
  Text,
  Center,
} from "@chakra-ui/react";

import {
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
} from "@chakra-ui/react";
import NavBar from "../navBar/NavBar";
function sortById(data) {
  return [...data].sort(function (a, b) {
    return a.id - b.id;
  });
}
const FetchRatings = () => {
  const {isLoading, data } = useUsersData()

  if (isLoading||!data) {
    return (
      <Text textAlign="center" fontSize="400%" mt="25%">
        Loading
      </Text>
    );
  }

  
  return (
    <>
    
      <Box
        bg=" rgba(192, 192, 192, 0.39)"
        display="flex"
        textAlign="center"
        width="100%"
        height="150px"
        justifyContent="space-around"
      >
        <Text width="20%" fontSize="250%">
          מקום שני
          {" " + data?data[data.length-2].username:''}
        </Text>
        <Text width="30%" height="100%" fontSize="320%">
          מקום ראשון
          {" " + data?data[data.length-1].username:''}
        </Text>
        <Text width="15%" fontSize="150%">
          מקום שלישי
          {"\n" + data?data[data.length-3].username:''}
        </Text>
      </Box>

      <TableContainer>
          <Center boxShadow="lg" bg="white" width="100%">
            <Text
              fontSize="170%"
              display="inline"
              p="5%"
              width="25%"
              textAlign="start"
            >
              name
            </Text>
            <Text fontSize="170%" display="inline" p="5%" width="30%">
              score
            </Text>
          </Center>

          {data
            ? data.map((user, index) => {
                return (
                  <Center
                    key={index}
                    boxShadow="lg"
                    justifyContent="space-around"
                  >
                    <Box
                      boxShadow="lg"
                      p="6"
                      rounded="md"
                      justify-content="center"
                      display="flex"
                      width="100%"
                    >
                      <Text width="25%">{user.id}</Text>
                      <Text width="30%"> {user.username} </Text>
                      <Text> {user.score}</Text>
                    </Box>
                  </Center>
                );
              })
            : ""}
      </TableContainer>
    </>
  );
};
export default FetchRatings;
