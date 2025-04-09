import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Box, Typography, Snackbar } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { saveItinerary } from '../services/itineraryService';

function CreateItinerary() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [itinerary, setItinerary] = useState({
    destination: '',
    startDate: '',
    endDate: '',
    activities: []
  });

  useEffect(() => {
    if (id) {
      const itineraries = JSON.parse(localStorage.getItem('itineraries') || '[]');
      const existingItinerary = itineraries.find(i => i.id === Number(id));
      if (existingItinerary) {
        setItinerary(existingItinerary);
      }
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await saveItinerary(itinerary);
      setOpen(true);
      setTimeout(() => {
        navigate('/itineraries');
      }, 2000);
    } catch (error) {
      console.error('Error saving itinerary:', error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Create New Itinerary
        </Typography>
      </Box>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
        <TextField
          fullWidth
          label="Destination"
          value={itinerary.destination}
          onChange={(e) => setItinerary({...itinerary, destination: e.target.value})}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          type="date"
          label="Start Date"
          InputLabelProps={{ shrink: true }}
          value={itinerary.startDate}
          onChange={(e) => setItinerary({...itinerary, startDate: e.target.value})}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          type="date"
          label="End Date"
          InputLabelProps={{ shrink: true }}
          value={itinerary.endDate}
          onChange={(e) => setItinerary({...itinerary, endDate: e.target.value})}
          margin="normal"
          required
        />
        <Button 
          type="submit" 
          variant="contained" 
          color="primary"
          sx={{ mt: 2 }}
          fullWidth
        >
          {id ? 'Update Itinerary' : 'Create Itinerary'}
        </Button>
      </Box>
      <Snackbar
        open={open}
        autoHideDuration={2000}
        message={id ? "Itinerary updated successfully!" : "Itinerary saved successfully!"}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </Container>
  );
}

export default CreateItinerary;