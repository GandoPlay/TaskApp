import React from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";
import { Container, Box, Text, Flex, Image, Center } from "@chakra-ui/react";
function NavBar() {
  return (
    <Box bg="black" width="100%" height="70px">

      
<Image
        id="logoRight"
        src={require("./logoHilAyabasha.png")}
        alt="logo"
        width="5%"
        height="100%"
      />
      <Center
        color="white"
        justifyContent="space-around"
        width="40%"
        bg="yellow"
      >
        <Link to="/rating">date</Link>
        <Link to="/rating"> Rating</Link>
      </Center>


      <Image id="logoLeft" src={require("./logoHatal.png")} alt="logo" />
    </Box>
  );
}

export default NavBar;
