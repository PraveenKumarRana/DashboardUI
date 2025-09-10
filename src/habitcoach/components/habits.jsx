import React, { useEffect, useState } from 'react';
import {
    Box,
    Typography,
    Card,
    CardContent,
    IconButton,
    Tooltip,
    Fab,
    Tabs,
    Tab,
    Checkbox,
    CardActions,
    Divider,
    Grid
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../interceptor/axios_interceptor.js';

const Habits = () => {
    const [habits, setHabits] = useState([]);
    const [tab, setTab] = useState(0);
    const navigate = useNavigate();

    const fetchAllHabits = async () => {
        try {
            const response = await axiosInstance.get("/api/habit-coach/habits");
            setHabits(response);
        } catch (error) {
            console.error("Failed to fetch all habits:", error);
        }
    };

    const fetchTodaysHabits = async () => {
        try {
            const response = await axiosInstance.get("/api/habit-coach/habits/today");
            setHabits(response);
        } catch (error) {
            console.error("Failed to fetch today's habits:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axiosInstance.delete(`/api/habit-coach/habits/${id}`);
            fetchAllHabits();
        } catch (error) {
            console.error("Error deleting habit:", error);
        }
    };

    const handleMarkDone = async (id) => {
        try {
            await axiosInstance.post(`/api/habit-coach/habits/${id}/log`);
            fetchTodaysHabits();
        } catch (error) {
            console.error("Error marking habit done:", error);
        }
    };

    const handleEdit = (id) => {
        navigate(`/habits/edit/${id}`);
    };

    useEffect(() => {
        if (tab === 0) fetchTodaysHabits();
        else fetchAllHabits();
    }, [tab]);

    return (
        <Box sx={{ display: 'flex', padding: 3 }}>
            {/* Left: Habits Section (70%) */}
            <Box sx={{ flex: 7, pr: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Habit Tracker
                </Typography>

                <Tabs value={tab} onChange={(e, val) => setTab(val)} sx={{ mb: 3 }}>
                    <Tab label="Today's Tasks" />
                    <Tab label="All Habits" />
                </Tabs>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {habits.map((habit) => (
                        <Card
                            key={habit.id}
                            sx={{
                                width: '100%',
                                backgroundColor: habit.isDone ? '#f3e5f5' : 'inherit', // light purple
                                transition: 'background-color 0.3s',
                            }}
                        >
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Typography variant="h6">{habit.title}</Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {habit.description}
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        Frequency: {habit.frequency} <br />
                                        Reminder: {habit.reminderTime}
                                    </Typography>
                                </CardContent>

                                <CardActions sx={{ paddingRight: 2 }}>
                                    {tab === 0 ? (
                                        <Tooltip title="Mark as Done">
                                            <Checkbox
                                                onChange={() => handleMarkDone(habit.id)}
                                                disabled={habit.isDone}
                                                checked={habit.isDone}
                                                color="success"
                                            />
                                        </Tooltip>
                                    ) : (
                                        <>
                                            <Tooltip title="Edit">
                                                <IconButton onClick={() => handleEdit(habit.id)} color="primary">
                                                    <EditIcon />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Delete">
                                                <IconButton onClick={() => handleDelete(habit.id)} color="error">
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Tooltip>
                                        </>
                                    )}
                                </CardActions>
                            </Box>
                        </Card>
                    ))}
                </Box>

                {tab === 1 && (
                    <Fab
                        color="primary"
                        aria-label="add"
                        sx={{ position: 'fixed', bottom: 32, right: 32 }}
                        onClick={() => navigate('/habits/create')}
                    >
                        <AddIcon />
                    </Fab>
                )}
            </Box>

            {/* Right: Sidebar (30%) */}
            <Box
                sx={{
                    flex: 3,
                    bgcolor: '#f7f7f7',
                    borderRadius: 2,
                    padding: 2,
                    boxShadow: 1
                }}
            >
                <Typography variant="h6" gutterBottom>
                    Mr. Coach Says 🧠
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    💡 Stay consistent. Your discipline today is your freedom tomorrow.
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    🧘 Reflect for 5 minutes at night to close your day strong.
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                    🔓 Unlock AI feedback in premium to personalize your growth.
                </Typography>
            </Box>
        </Box>
    );
};

export default Habits;