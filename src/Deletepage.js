// src/Deletepage.js
import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// Styled Button for Delete Confirmation
const ConfirmButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#F43F5E',
  color: '#fff',
  textTransform: 'none',
  fontSize: '14px',
  '&:hover': {
    backgroundColor: '#D43852',
  },
  borderRadius: '0px',
}));

const DeletePage = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleDelete = () => {
    if (inputValue.trim().toLowerCase() === 'delete') {
      // Placeholder for actual delete account logic
      console.log('Account deletion confirmed.');
      // Redirect or show a success message as needed
      navigate('/');
    } else {
      setError('Please type "delete" to confirm.');
    }
  };

  const handleBack = () => {
    navigate('/billing');
  };

  return (
    <Box
      sx={{
        padding: { xs: '16px', sm: '24px' },
        maxWidth: '600px',
        width: '100%', // Ensures responsiveness
        margin: '0 auto',
        boxSizing: 'border-box',
        overflowX: 'hidden', // Prevent horizontal scrollbar
        // Hide scrollbars across browsers
        '&::-webkit-scrollbar': {
          display: 'none',
        },
        '-ms-overflow-style': 'none', // IE and Edge
        'scrollbar-width': 'none', // Firefox
      }}
    >
      {/* Back to Billing Button */}
      <Box
        sx={{
          width: '100%',
          margin: '0 0 20px 0',
          display: 'flex',
          justifyContent: 'flex-start',
          paddingX: { xs: 2, sm: 4 },
        }}
      >
        <Button
          variant="text"
          onClick={handleBack}
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
          Back to Billing
        </Button>
      </Box>

      <Paper
        elevation={3}
        sx={{
          padding: { xs: '16px', sm: '24px' },
          width: '95%', // Shrink width by ~5%
          maxWidth: '570px', // Ensure it doesn't exceed 95% of 600px
          margin: '0 auto',
          borderRadius: '0px',
          boxSizing: 'border-box',
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ color: '#F43F5E', textAlign: 'center' }}>
          Delete Account
        </Typography>
        <Typography variant="body1" gutterBottom>
          We will hold your data for 30 days before permanently deleting it. To confirm account deletion, please type the word "delete" below.
        </Typography>
        <TextField
          fullWidth
          label='Type "delete" to confirm'
          variant="outlined"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            if (error) setError('');
          }}
          error={!!error}
          helperText={error}
          sx={{ marginY: '16px' }}
        />
        <ConfirmButton
          fullWidth
          onClick={handleDelete}
        >
          Confirm Deletion
        </ConfirmButton>
      </Paper>
    </Box>
  );
};

export default DeletePage;
