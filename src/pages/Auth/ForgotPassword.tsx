import React from 'react';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

import MHButton from '../../components/Form/MHButton';
import MHFormControl from '../../components/Form/MHFormControl';
import InputAdornment from '../../components/Form/InputAdornment';

import { ReactComponent as MailIcon } from '../../static/svg/mail.svg';
import { Component } from '../../models/component.model';
import { BGImage } from '../../models/image.model';

const ForgotPassword: Component<{
  onRouteChange: (image: BGImage) => void;
}> = (props) => {
  const { onRouteChange } = props;

  React.useEffect(() => {
    onRouteChange({
      imageSrc:
        'https://res.cloudinary.com/mother-honestly/image/upload/v1657513169/lawrence-crayton-KXOaNSU63NE_x387ju.png',
      imageAlt: 'Lwrence Crayton'
    });
  }, [onRouteChange]);

  return (
    <React.Fragment>
      <Paper
        sx={{
          p: 8,
          width: '60%'
        }}>
        <Box sx={{}}>
          <h1 className="text-center mb-10">Reset your password</h1>

          <MHFormControl
            label="Email address"
            placeholder="Enter your email address"
            startAdornment={
              <InputAdornment>
                <MailIcon width="1.2rem" />
              </InputAdornment>
            }
          />

          <MHButton sx={{}}>Reset my password</MHButton>
        </Box>
      </Paper>
    </React.Fragment>
  );
};

export default ForgotPassword;
