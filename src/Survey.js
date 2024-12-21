// src/Survey.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  TextField,
  Collapse,
  FormControlLabel,
  Switch,
  LinearProgress,
  Grid,
  Paper,
  Divider,
  Container,
  Slider,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import RefreshIcon from '@mui/icons-material/Refresh'; // Icon for reset button

function Survey() {
  const { propertyId } = useParams();
  const navigate = useNavigate();

  // Define all boolean fields to ensure they are always present
  const booleanFields = [
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
    hostInfo: '',
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
    conciergeStyle: 0 // Initialize as number (0: Casual, 100: Professional)
  };

  const [formData, setFormData] = useState(initialFormData);
  const [propertyName, setPropertyName] = useState('');
  const [editingFields, setEditingFields] = useState({});
  const [tempPropertyName, setTempPropertyName] = useState('');
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
          calculateProgress(mergedData);
        } else {
          // If surveyData doesn't exist, use initialFormData
          setFormData(initialFormData);
          calculateProgress(initialFormData);
        }
      } else {
        // If property doesn't exist, use initialFormData
        setFormData(initialFormData);
        calculateProgress(initialFormData);
      }
    } catch (error) {
      console.error('Error loading property data:', error);
      // In case of error, fallback to initialFormData
      setFormData(initialFormData);
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
    setTempPropertyName(propertyName);
    setEditingFields(prev => ({ ...prev, propertyName: true }));
  };

  const handleCancelEditPropertyName = () => {
    setEditingFields(prev => ({ ...prev, propertyName: false }));
    setTempPropertyName('');
  };

  const handleSavePropertyName = () => {
    if ((tempPropertyName || '').trim() === '') return;
    setPropertyName((tempPropertyName || '').trim());
    setEditingFields(prev => ({ ...prev, propertyName: false }));
    setTempPropertyName('');
    saveToLocalStorage();
  };

  // Handlers for Survey Data Editing
  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    calculateProgress({ ...formData, [field]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    saveToLocalStorage();
    navigate('/dashboard');
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

  // Slider marks
  const sliderMarks = [
    {
      value: 0,
      label: 'Casual',
    },
    {
      value: 50,
      label: 'Neutral',
    },
    {
      value: 100,
      label: 'Professional',
    },
  ];

  // Questions configuration
  const questions = [
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
      question: 'Are there towels available for guests?',
      followUp: [{ label: 'Where are the towels located?', field: 'towelsLocation' }]
    },
    {
      id: 'hasExtraSheets',
      label: 'hasExtraSheets',
      question: 'Are there extra bed sheets available?',
      followUp: [{ label: 'Where are the extra sheets located?', field: 'sheetsLocation' }]
    },
    {
      id: 'hasCoffeeMachine',
      label: 'hasCoffeeMachine',
      question: 'Is there a coffee machine?',
      followUp: [{ label: 'Where is the coffee machine located?', field: 'coffeeMachineLocation' }]
    },
    {
      id: 'hasPullOutSofa',
      label: 'hasPullOutSofa',
      question: 'Are there any pull-out sofas?',
      followUp: [{ label: 'Please describe the pull-out sofa locations and instructions', field: 'sofaDetails' }]
    },
    {
      id: 'hasLocalFood',
      label: 'hasLocalFood',
      question: 'Would you like to share local food recommendations?',
      followUp: [
        { label: 'Recommended breakfast spots', field: 'breakfastSpots' },
        { label: 'Recommended lunch spots', field: 'lunchSpots' },
        { label: 'Recommended dinner spots', field: 'dinnerSpots' }
      ]
    },
    {
      id: 'hasThermostat',
      label: 'hasThermostat',
      question: 'Is there a thermostat?',
      followUp: [{ label: 'Where is the thermostat located and are there any special instructions?', field: 'thermostatLocation' }]
    },
    {
      id: 'hasTransportation',
      label: 'hasTransportation',
      question: 'Are there local transportation options?',
      followUp: [{ label: 'Please describe the transportation options', field: 'transportationDetails' }]
    },
    {
      id: 'hasAppliances',
      label: 'hasAppliances',
      question: 'Are there any special appliance instructions?',
      followUp: [{ label: 'Please provide details about appliance usage', field: 'applianceDetails' }]
    },
    {
      id: 'hasCheckoutProcedures',
      label: 'hasCheckoutProcedures',
      question: 'Are there specific checkout procedures?',
      followUp: [{ label: 'Please describe the checkout procedures', field: 'checkoutDetails' }]
    },
    {
      id: 'hasFirstAid',
      label: 'hasFirstAid',
      question: 'Is there a first aid kit?',
      followUp: [{ label: 'Where is the first aid kit located?', field: 'firstAidLocation' }]
    },
    {
      id: 'hasLocalAttractions',
      label: 'hasLocalAttractions',
      question: 'Are there local attractions or activities you want to recommend?',
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
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
      }}
    >

      {/* Back to Dashboard Button and Reset Button */}
      <Box sx={{ width: '100%', maxWidth: '800px', marginBottom: '2px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: { xs: '10px', sm: '0' } }}>
        <Button
          variant="text"
          onClick={handleBackToDashboard}
          startIcon={<ArrowBackIcon />}
          sx={{
            color: '#F43F5E',
            textTransform: 'none',
            whiteSpace: 'nowrap',
            '&:hover': {
              backgroundColor: 'transparent',
              color: '#D43852',
            },
            borderRadius: '0px', // Removed border radius
            paddingX: 0,
            fontSize: '15px',
          }}
        >
          Back to Dashboard
        </Button>
      </Box>

      {/* Navbar */}
      <Paper
        elevation={3}
        sx={{
          width: '100%',
          maxWidth: '800px',
          padding: { xs: '10px 15px', sm: '15px 30px' }, // Responsive padding
          backgroundColor: '#F43F5E', // Branding color
          marginBottom: '20px',
          borderRadius: '0px', // Removed border radius
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            letterSpacing: '1px',
            color: 'white', // White text for contrast
            textAlign: 'center',
          }}
        >
          Property Settings
        </Typography>
      </Paper>
      
      {/* Property Name Section */}
      <Paper
        elevation={3}
        sx={{
          width: '90%',
          maxWidth: '800px',
          backgroundColor: 'white',
          padding: { xs: '15px 20px', sm: '20px 30px' }, // Responsive padding
          borderRadius: '0px', // Removed border radius
          boxShadow: 3,
          marginBottom: '30px',
        }}
      >
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item xs={12} sm={8}>
            <Typography variant="h6" sx={{ fontWeight: 500 }}>
              Property Name: {propertyName || 'N/A'}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4} sx={{ textAlign: { xs: 'left', sm: 'right' }, marginTop: { xs: '10px', sm: '0' } }}>
            {!editingFields.propertyName ? (
              <Button
                variant="text"
                onClick={handleEditPropertyName}
                sx={{
                  color: '#F43F5E', // Branding color
                  textTransform: 'none',
                  '&:hover': {
                    color: '#D43852', // Darker shade on hover
                  },
                  borderRadius: '0px', // Removed border radius
                }}
              >
                Edit
              </Button>
            ) : (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                <TextField
                  value={tempPropertyName}
                  onChange={(e) => setTempPropertyName(e.target.value)}
                  variant="outlined"
                  size="small"
                  label="Property Name"
                  sx={{ flexGrow: 1, minWidth: { xs: '100%', sm: 'auto' } }}
                />
                <Button
                  variant="contained"
                  startIcon={<SaveIcon />}
                  onClick={handleSavePropertyName}
                  sx={{
                    backgroundColor: '#F43F5E',
                    color: 'white',
                    borderRadius: '0px', // Removed border radius
                    textTransform: 'none',
                    '&:hover': {
                      backgroundColor: '#D43852',
                    },
                  }}
                  disabled={!(tempPropertyName || '').trim()}
                >
                  Save
                </Button>
                <Button
                  variant="text"
                  startIcon={<CancelIcon />}
                  onClick={handleCancelEditPropertyName}
                  sx={{
                    color: '#F43F5E',
                    textTransform: 'none',
                    '&:hover': {
                      color: '#D43852',
                    },
                    borderRadius: '0px', // Removed border radius
                  }}
                >
                  Cancel
                </Button>
              </Box>
            )}
          </Grid>
        </Grid>
      </Paper>



      {/* Main Content Section */}
      <Paper
        elevation={3}
        sx={{
          width: '90%',
          maxWidth: '800px',
          backgroundColor: 'white',
          padding: { xs: '20px', sm: '30px' }, // Responsive padding
          borderRadius: '0px', // Removed border radius
          boxShadow: 3,
          marginBottom: '30px',
        }}
      >
        <form onSubmit={handleSubmit}>
          {/* Host Information Section */}
          <Box sx={{ marginBottom: '30px' }}>
            <Typography variant="h6" sx={{ fontWeight: 500, marginBottom: '10px', color: '#F43F5E' }}>
              Host Information
            </Typography>
            {!editingFields.hostInfo ? (
              <>
                <Typography variant="body1" sx={{ marginBottom: '10px' }}>
                  {formData.hostInfo || 'N/A'}
                </Typography>
                <Button
                  variant="text"
                  onClick={() => setEditingFields(prev => ({ ...prev, hostInfo: true }))}
                  sx={{
                    color: '#F43F5E', // Branding color
                    textTransform: 'none',
                    '&:hover': {
                      color: '#D43852',
                    },
                    borderRadius: '0px', // Removed border radius
                  }}
                >
                  Edit
                </Button>
              </>
            ) : (
              <Box>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  value={formData.hostInfo}
                  onChange={(e) => handleChange('hostInfo', e.target.value)}
                  variant="outlined"
                  sx={{ marginBottom: '20px' }}
                  placeholder="Tell us about yourself as a host"
                />
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  <Button
                    variant="text"
                    startIcon={<CancelIcon />}
                    onClick={() => setEditingFields(prev => ({ ...prev, hostInfo: false }))}
                    sx={{
                      color: '#F43F5E',
                      textTransform: 'none',
                      '&:hover': {
                        color: '#D43852',
                      },
                      borderRadius: '0px', // Removed border radius
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    startIcon={<SaveIcon />}
                    onClick={() => {
                      setEditingFields(prev => ({ ...prev, hostInfo: false }));
                      saveToLocalStorage();
                    }}
                    sx={{
                      backgroundColor: '#F43F5E',
                      color: 'white',
                      borderRadius: '0px', // Removed border radius
                      '&:hover': {
                        backgroundColor: '#D43852',
                      },
                      textTransform: 'none',
                    }}
                  >
                    Save
                  </Button>
                </Box>
              </Box>
            )}
          </Box>

          <Divider sx={{ marginY: '20px' }} />

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
                    color="primary"
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
                      sx={{ marginBottom: 2, borderRadius: '0px' }} // Removed border radius if any
                    />
                  ))}
                </Box>
              </Collapse>
            </Box>
          ))}

          <Divider sx={{ marginY: '20px' }} />

          

          {/* Submit Button */}
          <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: '30px' }}>
            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: '#F43F5E',
                color: 'white',
                padding: '12px 40px',
                borderRadius: '0px', // Ensures no border radius
                '&:hover': {
                  backgroundColor: '#D43852',
                },
                width: { xs: '100%', sm: 'auto' },
                maxWidth: '250px',
                textTransform: 'none',
                fontSize: '16px',
              }}
            >
              Submit
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
}

export default Survey;
