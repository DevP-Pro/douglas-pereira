import React from "react";
import { Box, CssBaseline } from "@mui/material";
import Sidebar from "./Sidebar"; // Importe o seu componente Sidebar

const MainLayout = ({ children }) => {
  return (
    <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <CssBaseline />
      <Sidebar />
      <Box sx={{ flexGrow: 1, p: 3, overflowY: "auto" }}>
        {children}
      </Box>
    </Box>
  );
};

export default MainLayout;
