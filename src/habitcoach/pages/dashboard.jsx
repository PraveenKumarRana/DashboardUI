import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Typography,
    Grid,
    Card,
    CardContent,
    Stack,
    CircularProgress,
    LinearProgress,
    List,
    ListItem,
    ListItemText, Button
} from "@mui/material";
import axios from "axios";
import { JWT_TOKEN_KEY } from "../../config.js";
import { motion } from "framer-motion";
import CloseIcon from '@mui/icons-material/Close';
import PsychologyAltIcon from '@mui/icons-material/PsychologyAlt';
import axiosInstance from "../../interceptor/axios_interceptor.js";

const Dashboard = () => {
    const [summary, setSummary] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSummary = async () => {
            try {
                const token = localStorage.getItem(JWT_TOKEN_KEY);
                const response = await axiosInstance.get("/api/habit-coach/dashboard/summary");
                setSummary(response);
            } catch (error) {
                console.error("Failed to fetch dashboard summary", error);
            } finally {
                setLoading(false);
            }
        };
        fetchSummary();
    }, []);

    const motivationalQuotes = [
        "Push yourself, because no one else is going to do it for you.",
        "Small daily improvements lead to stunning results.",
        "Discipline is choosing between what you want now and what you want most.",
        "You're one habit away from a new life."
    ];

    const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];

    return (
        <Box sx={{ display: "flex" }}>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Typography variant="h4" gutterBottom>
                    Welcome Back, Champ! 💪
                </Typography>

                {loading ? (
                    <CircularProgress />
                ) : (
                    <Grid container spacing={2}>
                        {/* Habits Completed */}
                        <Grid item xs={12} sm={4}>
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
                                <Card
                                    sx={{
                                        minHeight: 220,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <CardContent>
                                        <Typography variant="h6" gutterBottom>
                                            Habits Completed Today
                                        </Typography>
                                        <Typography variant="h3" color="primary">
                                            {summary.completedHabits} / {summary.totalHabitsToday}
                                        </Typography>
                                        <LinearProgress
                                            variant="determinate"
                                            value={summary.completionRate}
                                            sx={{ mt: 2, height: 10, borderRadius: 5 }}
                                            color="success"
                                        />
                                        <Typography variant="caption" display="block" mt={1}>
                                            {summary.completionRate.toFixed(0)}% Completion
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </Grid>

                        {/* Missed Habits */}
                        <Grid item xs={12} sm={4}>
                            <motion.div initial={{ x: -30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.6 }}>
                                <Card
                                    sx={{
                                        minHeight: 220,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <CardContent>
                                        <Typography variant="h6" gutterBottom>
                                            Missed Habits 😔
                                        </Typography>
                                        <List dense>
                                            {summary.missedHabits.length === 0 ? (
                                                <ListItem>
                                                    <ListItemText primary="None! You’re doing great!" />
                                                </ListItem>
                                            ) : (
                                                summary.missedHabits.map((habit, index) => (
                                                    <ListItem key={index}>
                                                        <CloseIcon sx={{ color: 'error.main', mr: 1 }} />
                                                        <ListItemText primary={habit} />
                                                    </ListItem>
                                                ))
                                            )}

                                            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                                                <Button
                                                    variant="outlined"
                                                    size="small"
                                                    onClick={() => navigate(`/habits`)}
                                                >
                                                    Go
                                                </Button>
                                            </Box>
                                        </List>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </Grid>

                        {/* Streaks */}
                        <Grid item xs={12} sm={4}>
                            <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
                                <Card
                                    sx={{
                                        minHeight: 220,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <CardContent>
                                        <Typography variant="h6" gutterBottom>
                                            🔥 Streaks
                                        </Typography>
                                        <List dense>
                                            {summary.streaks.map((streak) => (
                                                <ListItem key={streak.habitId}>
                                                    <ListItemText
                                                        primary={streak.habitTitle}
                                                        secondary={`🔥 Streak: ${streak.currentStreak} " 🏆 High: ${streak.longestStreak}`}
                                                    />
                                                </ListItem>
                                            ))}
                                        </List>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </Grid>
                    </Grid>
                )}

                {/* AI Coach Feed */}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 0.8 }}>
                    <Box sx={{ mt: 4 }}>
                        <Typography variant="h6" gutterBottom>
                            Mr. Coach AI ⚡️
                        </Typography>
                        <Card>
                            <CardContent>
                                <Stack spacing={2}>
                                    <Typography><PsychologyAltIcon sx={{ mr: 1 }} /> "{randomQuote}"</Typography>
                                    <Typography>✅ Keep going. You’re building your dream life.</Typography>
                                    <Typography>📊 Check your streaks and build consistency.</Typography>
                                </Stack>
                            </CardContent>
                        </Card>
                    </Box>
                </motion.div>
            </Box>
        </Box>
    );
};

export default Dashboard;