import React from "react";
import {
  Box,
  Grid,
  GridItem,
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
} from "@chakra-ui/react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import axios from "axios";
// import { Context } from "../Context/context";
import { useQuery, useMutation } from "react-query";
import { useForm } from "react-hook-form";
import NavBar from "../navBar/NavBar";
import { request, SignUpUserName } from "../api/axios";
import { useUsersData } from "../api/fetchAxios";

function Login() {


  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const navigate = useNavigate();

  const { isLoading, isError, error, mutate } = useMutation(SignUpUserName);
  


  const onSuccess = data => {
    console.log({ data })
  }

  const onError = error => {
    console.log({ error })
  }

  const { data } = useUsersData(
    onSuccess,
    onError
  )
  console.log(data);


  function onSubmit(values) {
    mutate({
      username: values.Username,
      password: values.Password,
    });
    navigate('/rating')

  }





  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl
        textAlign="center"
        bg="#274c77"
        height="100vh"
        width="100%"
        display={"flex"}
        justifyContent={"center"}
      >
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
          <Grid alignContent="center" justifyContent={"center"}>
            <GridItem>
              <Input
                id="Username"
                type="text"
                className="input"
                placeholder="Username"
                {...register("Username", {
                  required: "This is required",
                  minLength: {
                    value: 4,
                    message: "Minimum length should be 4",
                  },
                })}
                height="100%"
                width="80%"
                mt="3%"
              />
            </GridItem>
            <GridItem>
              <Input
                id="Password"
                type="password"
                className="input"
                placeholder="password"
                {...register("Password", {
                  required: "This is required",
                  minLength: {
                    value: 4,
                    message: "Minimum length should be 4",
                  },
                })}
                alignSelf="center"
                height="80%"
                width="80%"
                mt="7%"
              />
            </GridItem>

            <Button type="submit" colorScheme="gray" mt="50px">
              Log in
            </Button>
          </Grid>
        </Box>
      </FormControl>
    </form>
  );
}

export default Login;
