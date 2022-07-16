import React from 'react';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import MHButton from '../../components/Form/MHButton';
import MHFormControl from '../../components/Form/MHFormControl';
import InputAdornment from '../../components/Form/InputAdornment';

import { ReactComponent as MailIcon } from '../../static/svg/mail.svg';
import { FnComponent } from '../../models/component.model';
import { BGImage } from '../../models/background-image.model';

const ForgotPassword: FnComponent<{
  onRouteChange: (image: BGImage) => void;
}> = (props) => {
  const { onRouteChange } = props;

  React.useEffect(() => {
    onRouteChange({
      imageSrc:
        'https://res.cloudinary.com/mother-honestly/image/upload/v1657836148/lawrence-crayton-KXOaNSU63NE-unsplash_1_c4copk.png',
      imageAlt: 'Lwrence Crayton'
    });
  }, [onRouteChange]);

  return (
    <React.Fragment>
      <Paper
        sx={{
          p: 8,
          width: '100%',
          maxWidth: 'sm'
        }}>
        <Box sx={{}}>
          <Typography variant="h1" component="h1" gutterBottom mb={1}>
            Forgot your password?
          </Typography>

          <Typography variant="subtitle1" component={'div'} gutterBottom mb={2}>
            Let's get you into your account
          </Typography>

          <Typography variant="body2" component={'div'} gutterBottom mb={3}>
            Submit your email address and we'll send you a link to reset your
            password
          </Typography>

          <Box component={'form'}>
            <MHFormControl
              type="email"
              label="Email address"
              placeholder="Enter your email address"
              startAdornment={
                <InputAdornment>
                  <MailIcon width="1rem" />
                </InputAdornment>
              }
            />
            <MHButton sx={{}}>Reset my password</MHButton>
          </Box>


        </Box>
      </Paper>
    </React.Fragment>
  );
};

export default ForgotPassword;
