import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import Login from "./pages/auth/Login";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import RegisterPage from "./pages/auth/Register";
import MachinesPage from './pages/MachinesPage';
import MachineFormPage from './pages/MachineFormPage';
import AddMachinePage from "./pages/AddMachinePage";
import MachineDetailsPage from "./pages/MachineDetailsPage";
import AddMonitoringPage from "./pages/AddMonitoringPage";
import MonitoringDetailsPage from "./pages/MonitoringDetailsPage";
import AddSensorPage from "./pages/AddSensorPage";
import EditSensorPage from "./pages/EditSensorPage";
import EditMonitoringPage from "./pages/EditMonitoringPage";
import EditMachinePage from "./pages/EditMachinePage";

const App = () => {
  const navigate = useNavigate();

  // Verificar se o usuário está autenticado
  const isAuthenticated = () => {
    // Aqui você pode fazer uma verificação do token de autenticação ou outro método de validação
    return localStorage.getItem("token") !== null;
  };

  useEffect(() => {
    if (isAuthenticated()) {
      // Se estiver autenticado, redirecionar para /machines
      navigate("/machines");
    } else {
      // Se não estiver autenticado, redirecionar para /login
      navigate("/login");
    }
  }, [navigate]);

  return (
    <Routes>
      {/* Rota para login */}
      <Route path="/login" element={<Login />} />
      
      {/* Rota para registro */}
      <Route path="/register" element={<RegisterPage />} />

      {/* Dashboard privada */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />

      {/* Rotas para Máquinas */}
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
      <Route
        path="/add-machine"
        element={
          <PrivateRoute>
            <AddMachinePage />
          </PrivateRoute>
        }
      />
      <Route
        path="/machines/:id"
        element={
          <PrivateRoute>
            <MachineDetailsPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/machines/:id/edit"
        element={
          <PrivateRoute>
            <EditMachinePage />
          </PrivateRoute>
        }
      />
      <Route
        path="/machines/:machineId/add-monitoring"
        element={
          <PrivateRoute>
            <AddMonitoringPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/machines/:id/monitorings/:monitoringId"
        element={
          <PrivateRoute>
            <MonitoringDetailsPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/machines/:id/monitorings/:monitoringId/edit"
        element={
          <PrivateRoute>
            <EditMonitoringPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/machines/:id/monitorings/:monitoringId/add-sensor"
        element={
          <PrivateRoute>
            <AddSensorPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/machines/:id/monitorings/:monitoringId/sensors/:sensorId/edit"
        element={
          <PrivateRoute>
            <EditSensorPage />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

const RootApp = () => (
  <Router>
    <App />
  </Router>
);

export default RootApp;
