import React from 'react';
import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { Home, People, Settings, ExitToApp } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box' },
      }}
    >
      <Box sx={{ padding: 2, backgroundColor: '#0D253F', color: '#FFF' }}>
        <Typography variant="h6" noWrap>
          DeviasKit
        </Typography>
      </Box>
      <List>
        <ListItem component={Link} to="/dashboard">
          <ListItemIcon><Home /></ListItemIcon>
          <ListItemText primary="Inicio" />
        </ListItem>
        <ListItem component={Link} to="/machines">
          <ListItemIcon><Settings /></ListItemIcon>
          <ListItemText primary="Máquinas" />
        </ListItem>
        <ListItem component={Link} to="/logout">
          <ListItemIcon><ExitToApp /></ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
