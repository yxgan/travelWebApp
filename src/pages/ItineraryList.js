import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Grid, Card, CardContent, CardActions, Button } from '@mui/material';
import { getItineraries } from '../services/itineraryService';
import { format } from 'date-fns';

function ItineraryList() {
  const [itineraries, setItineraries] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadItineraries = async () => {
      try {
        const data = await getItineraries();
        setItineraries(data);
      } catch (error) {
        console.error('Error loading itineraries:', error);
      }
    };
    loadItineraries();
  }, []);

  const handleViewDetails = (id) => {
    navigate(`/itinerary/${id}`);
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" sx={{ mt: 4, mb: 4 }}>
        My Itineraries
      </Typography>
      <Grid container spacing={3}>
        {itineraries.map((itinerary) => (
          <Grid item xs={12} sm={6} md={4} key={itinerary.id}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="h2">
                  {itinerary.destination}
                </Typography>
                <Typography color="textSecondary">
                  {format(new Date(itinerary.startDate), 'MMM dd, yyyy')} - 
                  {format(new Date(itinerary.endDate), 'MMM dd, yyyy')}
                </Typography>
              </CardContent>
              <CardActions>
                <Button 
                  size="small" 
                  color="primary"
                  onClick={() => handleViewDetails(itinerary.id)}
                >
                  View Details
                </Button>
                <Button 
                  size="small" 
                  color="secondary"
                  onClick={() => handleEdit(itinerary.id)}
                >
                  Edit
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default ItineraryList;