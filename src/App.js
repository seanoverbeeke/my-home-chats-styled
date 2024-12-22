// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, Box } from '@mui/material';
import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';
import Onboarding from './Onboarding';
import Survey from './Survey';
import theme from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Header />
        <Box sx={{ height: 'auto', overflowY: 'auto' }}>
          <Routes>
            <Route path="/" element={<Landing />} />
            {/* Survey Route with propertyId */}
            <Route path="/survey/:propertyId" element={<Survey />} />
            {/* Onboarding Route with propertyId */}
            <Route path="/onboarding/:propertyId" element={<Onboarding />} />
            {/* Dashboard Route */}
            <Route path="/dashboard" element={<Dashboard />} />
            {/* Add more routes here as needed */}
          </Routes>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
