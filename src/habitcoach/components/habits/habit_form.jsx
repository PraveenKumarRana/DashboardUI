// src/components/habits/HabitForm.jsx
import React from 'react';
import {
    TextField,
    MenuItem,
    Button,
    Box
} from '@mui/material';

const frequencies = ['daily', 'weekly', 'monthly'];

const HabitForm = ({ habit, setHabit, onSubmit, loading = false }) => {
    const handleChange = (e) => {
        setHabit({ ...habit, [e.target.name]: e.target.value });
    };

    return (
        <form onSubmit={onSubmit}>
            <TextField
                fullWidth
                label="Title"
                name="title"
                value={habit.title}
                onChange={handleChange}
                margin="normal"
                required
            />
            <TextField
                fullWidth
                label="Description"
                name="description"
                value={habit.description}
                onChange={handleChange}
                margin="normal"
            />
            <TextField
                fullWidth
                select
                label="Frequency"
                name="frequency"
                value={habit.frequency}
                onChange={handleChange}
                margin="normal"
                required
            >
                {frequencies.map((freq) => (
                    <MenuItem key={freq} value={freq}>
                        {freq.charAt(0).toUpperCase() + freq.slice(1)}
                    </MenuItem>
                ))}
            </TextField>
            <TextField
                fullWidth
                label="Reminder Time"
                name="reminderTime"
                type="time"
                value={habit.reminderTime}
                onChange={handleChange}
                margin="normal"
                required
            />
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                <Button variant="outlined" type="button" disabled={loading} onClick={() => window.history.back()}>
                    Cancel
                </Button>
                <Button variant="contained" type="submit" disabled={loading}>
                    {loading ? "Saving..." : "Save"}
                </Button>
            </Box>
        </form>
    );
};

export default HabitForm;