import React from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import MHLogo from '../../theme/icons/MHLogo';
import { ReactComponent as PendingPaymentIcon } from '../../static/svg/pending-payment.svg';
// import { ReactComponent as UnileverLogoIcon } from '../../static/svg/unilever-logo.svg';

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
      <MHLogo style={{ width: '3.4rem' }} />

      <Typography variant="body1" mt={6} fontSize=".85rem" gutterBottom>
        Payment Ref: #RE4543643
      </Typography>

      <Typography variant="h3" fontSize="1.75rem">
        Thank you for your payment
      </Typography>

      <PendingPaymentIcon width="320" />

      {/* <Typography variant="body1" fontSize="1rem" gutterBottom>
        <Typography
          component="span"
          display="inline"
          fontFamily="Area-Normal-Black"
          fontSize="1rem">
          Transaction Amount:
        </Typography>{' '}
        $7,260
      </Typography> */}

      {/* <Typography variant="body1" fontSize="1rem" gutterBottom>
        <Typography
          component="span"
          display="inline"
          fontFamily="Area-Normal-Black"
          fontSize="1rem">
          Transaction Date:
        </Typography>{' '}
        22 Sep 2022
      </Typography> */}

      <Typography variant="body2" mt={3}>
        We're still processing your payment, this typically takes around 1-2
        workings days. Please check your email for confirmation and next steps.
      </Typography>
    </Box>
  );
};

export default DwollaPaymentSuccess;
