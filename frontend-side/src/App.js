import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./Login/Login";
import { BrowserRouter } from "react-router-dom";
import * as React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import FetchRatings, { Rating } from "./Rating/Rating";
import ProtectedRoutes from "./protectedRoutes";
import DateTable from "./DateTable/DateTable";

import history from "./history";
import NavBar from "./navBar/NavBar";
import NoneName from "./FoldersProject/noneName";


function App() {
  return (
    <BrowserRouter>
      <ChakraProvider>
        <Routes  history={history}>
        {/* <NavBar/> */}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/rating" element={<FetchRatings />} />
            <Route path="/dateTable" element={<DateTable />} />
            <Route path="/nonename" element={<NoneName />} />
          </Route>
        </Routes>
      </ChakraProvider>
    </BrowserRouter>
  );
}

export default App;
