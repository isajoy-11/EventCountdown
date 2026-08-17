import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";

function App() {
    return (
        <BrowserRouter>
            <Routes>

                {/* Login page */}
                <Route path="/login" element={<Login />} />

                {/* Protected Dashboard */}
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />

                {/* Default page */}
                <Route
                    path="*"
                    element={<Navigate to="/login" />}
                />

            </Routes>
        </BrowserRouter>
    );
}

export default App;