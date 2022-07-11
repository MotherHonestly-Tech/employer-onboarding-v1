import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';

import ForgotPassword from '../pages/Auth/ForgotPassword';
import ResetLinkSuccess from '../pages/Auth/ResetLinkSuccess';
import PasswordReset from '../pages/Auth/PasswordReset';

import MHLogoIcon from '../theme/icons/Logo';
import { Component } from '../models/component.model';
import { theme } from '../theme/mui/dashboard.theme';
import { BGImage } from '../models/image.model';


const AuthNavigator: Component = () => {
  const [image, setImage] = React.useState<BGImage>({} as BGImage);

  const changeImageHandler = React.useCallback(({ imageSrc, imageAlt }: BGImage) => {
    setImage({
      imageSrc,
      imageAlt
    });
  }, []);

  return (
    <React.Fragment>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={0} sx={{ height: '100vh' }}>
          <Grid
            item
            xs={8}
            sx={{
              backgroundColor: theme.palette.background.default,
              position: 'relative'
            }}>
            <MHLogoIcon />

            <Stack
              direction="column"
              justifyContent="center"
              alignItems="center"
              sx={{ height: '100vh', px: 6 }}>
              <Switch>
                <Route path="/forgot-password" exact>
                  <ForgotPassword onRouteChange={changeImageHandler} />
                </Route>
                <Route path="/forgot-password/user-email">
                  <ResetLinkSuccess onRouteChange={changeImageHandler} />
                </Route>
                <Route path="/password-reset">
                  <PasswordReset onRouteChange={changeImageHandler} />
                </Route>
              </Switch>
            </Stack>
          </Grid>

          <Grid item xs={4}>
            <Box
              component="div"
              sx={{
                height: '100vh',
                overflow: 'hidden'
              }}>
              <img
                src={image.imageSrc}
                alt="background"
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
