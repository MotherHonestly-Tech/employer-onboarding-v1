import React from 'react';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

import MHButton from '../../components/Button/MHButton';

import RoundedLogoIcon from '../../theme/icons/RoundedLogo';
import { ReactComponent as MailIcon } from '../../static/svg/mail.svg';
import { FnComponent } from '../../models/component.model';
import { BGImage } from '../../models/background-image.model';

const ResetLinkSuccess: FnComponent<{
  onRouteChange: (image: BGImage) => void;
}> = (props) => {
  const [email] = React.useState('damian@motherhonestly.com');
  const { onRouteChange } = props;

  React.useEffect(() => {
    onRouteChange({
      imageSrc:
        'https://res.cloudinary.com/mother-honestly/image/upload/v1657836298/sai-de-silva-httxBNGKapo-unsplash_1_arojoi.png',
      imageAlt: 'Sai de Silva'
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
            <MailIcon width="1rem" />
          </RoundedLogoIcon>

          <Typography variant="h3" my={1} gutterBottom>
            Check your email
          </Typography>

          <Typography variant="body1" mt={2} mb={4} mx="auto" maxWidth={0.8}>
            We sent a password reset link to{' '}
            <Typography
              component={'span'}
              color={(theme) => theme.palette.grey[500]}>
              {email}
            </Typography>
          </Typography>

          {/* <h1 className="text-center my-4">Check your email</h1>

          <p className="mb-5">We sent a password reset link to{' '}
            <span className="text-gray-200">{email}</span></p> */}

          <MHButton sx={{}} fullWidth>Open email app</MHButton>

          <Link
            sx={{
              display: 'block',
              cursor: 'pointer',
              my: 2
            }}>
            Didn't recieve the email? Click to resend
          </Link>
        </Box>
      </Paper>
    </React.Fragment>
  );
};

export default ResetLinkSuccess;
