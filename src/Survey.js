// src/Survey.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  TextField,
  Collapse,
  FormControl,
  ButtonGroup,
  LinearProgress,
  Grid,
  IconButton
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; // Importing ArrowBackIcon

function Survey() {
  const { propertyId } = useParams();
  const navigate = useNavigate(); // Hook for navigation

  // State for survey data
  const [formData, setFormData] = useState({
    hostInfo: '',
    wifi: 'no',
    wifiName: '',
    wifiPassword: '',
    hasTowels: 'no',
    towelsLocation: '',
    hasExtraSheets: 'no',
    sheetsLocation: '',
    hasCoffeeMachine: 'no',
    coffeeMachineLocation: '',
    hasPullOutSofa: 'no',
    sofaDetails: '',
    hasLocalFood: 'no',
    breakfastSpots: '',
    lunchSpots: '',
    dinnerSpots: '',
    hasThermostat: 'no',
    thermostatLocation: '',
    hasTransportation: 'no',
    transportationDetails: '',
    hasAppliances: 'no',
    applianceDetails: '',
    hasCheckoutProcedures: 'no',
    checkoutDetails: '',
    emergencyContact: '',
    hasFirstAid: 'no',
    firstAidLocation: '',
    nearestHospital: '',
    hasLocalAttractions: 'no',
    attractionsDetails: '',
    conciergeStyle: ''
  });

  // State for property name
  const [propertyName, setPropertyName] = useState('');

  // State to track if survey data is being edited
  const [isEditingSurveyData, setIsEditingSurveyData] = useState(false);

  // State for progress bar
  const [progress, setProgress] = useState(0);

  // State to track if property name is being edited
  const [isEditingPropertyName, setIsEditingPropertyName] = useState(false);

  // Temporary state for editing property name
  const [tempPropertyName, setTempPropertyName] = useState('');

  useEffect(() => {
    // Load property data from localStorage
    const storedProperties = JSON.parse(localStorage.getItem('properties')) || [];
    const property = storedProperties.find(prop => prop.id === parseInt(propertyId));

    if (property) {
      // Set property name
      setPropertyName(property.name || '');

      // Set survey data
      if (property.surveyData) {
        setFormData(property.surveyData);
        calculateProgress(property.surveyData);
      }
    }
  }, [propertyId]);

  useEffect(() => {
    // Update localStorage whenever formData changes
    const storedProperties = JSON.parse(localStorage.getItem('properties')) || [];
    const updatedProperties = storedProperties.map(prop => {
      if (prop.id === parseInt(propertyId)) {
        return { ...prop, surveyData: formData };
      }
      return prop;
    });
    localStorage.setItem('properties', JSON.stringify(updatedProperties));
    calculateProgress(formData);
  }, [formData, propertyId]);

  // Update localStorage when propertyName changes
  useEffect(() => {
    if (propertyName === '') return; // Avoid updating if propertyName is not set

    const storedProperties = JSON.parse(localStorage.getItem('properties')) || [];
    const updatedProperties = storedProperties.map(prop => {
      if (prop.id === parseInt(propertyId)) {
        return { ...prop, name: propertyName };
      }
      return prop;
    });
    localStorage.setItem('properties', JSON.stringify(updatedProperties));
  }, [propertyName, propertyId]);

  const calculateProgress = (data) => {
    const totalQuestions = Object.keys(data).length;
    const answered = Object.values(data).filter(value => value !== '' && value !== 'no').length;
    const progressPercent = Math.round((answered / totalQuestions) * 100);
    setProgress(progressPercent);
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Handlers for Property Name Editing
  const handleEditPropertyName = () => {
    setTempPropertyName(propertyName);
    setIsEditingPropertyName(true);
  };

  const handleCancelEditPropertyName = () => {
    setIsEditingPropertyName(false);
  };

  const handleSavePropertyName = () => {
    if (tempPropertyName.trim() === '') {
      // Replace alert with a more user-friendly notification if desired
      alert('Property name cannot be empty.');
      return;
    }
    setPropertyName(tempPropertyName.trim());
    setIsEditingPropertyName(false);
  };

  // Handlers for Survey Data Editing
  const handleEditSurveyData = () => {
    setIsEditingSurveyData(true);
  };

  const handleCancelSurveyEdit = () => {
    // Reload data from localStorage to discard changes
    const storedProperties = JSON.parse(localStorage.getItem('properties')) || [];
    const property = storedProperties.find(prop => prop.id === parseInt(propertyId));
    if (property && property.surveyData) {
      setFormData(property.surveyData);
      calculateProgress(property.surveyData);
    }
    setIsEditingSurveyData(false);
  };

  const handleSaveSurveyData = () => {
    setIsEditingSurveyData(false);
    alert('Survey data saved successfully!');
  };

  // Handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditingSurveyData(false);
    alert('Survey data saved successfully!');
    // Additional actions can be added here
  };

  // Handler for navigating back to the dashboard
  const handleBackToDashboard = () => {
    navigate('/dashboard'); // Adjust the path if your dashboard route is different
  };

  // Questions configuration
  const questions = [
    {
      mainQuestion: 'Does your property have WiFi?',
      field: 'wifi',
      followUp: [
        { label: 'WiFi Network Name', field: 'wifiName' },
        { label: 'WiFi Password', field: 'wifiPassword' }
      ]
    },
    {
      mainQuestion: 'Are there towels available for guests?',
      field: 'hasTowels',
      followUp: [{ label: 'Where are the towels located?', field: 'towelsLocation' }]
    },
    {
      mainQuestion: 'Are there extra bed sheets available?',
      field: 'hasExtraSheets',
      followUp: [{ label: 'Where are the extra sheets located?', field: 'sheetsLocation' }]
    },
    {
      mainQuestion: 'Is there a coffee machine?',
      field: 'hasCoffeeMachine',
      followUp: [{ label: 'Where is the coffee machine located?', field: 'coffeeMachineLocation' }]
    },
    {
      mainQuestion: 'Are there any pull-out sofas?',
      field: 'hasPullOutSofa',
      followUp: [{ label: 'Please describe the pull-out sofa locations and instructions', field: 'sofaDetails' }]
    },
    {
      mainQuestion: 'Would you like to share local food recommendations?',
      field: 'hasLocalFood',
      followUp: [
        { label: 'Recommended breakfast spots', field: 'breakfastSpots' },
        { label: 'Recommended lunch spots', field: 'lunchSpots' },
        { label: 'Recommended dinner spots', field: 'dinnerSpots' }
      ]
    },
    {
      mainQuestion: 'Is there a thermostat?',
      field: 'hasThermostat',
      followUp: [{ label: 'Where is the thermostat located and are there any special instructions?', field: 'thermostatLocation' }]
    },
    {
      mainQuestion: 'Are there local transportation options?',
      field: 'hasTransportation',
      followUp: [{ label: 'Please describe the transportation options', field: 'transportationDetails' }]
    },
    {
      mainQuestion: 'Are there any special appliance instructions?',
      field: 'hasAppliances',
      followUp: [{ label: 'Please provide details about appliance usage', field: 'applianceDetails' }]
    },
    {
      mainQuestion: 'Are there specific checkout procedures?',
      field: 'hasCheckoutProcedures',
      followUp: [{ label: 'Please describe the checkout procedures', field: 'checkoutDetails' }]
    },
    {
      mainQuestion: 'Is there a first aid kit?',
      field: 'hasFirstAid',
      followUp: [{ label: 'Where is the first aid kit located?', field: 'firstAidLocation' }]
    },
    {
      mainQuestion: 'Are there local attractions or activities you want to recommend?',
      field: 'hasLocalAttractions',
      followUp: [{ label: 'Please describe the local attractions and activities', field: 'attractionsDetails' }]
    }
  ];

  // Function to check if any survey data exists
  const hasSurveyData = () => {
    for (let key in formData) {
      if (formData[key] !== '' && formData[key] !== 'no') {
        return true;
      }
    }
    return false;
  };

  // Function to render saved survey data in read-only mode
  const renderSavedSurveyData = () => {
    return (
      <Box sx={{ width: '100%', maxWidth: '600px' }}>
        {/* Initial host information */}
        <Typography variant="h6" sx={{ fontWeight: 500, marginBottom: '10px' }}>
          What would you like your guests to know about their hosts?
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: '30px' }}>
          {formData.hostInfo || 'N/A'}
        </Typography>

        {/* Display dynamic questions */}
        {questions.map((question, index) => (
          <Box key={index} sx={{ marginBottom: '30px' }}>
            <Typography variant="h6" sx={{ fontWeight: 500, marginBottom: '10px' }}>
              {question.mainQuestion}
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: '10px' }}>
              {formData[question.field] === 'yes' ? 'Yes' : 'No'}
            </Typography>
            {formData[question.field] === 'yes' && question.followUp.map((followUpQ, fIndex) => (
              <Box key={fIndex} sx={{ marginLeft: '20px', marginBottom: '10px' }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                  {followUpQ.label}
                </Typography>
                <Typography variant="body2">
                  {formData[followUpQ.field] || 'N/A'}
                </Typography>
              </Box>
            ))}
          </Box>
        ))}

        {/* Concierge Style */}
        <Typography variant="h6" sx={{ fontWeight: 500, marginBottom: '10px' }}>
          What style would you like your Concierge to have? (i.e. Funny, Serious, Helpful, Professional, Casual)
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: '30px' }}>
          {formData.conciergeStyle || 'N/A'}
        </Typography>

        {/* Edit Button */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
          <Button
            variant="contained"
            startIcon={<EditIcon />}
            onClick={handleEditSurveyData}
            sx={{
              backgroundColor: '#F43F5E',
              color: 'white',
              borderRadius: '30px',
              '&:hover': {
                backgroundColor: '#D43852',
              },
            }}
          >
            Edit
          </Button>
        </Box>
      </Box>
    );
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        fontFamily: 'Inter, sans-serif',
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
      }}
    >
{/* Back to Dashboard Button */}
<Box sx={{ width: '100%', maxWidth: '600px', marginBottom: '20px' }}>
  <Button
    variant="text"
    onClick={handleBackToDashboard}
    startIcon={<ArrowBackIcon />} // Adding ArrowBackIcon to the left
    sx={{
      color: '#F43F5E',
      textTransform: 'none',
      whiteSpace: 'nowrap', // Prevent text from wrapping
      '&:hover': {
        backgroundColor: 'transparent',
        color: '#D43852',
      },
      borderRadius: '30px',
      // Remove or adjust the width
      // width: '100px', // Removed to allow automatic sizing
      // Alternatively, set a larger width if needed
      // width: '200px',
      paddingX: 0, // Optional: Adds horizontal padding
    }}
  >
    Back to Dashboard
  </Button>
