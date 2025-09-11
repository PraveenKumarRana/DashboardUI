import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Login from "./auth/login.jsx";
import Dashboard from "./habitcoach/pages/dashboard.jsx";
import Home from "./habitcoach/pages/home.jsx"
import Profile from "./habitcoach/components/profile/profile.jsx";
import Habits from "./habitcoach/components/habits.jsx";
import CreateHabit from "./habitcoach/components/habits/create_habit.jsx";
import EditHabit from "./habitcoach/components/habits/edit_habit.jsx";

function App() {
    return (<Router basename="/mrcoach">
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Home />}>
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="habits" element={<Habits />}/>
                    <Route path="habits/create" element={<CreateHabit />} />
                    <Route path="habits/edit/:id" element={<EditHabit />} />
                    <Route path="profile" element={<Profile />} />
                    <Route index element={<Dashboard />} />
                </Route>
            </Routes>
        </Router>);
}

export default App;