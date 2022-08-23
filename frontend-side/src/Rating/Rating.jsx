import React from "react";
import "./Rating.css";
import { useQuery } from "react-query";
import axios from "axios";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
const FetchRatings = () => {
  const { isLoading, data } = useQuery("user-score", () => {
    return axios.get("http://localhost:3500/items");
  });

  if (isLoading) {
    return <h2>Loading</h2>;
  }
  return (
    <>
      <p className="heder">Rating</p>
      <div className="plases">
        <p className="place2">plce 2</p>
        <p className="place1">plce 1</p>
        <p className="place3">plce 3</p>
      </div>
      <TableContainer>
        <Table variant="striped" colorScheme="teal">
          <Thead>
            <Tr>
              <Th>id</Th>
              <Th>name</Th>
              <Th>rating</Th>
            </Tr>
          </Thead>
          {data?.data.map((user) => {
            return (
              <div className="list" key={user.id}>
                <Tbody >
                  <Tr>
                    <Td>{user.id}</Td>
                    <Td> {user.name} </Td>
                    <Td isNumeric> {user.score}</Td>
                  </Tr>
                  <hr />
                </Tbody>
              </div>
            );
          })}
        </Table>
      </TableContainer>
    </>
  );
};
export default FetchRatings;
