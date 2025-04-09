import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Box, Typography, Snackbar, CircularProgress } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { saveItinerary, getItineraryById } from '../services/itineraryService';
import { ref, set } from 'firebase/database';
import { db } from '../firebase/config';

function CreateItinerary() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [itinerary, setItinerary] = useState({
    destination: '',
    startDate: '',
    endDate: '',
    activities: []
  });

  useEffect(() => {
    const fetchItinerary = async () => {
      if (id) {
        try {
          setLoading(true);
          const data = await getItineraryById(id);
          if (data) {
            setItinerary(data);
          }
        } catch (error) {
          console.error('Error fetching itinerary:', error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchItinerary();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await saveItinerary(itinerary);
      setOpen(true);
      setTimeout(() => {
        navigate('/itineraries');
      }, 2000);
    } catch (error) {
      console.error('Error saving itinerary:', error);
    } finally {
      setLoading(false);
    }
  };

  // Test code to add to your CreateItinerary component temporarily
  const testDatabase = async () => {
    try {
      const testRef = ref(db, 'test');
      await set(testRef, {
        message: 'Test connection'
      });
      console.log('Test data written successfully');
    } catch (error) {
      console.error('Error writing test data:', error);
    }
  };

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {id ? 'Edit Itinerary' : 'Create New Itinerary'}
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
          disabled={loading}
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