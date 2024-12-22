// src/Dashboard.js
import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  Paper,
  CardContent,
  IconButton,
  Fade,
  Stack,
  GlobalStyles,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material';
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

function Dashboard() {
  const [properties, setProperties] = useState(() => {
    try {
      const savedProperties = localStorage.getItem('properties');
      return savedProperties ? JSON.parse(savedProperties) : [];
    } catch (error) {
      console.error('Error loading properties from localStorage:', error);
      return [];
    }
  });

  const [newPropertyName, setNewPropertyName] = useState('');
  const [showNewPropertyField, setShowNewPropertyField] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [propertyToDelete, setPropertyToDelete] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem('properties', JSON.stringify(properties));
    } catch (error) {
      console.error('Error saving properties to localStorage:', error);
    }
  }, [properties]);

  const handleAddProperty = () => {
    if (newPropertyName.trim() === '') return;

    const newProperty = {
      id: Date.now(),
      name: newPropertyName.trim(),
      status: 'Active',
      bio: '',
      surveyData: {
        hostInfo: '',
        wifi: false,
        wifiName: '',
        wifiPassword: '',
        hasTowels: false,
        towelsLocation: '',
        hasExtraSheets: false,
        sheetsLocation: '',
        hasCoffeeMachine: false,
        coffeeMachineLocation: '',
        hasPullOutSofa: false,
        sofaDetails: '',
        hasLocalFood: false,
        breakfastSpots: '',
        lunchSpots: '',
        dinnerSpots: '',
        hasThermostat: false,
        thermostatLocation: '',
        hasTransportation: false,
        transportationDetails: '',
        hasAppliances: false,
        applianceDetails: '',
        hasCheckoutProcedures: false,
        checkoutDetails: '',
        emergencyContact: '',
        hasFirstAid: false,
        firstAidLocation: '',
        nearestHospital: '',
        hasLocalAttractions: false,
        attractionsDetails: '',
        conciergeStyle: 0,
      },
      galleryData: [],
    };

    setProperties((prevProperties) => [...prevProperties, newProperty]);
    setNewPropertyName('');
    setShowNewPropertyField(false);
  };

  const handleDeleteProperty = () => {
    if (!propertyToDelete) {
      console.error('No property selected for deletion.');
      return;
    }

    const updatedProperties = properties.filter(
      (property) => property.id !== propertyToDelete.id
    );
    setProperties(updatedProperties);
    setDeleteDialogOpen(false);
    setPropertyToDelete(null);
  };

  const openDeleteDialog = (property) => {
    setPropertyToDelete(property);
    setDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setPropertyToDelete(null);
  };

  return (
    <>
      {/* Global Styles for Scrollbar and Smooth Scrolling */}
      <GlobalStyles
        styles={{
          html: {
            scrollBehavior: 'smooth',
          },
          /* Hide scrollbar for Chrome, Safari and Opera */
          '*::-webkit-scrollbar': {
            display: 'none',
          },
          /* Hide scrollbar for IE, Edge and Firefox */
          '*': {
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          },
        }}
      />

      <Paper
        elevation={3}
        sx={{
          backgroundColor: '#F43F5E',
          color: '#fff',
          padding: 2,
          borderRadius: 0,
          width: '100%',
          boxSizing: 'border-box',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center', // Changed from 'space-between' to 'center'
          marginBottom: 4,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 500 }}>
          Property Manager
        </Typography>
        {/* Add more Navbar items here if needed */}
      </Paper>

      <Box
        sx={{
          flexGrow: 1,
          padding: { xs: '16px', sm: '32px' },
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        {/* Properties Grid */}
        <Box
          sx={{
            flexGrow: 1,
            overflowY: 'auto',
            paddingRight: '4px',
            paddingTop: '15px',
          }}
        >
          <Grid container spacing={4} justifyContent="center">
            {properties.length === 0 && (
              <Grid item xs={12}>
                <Box
                  sx={{
                    textAlign: 'center',
                    padding: '40px 20px',
                    backgroundColor: '#f9f9f9',
                    borderRadius: '8px',
                  }}
                >
                  <Typography variant="h6" gutterBottom>
                    No Properties Added Yet
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    Add a property to begin creating your very first AI powered Concierge!
                  </Typography>
                </Box>
              </Grid>
            )}

            {properties.map((property) => (
              <Grid item xs={12} sm={6} md={4} key={property.id}>
                <Card
                  sx={{
                    borderRadius: '0px', // Removed borderRadius
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                    position: 'relative',
                    backgroundColor: '#ffffff',
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    '&:hover': {
                      transform: 'translateY(-6px)',
                      boxShadow: '0 12px 24px rgba(0,0,0,0.2)',
                      zIndex: 2,
                    },
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                  }}
                >
                  {/* Delete Button */}
                  <IconButton
                    onClick={() => openDeleteDialog(property)}
                    sx={{
                      position: 'absolute',
                      top: 12,
                      right: 12,
                      color: '#F43F5E',
                      backgroundColor: 'rgba(255, 255, 255, 0.7)',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 1)',
                        color: '#D7344A',
                      },
                      borderRadius: 0, // Already removed borderRadius
                    }}
                    aria-label={`delete ${property.name}`}
                  >
                    <DeleteIcon />
                  </IconButton>

                  {/* Card Content */}
                  <CardContent sx={{ flexGrow: 1, padding: '24px' }}>
                    {/* Property Name */}
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        color: '#333',
                        marginBottom: '1px',
                      }}
                    >
                      {property.name}
                    </Typography>

                    {/* Subscription Status */}
                    <Typography
                      variant="body2"
                      sx={{
                        color: '#888',
                        fontWeight: 500,
                        marginBottom: '10px',
                      }}
                    >
                      Subscription: {property.status}
                    </Typography>

                    {/* Settings Button */}
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <Link to={`/onboarding/${property.id}`} style={{ textDecoration: 'none' }}>
                        <Button
                          variant="contained"
                          sx={{
                            backgroundColor: '#F43F5E',
                            color: 'white',
                            paddingX: '20px',
                            paddingY: '8px',
                            fontSize: '0.875rem',
                            borderRadius: 0, // Removed borderRadius
                            transition: 'background-color 0.3s',
                            '&:hover': {
                              backgroundColor: '#D7344A',
                            },
                          }}
                        >
                          Settings
                        </Button>
                      </Link>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}

            {/* Add Property Section */}
            <Grid item xs={12} sm={6} md={4}>
              {!showNewPropertyField ? (
                <Button
                  variant="outlined"
                  onClick={() => setShowNewPropertyField(true)}
                  startIcon={<AddIcon />}
                  sx={{
                    borderRadius: '0px', // Removed borderRadius
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                    backgroundColor: '#ffffff',
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    '&:hover': {
                      transform: 'translateY(-6px)',
                      boxShadow: '0 12px 24px rgba(0,0,0,0.2)',
                      zIndex: 2,
                    },
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingY: '12px',
                    textTransform: 'none',
                    color: '#F43F5E',
                    borderColor: '#F43F5E',
                  }}
                >
                  Add Property
                </Button>
              ) : (
                <Fade in={showNewPropertyField} timeout={500}>
                  <Card
                    sx={{
                      borderRadius: '0px', // Removed borderRadius
                      boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                      backgroundColor: '#ffffff',
                      transition: 'transform 0.3s, box-shadow 0.3s',
                      display: 'flex',
                      flexDirection: 'column',
                      height: '100%',
                      padding: '20px',
                    }}
                  >
                    <Stack spacing={2}>
                      <TextField
                        fullWidth
                        value={newPropertyName}
                        onChange={(e) => setNewPropertyName(e.target.value)}
                        placeholder="Enter property name"
                        variant="outlined"
                      />
                      <Stack direction="row" spacing={2}>
                        {/* Cancel Button */}
                        <Button
                          onClick={() => {
                            setShowNewPropertyField(false);
                            setNewPropertyName('');
                          }}
                          variant="outlined"
                          sx={{
                            borderRadius: 0, // Removed borderRadius
                            width: '100%',
                            paddingY: '12px',
                            color: '#F43F5E',
                            borderColor: '#F43F5E',
                            transition: 'background-color 0.3s, color 0.3s',
                            '&:hover': {
                              backgroundColor: 'rgba(244, 63, 94, 0.1)',
                              color: '#D7344A',
                              borderColor: '#D7344A',
                            },
                          }}
                        >
                          Cancel
                        </Button>
                        {/* Save Button */}
                        <Button
                          onClick={handleAddProperty}
                          variant="contained"
                          sx={{
                            backgroundColor: '#F43F5E',
                            color: 'white',
                            borderRadius: 0, // Removed borderRadius
                            width: '100%',
                            paddingY: '12px',
                            transition: 'background-color 0.3s',
                            '&:hover': {
                              backgroundColor: '#D7344A',
                            },
                          }}
                          disabled={!newPropertyName.trim()}
                        >
                          Save
                        </Button>
                      </Stack>
                    </Stack>
                  </Card>
                </Fade>
              )}
            </Grid>
          </Grid>
        </Box>

        {/* Delete Confirmation Dialog */}
        <Dialog
          open={deleteDialogOpen}
          onClose={closeDeleteDialog}
          aria-labelledby="delete-dialog-title"
          aria-describedby="delete-dialog-description"
        >
          <DialogTitle id="delete-dialog-title">Delete Property</DialogTitle>
          <DialogContent>
            <DialogContentText id="delete-dialog-description">
              Are you sure you want to delete the property "{propertyToDelete?.name}"? This action cannot be undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeDeleteDialog} color="primary" sx={{ borderRadius: 0 }}>
              Cancel
            </Button>
            <Button
              onClick={handleDeleteProperty}
              color="error"
              autoFocus
              sx={{ borderRadius: 0 }}
              disabled={!propertyToDelete} // Disable if propertyToDelete is null
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
}

export default Dashboard;
