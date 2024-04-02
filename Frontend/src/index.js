import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Layout from "./Layout";
import { Auth0Provider } from '@auth0/auth0-react';
import App from "./App";
const domain = process.env.REACT_APP_DOMAIN;
const cliendId = process.env.REACT_APP_clientId;
console.log(domain);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  
  <Auth0Provider
    domain="dev-1zflftakz5cme85y.us.auth0.com"
    clientId="hoh6ulGaxtqv6uNQsiLeECnEDF6J3YmE"
    redirectUri={window.location.origin}
  >
    <App />
  </Auth0Provider>
);  
