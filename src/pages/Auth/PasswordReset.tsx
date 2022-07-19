import React from 'react';
import { useLocation } from 'react-router-dom';

import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import MHButton from '../../components/Form/MHButton';
import MHFormControl from '../../components/Form/MHFormControl';
import RoundedLogoIcon from '../../theme/icons/RoundedLogo';
import useInput from '../../hooks/use-input';

import { ReactComponent as KeyIcon } from '../../static/svg/key.svg';
import { FnComponent } from '../../models/component.model';
import { BGImage } from '../../models/background-image.model';
import * as validators from '../../utils/validators';

const PasswordReset: FnComponent<{
  onRouteChange: (image: BGImage) => void;
}> = (props) => {
  const { onRouteChange } = props;
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const {
    value: enteredPassword,
    valid: enteredPasswordIsValid,
    error: passwordInputHasError,
    onChange: passwordInputChangeHandler,
    onBlur: passwordInputBlurHandler
  } = useInput([
    {
      validator: (value: string) => validators.password(value)
    }
  ]);

  const {
    value: enteredRepeatPassword,
    valid: enteredRepeatPasswordIsValid,
    error: repeatPasswordInputHasError,
    onChange: repeatPasswordInputChangeHandler,
    onBlur: repeatPaswordInputBlurHandler
  } = useInput([
    {
      validator: (value: string) =>
        validators.matchingFields(value)(enteredPassword)
    }
  ]);

  let passwordErrorTip = passwordInputHasError
    ? 'Minimum of 8 characters, consisting of at least an uppercase letter, a lowercase letter, a number and a special character'
    : undefined;
  let repeatPasswordErrorTip = repeatPasswordInputHasError
    ? 'Passwords must match'
    : undefined;

  let formIsValid = false;

  if (enteredPasswordIsValid && enteredRepeatPasswordIsValid) {
    formIsValid = true;
  }

  React.useEffect(() => {
    console.log(queryParams.get('abc'));
    onRouteChange({
      imageSrc:
        'https://res.cloudinary.com/mother-honestly/image/upload/v1657836331/alex-lvrs-4N5huJDOydQ-unsplash_1_1_qubnfw.png',
      imageAlt: 'Lex Lvrs'
    });
  }, [onRouteChange]);

  const preventDefault = (event: React.SyntheticEvent) =>
    event.preventDefault();

  const setPasswordHandler = (event: React.ChangeEvent<HTMLFormElement>) => {
    preventDefault(event);

    if (!formIsValid) {
      return;
    }
  };

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

          <Box component={'form'} onSubmit={setPasswordHandler}>
            <MHFormControl
              id="password"
              type="password"
              label="Password"
              placeholder="Password"
              value={enteredPassword}
              onChange={passwordInputChangeHandler}
              onBlur={passwordInputBlurHandler}
              error={passwordErrorTip}
              required
              autoFocus
            />

            <MHFormControl
              id="repeat-password"
              type="password"
              label="Confirm Password"
              placeholder="Confirm Password"
              value={enteredRepeatPassword}
              onChange={repeatPasswordInputChangeHandler}
              onBlur={repeatPaswordInputBlurHandler}
              error={repeatPasswordErrorTip}
              required
            />

            <MHButton sx={{}} type="submit">
              Reset password
            </MHButton>
          </Box>
        </Box>
      </Paper>
    </React.Fragment>
  );
};

export default PasswordReset;
