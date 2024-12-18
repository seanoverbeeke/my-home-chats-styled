import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  Collapse,
  FormControl,
  ButtonGroup
} from '@mui/material';

function Survey() {
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

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    console.log(formData);
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
        {/* Image Block */}
 <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '30px',
          marginBottom: '20px',
          width: '80%',
        }}
      >
        <img
          src="/img/bot1.png"
          alt="Smart AI Assistant"
          style={{
            width: '100%',
            maxWidth: '300px',
            height: 'auto',
            borderRadius: '15px',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',  // Adding a shadow
          }}
        />
      </Box>

        
      {/* Survey Header */}
      <Typography
        variant="h4"
        sx={{
          fontWeight: 600,
          fontSize: { xs: '1.5rem', sm: '2rem' },
          marginBottom: '30px',
          textAlign: 'center',
        }}
      >
        This is your chance to let your AI Concierge know everything you want your guests to know. Think of it like hiring an employee. The more specific you are, the better the concierge will do their job.
      </Typography>

      
      {/* Navigation Bar */}
      <Box
        sx={{
          width: '100%',
          bgcolor: '#F43F5E',
          padding: '15px',
          textAlign: 'center',
          color: 'white',
          marginBottom: '20px',
          marginTop: '20px',
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

      {/* Survey Form */}
      <Box sx={{ width: '100%', maxWidth: '600px' }}>
        <form>
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

          {/* Submit Button */}
          <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <Button
              variant="contained"
              onClick={handleSubmit}
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
          </Box>
        </form>
      </Box>
    </Box>
  );
}

export default Survey;