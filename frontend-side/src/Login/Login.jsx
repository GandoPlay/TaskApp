import React from "react";
import { Input, Button, Box, Grid, GridItem } from "@chakra-ui/react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import axios from "axios";
// import { Context } from "../Context/context";
import { useQuery, useMutation } from "react-query";
import NavBar from "../navBar/NavBar";
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { isLoading, isError, error, mutate } = useMutation(loginUserName);

  async function loginUserName(user) {
    const response = await axios.post(
      "http://172.20.10.8:3001/auth/signup",
      user
    );
    // setToken(response.data)
    navigate("/rating");
  }

  const login = () => {
    mutate({
      username: username,
      password: password,
    });
  };

  return (
    <Box
      textAlign="center"
      bg="#274c77"
      height="100vh"
      width="100%"
      display={"flex"}
      justifyContent={"center"}
    >
      {/* <NavBar/> */}
      <Box
        className="divForInput"
        backgroundColor="rgba(219, 219, 219, 0.651)"
        p="40px"
        width="30%"
        height="350px"
        alignSelf="center"
        display={"flex"}
        justifyContent={"center"}
        
      >
        <Grid  alignContent="center" justifyContent={"center"}>
          <GridItem>
            <Input
              type="text"
              className="input"
              placeholder="name"
              onChange={(e) => setUsername(e.target.value)}
              height="100%"
              width="80%"
              mt="3%"
            />
          </GridItem>
          <GridItem>
            <Input
              type="password"
              className="input"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
              alignSelf="center"
              height="80%"
              width="80%"
              mt="7%"
             
            />
          </GridItem>

          <Button onClick={login} colorScheme="gray" mt="50px">
            Log in
          </Button>
        </Grid>
      </Box>
    </Box>
  );
}

export default Login;
