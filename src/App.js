import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import Header from './Header';
import Landing from './Landing';
import theme from './theme'; // Import the custom theme

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Header />
        <div style={{ height: 'auto', overflowY: 'auto' }}>
          <Routes>
            <Route path="/" element={<Landing />} />
            {/* Add more routes here as needed */}
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
