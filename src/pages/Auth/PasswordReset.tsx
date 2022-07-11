import React from 'react';

import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

import MHButton from '../../components/Form/MHButton';
import MHFormControl from '../../components/Form/MHFormControl';
import RoundedLogoIcon from '../../theme/icons/RoundedLogo';

import { ReactComponent as KeyIcon } from '../../static/svg/key.svg';
import { Component } from '../../models/component.model';
import { BGImage } from '../../models/image.model';

const PasswordReset: Component<{ onRouteChange: (image: BGImage) => void }> = (
  props
) => {
  const { onRouteChange } = props;

  React.useEffect(() => {
    onRouteChange({
      imageSrc:
        'https://res.cloudinary.com/mother-honestly/image/upload/v1657531435/lex-lvrs-4N5huJDOydQ_hjsd3a.png',
      imageAlt: 'Lex Lvrs'
    });
  }, [onRouteChange]);

  return (
    <React.Fragment>
      <Paper
        sx={{
          px: 8,
          py: 5,
          width: '60%'
        }}>
        <Box sx={{}}>
          <RoundedLogoIcon>
            <KeyIcon width="1rem" />
          </RoundedLogoIcon>

          <h1 className="text-center my-4">Set new password</h1>

          <MHFormControl label="Password" placeholder="Password" />

          <MHFormControl
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
