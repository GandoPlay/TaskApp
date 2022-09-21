import React from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { Avatar } from "@chakra-ui/react"
import { useColorModeValue } from "@chakra-ui/react";
import { useLogin, useUsersData } from "../api/usersAPI";
import {
  Table,
  Thead,
  TableContainer,
  Box,
  Text,
  Tr,Td,Th,Tbody
} from "@chakra-ui/react";

const FetchRatings = () => {
  const textColor = useColorModeValue("blue.900", "blue")

  const users  = useUsersData()
  if (users.isLoading||!users.data) {
    return (
      <Text fontSize={{ lg: '56px'}}>
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
        <Text  fontSize={{ md: '40px'}}>
          מקום שני
          {" " + users.data?users.data[users.data.length-2]?.username:''}
        </Text>
        <Text fontSize={{ lg: '56px'}}>
          מקום ראשון
          {" " + users.data?users.data[users.data.length-1]?.username:''}
        </Text>
        <Text fontSize={{ base: '24px'}}>
          מקום שלישי
          {"\n" + users.data?users.data[users.data.length-3]?.username:''}
        </Text>
      </Box>


  <TableContainer  >
  <Table  variant="striped" colorScheme={textColor} size='lg'>
    <Thead   >
      <Tr>
      <Th  ></Th>

        <Th  >שם</Th>
        <Th>ניקוד</Th>
        <Th > דרגה</Th>
      </Tr>

    </Thead>
    <Tbody h="50%" >
    {users.data ? users.data.map((user,index) => {
                return (
            
        <Tr key={index}>
          <Td><Avatar src="https://yt3.ggpht.com/ytc/AMLnZu8OyWtWV6Tv73Pp0My_I3Ss4_iOrjL0f6o4h5vveQ=s900-c-k-c0x00ffffff-no-rj"/></Td>
        <Td>{user.username}</Td>
        <Td>{user.score}</Td>
        <Td >{user.type}</Td>
      </Tr>
       );
      })
    : ""}
    </Tbody>
  </Table>
</TableContainer>;

    </>
  );
};
export default FetchRatings;
