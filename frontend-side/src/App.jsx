import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./compoments/Login";
import { BrowserRouter } from "react-router-dom";
import * as React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import FetchRatings from "./compoments/Rating";
import ProtectedRoutes from "./compoments/protectedRoutes";
import DateTable from "./compoments/DateTable";
import NavBar from "./compoments/NavBar";
import history from "./history";

function App() {
  return (
    <BrowserRouter>
    
      <ChakraProvider>
      <NavBar/>

        <Routes  history={history}>

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
