// src/PropertyProfile.js
import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, TextField, Paper } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';

// Styled Buttons with Branding Color
const SaveButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#F43F5E',
  color: '#fff',
  textTransform: 'none',
  '&:hover': {
    backgroundColor: '#D43852',
  },
}));

const CancelButton = styled(Button)(({ theme }) => ({
  borderColor: '#F43F5E',
  color: '#F43F5E',
  textTransform: 'none',
  '&:hover': {
    backgroundColor: 'rgba(244,63,94, 0.08)',
    borderColor: '#D43852',
    color: '#D43852',
  },
}));

const PropertyProfile = ({ propertyId, onPropertyNameChange }) => {
  const [propertyName, setPropertyName] = useState('');
  const [tempPropertyName, setTempPropertyName] = useState('');

  useEffect(() => {
    // Fetch propertyName based on propertyId from localStorage
    try {
      const storedProperties = JSON.parse(localStorage.getItem('properties')) || [];
      const property = storedProperties.find(prop => prop.id === Number(propertyId));

      if (property) {
        setPropertyName(property.name || '');
        setTempPropertyName(property.name || ''); // Initialize tempPropertyName
      } else {
        console.error('Property not found for ID:', propertyId);
      }
    } catch (error) {
      console.error('Error loading property data:', error);
    }
  }, [propertyId]);

  const handleCancel = () => {
    // Discard changes and collapse the section
    setTempPropertyName(propertyName);
    // Call the callback to collapse the section without changing the name
    if (onPropertyNameChange && typeof onPropertyNameChange === 'function') {
      onPropertyNameChange();
    }
  };

  const handleSave = () => {
    if (tempPropertyName.trim() === '') return;

    const newPropertyName = tempPropertyName.trim();
    setPropertyName(newPropertyName);

    // Update propertyName in localStorage
    try {
      const storedProperties = JSON.parse(localStorage.getItem('properties')) || [];
      const updatedProperties = storedProperties.map(prop => {
        if (prop.id === Number(propertyId)) {
          return { ...prop, name: newPropertyName };
        }
        return prop;
      });
      localStorage.setItem('properties', JSON.stringify(updatedProperties));
      console.log('Property name updated:', newPropertyName);

      // Call the callback to update the navbar in Onboarding.js and collapse the section
      if (onPropertyNameChange && typeof onPropertyNameChange === 'function') {
        onPropertyNameChange(newPropertyName);
      }
    } catch (error) {
      console.error('Error updating property name:', error);
    }
  };

  return (
    <Paper
      elevation={1}
      sx={{
        padding: 2,
        backgroundColor: '#fafafa',
        borderRadius: 1,
      }}
    >
      <Box>
        <TextField
          label="Property Name"
          variant="outlined"
          fullWidth
          value={tempPropertyName}
          onChange={(e) => setTempPropertyName(e.target.value)}
          sx={{ marginBottom: 2, borderRadius: '0px' }}
          placeholder="Enter your property name"
        />
        <Box sx={{ display: 'flex', gap: 2 }}>
          <CancelButton
            variant="outlined"
            startIcon={<CancelIcon />}
            onClick={handleCancel}
          >
            Cancel
          </CancelButton>
          <SaveButton
            variant="contained"
            startIcon={<SaveIcon />}
            onClick={handleSave}
            disabled={tempPropertyName.trim() === ''}
          >
            Save
          </SaveButton>
        </Box>
      </Box>
    </Paper>
  );
};

// Define PropTypes for better type checking
PropertyProfile.propTypes = {
  propertyId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  onPropertyNameChange: PropTypes.func.isRequired,
};

export default PropertyProfile;
