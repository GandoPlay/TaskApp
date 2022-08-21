
import './App.css';
import Login from './Login/Login';
import * as React from 'react'
import { ChakraProvider } from '@chakra-ui/react'

function App() {
  return (
 
   
    <ChakraProvider>
      <Login/>
    </ChakraProvider>
  );
}

export default App;
