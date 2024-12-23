// src/Billing.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Card,
  CardHeader,
  CardContent,
  Button,
  Collapse,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  GlobalStyles,
  Container,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { styled } from '@mui/material/styles';

// Styled Button for Unsubscribe
const UnsubscribeButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#F43F5E',
  color: '#fff',
  textTransform: 'none',
  fontSize: '14px',
  '&:hover': {
    backgroundColor: '#D43852',
  },
  borderRadius: '0px',
  marginLeft: theme.spacing(1),
}));

// Styled Button for Transactions Toggle
const TransactionsButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#E0E0E0',
  color: '#000',
  textTransform: 'none',
  fontSize: '14px',
  '&:hover': {
    backgroundColor: '#BDBDBD',
  },
  borderRadius: '0px',
  marginTop: theme.spacing(2),
}));

// Styled Button for Back to Dashboard
const BackButton = styled(Button)(({ theme }) => ({
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
}));

const Billing = () => {
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState('');
  const [transactionsOpen, setTransactionsOpen] = useState({
    'Beach House': false,
    'Mountain Cabin': false,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleUnsubscribeClick = (property) => {
    setSelectedProperty(property);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setSelectedProperty('');
  };

  const handleConfirmUnsubscribe = () => {
    // Placeholder for unsubscribe logic
    console.log(`Unsubscribed from ${selectedProperty}`);
    setOpenDialog(false);
    setSelectedProperty('');
  };

  const toggleTransactions = (property) => {
    setTransactionsOpen((prevState) => ({
      ...prevState,
      [property]: !prevState[property],
    }));
  };

  // Fake transaction data
  const transactionsData = {
    'Beach House': [
      { month: 'April 2024', amount: '$11.99' },
      { month: 'March 2024', amount: '$11.99' },
      { month: 'February 2024', amount: '$11.99' },
      { month: 'January 2024', amount: '$11.99' },
    ],
    'Mountain Cabin': [
      { month: 'April 2024', amount: '$11.99' },
      { month: 'March 2024', amount: '$11.99' },
      { month: 'February 2024', amount: '$11.99' },
      { month: 'January 2024', amount: '$11.99' },
    ],
  };

  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <>
      {/* Global Styles for Scrollbar and Smooth Scrolling */}
      <GlobalStyles
        styles={{
          html: {
            scrollBehavior: 'smooth',
          },
          /* Hide scrollbar for Chrome, Safari and Opera */
          '*::-webkit-scrollbar': {
            display: 'none',
          },
          /* Hide scrollbar for IE, Edge and Firefox */
          '*': {
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          },
        }}
      />

      {/* Navbar */}
      <Paper
        elevation={3}
        sx={{
          backgroundColor: '#F43F5E',
          color: '#fff',
          padding: 2,
          borderRadius: 0,
          width: '100%',
          boxSizing: 'border-box',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 4,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 500 }}>
          Billing
        </Typography>
      </Paper>

      {/* Main Container */}
      <Box
        sx={{
          flexGrow: 1,
          padding: { xs: '16px', sm: '32px' },
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        {/* Back to Dashboard Button */}
        <Box
          sx={{
            width: '100%',
            maxWidth: '800px',
            margin: '0 auto 20px auto',
            display: 'flex',
            justifyContent: 'flex-start',
            paddingX: { xs: 2, sm: 4 },
          }}
        >
          <BackButton
            variant="text"
            onClick={handleBackToDashboard}
            startIcon={<ArrowBackIcon />}
          >
            Back to Dashboard
          </BackButton>
        </Box>

        {/* Scrollable Content Area */}
        <Box
          sx={{
            flexGrow: 1,
            overflowY: 'auto',
            paddingRight: '4px',
            paddingTop: '0px', // No extra padding needed
          }}
        >
          {/* Content Container */}
          <Container maxWidth="md">
            {/* Beach House Subscription */}
            <Card sx={{ marginBottom: '24px', width: '100%', boxSizing: 'border-box' }}>
              <CardHeader
                title="Beach House"
                subheader="Monthly Subscription - $11.99 per month"
                action={
                  <UnsubscribeButton onClick={() => handleUnsubscribeClick('Beach House')}>
                    Unsubscribe
                  </UnsubscribeButton>
                }
              />
              <CardContent>
                <TransactionsButton onClick={() => toggleTransactions('Beach House')}>
                  {transactionsOpen['Beach House'] ? 'Hide Transactions' : 'Show Transactions'}
                </TransactionsButton>
                <Collapse in={transactionsOpen['Beach House']} timeout="auto" unmountOnExit>
                  <TableContainer component={Paper} sx={{ marginTop: '16px' }}>
                    <Table aria-label="transactions table" sx={{ width: '100%', tableLayout: 'fixed' }}>
                      <TableHead>
                        <TableRow>
                          <TableCell><strong>Month</strong></TableCell>
                          <TableCell><strong>Amount</strong></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {transactionsData['Beach House'].map((transaction, index) => (
                          <TableRow key={index}>
                            <TableCell>{transaction.month}</TableCell>
                            <TableCell>{transaction.amount}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Collapse>
              </CardContent>
            </Card>

            {/* Mountain Cabin Subscription */}
            <Card sx={{ marginBottom: '24px', width: '100%', boxSizing: 'border-box' }}>
              <CardHeader
                title="Mountain Cabin"
                subheader="Monthly Subscription - $11.99 per month"
                action={
                  <UnsubscribeButton onClick={() => handleUnsubscribeClick('Mountain Cabin')}>
                    Unsubscribe
                  </UnsubscribeButton>
                }
              />
              <CardContent>
                <TransactionsButton onClick={() => toggleTransactions('Mountain Cabin')}>
                  {transactionsOpen['Mountain Cabin'] ? 'Hide Transactions' : 'Show Transactions'}
                </TransactionsButton>
                <Collapse in={transactionsOpen['Mountain Cabin']} timeout="auto" unmountOnExit>
                  <TableContainer component={Paper} sx={{ marginTop: '16px' }}>
                    <Table aria-label="transactions table" sx={{ width: '100%', tableLayout: 'fixed' }}>
                      <TableHead>
                        <TableRow>
                          <TableCell><strong>Month</strong></TableCell>
                          <TableCell><strong>Amount</strong></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {transactionsData['Mountain Cabin'].map((transaction, index) => (
                          <TableRow key={index}>
                            <TableCell>{transaction.month}</TableCell>
                            <TableCell>{transaction.amount}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Collapse>
              </CardContent>
            </Card>

            {/* Delete Account Section */}
            <Card>
              <CardHeader
                title="Delete Account"
                subheader="Permanently delete your account and all associated data."
              />
              <CardContent>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <UnsubscribeButton
                    onClick={() => navigate('/delete-account')}
                    sx={{
                      textTransform: 'none',
                      borderRadius: '0px',
                      width: { xs: '100%', sm: '200px' },
                      maxWidth: '200px',
                      marginLeft: 0,
                    }}
                  >
                    Delete Account
                  </UnsubscribeButton>
                </Box>
              </CardContent>
            </Card>
          </Container>
        </Box>
      </Box>

      {/* Unsubscribe Confirmation Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleDialogClose}
      >
        <DialogTitle>Unsubscribe from {selectedProperty}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to unsubscribe from {selectedProperty}? You will no longer have access to this property.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>No</Button>
          <Button onClick={handleConfirmUnsubscribe} color="error">Yes, Unsubscribe</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Billing;
