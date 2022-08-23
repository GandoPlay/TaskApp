
import './App.css';
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom"

import Login from './Login/Login';
import { BrowserRouter } from "react-router-dom";

import * as React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import FetchRatings from './Rating/Rating'

function App() {
  return (
 
    <BrowserRouter>

    <ChakraProvider>
      <Routes>
      <Route path = "/" element={<Login/>} />
      <Route path = "/rating" element={<FetchRatings/>} />

      </Routes>

    </ChakraProvider>
    </BrowserRouter>

  );
}

export default App;
