import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
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
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <div>Dashboard</div>
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
