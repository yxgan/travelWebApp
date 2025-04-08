import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';

function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" component={Link} to="/">Home</Button>
        <Button color="inherit" component={Link} to="/itineraries">My Itineraries</Button>
        <Button color="inherit" component={Link} to="/create">Create New</Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;