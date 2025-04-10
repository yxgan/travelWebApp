import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Container, 
  Typography, 
  Paper, 
  Button, 
  Box, 
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Divider,
  Card,
  CardContent,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import { format } from 'date-fns';
import { getItineraryById, saveItinerary } from '../services/itineraryService';
import AddIcon from '@mui/icons-material/Add';

function ViewItinerary() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [itinerary, setItinerary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [newActivity, setNewActivity] = useState({ name: '', location: '' });

  useEffect(() => {
    const fetchItinerary = async () => {
      try {
        const data = await getItineraryById(id);
        setItinerary(data);
      } catch (error) {
        console.error('Error fetching itinerary:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchItinerary();
  }, [id]);

  const handleAddActivity = async () => {
    if (newActivity.name && newActivity.location) {
      try {
        setLoading(true);
        const updatedItinerary = {
          ...itinerary,
          activities: [...(itinerary.activities || []), newActivity]
        };
        await saveItinerary(updatedItinerary);
        setItinerary(updatedItinerary);
        setNewActivity({ name: '', location: '' });
        setOpenDialog(false);
      } catch (error) {
        console.error('Error adding activity:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (!itinerary) {
    return (
      <Container>
        <Typography variant="h6">Itinerary not found</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Paper sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" gutterBottom>{itinerary.destination}</Typography>
        <Typography variant="subtitle1" color="textSecondary" gutterBottom>
          {format(new Date(itinerary.startDate), 'MMM dd, yyyy')} - {' '}
          {format(new Date(itinerary.endDate), 'MMM dd, yyyy')}
        </Typography>

        <Box sx={{ mt: 4 }}>
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

        {itinerary.createdAt && (
          <Typography 
            variant="caption" 
            color="textSecondary" 
            sx={{ display: 'block', mt: 4, mb: 2 }}
          >
            Created: {format(new Date(itinerary.createdAt), 'MMM dd, yyyy')}
          </Typography>
        )}

        <Box sx={{ mt: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h5">Activities</Typography>
            <Button
              startIcon={<AddIcon />}
              variant="contained"
              color="primary"
              onClick={() => setOpenDialog(true)}
            >
              Add Activity
            </Button>
          </Box>
          {itinerary.activities && itinerary.activities.length > 0 ? (
            <List>
              {itinerary.activities.map((activity, index) => (
                <Card key={index} sx={{ mb: 2, backgroundColor: '#f5f5f5' }}>
                  <CardContent>
                    <Typography variant="h6">{activity.name}</Typography>
                    <Typography color="textSecondary">
                      <strong>Location:</strong> {activity.location}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </List>
          ) : (
            <Typography color="textSecondary">No activities planned yet</Typography>
          )}
        </Box>
      </Paper>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Add New Activity</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Activity Name"
            fullWidth
            value={newActivity.name}
            onChange={(e) => setNewActivity({ ...newActivity, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Location"
            fullWidth
            value={newActivity.location}
            onChange={(e) => setNewActivity({ ...newActivity, location: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button 
            onClick={handleAddActivity} 
            variant="contained" 
            disabled={!newActivity.name || !newActivity.location}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default ViewItinerary;