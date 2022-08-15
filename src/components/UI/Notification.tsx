import React from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Slide from '@mui/material/Slide';

import { ReactComponent as CheckCircleFillIcon } from '../../static/svg/check-circle-fill.svg';
import { ReactComponent as ErrorFillIcon } from '../../static/svg/x-circle-fill.svg';
import { ReactComponent as WarningFillIcon } from '../../static/svg/exclamation-triangle-fill.svg';

type Alert = 'success' | 'error' | 'warning';

const Notification = ({ type, message }: { type: Alert; message: string }) => {
  let iconEl: React.ReactElement | null = null;
  let bgColor: string | null = null;

  switch (type) {
    case 'success':
      iconEl = <CheckCircleFillIcon color="#2d832d" />;
      bgColor = '#edf7ed';
      break;
    case 'error':
      iconEl = <ErrorFillIcon color="#f87171" />;
      bgColor = '#fee2e2';
      break;
    case 'warning':
      iconEl = <WarningFillIcon color="#fb923c" />;
      bgColor = '#ffedd5';
      break;
  }

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 20,
        maxWidth: 700,
        left: '50%',
        transform: 'translateX(-50%)'
      }}>
      <Slide
        direction="down"
        in
        mountOnEnter
        unmountOnExit
        easing={{
          enter: 'ease-in'
        }}>
        <Stack
          bgcolor={bgColor}
          direction="row"
          spacing={2}
          alignItems="center"
          sx={{
            px: 2,
            py: 1,
            borderRadius: 2
          }}>
          {iconEl}
          <Typography variant="body1" color="textPrimary">
            {message}
          </Typography>
        </Stack>
      </Slide>
    </Box>
  );
};

export default Notification;
