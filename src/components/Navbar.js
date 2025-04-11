import React from 'react';
import { AppBar, Toolbar, IconButton, Box, Tooltip, InputBase } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import ListAltIcon from '@mui/icons-material/ListAlt';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SearchIcon from '@mui/icons-material/Search';
import { useSearch } from '../context/SearchContext';

function Navbar() {
  const { searchQuery, setSearchQuery } = useSearch();
  const location = useLocation();

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

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
          
          {/* Only show search box on itineraries page */}
          {location.pathname === '/itineraries' && (
            <Box sx={{
              position: 'relative',
              borderRadius: 1,
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.25)' },
              width: '300px',
              marginLeft: 2
            }}>
              <Box sx={{
                padding: '0 16px',
                height: '100%',
                position: 'absolute',
                pointerEvents: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <SearchIcon />
              </Box>
              <InputBase
                placeholder="Search itineraries..."
                value={searchQuery}
                onChange={handleSearch}
                sx={{
                  color: 'inherit',
                  width: '100%',
                  '& .MuiInputBase-input': {
                    padding: '8px 8px 8px 48px',
                    width: '100%'
                  }
                }}
              />
            </Box>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;