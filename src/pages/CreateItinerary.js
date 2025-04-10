import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Box, Typography, Snackbar, CircularProgress } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { saveItinerary, getItineraryById } from '../services/itineraryService';
import { ref, set } from 'firebase/database';
import { db } from '../firebase/config';
import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Divider } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

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
  const [newActivity, setNewActivity] = useState({ name: '', location: '' });
  const [showActivityForm, setShowActivityForm] = useState(false);

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

  const handleAddActivity = () => {
    if (newActivity.name && newActivity.location) {
      setItinerary({
        ...itinerary,
        activities: [...(itinerary.activities || []), newActivity]
      });
      setNewActivity({ name: '', location: '' });
      setShowActivityForm(false);
    }
  };

  const handleRemoveActivity = (index) => {
    const updatedActivities = [...itinerary.activities];
    updatedActivities.splice(index, 1);
    setItinerary({ ...itinerary, activities: updatedActivities });
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
      <Box sx={{ mt: 4, mb: 2 }}>
        <Typography variant="h6">Activities</Typography>
        <Button
          startIcon={<AddIcon />}
          onClick={() => setShowActivityForm(true)}
          sx={{ mt: 1 }}
        >
          Add Activity
        </Button>
        
        {showActivityForm && (
          <Box sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Activity Name"
              value={newActivity.name}
              onChange={(e) => setNewActivity({ ...newActivity, name: e.target.value })}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Location"
              value={newActivity.location}
              onChange={(e) => setNewActivity({ ...newActivity, location: e.target.value })}
              margin="normal"
            />
            <Button
              variant="contained"
              onClick={handleAddActivity}
              sx={{ mt: 1, mr: 1 }}
            >
              Add
            </Button>
            <Button
              onClick={() => setShowActivityForm(false)}
              sx={{ mt: 1 }}
            >
              Cancel
            </Button>
          </Box>
        )}
        
        <List>
          {itinerary.activities && itinerary.activities.map((activity, index) => (
            <React.Fragment key={index}>
              <ListItem>
                <ListItemText
                  primary={activity.name}
                  secondary={activity.location}
                />
                <ListItemSecondaryAction>
                  <IconButton edge="end" onClick={() => handleRemoveActivity(index)}>
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
              {index < itinerary.activities.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
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