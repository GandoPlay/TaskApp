import "./App.css";
import {  Routes, Route, Link } from "react-router-dom";
import Login from "./Login/Login";
import { BrowserRouter } from "react-router-dom";
import * as React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import FetchRatings, { Rating } from "./compoments/Rating";
import ProtectedRoutes from "./protectedRoutes";
import DateTable from "./compoments/DateTable";
import NavBar from "./compoments/navBar/NavBar";
import history from "./history";
import MainPage from './compoments/main'

function App() {
  return (
    <BrowserRouter>
      <ChakraProvider>
        <Routes  history={history}>
          <Route path="/" element={<Login />} />
          <Route element={<ProtectedRoutes />}>
            <Route  path= "/mainPage"  element ={<MainPage/>} >
            <Route path="/mainPage/rating" element={<FetchRatings />} />
            <Route path="/mainPage/dateTable" element={<DateTable />} />

              </Route>
            
          </Route>
        </Routes>
      </ChakraProvider>
    </BrowserRouter>
  );
}

export default App;
