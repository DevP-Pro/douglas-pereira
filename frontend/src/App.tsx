import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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
        {/* Adicione outras rotas protegidas aqui */}
      </Routes>
    </Router>
  );
};

export default App;
