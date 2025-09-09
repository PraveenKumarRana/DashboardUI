import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Login from "./auth/login.jsx";
import Dashboard from "./habitcoach/pages/dashboard.jsx";
import Home from "./habitcoach/pages/home.jsx"
import ProtectedRoute from "./auth/protected_route.jsx";

function App() {
    return (<Router>
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path="/dashboard" element={<ProtectedRoute>
                    <Dashboard/>
                </ProtectedRoute>}/>
                <Route path="/" element={<Home/>}/>
            </Routes>
        </Router>);
}

export default App;