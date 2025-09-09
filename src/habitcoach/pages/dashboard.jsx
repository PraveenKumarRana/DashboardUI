
import React from 'react';
import { Container, Typography, Button } from '@mui/material';

const HabitCoachDashboard = () => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>HabitCoach Dashboard</Typography>
      <Button variant="contained" color="primary">Check In</Button>
    </Container>
  );
};

export default HabitCoachDashboard;
