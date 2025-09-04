import React from 'react';
import { Container, Typography, Button } from '@mui/material';

function Dashboard() {
    return (
        <Container maxWidth="sm" style={{ textAlign: 'center', marginTop: '100px' }}>
            <Typography variant="h3" gutterBottom>
                🚀 Welcome to HabitCoach Web
            </Typography>
            <Button variant="contained" color="primary">
                Get Started
            </Button>
        </Container>
    );
}

export default Dashboard;