import React from "react";
import {
  Box,
  Grid,
  GridItem,
  FormControl,
  Input,
  Button,
  Text,
} from "@chakra-ui/react";
import {  useMutation } from "react-query";
import { useForm } from "react-hook-form";
import { LoginUser } from "../api/authAPI";
import { useState } from "react";
import { useDisclosure } from "@chakra-ui/react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/react'
function Login() {


  const {handleSubmit,register,} = useForm();

  const [authFailed, setAuthFailed] = useState(false)
  const { mutate } = useMutation(LoginUser);
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef()

  function onSubmit(values) {

    mutate({
      username: values.Username,
      password: values.Password,
      setAuthFailed: setAuthFailed
    },);
    

  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} dir={'rtl'}>
      <FormControl
        textAlign="center"
        bg="#274c77"
        height="100vh"
        width="100wh"
        display={"flex"}
        justifyContent={"center"}
      >
        
 
      
        <Box
          backgroundColor="rgba(219, 219, 219, 0.651)"
          p="40px"
          width="20%"
          height="350px"
          alignSelf="center"
          display={"flex"}
          justifyContent={"center"}
          borderRadius={'10px'}
        >
            
          <Grid alignContent="center" justifyContent={"center"} templateRows={3} gridGap={'30px'}>
            <GridItem gridRow={1}>
              <Input
                id="Username"
                type="text"
                // className="input"
                placeholder="שם משתמש"
                {...register("Username", {
                  required: "This is required",
                  minLength: {
                    value: 4,
                    message: "Minimum length should be 4",
                  },
                })}
                size={'60%'}
                borderRadius={'5px'}
              />
            
            </GridItem>
            <GridItem gridRow={2}>
              <Input
                id="Password"
                type="password"
                className="input"
                placeholder="סיסמא"
                {...register("Password", {
                  required: "This is required",
                  minLength: {
                    value: 4,
                    message: "Minimum length should be 4",
                  },
                })}
                alignSelf="center"
                // height="80%"
                // width="80%"
                // mt="7%"
                size={'80%'}
                borderRadius={'5px'}
              />
            </GridItem>
            <GridItem display={'flex'} alignContent={'center'} justifyContent={'center'} gridRow={3} borderRadius={'5px'}>
            {authFailed&&<Text fontSize={'10px'} color={'red'} fontWeight={'semibold'}>שם משתמש או סיסמא לא נכונים</Text>}
            </GridItem>
            
            <Button type="submit" colorScheme="gray" mt="50px">
              היכנס
            </Button>
          </Grid>
        </Box>
      </FormControl>
    </form>
  );
}

export default Login;
