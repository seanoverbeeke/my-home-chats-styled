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
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function Survey() {
  const { propertyId } = useParams();
  const navigate = useNavigate();

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

  const [propertyName, setPropertyName] = useState('');
  const [editingFields, setEditingFields] = useState({});
  const [tempFormData, setTempFormData] = useState({});
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
          setFormData(prevData => ({
            ...prevData,
            ...property.surveyData
          }));
          calculateProgress(property.surveyData);
        }
      }
    } catch (error) {
      console.error('Error loading property data:', error);
    }
  }, [propertyId]);

  // Save changes to localStorage (but only when something actually changes)
  const saveToLocalStorage = () => {
    try {
      const storedProperties = JSON.parse(localStorage.getItem('properties')) || [];
      const updatedProperties = storedProperties.map(prop => {
        if (prop.id === Number(propertyId)) {
          return {
            ...prop,
            name: propertyName,
            surveyData: formData
          };
        }
        return prop;
      });
      
      localStorage.setItem('properties', JSON.stringify(updatedProperties));
    } catch (error) {
      console.error('Error saving property data:', error);
    }
  };

  const calculateProgress = (data) => {
    const totalQuestions = Object.keys(data).length;
    const answered = Object.values(data).filter(value => value !== '' && value !== 'no').length;
    const progressPercent = Math.round((answered / totalQuestions) * 100);
    setProgress(progressPercent);
  };

  // Handle changes in temporary form data
  const handleChangeTemp = (field, value) => {
    setTempFormData(prev => ({ ...prev, [field]: value }));
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
  const handleEdit = (field) => {
    setEditingFields(prev => ({ ...prev, [field]: true }));
    setTempFormData(prev => ({ ...prev, [field]: formData[field] }));
  };

  const handleSave = (field) => {
    const newFormData = { ...formData, ...tempFormData };
    setFormData(newFormData);
    setEditingFields(prev => ({ ...prev, [field]: false }));
    setTempFormData(prev => {
      const updated = { ...prev };
      delete updated[field];
      return updated;
    });
    calculateProgress(newFormData);
    saveToLocalStorage();
  };

  const handleCancel = (field) => {
    setEditingFields(prev => ({ ...prev, [field]: false }));
    setTempFormData(prev => {
      const updated = { ...prev };
      delete updated[field];
      return updated;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    saveToLocalStorage();
    navigate('/dashboard');
  };

  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  // Questions configuration
  const questions = [
    {
      id: 'wifi',
      mainQuestion: 'Does your property have WiFi?',
      field: 'wifi',
      followUp: [
        { label: 'WiFi Network Name', field: 'wifiName' },
        { label: 'WiFi Password', field: 'wifiPassword' }
      ]
    },
    {
      id: 'hasTowels',
      mainQuestion: 'Are there towels available for guests?',
      field: 'hasTowels',
      followUp: [{ label: 'Where are the towels located?', field: 'towelsLocation' }]
    },
    {
      id: 'hasExtraSheets',
      mainQuestion: 'Are there extra bed sheets available?',
      field: 'hasExtraSheets',
      followUp: [{ label: 'Where are the extra sheets located?', field: 'sheetsLocation' }]
    },
    {
      id: 'hasCoffeeMachine',
      mainQuestion: 'Is there a coffee machine?',
      field: 'hasCoffeeMachine',
      followUp: [{ label: 'Where is the coffee machine located?', field: 'coffeeMachineLocation' }]
    },
    {
      id: 'hasPullOutSofa',
      mainQuestion: 'Are there any pull-out sofas?',
      field: 'hasPullOutSofa',
      followUp: [{ label: 'Please describe the pull-out sofa locations and instructions', field: 'sofaDetails' }]
    },
    {
      id: 'hasLocalFood',
      mainQuestion: 'Would you like to share local food recommendations?',
      field: 'hasLocalFood',
      followUp: [
        { label: 'Recommended breakfast spots', field: 'breakfastSpots' },
        { label: 'Recommended lunch spots', field: 'lunchSpots' },
        { label: 'Recommended dinner spots', field: 'dinnerSpots' }
      ]
    },
    {
      id: 'hasThermostat',
      mainQuestion: 'Is there a thermostat?',
      field: 'hasThermostat',
      followUp: [{ label: 'Where is the thermostat located and are there any special instructions?', field: 'thermostatLocation' }]
    },
    {
      id: 'hasTransportation',
      mainQuestion: 'Are there local transportation options?',
      field: 'hasTransportation',
      followUp: [{ label: 'Please describe the transportation options', field: 'transportationDetails' }]
    },
    {
      id: 'hasAppliances',
      mainQuestion: 'Are there any special appliance instructions?',
      field: 'hasAppliances',
      followUp: [{ label: 'Please provide details about appliance usage', field: 'applianceDetails' }]
    },
    {
      id: 'hasCheckoutProcedures',
      mainQuestion: 'Are there specific checkout procedures?',
      field: 'hasCheckoutProcedures',
      followUp: [{ label: 'Please describe the checkout procedures', field: 'checkoutDetails' }]
    },
    {
      id: 'hasFirstAid',
      mainQuestion: 'Is there a first aid kit?',
      field: 'hasFirstAid',
      followUp: [{ label: 'Where is the first aid kit located?', field: 'firstAidLocation' }]
    },
    {
      id: 'hasLocalAttractions',
      mainQuestion: 'Are there local attractions or activities you want to recommend?',
      field: 'hasLocalAttractions',
      followUp: [{ label: 'Please describe the local attractions and activities', field: 'attractionsDetails' }]
    }
  ];

  // Removed the hasSurveyData function and conditional rendering to prevent infinite loops
  // Function to render saved survey data in read-only mode (optional, can be removed if not needed)
  const renderSavedSurveyData = () => {
    return (
      <Box sx={{ width: '100%', maxWidth: '600px' }}>
        {/* Host Information Section */}
        <Box sx={{ marginBottom: '30px' }}>
          <Typography variant="h6" sx={{ fontWeight: 500, marginBottom: '10px' }}>
            What would you like your guests to know about their hosts?
          </Typography>
          {!editingFields.hostInfo ? (
            <>
              <Typography variant="body1" sx={{ marginBottom: '10px' }}>
                {formData.hostInfo || 'N/A'}
              </Typography>
              <Button
                variant="outlined"
                startIcon={<EditIcon />}
                onClick={() => handleEdit('hostInfo')}
                sx={{
                  marginTop: '10px',
                  borderRadius: '30px',
                  textTransform: 'none',
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
                value={tempFormData.hostInfo || ''}
                onChange={(e) => handleChangeTemp('hostInfo', e.target.value)}
                variant="outlined"
                sx={{ marginBottom: '20px' }}
              />
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                  variant="outlined"
                  startIcon={<CancelIcon />}
                  onClick={() => handleCancel('hostInfo')}
                  sx={{
                    color: '#F43F5E',
                    borderColor: '#F43F5E',
                    borderRadius: '30px',
                    textTransform: 'none',
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  startIcon={<SaveIcon />}
                  onClick={() => handleSave('hostInfo')}
                  sx={{
                    backgroundColor: '#F43F5E',
                    color: 'white',
                    borderRadius: '30px',
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

        {/* Dynamic Questions */}
        {questions.map((question) => (
          <Box key={question.id} sx={{ marginBottom: '30px' }}>
            <Typography variant="h6" sx={{ fontWeight: 500, marginBottom: '10px' }}>
              {question.mainQuestion}
            </Typography>
            {!editingFields[question.id] ? (
              <>
                <Typography variant="body1" sx={{ marginBottom: '10px' }}>
                  {formData[question.field] === 'yes' ? 'Yes' : 'No'}
                </Typography>
                {formData[question.field] === 'yes' && question.followUp.map((followUpQ, index) => (
                  <Box key={index} sx={{ marginLeft: '20px', marginBottom: '10px' }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                      {followUpQ.label}
                    </Typography>
                    <Typography variant="body2">
                      {formData[followUpQ.field] || 'N/A'}
                    </Typography>
                  </Box>
                ))}
                <Button
                  variant="outlined"
                  startIcon={<EditIcon />}
                  onClick={() => handleEdit(question.id)}
                  sx={{
                    marginTop: '10px',
                    borderRadius: '30px',
                    textTransform: 'none',
                  }}
                >
                  Edit
                </Button>
              </>
            ) : (
              <Box>
                <FormControl component="fieldset">
                  <ButtonGroup variant="contained" aria-label="yes-no button group" sx={{ mb: 2 }}>
                    <Button
                      onClick={() => handleChangeTemp(question.field, 'yes')}
                      sx={{
                        bgcolor: (tempFormData[question.field] || formData[question.field]) === 'yes' ? '#F43F5E' : 'grey.400',
                        '&:hover': {
                          bgcolor: (tempFormData[question.field] || formData[question.field]) === 'yes' ? '#D43852' : 'grey.500',
                        }
                      }}
                    >
                      Yes
                    </Button>
                    <Button
                      onClick={() => handleChangeTemp(question.field, 'no')}
                      sx={{
                        bgcolor: (tempFormData[question.field] || formData[question.field]) === 'no' ? '#F43F5E' : 'grey.400',
                        '&:hover': {
                          bgcolor: (tempFormData[question.field] || formData[question.field]) === 'no' ? '#D43852' : 'grey.500',
                        }
                      }}
                    >
                      No
                    </Button>
                  </ButtonGroup>
                </FormControl>

                <Collapse in={(tempFormData[question.field] || formData[question.field]) === 'yes'}>
                  <Box sx={{ mt: 2 }}>
                  {question.followUp.map((followUpQ, fIndex) => (
                      <TextField
                        key={fIndex}
                        fullWidth
                        label={followUpQ.label}
                        value={tempFormData[followUpQ.field] || ''}
                        onChange={(e) => handleChangeTemp(followUpQ.field, e.target.value)}
                        variant="outlined"
                        multiline
                        rows={2}
                        sx={{ marginBottom: 2 }}
                      />
                    ))}
                  </Box>
                </Collapse>

                {/* Save and Cancel Buttons */}
                <Box sx={{ display: 'flex', gap: 2, marginTop: '10px' }}>
                  <Button
                    variant="outlined"
                    startIcon={<CancelIcon />}
                    onClick={() => handleCancel(question.id)}
                    sx={{
                      color: '#F43F5E',
                      borderColor: '#F43F5E',
                      borderRadius: '30px',
                      textTransform: 'none',
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    startIcon={<SaveIcon />}
                    onClick={() => handleSave(question.id)}
                    sx={{
                      backgroundColor: '#F43F5E',
                      color: 'white',
                      borderRadius: '30px',
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
        ))}

        {/* Concierge Style Section */}
        <Box sx={{ marginBottom: '30px' }}>
          <Typography variant="h6" sx={{ fontWeight: 500, marginBottom: '10px' }}>
            What style would you like your Concierge to have? (i.e. Funny, Serious, Helpful, Professional, Casual)
          </Typography>
          {!editingFields.conciergeStyle ? (
            <>
              <Typography variant="body1" sx={{ marginBottom: '10px' }}>
                {formData.conciergeStyle || 'N/A'}
              </Typography>
              <Button
                variant="outlined"
                startIcon={<EditIcon />}
                onClick={() => handleEdit('conciergeStyle')}
                sx={{
                  marginTop: '10px',
                  borderRadius: '30px',
                  textTransform: 'none',
                }}
              >
                Edit
              </Button>
            </>
          ) : (
            <Box>
              <TextField
                fullWidth
                value={tempFormData.conciergeStyle || ''}
                onChange={(e) => handleChangeTemp('conciergeStyle', e.target.value)}
                variant="outlined"
                sx={{ marginBottom: '20px' }}
              />
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                  variant="outlined"
                  startIcon={<CancelIcon />}
                  onClick={() => handleCancel('conciergeStyle')}
                  sx={{
                    color: '#F43F5E',
                    borderColor: '#F43F5E',
                    borderRadius: '30px',
                    textTransform: 'none',
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  startIcon={<SaveIcon />}
                  onClick={() => handleSave('conciergeStyle')}
                  sx={{
                    backgroundColor: '#F43F5E',
                    color: 'white',
                    borderRadius: '30px',
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
          startIcon={<ArrowBackIcon />}
          sx={{
            color: '#F43F5E',
            textTransform: 'none',
            whiteSpace: 'nowrap',
            '&:hover': {
              backgroundColor: 'transparent',
              color: '#D43852',
            },
            borderRadius: '30px',
            paddingX: 0,
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
          variant="h6"
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
        {!editingFields.propertyName ? (
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography variant="h6" sx={{ fontWeight: 500 }}>
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
                  textTransform: 'none',
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
                  textTransform: 'none',
                }}
                disabled={!(tempPropertyName || '').trim()}
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

      {/* Main Content Section */}
      <Box sx={{ width: '100%', maxWidth: '600px' }}>
        {/* Removed conditional rendering to always show the form */}
        <form onSubmit={handleSubmit}>
          {/* Initial Host Information */}
          <Typography variant="h6" sx={{ fontWeight: 500, marginBottom: '10px' }}>
            What would you like your guests to know about their hosts?
          </Typography>
          <TextField
            fullWidth
            name="hostInfo"
            value={formData.hostInfo}
            onChange={(e) => setFormData({ ...formData, hostInfo: e.target.value })}
            variant="outlined"
            sx={{ marginBottom: '20px' }}
            multiline
            rows={4}
            placeholder="Tell us about yourself as a host"
          />

          {/* Survey Questions */}
          {questions.map((question, index) => (
            <Box key={index} sx={{ marginBottom: '30px' }}>
              <Typography variant="h6" sx={{ fontWeight: 500, marginBottom: '10px' }}>
                {question.mainQuestion}
              </Typography>
              <FormControl component="fieldset">
                <ButtonGroup variant="contained" aria-label="yes-no button group" sx={{ mb: 2 }}>
                  <Button
                    onClick={() => setFormData({ ...formData, [question.field]: 'yes' })}
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
                    onClick={() => setFormData({ ...formData, [question.field]: 'no' })}
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
                      onChange={(e) =>
                        setFormData({ ...formData, [followUpQ.field]: e.target.value })
                      }
                      variant="outlined"
                      multiline
                      rows={2}
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
            onChange={(e) => setFormData({ ...formData, conciergeStyle: e.target.value })}
            variant="outlined"
            sx={{ marginBottom: '20px' }}
            placeholder="Enter preferred style"
          />

          {/* Submit Button */}
          <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: '30px' }}>
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
                marginBottom: '50px',
                textTransform: 'none',
              }}
            >
              Submit
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
}

export default Survey;
