import React from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";
import { Container, Box, Text, Flex } from "@chakra-ui/react";
function NavBar() {
  return (















    <NavBar bg="black" width="100%" height="70px">
      <Box>
        <Link to="/rating">date</Link>
        <Text color="white" >
        
          <Link to="/rating"> Rating</Link>
        </Text>
      </Box>
      <img id="logoRight" src={require("./logoHilAyabasha.png")} alt="logo" />

      <img id="logoLeft" src={require("./logoHatal.png")} alt="logo" />
    </NavBar>
  );
}

export default NavBar;
