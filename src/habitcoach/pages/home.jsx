import React from "react";
import { Box, Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/navbar.jsx";
import Sidebar from "../components/sidebar/sidebar.jsx"; // Assuming you will create this

const HomePage = () => {
    return (
        <Box sx={{ display: "flex", minHeight: "100vh" }}>
            <Sidebar />
            <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
                <Navbar />
                <Container sx={{ mt: 4 }}>
                    <Outlet />
                </Container>
            </Box>
        </Box>
    );
};

export default HomePage;
