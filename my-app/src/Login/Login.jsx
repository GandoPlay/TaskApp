import React from "react";
import { Input, Button } from "@chakra-ui/react";
import "./Login.css";

function Login() {
  return (
    <div className="body">
      <div className="divForInput">
        
        <Input className="input" placeholder="name" />
        <Input className="input" placeholder="pasword" />
        <div className="butoon">
        <Button colorScheme='gray'>Log in</Button>
        </div>
        
      </div>
     
    </div>
  );
}

export default Login;
