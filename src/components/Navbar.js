import React from 'react';
import { AppBar, Toolbar, IconButton, Box, Tooltip } from '@mui/material';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import ListAltIcon from '@mui/icons-material/ListAlt';
import AddCircleIcon from '@mui/icons-material/AddCircle';

function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Tooltip title="Home">
          <IconButton
            component={Link}
            to="/"
            color="inherit"
            aria-label="home"
            sx={{ mr: 2 }}
          >
            <HomeIcon />
          </IconButton>
        </Tooltip>
        <Box sx={{ flexGrow: 1, display: 'flex', gap: 2, alignItems: 'center' }}>
          <Tooltip title="My Itineraries">
            <IconButton
              component={Link}
              to="/itineraries"
              color="inherit"
            >
              <ListAltIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Create New">
            <IconButton
              component={Link}
              to="/create"
              color="inherit"
            >
              <AddCircleIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;