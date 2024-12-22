// src/PropertyGallery.js
import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Grid,
  Card,
  CardMedia,
  Typography,
  IconButton,
} from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import DeleteIcon from '@mui/icons-material/Delete';

const PropertyGallery = ({ propertyId }) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    // Fetch existing images from localStorage if available
    try {
      const storedProperties = JSON.parse(localStorage.getItem('properties')) || [];
      const property = storedProperties.find(prop => prop.id === Number(propertyId));

      if (property && property.galleryData) {
        setImages(property.galleryData);
      }
    } catch (error) {
      console.error('Error loading gallery data:', error);
    }
  }, [propertyId]);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map(file => URL.createObjectURL(file));
    setImages(prevImages => [...prevImages, ...newImages]);

    // Save to localStorage
    try {
      const storedProperties = JSON.parse(localStorage.getItem('properties')) || [];
      const updatedProperties = storedProperties.map(prop => {
        if (prop.id === Number(propertyId)) {
          return {
            ...prop,
            galleryData: [...(prop.galleryData || []), ...newImages],
          };
        }
        return prop;
      });
      localStorage.setItem('properties', JSON.stringify(updatedProperties));
      console.log('Gallery updated:', updatedProperties);
    } catch (error) {
      console.error('Error updating gallery data:', error);
    }
  };

  const handleDeleteImage = (index) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);

    // Update localStorage
    try {
      const storedProperties = JSON.parse(localStorage.getItem('properties')) || [];
      const updatedProperties = storedProperties.map(prop => {
        if (prop.id === Number(propertyId)) {
          return {
            ...prop,
            galleryData: updatedImages,
          };
        }
        return prop;
      });
      localStorage.setItem('properties', JSON.stringify(updatedProperties));
      console.log('Gallery updated after deletion:', updatedProperties);
    } catch (error) {
      console.error('Error deleting gallery image:', error);
    }
  };

  return (
    <Box>
      <Button
        variant="contained"
        component="label"
        startIcon={<PhotoCamera />}
        sx={{ mb: 2 }}
      >
        Upload Photos
        <input
          type="file"
          hidden
          multiple
          accept="image/*"
          onChange={handleImageUpload}
        />
      </Button>

      {images.length === 0 ? (
        <Typography variant="body1">No photos uploaded yet.</Typography>
      ) : (
        <Grid container spacing={2}>
          {images.map((src, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Card sx={{ position: 'relative' }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={src}
                  alt={`Property Image ${index + 1}`}
                />
                <IconButton
                  aria-label="delete"
                  onClick={() => handleDeleteImage(index)}
                  sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    backgroundColor: 'rgba(255,255,255,0.7)',
                    '&:hover': {
                      backgroundColor: 'rgba(255,255,255,1)',
                    },
                  }}
                >
                  <DeleteIcon color="error" />
                </IconButton>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default PropertyGallery;
