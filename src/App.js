// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, Box, Typography, Button } from '@mui/material'; // Added Typography and Button
import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';
import Onboarding from './Onboarding';
import Survey from './Survey';
import Activate from './Activate'; // Import Activate component
import Billing from './Billing'; // Import Billing component
import DeletePage from './Deletepage'; // Import DeletePage component
import Privacy from './Privacy'; // Import Privacy component
import theme from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        {/* Header is already included in Onboarding and Activate pages.
            If Header in App.js is redundant, you might consider removing it.
            Otherwise, ensure consistency across all pages. */}
        <Header />
        <Box sx={{ height: 'auto', overflowY: 'auto' }}>
          <Routes>
            <Route path="/" element={<Landing />} />
            {/* Survey Route with propertyId */}
            <Route path="/survey/:propertyId" element={<Survey />} />
            {/* Onboarding Route with propertyId */}
            <Route path="/onboarding/:propertyId" element={<Onboarding />} />
            {/* Activate Route with propertyId */}
            <Route path="/activate/:propertyId" element={<Activate />} />
            {/* Dashboard Route */}
            <Route path="/dashboard" element={<Dashboard />} />
            {/* Billing Route */}
            <Route path="/billing" element={<Billing />} />
            {/* Delete Account Route */}
            <Route path="/delete-account" element={<DeletePage />} />
            {/* Privacy Policy Route */}
            <Route path="/privacy" element={<Privacy />} />
            {/* Add more routes here as needed */}
            {/* Optional: Catch-all route for 404 Not Found */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

// Optional: 404 Not Found Component
const NotFound = () => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      textAlign: 'center',
      padding: '20px',
    }}
  >
    <Typography variant="h3" gutterBottom>
      404 - Page Not Found
    </Typography>
    <Typography variant="body1" gutterBottom>
      Oops! The page you're looking for doesn't exist.
    </Typography>
    <Button variant="contained" color="primary" href="/">
      Go to Home
    </Button>
  </Box>
);

export default App;
