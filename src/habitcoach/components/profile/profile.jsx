import React from "react";
import { Typography } from "@mui/material";
import { getUserFromToken } from "../../../utils/user_utils.jsx";

const Profile = () => {
    const user = getUserFromToken();

    return (
        <div>
            <Typography variant="h4" gutterBottom>
                Profile
            </Typography>
            <Typography variant="body1">Name: {user?.name || user?.email}</Typography>
            <Typography variant="body1">Email: {user?.email}</Typography>
        </div>
    );
};

export default Profile;