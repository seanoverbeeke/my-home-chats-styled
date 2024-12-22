// src/Activate.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
  Paper,
  GlobalStyles,
  Snackbar,
  Alert,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { styled } from '@mui/material/styles';

// Styled Button for Subscribe
const SubscribeButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#F43F5E', // Branding Primary Color
  color: '#fff',
  textTransform: 'none',
  fontSize: '16px',
  '&:hover': {
    backgroundColor: '#D43852', // Darker shade for hover
  },
  borderRadius: '0px',
  padding: '12px 24px',
}));

const Activate = () => {
  const { propertyId } = useParams();
  const navigate = useNavigate();
  const [propertyName, setPropertyName] = useState('');

  // Snackbar state for activation message
  const [snackbarOpen, setSnackbarOpen] = useState(false);

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

    // Trigger Snackbar when component mounts
    const hasSeenSnackbar = localStorage.getItem(`hasSeenActivateSnackbar_${propertyId}`);
    if (!hasSeenSnackbar) {
      setSnackbarOpen(true);
      localStorage.setItem(`hasSeenActivateSnackbar_${propertyId}`, 'true');
    }
  }, [propertyId]);

  // Navigate back to the dashboard
  const handleBackToDashboard = () => {
    navigate('/dashboard'); // Adjust the path if your dashboard route is different
  };

  // Handle Snackbar close
  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  // Handle Subscribe button click
  const handleSubscribe = () => {
    // Navigate to Stripe payment portal or handle subscription logic here
    navigate('/payment'); // Adjust the path as needed
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
              {/* Activation Card */}
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
                  <CardContent>
                    <Typography variant="h5" sx={{ fontWeight: 600, marginBottom: '20px' }}>
                      You're Almost There!
                    </Typography>
                    <Typography variant="body1" sx={{ marginBottom: '20px' }}>
                      Unlock the full potential of your property management with our premium features. For just{' '}
                      <strong>$11.99/month per property</strong>, gain access to:
                    </Typography>

                    <Grid container spacing={2}>
                      {/* Feature 1 */}
                      <Grid item xs={12} sm={6}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Box
                            sx={{
                              width: '10px',
                              height: '10px',
                              backgroundColor: '#F43F5E',
                              borderRadius: '50%',
                              marginRight: '10px',
                            }}
                          ></Box>
                          <Typography variant="body1">24/7 Tech Support</Typography>
                        </Box>
                      </Grid>

                      {/* Feature 2 */}
                      <Grid item xs={12} sm={6}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Box
                            sx={{
                              width: '10px',
                              height: '10px',
                              backgroundColor: '#F43F5E',
                              borderRadius: '50%',
                              marginRight: '10px',
                            }}
                          ></Box>
                          <Typography variant="body1">Cancel Anytime</Typography>
                        </Box>
                      </Grid>

                      {/* Feature 3 */}
                      <Grid item xs={12} sm={6}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Box
                            sx={{
                              width: '10px',
                              height: '10px',
                              backgroundColor: '#F43F5E',
                              borderRadius: '50%',
                              marginRight: '10px',
                            }}
                          ></Box>
                          <Typography variant="body1">
                            Friendly AI Concierge for Guest Support
                          </Typography>
                        </Box>
                      </Grid>

                      {/* Feature 4 */}
                      <Grid item xs={12} sm={6}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Box
                            sx={{
                              width: '10px',
                              height: '10px',
                              backgroundColor: '#F43F5E',
                              borderRadius: '50%',
                              marginRight: '10px',
                            }}
                          ></Box>
                          <Typography variant="body1">Instant Guest Communication</Typography>
                        </Box>
                      </Grid>
                    </Grid>

                    <Typography variant="body1" sx={{ marginTop: '20px' }}>
                      Experience seamless property management and elevate your guests' stay with our intelligent solutions.
                    </Typography>

                    {/* Subscribe Button */}
                    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
                      <SubscribeButton onClick={handleSubscribe}>
                        SUBSCRIBE
                      </SubscribeButton>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>

      {/* Customized Centered Activation Snackbar */}
      <Snackbar
        open={snackbarOpen}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'center', horizontal: 'center' }} // Centering both vertically and horizontally
        sx={{
          // Override default positioning
          '& .MuiSnackbar-root': {
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '90%', // Adjust as needed for responsiveness
            maxWidth: '600px', // Maximum width for larger screens
          },
        }}
      >
        <Alert 
          onClose={handleSnackbarClose} 
          severity="success" 
          sx={{ 
            width: '100%', 
            borderRadius: '0px',
            backgroundColor: '#F43F5E', // Branding Primary Color
            color: '#fff',               // Text color
          }}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={handleSnackbarClose}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          <Typography variant="h6" gutterBottom>
            Ready to Elevate Your Property?
          </Typography>
          <Typography variant="body1">
            Subscribe now and start offering your guests unparalleled support with our AI Concierge. Enjoy peace of mind with 24/7 tech support and the flexibility to cancel anytime.
          </Typography>
        </Alert>
      </Snackbar>
    </>
  );
};

export default Activate;
