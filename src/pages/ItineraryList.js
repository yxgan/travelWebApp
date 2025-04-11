import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardActions, 
  Button,
  CircularProgress,
  Alert,
  Box,
  List,
  ListItem,
  ListItemText,
  Collapse,
  IconButton,
  Divider
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { getItineraries } from '../services/itineraryService';
import { format } from 'date-fns';
import { useSearch } from '../context/SearchContext';

function ItineraryList() {
  const [itineraries, setItineraries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedId, setExpandedId] = useState(null);
  const navigate = useNavigate();
  const { searchQuery } = useSearch();

  useEffect(() => {
    const loadItineraries = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getItineraries();
        setItineraries(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error loading itineraries:', error);
        setError('Failed to load itineraries. Please try again later.');
      } finally {
        setLoading(false);
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

  const handleExpandClick = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const filteredItineraries = itineraries.filter(itinerary => {
    const searchLower = searchQuery.toLowerCase();
    return (
      itinerary.destination.toLowerCase().includes(searchLower) ||
      (itinerary.activities && 
       itinerary.activities.some(activity => 
         activity.name.toLowerCase().includes(searchLower) ||
         activity.location.toLowerCase().includes(searchLower)
       ))
    );
  });

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1">
          My Itineraries
        </Typography>
        <Button 
          variant="contained" 
          color="primary"
          onClick={() => navigate('/create')}
        >
          Create New Itinerary
        </Button>
      </Box>
      
      {filteredItineraries.length === 0 ? (
        <Typography variant="h6" sx={{ textAlign: 'center', mt: 4 }}>
          {searchQuery ? 'No matching itineraries found.' : 'No itineraries found. Create your first travel plan!'}
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {filteredItineraries.map((itinerary) => (
            <Grid item xs={12} sm={6} md={4} key={itinerary.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h5" component="h2" gutterBottom>
                    {itinerary.destination}
                  </Typography>
                  <Typography color="textSecondary">
                    {format(new Date(itinerary.startDate), 'MMM dd, yyyy')} - 
                    {format(new Date(itinerary.endDate), 'MMM dd, yyyy')}
                  </Typography>
                  
                  <IconButton
                    onClick={() => handleExpandClick(itinerary.id)}
                    sx={{ mt: 1 }}
                  >
                    {expandedId === itinerary.id ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  </IconButton>
                  
                  <Collapse in={expandedId === itinerary.id} timeout="auto" unmountOnExit>
                    <List dense>
                      {itinerary.activities && itinerary.activities.length > 0 ? (
                        itinerary.activities.map((activity, index) => (
                          <React.Fragment key={index}>
                            <ListItem>
                              <ListItemText
                                primary={activity.name}
                                secondary={activity.location}
                              />
                            </ListItem>
                            {index < itinerary.activities.length - 1 && <Divider />}
                          </React.Fragment>
                        ))
                      ) : (
                        <ListItem>
                          <ListItemText primary="No activities added yet" />
                        </ListItem>
                      )}
                    </List>
                  </Collapse>
                  
                  {itinerary.createdAt && (
                    <Typography variant="caption" color="textSecondary" sx={{ mt: 1, display: 'block' }}>
                      Created: {format(new Date(itinerary.createdAt), 'MMM dd, yyyy')}
                    </Typography>
                  )}
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
      )}
    </Container>
  );
}

export default ItineraryList;