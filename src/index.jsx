import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app.jsx";
import {GoogleOAuthProvider} from "@react-oauth/google";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <React.StrictMode>
        <GoogleOAuthProvider clientId="701204248343-vnqoolsq28k2ra5hf5vstpidqmi8em6b.apps.googleusercontent.com">
            <App/>
        </GoogleOAuthProvider>
    </React.StrictMode>
);