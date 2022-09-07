import React from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";
import { Container,Box } from "@chakra-ui/react";
function NavBar() {
  return (


    <Container bg="black" width="100%" height="30%">
      
        <Box className="divFor">
          <Link to="/rating">date</Link>
       
          <Link to="/rating" bg="width">Rating</Link>
          </Box>
                  <img id="logoRight" src={require("./logoHilAyabasha.png")} alt="logo" />

        <img id="logoLeft" src={require("./logoHatal.png")} alt="logo" />
      
    </Container>



  );
}

export default NavBar;
