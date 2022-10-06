import React from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { ReactComponent as UnileverLogoIcon } from '../../static/svg/unilever-logo.svg';
import { ReactComponent as PendingPaymentIcon } from '../../static/svg/pending-payment.svg';

const DwollaPaymentSuccess = () => {
  return (
    <Box
      py={7}
      mx="auto"
      sx={{
        '& *': {
          display: 'block',
          textAlign: 'center',
          mx: 'auto'
        }
      }}>
      <UnileverLogoIcon />

      <Typography variant="body1" mt={6} fontSize=".85rem" gutterBottom>
        Thank you for your payment
      </Typography>

      <Typography variant="h3" fontSize="1.75rem">
        Payment Pending
      </Typography>

      <PendingPaymentIcon width="320" />

      <Typography variant="body1" fontSize="1rem" gutterBottom>
        <Typography
          component="span"
          display="inline"
          fontFamily="Area-Normal-Black"
          fontSize="1rem">
          Transaction Amount:
        </Typography>{' '}
        $7,260
      </Typography>

      <Typography variant="body1" fontSize="1rem" gutterBottom>
        <Typography
          component="span"
          display="inline"
          fontFamily="Area-Normal-Black"
          fontSize="1rem">
          Transaction Date:
        </Typography>{' '}
        22 Sep 2022
      </Typography>

      <Typography variant="body2" mt={3}>
        We're still processing your payment. If the account is not debited
        within 24 hours please reach out to us at hello@motherhonestly.com
      </Typography>
    </Box>
  );
};

export default DwollaPaymentSuccess;
