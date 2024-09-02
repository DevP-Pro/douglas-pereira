import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import RegisterPage from "./pages/auth/Register";
import MachinesPage from './pages/MachinesPage';
import MachineFormPage from './pages/MachineFormPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/machines"
          element={
            <PrivateRoute>
              <MachinesPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/machines/new"
          element={
            <PrivateRoute>
              <MachineFormPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/machines/edit/:id"
          element={
            <PrivateRoute>
              <MachineFormPage />
            </PrivateRoute>
          }
        />
        {/* Adicione outras rotas protegidas aqui */}
      </Routes>
    </Router>
  );
};

export default App;
