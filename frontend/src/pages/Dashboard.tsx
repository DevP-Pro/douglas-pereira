import React from "react";
import {
  Box,
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Divider,
} from "@mui/material";
import {
  Dashboard,
  People,
  Settings,
  ExitToApp,
  ErrorOutline,
} from "@mui/icons-material";
import Chart from "../components/Chart"; // Supondo que você tenha componentes de gráficos
import TrafficSource from "../components/TrafficSource"; // Supondo que você tenha componentes de gráficos
import { useNavigate } from "react-router-dom";
import MainLayout from "../components/MainLayout";

const drawerWidth = 240;

const DashboardPage = () => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <MainLayout>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <Toolbar />
        <Typography variant="h4" gutterBottom>
          Overview
        </Typography>

        {/* Conteúdo da Dashboard */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 3,
          }}
        >
          <Box sx={{ flexGrow: 1, flexBasis: "30%" }}>
            <Chart title="Sales" />
          </Box>
          <Box sx={{ flexGrow: 1, flexBasis: "30%" }}>
            <TrafficSource title="Traffic Source" />
          </Box>
        </Box>
      </Box>
    </MainLayout>
  );
};

export default DashboardPage;
