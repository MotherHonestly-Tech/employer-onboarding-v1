import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';

import SignIn from '../pages/Auth/SignIn';
import ForgotPassword from '../pages/Auth/ForgotPassword';
import ResetLinkSuccess from '../pages/Auth/ResetLinkSuccess';
import PasswordReset from '../pages/Auth/PasswordReset';
import ResetSuccess from '../pages/Auth/ResetSuccess';
import MHLogoIcon from '../theme/icons/MHLogo';

import { FnComponent } from '../models/component.model';
import { theme } from '../theme/mui/dashboard.theme';
import { BGImage } from '../models/background-image.model';

const AuthNavigator: FnComponent = () => {
  const [image, setImage] = React.useState<BGImage>({} as BGImage);
  const backgroundColor = React.useRef(theme.palette.background.default);

  const changeImageHandler = React.useCallback(
    ({ imageSrc, imageAlt, background }: BGImage) => {
      setImage({
        imageSrc,
        imageAlt
      });
      backgroundColor.current = !background
        ? theme.palette.background.default
        : (background as string);
    },
    []
  );

  return (
    <React.Fragment>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={0} sx={{ minHeight: '100vh' }}>
          <Grid
            item
            xs={6}
            sx={{
              backgroundColor: backgroundColor.current,
              position: 'relative'
            }}>
            <Box
              component={'div'}
              sx={{
                position: 'absolute',
                top: 70,
                left: 0,
                right: 0
              }}>
              <MHLogoIcon />
            </Box>

            <Stack
              direction="column"
              justifyContent="center"
              alignItems="center"
              sx={{ minHeight: '100vh', px: 6 }}>
              <Switch>
                <Route path="/" exact>
                  <SignIn onRouteChange={changeImageHandler} title="Sign in to your account" />
                </Route>
                <Route path="/forgot-password" exact>
                  <ForgotPassword onRouteChange={changeImageHandler} />
                </Route>
                <Route path="/forgot-password/user-email" exact>
                  <ResetLinkSuccess onRouteChange={changeImageHandler} />
                </Route>
                <Route path="/password-reset" exact>
                  <PasswordReset onRouteChange={changeImageHandler} />
                </Route>
                <Route path="/password-reset/success" exact>
                  <ResetSuccess onRouteChange={changeImageHandler} />
                </Route>

                <Route path="*">
                  <Redirect to="/" />
                </Route>
              </Switch>
            </Stack>
          </Grid>

          <Grid item xs={6}>
            <Box
              component="div"
              sx={{
                height: '100vh',
                overflow: 'hidden'
              }}>
              <img
                src={image.imageSrc}
                alt={image.imageAlt}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center'
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </React.Fragment>
  );
};

export default AuthNavigator;
