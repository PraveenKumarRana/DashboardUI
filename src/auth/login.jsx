import React from "react";
import {GoogleLogin} from "@react-oauth/google";
import {JWT_TOKEN_KEY} from "../config.js";

const Login = () => {
    const handleLoginSuccess = (credentialResponse) => {
        console.log("Google ID Token:", credentialResponse.credential);

        fetch("http://localhost:8080/api/auth/google", {
            method: "POST",
            headers: {"Content-Type": "application/json", "X-App-Id": "HABIT_COACH"},
            body: JSON.stringify({idToken: credentialResponse.credential, appId: "HABIT_COACH"}),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("Login success:", data);
                localStorage.setItem(JWT_TOKEN_KEY, data.token);
                window.location.assign("/");
            })
            .catch((err) => console.error("Login error:", err));
    };

    return (
        <div style={{marginTop: 100, textAlign: "center"}}>
            <h2>Login</h2>
            <GoogleLogin
                onSuccess={handleLoginSuccess}
                onError={() => console.error("Login Failed")}
            />
        </div>
    );
};

export default Login;