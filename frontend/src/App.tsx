import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Polls from "./pages/Polls";
import Account from "./pages/Account";
import { ProtectedRoute } from "./auth/ProtectedRoute";
import "./App.css";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Register />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route
                    path="/dashboard/*"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                >
                    <Route path="polls" element={<Polls />} />
                    <Route path="account" element={<Account />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
