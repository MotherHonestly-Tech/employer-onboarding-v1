import React from 'react';
import { Link } from 'react-router-dom';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import MuiLink from '@mui/material/Link';
import Typography from '@mui/material/Typography';

import MHFormControl from '../../components/Form/MHFormControl';
import MHButton from '../../components/Form/MHButton';
import InputAdornment from '../../components/Form/InputAdornment';

import { ReactComponent as MailIcon } from '../../static/svg/mail.svg';
import { ReactComponent as LockIcon } from '../../static/svg/lock.svg';
import { BGImage } from '../../models/background-image.model';
import { FnComponent } from '../../models/component.model';
import { theme } from '../../theme/mui/dashboard.theme';

const SignIn: FnComponent<{ onRouteChange: (image: BGImage) => void }> = (
  props
) => {
  const { onRouteChange } = props;

  React.useEffect(() => {
    onRouteChange({
      imageSrc:
        'https://res.cloudinary.com/mother-honestly/image/upload/v1657835660/juliane-liebermann-O-RKu3Aqnsw-unsplash_1_zv7sov.png',
      imageAlt: 'Juliane Liebermann',
      background: theme.palette.background.paper
    });
  }, [onRouteChange]);

  const preventDefault = (event: React.SyntheticEvent) =>
    event.preventDefault();

  return (
    <React.Fragment>
      <Paper
        elevation={0}
        sx={{
          px: 8,
          py: 5,
          width: '100%',
          maxWidth: 'sm',
          boxShadow: 'none'
        }}>
        <Box sx={{}}>
          <Box
            sx={{
              my: 4
            }}>
            <Typography variant="h1" component="div" gutterBottom mb={1.5}>
              Welcome back
            </Typography>
            <Typography variant="body1" component="div">
              Welcome back! Please enter your details.
            </Typography>
            {/* <h1 className="my-4 leading-4 text-2xl">Welcome back</h1>
            <p>Welcome back! Please enter your details.</p> */}
          </Box>

          <Box component={'form'}>
            <MHFormControl
              type="email"
              label="Email address"
              placeholder="Enter your email"
              startAdornment={
                <InputAdornment>
                  <MailIcon width="1rem" />
                </InputAdornment>
              }
            />

            <MHFormControl
              type="password"
              label="Password"
              placeholder="Password"
              startAdornment={
                <InputAdornment>
                  <LockIcon width="1.2rem" />
                </InputAdornment>
              }
            />

            <Box
              sx={{
                typography: 'body1',
                textAlign: 'right'
              }}
              mb={3}
              onClick={preventDefault}>
              <MuiLink component={Link} href="" to="/forgot-password">
                Forgot password?
              </MuiLink>
            </Box>

            <MHButton sx={{}}>Sign in</MHButton>
          </Box>
        </Box>
      </Paper>
    </React.Fragment>
  );
};

export default SignIn;
