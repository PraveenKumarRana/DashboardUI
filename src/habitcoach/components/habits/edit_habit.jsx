import React, { useEffect, useState } from 'react';
import { Paper, Typography } from '@mui/material';
import HabitForm from './habit_form.jsx';
import axiosInstance from '../../../interceptor/axios_interceptor.js';
import { useParams, useNavigate } from 'react-router-dom';

const EditHabit = () => {
    const { id } = useParams();
    const [habit, setHabit] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const fetchHabit = async () => {
        try {
            const data = await axiosInstance.get(`/api/habit-coach/habits/${id}`);
            setHabit(data);
        } catch (error) {
            console.error("Error fetching habit:", error);
        }
    };

    useEffect(() => {
        fetchHabit();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            await axiosInstance.put(`/api/habit-coach/habits/${id}`, habit);
            navigate("/habits");
        } catch (error) {
            console.error("Error updating habit:", error);
        } finally {
            setLoading(false);
        }
    };

    if (!habit) return null;

    return (
        <Paper sx={{ padding: 4, maxWidth: 600, mx: 'auto', mt: 4 }}>
            <Typography variant="h5" mb={2}>Edit Habit</Typography>
            <HabitForm habit={habit} setHabit={setHabit} onSubmit={handleSubmit} loading={loading} />
        </Paper>
    );
};

export default EditHabit;