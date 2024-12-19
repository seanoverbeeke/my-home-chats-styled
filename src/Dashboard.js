// src/Dashboard.js
import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Grid, Card, CardContent, IconButton, TextField, Collapse } from '@mui/material';
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

function Dashboard() {
  // Initialize with data from localStorage or empty array
  const [properties, setProperties] = useState(() => {
    const savedProperties = localStorage.getItem('properties');
    return savedProperties ? JSON.parse(savedProperties) : [];
  });
  const [newPropertyName, setNewPropertyName] = useState('');
  const [showNewPropertyField, setShowNewPropertyField] = useState(false);

  useEffect(() => {
    localStorage.setItem('properties', JSON.stringify(properties));
  }, [properties]);

  const handleAddProperty = () => {
    if (newPropertyName.trim() === '') return;
    const newProperty = {
      id: Date.now(), // Use timestamp as unique ID
      name: newPropertyName.trim(),
      status: 'Active',
      bio: '',
      surveyData: {}
    };
    setProperties([...properties, newProperty]);
    setNewPropertyName('');
    setShowNewPropertyField(false);
  };

  const handleDeleteProperty = (id) => {
    const updatedProperties = properties.filter((property) => property.id !== id);
    setProperties(updatedProperties);
  };

  return (
    <Box sx={{ flexGrow: 1, padding: { xs: '10px', sm: '20px' }, backgroundColor: '#f5f5f5', display: 'flex', flexDirection: 'column' }}>
      {/* MyHomeChat Properties Section */}
      <Typography variant="h5" sx={{ marginBottom: '20px', fontWeight: 600, textAlign: 'center' }}>
        MyHomeChat Properties
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {properties.map((property) => (
          <Grid item xs={12} sm={6} md={4} key={property.id}>
            <Card sx={{ borderRadius: '10px', boxShadow: 3, position: 'relative' }}>
              {/* Delete Button */}
              <IconButton
                onClick={() => handleDeleteProperty(property.id)}
                sx={{
                  position: 'absolute',
                  top: 10,
                  right: 10,
                  color: '#F43F5E',
                }}
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
                    Settings {/* Changed from "Setup" to "Settings" */}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Add Property Section */}
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
              >
                <AddIcon sx={{ marginRight: '10px' }} />
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
