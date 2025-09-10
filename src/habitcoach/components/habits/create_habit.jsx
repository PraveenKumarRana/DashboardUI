import React, { useState } from 'react';
import { Paper, Typography } from '@mui/material';
import HabitForm from './habit_form.jsx';
import axiosInstance from '../../../interceptor/axios_interceptor.js';
import { useNavigate } from 'react-router-dom';

const CreateHabit = () => {
    const [habit, setHabit] = useState({
        title: '',
        description: '',
        frequency: 'daily',
        reminderTime: '07:00:00',
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            await axiosInstance.post("/api/habit-coach/habits", habit);
            navigate("/habits");
        } catch (error) {
            console.error("Failed to create habit:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Paper sx={{ padding: 4, maxWidth: 600, mx: 'auto', mt: 4 }}>
            <Typography variant="h5" mb={2}>Create New Habit</Typography>
            <HabitForm habit={habit} setHabit={setHabit} onSubmit={handleSubmit} loading={loading} />
        </Paper>
    );
};

export default CreateHabit;