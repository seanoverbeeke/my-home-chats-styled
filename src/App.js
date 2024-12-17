// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Header';  // Import the Header component
import Landing from './Landing';  // Import the Landing component

function App() {
  return (
    <Router>
      <div className="App">
        <Header />  {/* Include Header at the top */}

        {/* Set up routes */}
        <Routes>
          <Route path="/" element={<Landing />} />  {/* Landing page */}
          {/* Add other routes as needed here */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
