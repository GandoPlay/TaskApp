import React from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { Avatar, Center } from "@chakra-ui/react"
import { useColorModeValue } from "@chakra-ui/react";
import { useLogin, useUsersData } from "../api/usersAPI";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";
import {
  Table,
  Thead,
  TableContainer,
  Box,
  Text,
  Tr,Td,Th,Tbody
} from "@chakra-ui/react";

const FetchRatings = () => {
  const textColor = useColorModeValue("blue.100", "blue")

  const users  = useUsersData()
  if (users.isLoading||!users.data) {
    return (
      <Text fontSize={{ lg: '56px'}}>
        Loading
      </Text>
    );
  }

function generateUsersArray(data){

  if(data.length>=3){
    return data.slice(0,3)
  }
  return data
}


  return (
    <>
      <Center background={'blackAlpha.900'}>
      
     <BarChart
      
      width={1000}
      height={300}
      data={generateUsersArray(users.data)}
      barSize={50}
    >
      <YAxis enableBackground={<Avatar src={require("./profileHatal.jpg")}/>}/>
      <XAxis dataKey="username"   fill="white" />
      <Tooltip  />
      <Bar dataKey="score" fill="green" />
    </BarChart>
    </Center>
      {/* <Box
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
      </Box> */}


  <TableContainer  background={'blackAlpha.800'}>
  <Table  variant="striped" colorScheme={textColor} size='lg'>
    <Thead   >
      <Tr>
      <Th  ></Th>

        <Th  >שם</Th>
        <Th>ניקוד</Th>
        <Th > דרגה</Th>
      </Tr>

    </Thead>
    <Tbody textColor={'whatsapp.400'}>
    {users.data ? users.data.map((user,index) => {
                return (
            
        <Tr key={index}>
          <Td><Avatar src={require("./profileHatal.jpg")}/></Td>
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