</Box>


      {/* Property Settings Header */}
      <Box
        sx={{
          width: '100%',
          bgcolor: '#F43F5E',
          padding: '15px',
          textAlign: 'center',
          color: 'white',
          marginBottom: '20px',
          borderRadius: '10px',
        }}
      >
        <Typography
          variant="h6" // Changed from h8 to h6
          sx={{
            fontWeight: 600,
            letterSpacing: '1px',
          }}
        >
          PROPERTY SETTINGS
        </Typography>
      </Box>

      {/* Property Name Section */}
      <Box
        sx={{
          width: '90%',
          maxWidth: '600px',
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: 3,
          marginBottom: '30px',
        }}
      >
        {!isEditingPropertyName ? (
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography variant="h8" sx={{ fontWeight: 500 }}> {/* Changed variant to h6 */}
                Property Name: {propertyName || 'N/A'}
              </Typography>
            </Grid>
            <Grid item>
              <IconButton onClick={handleEditPropertyName} color="primary" aria-label="edit property name">
                <EditIcon />
              </IconButton>
            </Grid>
          </Grid>
        ) : (
          <Box>
            <TextField
              fullWidth
              value={tempPropertyName}
              onChange={(e) => setTempPropertyName(e.target.value)}
              variant="outlined"
              label="Property Name"
              sx={{ marginBottom: '20px' }}
            />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                variant="outlined"
                startIcon={<CancelIcon />}
                onClick={handleCancelEditPropertyName}
                sx={{
                  color: '#F43F5E',
                  borderColor: '#F43F5E',
                  marginRight: '10px',
                  borderRadius: '30px',
                }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                startIcon={<SaveIcon />}
                onClick={handleSavePropertyName}
                sx={{
                  backgroundColor: '#F43F5E',
                  color: 'white',
                  borderRadius: '30px',
                  '&:hover': {
                    backgroundColor: '#D43852',
                  },
                }}
                disabled={tempPropertyName.trim() === ''}
              >
                Save
              </Button>
            </Box>
          </Box>
        )}
      </Box>

      {/* Concierge Training Header */}
      <Box
        sx={{
          width: '100%',
          bgcolor: '#F43F5E',
          padding: '15px',
          textAlign: 'center',
          color: 'white',
          marginBottom: '20px',
          borderRadius: '10px',
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            letterSpacing: '1px',
          }}
        >
          CONCIERGE TRAINING
        </Typography>
      </Box>

      {/* Progress Bar */}
      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{ width: '100%', maxWidth: '600px', marginBottom: '20px', borderRadius: '10px' }}
      />

      {/* Concierge Training Section */}
      {!isEditingSurveyData && hasSurveyData() ? (
        renderSavedSurveyData()
      ) : (
        <Box sx={{ width: '100%', maxWidth: '600px' }}>
          <form onSubmit={handleSubmit}>
            {/* Initial host information */}
            <Typography variant="h6" sx={{ fontWeight: 500, marginBottom: '10px' }}>
              What would you like your guests to know about their hosts?
            </Typography>
            <TextField
              fullWidth
              name="hostInfo"
              value={formData.hostInfo}
              onChange={(e) => handleChange('hostInfo', e.target.value)}
              variant="outlined"
              sx={{ marginBottom: '30px' }}
              multiline
              rows={4}
              placeholder="Tell us about yourself as a host"
            />

            {/* Dynamic questions */}
            {questions.map((question, index) => (
              <Box key={index} sx={{ marginBottom: '30px' }}>
                <Typography variant="h6" sx={{ fontWeight: 500, marginBottom: '10px' }}>
                  {question.mainQuestion}
                </Typography>
                <FormControl component="fieldset">
                  <ButtonGroup variant="contained" aria-label="yes-no button group" sx={{ mb: 2 }}>
                    <Button
                      onClick={() => handleChange(question.field, 'yes')}
                      sx={{
                        bgcolor: formData[question.field] === 'yes' ? '#F43F5E' : 'grey.400',
                        '&:hover': {
                          bgcolor: formData[question.field] === 'yes' ? '#D43852' : 'grey.500',
                        }
                      }}
                    >
                      Yes
                    </Button>
                    <Button
                      onClick={() => handleChange(question.field, 'no')}
                      sx={{
                        bgcolor: formData[question.field] === 'no' ? '#F43F5E' : 'grey.400',
                        '&:hover': {
                          bgcolor: formData[question.field] === 'no' ? '#D43852' : 'grey.500',
                        }
                      }}
                    >
                      No
                    </Button>
                  </ButtonGroup>
                </FormControl>

                <Collapse in={formData[question.field] === 'yes'}>
                  <Box sx={{ mt: 2 }}>
                    {question.followUp.map((followUpQ, fIndex) => (
                      <TextField
                        key={fIndex}
                        fullWidth
                        name={followUpQ.field}
                        label={followUpQ.label}
                        value={formData[followUpQ.field]}
                        onChange={(e) => handleChange(followUpQ.field, e.target.value)}
                        variant="outlined"
                        multiline
                        rows={4}
                        sx={{ marginBottom: 2 }}
                      />
                    ))}
                  </Box>
                </Collapse>
              </Box>
            ))}

            {/* Concierge Style */}
            <Typography variant="h6" sx={{ fontWeight: 500, marginBottom: '10px' }}>
              What style would you like your Concierge to have? (i.e. Funny, Serious, Helpful, Professional, Casual)
            </Typography>
            <TextField
              fullWidth
              name="conciergeStyle"
              value={formData.conciergeStyle}
              onChange={(e) => handleChange('conciergeStyle', e.target.value)}
              variant="outlined"
              sx={{ marginBottom: '30px' }}
              placeholder="Enter preferred style"
            />

            {/* Action Buttons */}
            <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
              {isEditingSurveyData ? (
                <>
                  <Button
                    type="button"
                    variant="outlined"
                    startIcon={<CancelIcon />}
                    onClick={handleCancelSurveyEdit}
                    sx={{
                      color: '#F43F5E',
                      borderColor: '#F43F5E',
                      marginRight: '10px',
                      borderRadius: '30px',
                      width: '100px',
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    startIcon={<SaveIcon />}
                    sx={{
                      backgroundColor: '#F43F5E',
                      color: 'white',
                      borderRadius: '30px',
                      width: '100px',
                      '&:hover': {
                        backgroundColor: '#D43852',
                      },
                    }}
                    disabled={false} // Implement validation if necessary
                  >
                    Save
                  </Button>
                </>
              ) : (
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    backgroundColor: '#F43F5E',
                    color: 'white',
                    padding: '12px 40px',
                    borderRadius: '30px',
                    '&:hover': {
                      backgroundColor: '#D43852',
                    },
                    width: '100%',
                    maxWidth: '250px',
                    marginTop: '30px',
                    marginBottom: '50px',
                  }}
                >
                  Submit
                </Button>
              )}
            </Box>
          </form>
        </Box>
      )}
    </Box>
  );
}

export default Survey;
