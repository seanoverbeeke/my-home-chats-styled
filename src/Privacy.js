// src/Privacy.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
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
  Container,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { styled } from '@mui/material/styles';

// Styled Button for Back to Dashboard
const BackButton = styled(Button)(({ theme }) => ({
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
}));

const Privacy = () => {
  const navigate = useNavigate();

  const handleBackToDashboard = () => {
    navigate('/dashboard');
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
          backgroundColor: '#F43F5E',
          color: '#fff',
          padding: 2,
          borderRadius: 0,
          width: '100%',
          boxSizing: 'border-box',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 4,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 500 }}>
          Privacy Policy
        </Typography>
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
            justifyContent: 'flex-start',
            paddingX: { xs: 2, sm: 4 },
          }}
        >
          <BackButton
            variant="text"
            onClick={handleBackToDashboard}
            startIcon={<ArrowBackIcon />}
          >
            Back to Dashboard
          </BackButton>
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
          {/* Content Container */}
          <Container maxWidth="md">
            <Box sx={{ marginBottom: '20px' }}>
              <Typography variant="h4" component="h1" gutterBottom>
                Privacy Statement
              </Typography>
            </Box>
            <Box>
              <Typography variant="body1" paragraph>
                At MyHomeChats, we are committed to protecting your privacy. This Privacy Statement explains how we collect, use, and safeguard your personal information when you use our services.
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>Data Retention:</strong> We only keep your data while your account is active. If you choose to delete your account, we will retain your data for 30 days after the deletion request. After this period, all your data will be permanently deleted from our systems.
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>Information We Collect:</strong> We may collect personal information such as your name, email address, property details, and other information necessary to provide our services.
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>How We Use Your Information:</strong> We use your information to provide, maintain, and improve our services, to communicate with you, and to ensure the security of our platform.
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>Data Security:</strong> We implement appropriate security measures to protect your data from unauthorized access, alteration, disclosure, or destruction.
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>Your Rights:</strong> You have the right to access, correct, or delete your personal information. If you have any questions or requests regarding your data, please contact our support team.
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>Changes to This Privacy Statement:</strong> We may update this Privacy Statement from time to time. Any changes will be posted on this page, and we will notify you of significant updates.
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>Contact Us:</strong> If you have any questions about this Privacy Statement, please contact us at support@myhomechats.com.
              </Typography>
            </Box>
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default Privacy;
