import React from "react";
import { Input, Button } from "@chakra-ui/react";
import "./Login.css";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  useEffect(() => {
    if (localStorage.getItem("user-info")) {
      history.push("/login");
    }
  }, []);
function login(){

  console.log(name,password);
  let item={name,password}
  let resolt =await fetch("/*insert API*/",{
    method:'POST',
    headers:{
      
    },
    body:JSON.stringify(item)
  });
  resolt=await resolt.json();
  localStorage.setItem("",JSON.stringify(resolt))
history.push("/login")
}

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
          <Button onClick={login} colorScheme="gray">Log in</Button>
        </div>
      </div>
    </div>
  );
}

export default Login;
