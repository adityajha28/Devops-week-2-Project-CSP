import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Layout from "./Layout";
import { Auth0Provider } from '@auth0/auth0-react';
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Auth0Provider
    domain="dev-2wpdrj5simkesf8m.us.auth0.com"
    clientId="vkxjUh2wrsLL5WuGOeVpsEDIGcf97rUw"
    redirectUri={window.location.origin}
  >
    <App />
  </Auth0Provider>
);  
