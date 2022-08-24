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
const FetchRatings = () => {
  const { isLoading, data } = useQuery("user-score", () => {
    return axios.get("http://localhost:3500/items");
  });
  //return this ahfter finish
  // if (isLoading) {
  //   return <h2>Loading</h2>;
  // }
  return (
    <>
     
      <div className="plases">
        <p className="place2">מקום שני</p>
        <p className="place1">מקום ראשון</p>
        <p className="place3">מקום שלישי</p>
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
          {data?.data.map((user) => {
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
                {/* <Tbody>
                  <Tr>
                    <Td>{user.id}</Td>
                    <Td> {user.name} </Td>
                    <Td isNumeric> {user.score}</Td>
                  </Tr>
                  <hr />
                </Tbody> */}
              </div>
            );
          })}
        </Table>
      </TableContainer>
    </>
  );
};
export default FetchRatings;
