import React from 'react';

import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import MHButton from '../../components/Form/MHButton';
import MHFormControl from '../../components/Form/MHFormControl';
import RoundedLogoIcon from '../../theme/icons/RoundedLogo';

import { ReactComponent as KeyIcon } from '../../static/svg/key.svg';
import { FnComponent } from '../../models/component.model';
import { BGImage } from '../../models/background-image.model';

const PasswordReset: FnComponent<{ onRouteChange: (image: BGImage) => void }> = (
  props
) => {
  const { onRouteChange } = props;

  React.useEffect(() => {
    onRouteChange({
      imageSrc:
        'https://res.cloudinary.com/mother-honestly/image/upload/v1657836331/alex-lvrs-4N5huJDOydQ-unsplash_1_1_qubnfw.png',
      imageAlt: 'Lex Lvrs'
    });
  }, [onRouteChange]);

  return (
    <React.Fragment>
      <Paper
        sx={{
          px: 8,
          py: 5,
          width: '100%',
          maxWidth: 'sm'
        }}>
        <Box sx={{}}>
          <RoundedLogoIcon>
            <KeyIcon width="1rem" />
          </RoundedLogoIcon>

          <Typography variant="h3" my={4} align="center" gutterBottom>
            Set new password
          </Typography>

          {/* <h1 className="text-center my-4">Set new password</h1> */}

          <MHFormControl
            type="password"
            label="Password"
            placeholder="Password"
          />

          <MHFormControl
            type="password"
            label="Confirm Password"
            placeholder="Confirm Password"
          />

          <MHButton sx={{}}>Reset password</MHButton>
        </Box>
      </Paper>
    </React.Fragment>
  );
};

export default PasswordReset;
