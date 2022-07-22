import React from 'react';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import ArrowPanelBar from '../UI/ArrowPanelBar';

const RecentTransactions = () => {
  return (
    <Stack border={1} borderColor="secondary.main" borderRadius={2} p={2}>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h3">Recent Transactions</Typography>
        <ArrowPanelBar />
      </Stack>
    </Stack>
  );
};

export default RecentTransactions;
