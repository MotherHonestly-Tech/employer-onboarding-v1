import React from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

import WalletBalance from '../../components/UI/WalletBalance';

const Dashboard = () => {
  return (
    <React.Fragment>
      <Box mb={4}>
        <Typography variant="h2" my={1} gutterBottom>
          Welcome Damian!
        </Typography>

        <Typography variant="body1" gutterBottom>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt
        </Typography>
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={4} lg={4.5}>
          <WalletBalance />

        </Grid>
        <Grid item xs={8} lg={7.5}></Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Dashboard;
