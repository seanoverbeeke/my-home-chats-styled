import React from 'react';
import { Box, Typography, Grid, Button } from '@mui/material'; // Import Button here
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FaceRetouchingNaturalIcon from '@mui/icons-material/FaceRetouchingNatural';
import InsightsIcon from '@mui/icons-material/Insights';

function Landing() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: '100vh',
        textAlign: 'center',
        fontFamily: 'Inter, sans-serif',
        paddingTop: '50px',
        overflowY: 'scroll',
      }}
    >
      {/* Header Text */}
      <Typography
        variant="h4"
        sx={{
          fontWeight: 600,
          fontSize: { xs: '2rem', sm: '3rem' },
          marginTop: '20px',
        }}
      >
        Your Property's Smart AI Assistant
      </Typography>

      {/* Text Description */}
      <Typography
        variant="h5"
        sx={{
          fontWeight: 400,
          maxWidth: '800px',
          marginTop: '20px',
          textAlign: 'center',
          padding: '0 20px',
        }}
      >
        Create personalized AI chatbots for each of your rental properties. Provide instant
        support to your guests 24/7.
      </Typography>

      {/* Image Block */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '30px',
          marginBottom: '20px',
          width: '100%',
        }}
      >
        <img
          src="/img/phoneapp.png"
          alt="Smart AI Assistant"
          style={{
            width: '100%',
            maxWidth: '300px',
            height: 'auto',
            visibility: 'visible',
          }}
        />
      </Box>

      {/* Action Buttons */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          marginTop: '30px',
          width: '100%',
          alignItems: 'center',
        }}
      >
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#F43F5E', // MyHomeChats logo color
            color: 'white',
            padding: '12px 40px',
            borderRadius: '30px',
            '&:hover': {
              backgroundColor: '#D43852',
            },
            width: '100%',
            maxWidth: '250px',
          }}
        >
          Let's Go
        </Button>

        <Button
          variant="outlined"
          sx={{
            color: '#000',
            borderColor: '#000',
            padding: '12px 40px',
            borderRadius: '30px',
            '&:hover': {
              backgroundColor: '#f5f5f5',
            },
            width: '100%',
            maxWidth: '250px',
          }}
        >
          Watch Demo
        </Button>
      </Box>

      {/* Features Section */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: '50px',
          width: '100%',
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: 600,
            fontSize: { xs: '2rem', sm: '2.5rem' },
            marginBottom: '30px',
          }}
        >
          Features
        </Typography>

        <Grid
          container
          spacing={3}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: '20px',
            width: '100%',
            padding: '0 20px',
          }}
        >
          {/* 24/7 Instant Support */}
          <Grid item xs={12} sm={4}>
            <Box
              sx={{
                backgroundColor: '#f5f5f5',
                padding: '30px',
                borderRadius: '15px',
                textAlign: 'center',
                boxShadow: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <AccessTimeIcon sx={{ fontSize: '50px', color: '#F43F5E' }} />
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  marginTop: '20px',
                }}
              >
                24/7 Instant Support
              </Typography>
              <Typography
                sx={{
                  fontWeight: 400,
                  marginTop: '10px',
                }}
              >
                Never miss a guest inquiry. Your AI assistant responds instantly at any time.
              </Typography>
            </Box>
          </Grid>

          {/* Personalized AI */}
          <Grid item xs={12} sm={4}>
            <Box
              sx={{
                backgroundColor: '#f5f5f5',
                padding: '30px',
                borderRadius: '15px',
                textAlign: 'center',
                boxShadow: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <FaceRetouchingNaturalIcon sx={{ fontSize: '50px', color: '#F43F5E' }} />
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  marginTop: '20px',
                }}
              >
                Personalized AI
              </Typography>
              <Typography
                sx={{
                  fontWeight: 400,
                  marginTop: '10px',
                }}
              >
                Each property gets its own AI chatbot trained on your specific amenities and rules.
              </Typography>
            </Box>
          </Grid>

          {/* Boost Bookings */}
          <Grid item xs={12} sm={4}>
            <Box
              sx={{
                backgroundColor: '#f5f5f5',
                padding: '30px',
                borderRadius: '15px',
                textAlign: 'center',
                boxShadow: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <InsightsIcon sx={{ fontSize: '50px', color: '#F43F5E' }} />
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  marginTop: '20px',
                }}
              >
                Boost Bookings
              </Typography>
              <Typography
                sx={{
                  fontWeight: 400,
                  marginTop: '10px',
                }}
              >
                Your guests will leave happy and want to book again.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default Landing;
