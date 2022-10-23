import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import {ReactQueryDevtools} from 'react-query/devtools'

import reportWebVitals from "./reportWebVitals";
import { QueryClient,  QueryClientProvider} from "react-query";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnmount: false,
      refetchOnReconnect: false,
      
      retry: false,
    },
  },
});
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <QueryClientProvider client={queryClient}>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  <ReactQueryDevtools />

  </QueryClientProvider>
);

reportWebVitals();