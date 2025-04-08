import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md">
      <Box sx={{ 
        mt: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center'
      }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Travel Itinerary Planner
        </Typography>
        <Typography variant="h5" color="textSecondary" paragraph>
          Plan your trips, organize your activities, and keep track of your travel plans
        </Typography>
        <Box sx={{ mt: 4 }}>
          <Button 
            variant="contained" 
            color="primary" 
            size="large"
            onClick={() => navigate('/create')}
            sx={{ mr: 2 }}
          >
            Create New Itinerary
          </Button>
          <Button 
            variant="outlined" 
            color="primary" 
            size="large"
            onClick={() => navigate('/itineraries')}
          >
            View My Itineraries
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Home;