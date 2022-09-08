import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./Login/Login";
import { BrowserRouter } from "react-router-dom";
import * as React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import FetchRatings, { Rating } from "./Rating/Rating";
import ProtectedRoutes from "./protectedRoutes";
import DateTable from "./DateTable/DateTable";



function App() {
  return (
    <BrowserRouter>
      <ChakraProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/rating" element={<FetchRatings />} />
            <Route path="/dateTable" element={<DateTable />} />
          </Route>
        </Routes>
      </ChakraProvider>
    </BrowserRouter>
  );
}

export default App;
