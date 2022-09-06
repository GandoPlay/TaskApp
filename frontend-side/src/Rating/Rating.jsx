import React from "react";
import "./Rating.css";
import { useQuery } from "react-query";
import axios from "axios";
import {
  Table,
  Thead,
  TableContainer,
  SimpleGrid,
  Box,
  Text,
} from "@chakra-ui/react";

import {
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
} from '@chakra-ui/react'
import NavBar from "../navBar/NavBar";
function sortById(data) {
  return [...data].sort(function (a, b) {
    return a.id - b.id;
  });
}
const FetchRatings = () => {
  const { isLoading, data } = useQuery("user-score", () => {
    return axios.get("http://localhost:3500/items?_sort=score&_order=desc");
  });
  //return this ahfter finish
  // if (isLoading) {
  //   return <h2>Loading</h2>;
  // }
  return (
    <>
      <NavBar />
      <Box
        bg=" rgba(192, 192, 192, 0.39)"
        display="flex"
        textAlign="center"
        width="100%"
        height="150px"
      >
        <Text width="30%" fontSize="250%" >
           מקום שני
          
          {' '+data?.data[1].name}
        </Text>
        <Text width="40%" height="100%"  fontSize="320%">
          מקום ראשון
          {' '+data?.data[0].name}
        </Text>
        <Text width="30%" fontSize="150%">
           מקום שלישי
        {'\n'+data?.data[2].name}
        </Text>
      </Box>



      
      <TableContainer>
        <Table variant="striped" colorScheme="teal">
          <Thead boxShadow="lg" p="6" rounded="md" bg="white">
            <SimpleGrid
              bg="gray.50"
              columns={{ sm: 2, md: 4 }}
              spacing="8"
              p="7"
              textAlign="center"
              rounded="lg"
              color="gray.400"
              display="flax"
            >
              <Box
                boxShadow="dark-lg"
                p="6"
                rounded="md"
                justify-content="space-around"
              >
                <p className="nav-bar" id="name">
                  {" "}
                  name
                </p>
                <p className="nav-bar" id="score">
                  score
                </p>
              </Box>
            </SimpleGrid>
          </Thead>



          {/* <OrderedList>
            {data?sortById(data.data).map((user)=>{
              return(
                <ListItem 
                boxShadow="lg"
                p="6"
                rounded="md"
                justify-content="space-around"
                display="flex"
                >{user.id}
                </ListItem>
               */}
              )
            {/* }):""} */}
          {/* </OrderedList> */}
          {data
            ? sortById(data.data).map((user) => {
                return (
                  <div className="list" key={user.id}>
                    <Box
                      className="users"
                      boxShadow="lg"
                      p="6"
                      rounded="md"
                      justify-content="space-around"
                      display="flex"
                    >
                      <Text>{user.id}</Text>
                      <Text className="userName"> {user.name} </Text>
                      <Text className="userScore">
                        {" "}
                        {user.score}
                      </Text>
                    </Box>
                  </div>
                );
              })
            : ""}
        </Table>
      </TableContainer>
    </>
  );
};
export default FetchRatings;
