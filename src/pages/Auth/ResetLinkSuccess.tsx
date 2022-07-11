import React from 'react';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

import MHButton from '../../components/Form/MHButton';

import RoundedLogoIcon from '../../theme/icons/RoundedLogo';
import { ReactComponent as MailIcon } from '../../static/svg/mail.svg';
import { Component } from '../../models/component.model';
import { BGImage } from '../../models/image.model';

const ResetLinkSuccess: Component<{
  onRouteChange: (image: BGImage) => void;
}> = (props) => {
  const [email] = React.useState('damian@motherhonestly.com');
  const { onRouteChange } = props;

  React.useEffect(() => {
    onRouteChange({
      imageSrc:
        'https://res.cloudinary.com/mother-honestly/image/upload/v1657522220/sai-de-silva-httxBNGKapo_j9nhg0.png',
      imageAlt: 'Sai de Silva'
    });
  }, [onRouteChange]);

  return (
    <React.Fragment>
      <Paper
        sx={{
          p: 8,
          width: '60%'
        }}>
        <Box
          sx={{
            textAlign: 'center'
          }}>
          <RoundedLogoIcon>
            <MailIcon width="1rem" />
          </RoundedLogoIcon>

          <h1 className="text-center my-4">
            Check your email
          </h1>

          <p className="mb-5">
            We sent a password reset link to{' '}
            <span className="text-gray-200">{email}</span>
          </p>

          <MHButton
            sx={{
              mb: 2
            }}>
            Open email app
          </MHButton>

          <p className="mb-5">Didn’t recieve the email? Click to reset</p>
        </Box>
      </Paper>
    </React.Fragment>
  );
};

export default ResetLinkSuccess;
