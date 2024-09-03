import React, { useState } from "react";
import {
  AppBar,
  Box,
  Divider,
  Drawer,
  Hidden,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import { Home, People, Settings, ExitToApp, Dashboard, Menu } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const drawerWidth = 250;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    // Remover o token do localStorage
    localStorage.removeItem("token");

    // Redirecionar para a página de login
    navigate("/login");
  };

  const drawer = (
    <div>
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          Dynamax
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        <ListItem component={Link} to="/machines">
          <ListItemIcon>
            <Dashboard />
          </ListItemIcon>
          <ListItemText primary="Overview" />
        </ListItem>
        <ListItem component={Link} to="/machines">
          <ListItemIcon>
            <People />
          </ListItemIcon>
          <ListItemText primary="Machines" />
        </ListItem>
        <Divider />
        <ListItem button onClick={handleLogout}>
          <ListItemIcon>
            <ExitToApp />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      {/* AppBar for mobile view */}
      <AppBar position="fixed" sx={{ display: { sm: "none" } }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <Menu />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Dynamax
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Drawer for mobile view */}
      <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
        <Hidden smUp>
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        {/* Drawer for desktop view */}
        <Hidden xsDown>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", sm: "block" },
              "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </Box>
    </Box>
  );
};

export default Sidebar;
