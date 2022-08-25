import React from "react";
import { Input, Button } from "@chakra-ui/react";
import "./Login.css";
import {useNavigate} from 'react-router-dom'
import { useState,useContext } from "react";
import axios from "axios";
// import { Context } from "../Context/context";
import{ useQuery, useMutation} from 'react-query'
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const {token, setToken} = useContext(Context);

  const navigate = useNavigate();



  const { isLoading, isError, error, mutate } = useMutation(loginUserName)
    
    
  async function loginUserName(user) {
      const response = await axios.post('http://172.20.10.8:3001/auth/signup', user)
      // setToken(response.data)
      navigate('/rating')
  }


  const login = () => {
    mutate(
      {
         username:username,
         password:password
         })
}
  

  return (
    <div className="body">
      <div className="divForInput">
        <Input
          type="text"
          className="input"
          placeholder="name"
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          type="password"
          className="input"
          placeholder="pasword"
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="butoon">
          <Button onClick={login} colorScheme="gray">
            Log in
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Login;
