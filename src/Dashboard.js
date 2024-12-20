// src/Dashboard.js
import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Grid, Card, CardContent, IconButton, TextField, Collapse } from '@mui/material';
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

function Dashboard() {
  // Initialize state with a try-catch to handle potential JSON parsing errors
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

  // Save properties to localStorage whenever properties change
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
        wifi: 'no',
        wifiName: '',
        wifiPassword: '',
        hasTowels: 'no',
        towelsLocation: '',
        hasExtraSheets: 'no',
        sheetsLocation: '',
        hasCoffeeMachine: 'no',
        coffeeMachineLocation: '',
        hasPullOutSofa: 'no',
        sofaDetails: '',
        hasLocalFood: 'no',
        breakfastSpots: '',
        lunchSpots: '',
        dinnerSpots: '',
        hasThermostat: 'no',
        thermostatLocation: '',
        hasTransportation: 'no',
        transportationDetails: '',
        hasAppliances: 'no',
        applianceDetails: '',
        hasCheckoutProcedures: 'no',
        checkoutDetails: '',
        emergencyContact: '',
        hasFirstAid: 'no',
        firstAidLocation: '',
        nearestHospital: '',
        hasLocalAttractions: 'no',
        attractionsDetails: '',
        conciergeStyle: ''
      }
    };

    // Update state with the new property
    setProperties(prevProperties => [...prevProperties, newProperty]);

    // Reset form
    setNewPropertyName('');
    setShowNewPropertyField(false);
  };

  const handleDeleteProperty = (id) => {
    const updatedProperties = properties.filter((property) => property.id !== id);
    setProperties(updatedProperties);
  };

  return (
    <Box sx={{ flexGrow: 1, padding: { xs: '10px', sm: '20px' }, backgroundColor: '#f5f5f5', display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h5" sx={{ marginBottom: '20px', fontWeight: 600, textAlign: 'center' }}>
        MyHomeChat Properties
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {properties.map((property) => (
          <Grid item xs={12} sm={6} md={4} key={property.id}>
            <Card sx={{ borderRadius: '10px', boxShadow: 3, position: 'relative' }}>
              <IconButton
                onClick={() => handleDeleteProperty(property.id)}
                sx={{
                  position: 'absolute',
                  top: 10,
                  right: 10,
                  color: '#F43F5E',
                }}
                aria-label={`delete ${property.name}`}
              >
                <DeleteIcon />
              </IconButton>

              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  {property.name}
                </Typography>
                <Typography variant="body2" sx={{ color: '#888', marginBottom: '10px' }}>
                  Status: {property.status}
                </Typography>
                <Link to={`/survey/${property.id}`} style={{ textDecoration: 'none' }}>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: '#F43F5E',
                      color: 'white',
                      marginTop: '10px',
                      borderRadius: '30px',
                      width: '100%',
                    }}
                  >
                    Settings
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3} sx={{ marginTop: '30px', justifyContent: 'center' }}>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ borderRadius: '10px', boxShadow: 3 }}>
            <CardContent>
              <Button
                variant="outlined"
                onClick={() => setShowNewPropertyField(!showNewPropertyField)}
                sx={{
                  color: '#F43F5E',
                  borderColor: '#F43F5E',
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: '30px',
                }}
                startIcon={<AddIcon />}
              >
                Add Property
              </Button>

              <Collapse in={showNewPropertyField}>
                <TextField
                  fullWidth
                  value={newPropertyName}
                  onChange={(e) => setNewPropertyName(e.target.value)}
                  placeholder="Enter property name"
                  variant="outlined"
                  sx={{ marginTop: '20px' }}
                />
                <Button
                  onClick={handleAddProperty}
                  variant="contained"
                  sx={{
                    backgroundColor: '#F43F5E',
                    color: 'white',
                    marginTop: '20px',
                    borderRadius: '30px',
                    width: '100%',
                  }}
                  disabled={!newPropertyName.trim()}
                >
                  Save
                </Button>
              </Collapse>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Dashboard;
