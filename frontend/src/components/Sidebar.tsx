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
        <ListItem component={Link} to="/overview">
          <ListItemIcon><Home /></ListItemIcon>
          <ListItemText primary="Overview" />
        </ListItem>
        <ListItem component={Link} to="/customers">
          <ListItemIcon><People /></ListItemIcon>
          <ListItemText primary="Customers" />
        </ListItem>
        <ListItem component={Link} to="/integrations">
          <ListItemIcon><Settings /></ListItemIcon>
          <ListItemText primary="Integrations" />
        </ListItem>
        <ListItem component={Link} to="/settings">
          <ListItemIcon><Settings /></ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>
        <ListItem component={Link} to="/account">
          <ListItemIcon><People /></ListItemIcon>
          <ListItemText primary="Account" />
        </ListItem>
        <ListItem component={Link} to="/error">
          <ListItemIcon><ExitToApp /></ListItemIcon>
          <ListItemText primary="Error" />
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
