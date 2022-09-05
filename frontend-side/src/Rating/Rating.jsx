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
} from "@chakra-ui/react";
import NavBar from "../navBar/NavBar";
 function sortById(data) {
  return [...data].sort(function(a, b) {
    return (a.id - b.id);
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
     <NavBar/>
      <div className="plases">
        <p className="place2">מקום שני
        {data?.data[1].name}
        </p>
        <p className="place1">מקום ראשון
        <p>{data?.data[0].name}</p>
        </p>
        <p className="place3">מקום שלישי
        <p>{data?.data[2].name}</p>
        </p>
      </div>
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
          {data?sortById(data.data).map((user) => {
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
                  <p>{user.id}</p>
                  <p className="userName"> {user.name} </p>
                  <p className="userScore" isNumeric>
                    {" "}
                    {user.score}
                  </p>
                </Box>
              </div>
            );
          }):''}
        </Table>
      </TableContainer>
    </>
  );
};
export default FetchRatings;
