import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Paper, Button, Box } from '@mui/material';
import { format } from 'date-fns';

function ItineraryDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const itineraries = JSON.parse(localStorage.getItem('itineraries') || '[]');
  const itinerary = itineraries.find(i => i.id === Number(id));

  if (!itinerary) {
    return <Typography>Itinerary not found</Typography>;
  }

  return (
    <Container maxWidth="md">
      <Paper sx={{ p: 3, mt: 4 }}>
        <Typography variant="h4" gutterBottom>{itinerary.destination}</Typography>
        <Typography variant="subtitle1" color="textSecondary">
          {format(new Date(itinerary.startDate), 'MMM dd, yyyy')} - 
          {format(new Date(itinerary.endDate), 'MMM dd, yyyy')}
        </Typography>
        <Box sx={{ mt: 3, mb: 2 }}>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => navigate(`/edit/${id}`)}
            sx={{ mr: 2 }}
          >
            Edit Itinerary
          </Button>
          <Button 
            variant="outlined" 
            onClick={() => navigate('/itineraries')}
          >
            Back to List
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default ItineraryDetail;