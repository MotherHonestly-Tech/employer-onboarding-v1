import React from 'react';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import MHButton from '../../components/Form/MHButton';

import { ReactComponent as CheckmarkIcon } from '../../static/svg/check-mark-rounded.svg';
import RoundedLogoIcon from '../../theme/icons/RoundedLogo';
import { FnComponent } from '../../models/component.model';
import { BGImage } from '../../models/background-image.model';

const ResetSuccess: FnComponent<{
  onRouteChange: (image: BGImage) => void;
}> = (props) => {
  const { onRouteChange } = props;

  React.useEffect(() => {
    onRouteChange({
      imageSrc:
        'https://res.cloudinary.com/mother-honestly/image/upload/v1657559254/youssef-naddam-iJ2IG8ckCpA_wp7apa.png',
      imageAlt: 'Youssef Naddam'
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
        <Box
          sx={{
            textAlign: 'center'
          }}>
          <RoundedLogoIcon>
            <CheckmarkIcon width="1rem" />
          </RoundedLogoIcon>

          <Typography variant="h3" my={1} gutterBottom>
            Password reset
          </Typography>

          <Typography variant="body1" mt={2} mb={4} mx="auto" maxWidth={.75}>
            Your password has been successfully reset. Click below to log in
            magically
          </Typography>

          {/* <h1 className="text-center my-4">Password reset</h1>

          <p className="mb-5">
            Your password has been successfully reset. Click below to log in
            magically
          </p> */}

          <MHButton
            sx={{
              mb: 2
            }}>
            Continue
          </MHButton>

          <p className="mb-5">Back to log in</p>
        </Box>
      </Paper>
    </React.Fragment>
  );
};

export default ResetSuccess;
