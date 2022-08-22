import React from "react";
import { Input, Button } from "@chakra-ui/react";
import "./Login.css";
import { useState, useEffect } from "react";
import axios from "axios";
function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    console.log({ name, password });
    axios
      .post("http://localhost:3001/auth/signup", {
        username: name,
        password: password,
      })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.error();
      });
  };

  return (
    <div className="body">
      <div className="divForInput">
        <Input
          type="text"
          className="input"
          placeholder="name"
          onChange={(e) => setName(e.target.value)}
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
