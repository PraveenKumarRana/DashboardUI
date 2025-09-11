import React, {useEffect, useState} from "react";
import {GoogleLogin} from "@react-oauth/google";
import {BASE_URL, JWT_TOKEN_KEY} from "../config.js";
import { Box, Typography, Paper } from "@mui/material";
import axiosInstance from "../interceptor/axios_interceptor.js";


const motivationalImages = [
    "https://source.unsplash.com/1600x900/?motivation,success",
    "https://source.unsplash.com/1600x900/?gym,focus",
    "https://source.unsplash.com/1600x900/?workout,discipline",
    "https://source.unsplash.com/1600x900/?mindset,growth",
    "https://source.unsplash.com/1600x900/?mountains,achievement",
];

const Login = () => {
    const [bgImage, setBgImage] = useState("");

    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * motivationalImages.length);
        setBgImage(motivationalImages[randomIndex]);
    }, []);

    const handleLoginSuccess = (credentialResponse) => {
        console.log("Google ID Token:", credentialResponse.credential);

        axiosInstance.post(BASE_URL+"/api/auth/google",
            JSON.stringify({idToken: credentialResponse.credential, appId: "HABIT_COACH"}))
            .then((res) => res)
            .then((data) => {
                console.log("Login success:", data);
                localStorage.setItem(JWT_TOKEN_KEY, data.token);
                window.location.assign("/");
            })
            .catch((err) => console.error("Login error:", err));
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                backgroundImage: `url(${bgImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Paper
                elevation={6}
                sx={{
                    padding: 4,
                    textAlign: "center",
                    backgroundColor: "rgba(255, 255, 255, 0.3)",
                    borderRadius: "16px",
                    width: 300,
                }}
            >
                <Typography variant="h5" gutterBottom fontWeight="bold">
                    Hello, Mr. Coach 👋
                </Typography>

                <GoogleLogin
                    onSuccess={handleLoginSuccess}
                    onError={() => console.error("Login Failed")}
                />
            </Paper>
        </Box>
    );
};

export default Login;