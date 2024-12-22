// src/Onboarding.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Card,
  CardHeader,
  CardContent,
  Button,
  Collapse,
  Grid,
  Paper,
  GlobalStyles,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PropertyProfile from './Propertyprofile';
import Survey from './Survey';
import PropertyGallery from './Propertygallery';
import { styled } from '@mui/material/styles';

// Styled Button for Setup
const SetupButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#F43F5E',
  color: '#fff',
  textTransform: 'none',
  fontSize: '14px',
  '&:hover': {
    backgroundColor: '#D43852',
  },
  borderRadius: '0px',
}));

const Onboarding = () => {
  const { propertyId } = useParams();
  const navigate = useNavigate();
  const [expandedSection, setExpandedSection] = useState(null);
  const [propertyName, setPropertyName] = useState('');

  useEffect(() => {
    // Fetch propertyName based on propertyId from localStorage
    try {
      const storedProperties = JSON.parse(localStorage.getItem('properties')) || [];
      const property = storedProperties.find(prop => prop.id === Number(propertyId));

      if (property) {
        setPropertyName(property.name || '');
      } else {
        console.error('Property not found for ID:', propertyId);
      }
    } catch (error) {
      console.error('Error loading property data:', error);
    }
  }, [propertyId]);

  const handleExpandClick = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  // Navigate back to the dashboard
  const handleBackToDashboard = () => {
    navigate('/dashboard'); // Adjust the path if your dashboard route is different
  };

  // Callback function to collapse the Concierge Training section
  const handleSurveyClose = () => {
    setExpandedSection(null);
  };

  // Callback function to update propertyName and collapse the Property Profile section
  const handlePropertyNameChange = (newName) => {
    if (newName) {
      setPropertyName(newName);
    }
    setExpandedSection(null);
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

      {/* Navbar */}
      <Paper
        elevation={3}
        sx={{
          backgroundColor: '#F43F5E', // Matching Dashboard.js primary color
          color: '#fff',
          padding: 2,
          borderRadius: 0,
          width: '100%',
          boxSizing: 'border-box',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 4, // Space below the navbar
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 500 }}>
          {propertyName || 'Property Name'}
        </Typography>
        {/* Add more Navbar items here if needed */}
      </Paper>

      {/* Main Container */}
      <Box
        sx={{
          flexGrow: 1,
          padding: { xs: '16px', sm: '32px' },
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        {/* Back to Dashboard Button */}
        <Box
          sx={{
            width: '100%',
            maxWidth: '800px',
            margin: '0 auto 20px auto',
            display: 'flex',
            justifyContent: 'flex-start', // Align to the left
            paddingX: { xs: 2, sm: 4 }, // Optional: Add some horizontal padding
          }}
        >
          <Button
            variant="text"
            onClick={handleBackToDashboard}
            startIcon={<ArrowBackIcon />}
            sx={{
              color: '#F43F5E',
              textTransform: 'none',
              whiteSpace: 'nowrap',
              '&:hover': {
                backgroundColor: 'transparent',
                color: '#D43852',
              },
              borderRadius: '0px',
              paddingX: 0,
              fontSize: '16px',
            }}
          >
            Back to Dashboard
          </Button>
        </Box>

        {/* Scrollable Content Area */}
        <Box
          sx={{
            flexGrow: 1,
            overflowY: 'auto',
            paddingRight: '4px',
            paddingTop: '15px',
          }}
        >
          {/* Cards Container */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center', // Center the Grid
              paddingX: { xs: 2, sm: 4 },
            }}
          >
            <Grid container spacing={3} sx={{ maxWidth: '1200px', width: '100%' }}>
              {/* Property Profile Card */}
              <Grid item xs={12} md={6}>
                <Card
                  sx={{
                    borderRadius: '0px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    '&:hover': {
                      transform: 'translateY(-6px)',
                      boxShadow: '0 12px 24px rgba(0,0,0,0.2)',
                      zIndex: 2,
                    },
                  }}
                >
                  <CardHeader
                    title="Property Profile"
                    titleTypographyProps={{ variant: 'h6', fontWeight: 500, fontSize: '18px' }}
                    action={
                      <SetupButton onClick={() => handleExpandClick('profile')}>
                        {expandedSection === 'profile' ? 'Close' : 'Setup'}
                      </SetupButton>
                    }
                  />
                  <Collapse in={expandedSection === 'profile'} timeout="auto" unmountOnExit>
                    <CardContent>
                      <PropertyProfile 
                        propertyId={propertyId} 
                        onPropertyNameChange={handlePropertyNameChange} 
                      />
                    </CardContent>
                  </Collapse>
                </Card>
              </Grid>

              {/* Concierge Training Card */}
              <Grid item xs={12} md={6}>
                <Card
                  sx={{
                    borderRadius: '0px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    '&:hover': {
                      transform: 'translateY(-6px)',
                      boxShadow: '0 12px 24px rgba(0,0,0,0.2)',
                      zIndex: 2,
                    },
                  }}
                >
                  <CardHeader
                    title="Concierge Training"
                    titleTypographyProps={{ variant: 'h6', fontWeight: 500, fontSize: '18px' }}
                    action={
                      <SetupButton onClick={() => handleExpandClick('concierge')}>
                        {expandedSection === 'concierge' ? 'Close' : 'Setup'}
                      </SetupButton>
                    }
                  />
                  <Collapse in={expandedSection === 'concierge'} timeout="auto" unmountOnExit>
                    <CardContent>
                      <Survey propertyId={propertyId} onClose={handleSurveyClose} />
                    </CardContent>
                  </Collapse>
                </Card>
              </Grid>

              {/* Property Gallery Card */}
              <Grid item xs={12}>
                <Card
                  sx={{
                    borderRadius: '0px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    '&:hover': {
                      transform: 'translateY(-6px)',
                      boxShadow: '0 12px 24px rgba(0,0,0,0.2)',
                      zIndex: 2,
                    },
                  }}
                >
                  <CardHeader
                    title="Property Gallery"
                    titleTypographyProps={{ variant: 'h6', fontWeight: 500, fontSize: '18px' }}
                    action={
                      <SetupButton onClick={() => handleExpandClick('gallery')}>
                        {expandedSection === 'gallery' ? 'Close' : 'Setup'}
                      </SetupButton>
                    }
                  />
                  <Collapse in={expandedSection === 'gallery'} timeout="auto" unmountOnExit>
                    <CardContent>
                      <PropertyGallery propertyId={propertyId} />
                    </CardContent>
                  </Collapse>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Onboarding;
