import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AddToCartProvider } from "./context/AddToCart";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AddToCartProvider>
        <App />
      </AddToCartProvider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
