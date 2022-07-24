import React from 'react';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';

import MHButton from '../../components/Button/MHButton';
import MHFormControl from '../../components/Form/MHFormControl';
import InputAdornment from '../../components/Form/InputAdornment';
import useInput from '../../hooks/use-input';
import useHttp from '../../hooks/use-http';

import { ReactComponent as MailIcon } from '../../static/svg/mail.svg';
import { FnComponent } from '../../models/component.model';
import { BGImage } from '../../models/background-image.model';
import * as validators from '../../utils/validators';

const ForgotPassword: FnComponent<{
  onRouteChange: (image: BGImage) => void;
}> = (props) => {
  const { onRouteChange } = props;

  const { loading, error, sendHttpRequest: sendResetLink } = useHttp();

  const {
    value: enteredEmail,
    valid: enteredEmailIsValid,
    error: emailInputHasError,
    onChange: emailInputChangeHandler,
    onBlur: emailInputBlurHandler
  } = useInput([{ validator: (value: string) => validators.email(value) }]);

  const emailErrorTip = emailInputHasError ? 'Please enter a valid email' : '';

  React.useEffect(() => {
    onRouteChange({
      imageSrc:
        'https://res.cloudinary.com/mother-honestly/image/upload/v1657836148/lawrence-crayton-KXOaNSU63NE-unsplash_1_c4copk.png',
      imageAlt: 'Lwrence Crayton'
    });
  }, [onRouteChange]);

  const sendResetLinkHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (emailInputHasError && !enteredEmailIsValid) {
      return;
    }

    sendResetLink(
      process.env.REACT_APP_API_BASE_URL + 'employee/dashboard/passwordreset',
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: enteredEmail
        })
      },
      (data: any) => {}
    );
  };

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

          {error && (
            <Alert
              severity="error"
              sx={{
                mb: 3
              }}>
              {error}
            </Alert>
          )}

          <Box component={'form'} onSubmit={sendResetLinkHandler}>
            <MHFormControl
              id="email"
              type="email"
              label="Email address"
              placeholder="Enter your email address"
              value={enteredEmail}
              onChange={emailInputChangeHandler}
              onBlur={emailInputBlurHandler}
              error={emailErrorTip}
              startAdornment={
                <InputAdornment>
                  <MailIcon width="1rem" />
                </InputAdornment>
              }
              required
            />

            <MHButton sx={{}} type="submit" loading={loading} fullWidth>
              Reset my password
            </MHButton>
          </Box>
        </Box>
      </Paper>
    </React.Fragment>
  );
};

export default ForgotPassword;
