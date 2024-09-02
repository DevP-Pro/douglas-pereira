import React from 'react';
import { Box, CssBaseline, Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography, Divider } from '@mui/material';
import { Dashboard, People, Settings, ExitToApp, ErrorOutline } from '@mui/icons-material';
import Chart from '../components/Chart';  // Supondo que você tenha componentes de gráficos
import TrafficSource from '../components/TrafficSource';  // Supondo que você tenha componentes de gráficos
import { useNavigate } from 'react-router-dom';

const drawerWidth = 240;

const DashboardPage = () => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            DeviasKit
          </Typography>
        </Toolbar>
        <Divider />
        <List>
          <ListItem component="a" onClick={() => handleNavigation('/dashboard')}>
            <ListItemIcon>
              <Dashboard />
            </ListItemIcon>
            <ListItemText primary="Overview" />
          </ListItem>
          <ListItem component="a" onClick={() => handleNavigation('/machines')}>
            <ListItemIcon>
              <People />
            </ListItemIcon>
            <ListItemText primary="Machines" />
          </ListItem>
          <ListItem component="a" onClick={() => handleNavigation('/machines')}>
            <ListItemIcon>
              <Settings />
            </ListItemIcon>
            <ListItemText primary="Integrations" />
          </ListItem>
          <ListItem component="a" onClick={() => handleNavigation('/settings')}>
            <ListItemIcon>
              <Settings />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItem>
          <ListItem component="a" onClick={() => handleNavigation('/account')}>
            <ListItemIcon>
              <People />
            </ListItemIcon>
            <ListItemText primary="Account" />
          </ListItem>
          <ListItem component="a" onClick={() => handleNavigation('/error')}>
            <ListItemIcon>
              <ErrorOutline />
            </ListItemIcon>
            <ListItemText primary="Error" />
          </ListItem>
          <Divider />
          <ListItem component="a" onClick={() => handleNavigation('/logout')}>
            <ListItemIcon>
              <ExitToApp />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Toolbar />
        <Typography variant="h4" gutterBottom>
          Overview
        </Typography>
        
        {/* Conteúdo da Dashboard */}
        <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 3 }}>
          <Box sx={{ flexGrow: 1, flexBasis: '30%' }}>
            <Chart title="Sales" />
          </Box>
          <Box sx={{ flexGrow: 1, flexBasis: '30%' }}>
            <TrafficSource title="Traffic Source" />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardPage;
