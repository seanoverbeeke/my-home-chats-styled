// src/Survey.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  TextField,
  Collapse,
  FormControlLabel,
  Switch,
  Divider,
  Slider,
  Paper,
  Container,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import PropTypes from 'prop-types';

function Survey({ propertyId, onClose }) {
  const navigate = useNavigate();

  // Define all boolean fields to ensure they are always present
  const booleanFields = [
    'hostinfo',
    'wifi',
    'hasTowels',
    'hasExtraSheets',
    'hasCoffeeMachine',
    'hasPullOutSofa',
    'hasLocalFood',
    'hasThermostat',
    'hasTransportation',
    'hasAppliances',
    'hasCheckoutProcedures',
    'hasFirstAid',
    'hasLocalAttractions'
  ];

  // Initialize formData with all boolean fields set to false and other fields as empty strings
  const initialFormData = {
    hostinfo: false,
    hostdescribe: '',
    wifi: false,
    wifiName: '',
    wifiPassword: '',
    hasTowels: false,
    towelsLocation: '',
    hasExtraSheets: false,
    sheetsLocation: '',
    hasCoffeeMachine: false,
    coffeeMachineLocation: '',
    hasPullOutSofa: false,
    sofaDetails: '',
    hasLocalFood: false,
    breakfastSpots: '',
    lunchSpots: '',
    dinnerSpots: '',
    hasThermostat: false,
    thermostatLocation: '',
    hasTransportation: false,
    transportationDetails: '',
    hasAppliances: false,
    applianceDetails: '',
    hasCheckoutProcedures: false,
    checkoutDetails: '',
    emergencyContact: '',
    hasFirstAid: false,
    firstAidLocation: '',
    nearestHospital: '',
    hasLocalAttractions: false,
    attractionsDetails: '',
  };

  const [formData, setFormData] = useState(initialFormData);
  const [initialFormDataState, setInitialFormDataState] = useState(initialFormData); // For cancel functionality
  const [propertyName, setPropertyName] = useState('');
  const [editingFields, setEditingFields] = useState({});
  const [progress, setProgress] = useState(0);

  // Load initial data
  useEffect(() => {
    try {
      const storedProperties = JSON.parse(localStorage.getItem('properties')) || [];
      const property = storedProperties.find(prop => prop.id === Number(propertyId));

      if (property) {
        setPropertyName(property.name || '');
        if (property.surveyData) {
          // Merge saved surveyData with initialFormData to ensure all fields are present
          const mergedData = { ...initialFormData, ...property.surveyData };

          // Ensure all boolean fields are properly parsed
          booleanFields.forEach(field => {
            if (typeof mergedData[field] === 'string') {
              // Convert string to boolean
              mergedData[field] = mergedData[field].toLowerCase() === 'true';
            } else {
              // Ensure it's a boolean
              mergedData[field] = Boolean(mergedData[field]);
            }
          });

          // Ensure conciergeStyle is a number
          if (typeof mergedData.conciergeStyle === 'string') {
            mergedData.conciergeStyle = parseInt(mergedData.conciergeStyle, 10) || 0;
          } else {
            mergedData.conciergeStyle = Number(mergedData.conciergeStyle) || 0;
          }

          setFormData(mergedData);
          setInitialFormDataState(mergedData); // Set initial state
          calculateProgress(mergedData);
        } else {
          // If surveyData doesn't exist, use initialFormData
          setFormData(initialFormData);
          setInitialFormDataState(initialFormData); // Set initial state
          calculateProgress(initialFormData);
        }
      } else {
        // If property doesn't exist, use initialFormData
        setFormData(initialFormData);
        setInitialFormDataState(initialFormData); // Set initial state
        calculateProgress(initialFormData);
      }
    } catch (error) {
      console.error('Error loading property data:', error);
      // In case of error, fallback to initialFormData
      setFormData(initialFormData);
      setInitialFormDataState(initialFormData); // Set initial state
      calculateProgress(initialFormData);
    }
  }, [propertyId]);

  // Save changes to localStorage (but only when something actually changes)
  const saveToLocalStorage = () => {
    try {
      const storedProperties = JSON.parse(localStorage.getItem('properties')) || [];
      let propertyExists = false;

      const updatedProperties = storedProperties.map(prop => {
        if (prop.id === Number(propertyId)) {
          propertyExists = true;
          // Ensure boolean fields are stored as booleans and conciergeStyle as number
          const sanitizedSurveyData = { ...formData };
          booleanFields.forEach(field => {
            sanitizedSurveyData[field] = Boolean(sanitizedSurveyData[field]);
          });
          sanitizedSurveyData.conciergeStyle = Number(sanitizedSurveyData.conciergeStyle) || 0;
          return {
            ...prop,
            name: propertyName,
            surveyData: sanitizedSurveyData
          };
        }
        return prop;
      });

      if (!propertyExists) {
        // If property doesn't exist, add it
        const sanitizedSurveyData = { ...formData };
        booleanFields.forEach(field => {
          sanitizedSurveyData[field] = Boolean(sanitizedSurveyData[field]);
        });
        sanitizedSurveyData.conciergeStyle = Number(sanitizedSurveyData.conciergeStyle) || 0;
        updatedProperties.push({
          id: Number(propertyId),
          name: propertyName,
          surveyData: sanitizedSurveyData
        });
      }

      localStorage.setItem('properties', JSON.stringify(updatedProperties));
      console.log('Data saved to localStorage:', updatedProperties);
      setInitialFormDataState(formData); // Update initial state after saving
    } catch (error) {
      console.error('Error saving property data:', error);
    }
  };

  const calculateProgress = (data) => {
    // Exclude non-question fields from progress calculation
    const questionFields = Object.keys(initialFormData).filter(
      key => key !== 'hostInfo' && key !== 'emergencyContact' && key !== 'nearestHospital' && key !== 'conciergeStyle'
    );

    const totalQuestions = questionFields.length;
    const answered = questionFields.reduce((acc, key) => {
      if (booleanFields.includes(key)) {
        return acc + (data[key] ? 1 : 0);
      } else {
        return acc + (data[key].trim() !== '' ? 1 : 0);
      }
    }, 0);

    const progressPercent = Math.round((answered / totalQuestions) * 100);
    setProgress(progressPercent);
  };

  // Handlers for Property Name Editing
  const handleEditPropertyName = () => {
    setEditingFields(prev => ({ ...prev, propertyName: true }));
  };

  const handleCancelEditPropertyName = () => {
    setEditingFields(prev => ({ ...prev, propertyName: false }));
    setPropertyName(initialFormDataState.propertyName);
  };

  const handleSavePropertyName = () => {
    if ((propertyName || '').trim() === '') return;
    setEditingFields(prev => ({ ...prev, propertyName: false }));
    saveToLocalStorage();
  };

  // Handlers for Survey Data Editing
  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    calculateProgress({ ...formData, [field]: value });
  };

  // Handle form submission with Save and Cancel
  const handleSubmit = (e) => {
    e.preventDefault();
    saveToLocalStorage();
    // Collapse Concierge Training after saving
    if (onClose && typeof onClose === 'function') {
      onClose();
    }
  };

  // Handle Cancel action to revert changes and collapse section
  const handleCancel = () => {
    setFormData(initialFormDataState);
    calculateProgress(initialFormDataState);
    // Collapse Concierge Training after cancelling
    if (onClose && typeof onClose === 'function') {
      onClose();
    }
  };

  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  // Optional: Reset Survey Data
  const resetSurveyData = () => {
    if (window.confirm('Are you sure you want to reset the survey data? This action cannot be undone.')) {
      try {
        const storedProperties = JSON.parse(localStorage.getItem('properties')) || [];
        const updatedProperties = storedProperties.map(prop => {
          if (prop.id === Number(propertyId)) {
            return {
              ...prop,
              surveyData: initialFormData
            };
          }
          return prop;
        });
        localStorage.setItem('properties', JSON.stringify(updatedProperties));
        setFormData(initialFormData);
        setInitialFormDataState(initialFormData);
        setProgress(0);
        window.location.reload(); // Reload to ensure all components reflect the reset
      } catch (error) {
        console.error('Error resetting survey data:', error);
      }
    }
  };

  // Mapping slider value to label
  const getConciergeStyleLabel = (value) => {
    if (value <= 33) return 'Casual';
    if (value >= 67) return 'Professional';
    return 'Neutral';
  };



  // Questions configuration
  const questions = [
    {
      id: 'hostinfo',
      label: 'hostinfo',
      question: 'Do you want your guests to know more about their hosts?',
      followUp: [{ label: 'What do you want them to know?', field: 'hostdescribe' }]
    },
    {
      id: 'wifi',
      label: 'wifi',
      question: 'Does your property have WiFi?',
      followUp: [
        { label: 'WiFi Network Name', field: 'wifiName' },
        { label: 'WiFi Password', field: 'wifiPassword' }
      ]
    },
    {
      id: 'hasTowels',
      label: 'hasTowels',
      question: 'Do your guests have access to fresh towels?',
      followUp: [{ label: 'Where can guests find the towels?', field: 'towelsLocation' }]
    },
    {
      id: 'hasExtraSheets',
      label: 'hasExtraSheets',
      question: 'Do you provide extra bed sheets for your guests?',
      followUp: [{ label: 'Where are the extra sheets stored?', field: 'sheetsLocation' }]
    },
    {
      id: 'hasCoffeeMachine',
      label: 'hasCoffeeMachine',
      question: 'Is there a coffee machine available for guests?',
      followUp: [{ label: 'Where is the coffee machine located?', field: 'coffeeMachineLocation' }]
    },
    {
      id: 'hasPullOutSofa',
      label: 'hasPullOutSofa',
      question: 'Do you have any pull-out sofas?',
      followUp: [{ label: 'Please describe the pull-out sofa locations and usage instructions', field: 'sofaDetails' }]
    },
    {
      id: 'hasLocalFood',
      label: 'hasLocalFood',
      question: 'Would you like to share local food recommendations with your guests?',
      followUp: [
        { label: 'Favorite breakfast spots', field: 'breakfastSpots' },
        { label: 'Top lunch spots', field: 'lunchSpots' },
        { label: 'Best dinner places', field: 'dinnerSpots' }
      ]
    },
    {
      id: 'hasThermostat',
      label: 'hasThermostat',
      question: 'Is there a thermostat available for guests to adjust the temperature?',
      followUp: [{ label: 'Where is the thermostat located and any special instructions?', field: 'thermostatLocation' }]
    },
    {
      id: 'hasTransportation',
      label: 'hasTransportation',
      question: 'Are there convenient local transportation options for your guests?',
      followUp: [{ label: 'Please describe the available transportation options', field: 'transportationDetails' }]
    },
    {
      id: 'hasAppliances',
      label: 'hasAppliances',
      question: 'Are there any special instructions for using the appliances in your property?',
      followUp: [{ label: 'Please provide details about appliance usage', field: 'applianceDetails' }]
    },
    {
      id: 'hasCheckoutProcedures',
      label: 'hasCheckoutProcedures',
      question: 'Do you have specific checkout procedures for your guests?',
      followUp: [{ label: 'Please describe the checkout procedures', field: 'checkoutDetails' }]
    },
    {
      id: 'hasFirstAid',
      label: 'hasFirstAid',
      question: 'Is there a first aid kit available for your guests?',
      followUp: [{ label: 'Where is the first aid kit located?', field: 'firstAidLocation' }]
    },
    {
      id: 'hasLocalAttractions',
      label: 'hasLocalAttractions',
      question: 'Are there any local attractions or activities you’d like to recommend to your guests?',
      followUp: [{ label: 'Please describe the local attractions and activities', field: 'attractionsDetails' }]
    }
  ];

  return (
    <Container
      maxWidth="lg"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingY: { xs: '10px', sm: '20px' },
        fontFamily: 'Inter, sans-serif',
      }}
    >
      <Paper elevation={3} sx={{ width: '100%', padding: { xs: '15px', sm: '30px' } }}>
        <form onSubmit={handleSubmit}>
          {/* Dynamic Questions */}
          {questions.map((question) => (
            <Box key={question.id} sx={{ marginBottom: '30px' }}>
              <Typography variant="h6" sx={{ fontWeight: 500, marginBottom: '10px', color: '#F43F5E' }}>
                {question.question}
              </Typography>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData[question.label]}
                    onChange={(e) => handleChange(question.label, e.target.checked)}
                    sx={{
                      '& .MuiSwitch-switchBase.Mui-checked': {
                        color: '#F43F5E',
                        '&:hover': {
                          backgroundColor: 'rgba(244,63,94, 0.08)',
                        },
                      },
                      '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                        backgroundColor: '#F43F5E',
                      },
                    }}
                  />
                }
                label={formData[question.label] ? 'Yes' : 'No'}
              />

              <Collapse in={formData[question.label]}>
                <Box sx={{ mt: 2, paddingLeft: { xs: '10px', sm: '20px' } }}>
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
                      rows={2}
                      sx={{
                        marginBottom: 2,
                        borderRadius: '0px',
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': {
                            borderColor: '#F43F5E',
                          },
                          '&:hover fieldset': {
                            borderColor: '#D43852',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#F43F5E',
                          },
                        },
                        '& .MuiInputLabel-root': {
                          color: '#F43F5E',
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                          color: '#F43F5E',
                        },
                      }}
                    />
                  ))}
                </Box>
              </Collapse>
            </Box>
          ))}

          <Divider sx={{ marginY: '20px' }} />

          {/* Save and Cancel Buttons */}
          <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: '30px', gap: 2 }}>
            <Button
              type="button"
              variant="outlined"
              startIcon={<CancelIcon />}
              onClick={handleCancel}
              sx={{
                color: '#F43F5E',
                borderColor: '#F43F5E',
                textTransform: 'none',
                padding: '10px 20px',
                fontSize: '16px',
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
                textTransform: 'none',
                padding: '10px 20px',
                fontSize: '16px',
                '&:hover': {
                  backgroundColor: '#D43852',
                },
              }}
            >
              Save
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
}

// Define PropTypes for better type checking
Survey.propTypes = {
  propertyId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Survey;
