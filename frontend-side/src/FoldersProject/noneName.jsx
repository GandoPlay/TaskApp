import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FetchRatings, { Rating } from "./Rating/Rating";
import DateTable from "./DateTable/DateTable";

function noneName() {
  return (
    <>
        <FetchRatings />
        <DateTable />
        </>
  );
}

export default noneName;
