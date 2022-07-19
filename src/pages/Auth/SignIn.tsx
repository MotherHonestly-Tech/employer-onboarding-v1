import React from 'react';
import { Link } from 'react-router-dom';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import MuiLink from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';

import MHFormControl from '../../components/Form/MHFormControl';
import MHButton from '../../components/Form/MHButton';
import InputAdornment from '../../components/Form/InputAdornment';
import IconButton from '../../components/Form/IconButtonUnstyled';
import useHttp from '../../hooks/use-http';

import { ReactComponent as MailIcon } from '../../static/svg/mail.svg';
import { ReactComponent as LockIcon } from '../../static/svg/lock.svg';
import { ReactComponent as VisibilityIcon } from '../../static/svg/visibility.svg';
import { ReactComponent as VisibilityOffIcon } from '../../static/svg/visibility-off.svg';
import { BGImage } from '../../models/background-image.model';
import { FnComponent } from '../../models/component.model';
import { theme } from '../../theme/mui/dashboard.theme';
import * as formReducer from '../../store/reducers/form';
import * as validators from '../../utils/validators';
import { environment } from '../../env';
import AuthContext from '../../store/context/auth-context';

const SignIn: FnComponent<{ onRouteChange: (image: BGImage) => void }> = (
  props
) => {
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const { onRouteChange } = props;

  const authCtx = React.useContext(AuthContext);
  const { loading, error, sendHttpRequest: signIn } = useHttp();

  const [formState, dispatch] = React.useReducer(formReducer.formReducer, {
    email: {
      value: '',
      valid: false,
      required: true,
      dirty: false,
      validating: false,
      validators: [
        {
          validator: (value: string) => validators.email(value)
        }
      ]
    },
    password: {
      value: '',
      valid: false,
      required: true,
      dirty: false,
      validating: false,
      validators: [
        {
          validator: (value: string) => validators.minLength(8)(value)
        }
      ]
    },
    formIsValid: false
  });

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

  const signinHandler = async (event: React.ChangeEvent<HTMLFormElement>) => {
    // emailInputRef.current!.focus();
    preventDefault(event);

    if (!formState.formIsValid) {
      return;
    }

    signIn(
      environment.API_BASE_URL + 'employee/dashboard/login',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: formState.email.value,
          password: formState.password.value
        })
      },
      (data: any) => {
        console.log(data);
        authCtx.login(data.token);
      }
    );
  };

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: formReducer.SET_FORM_DATA,
      value: event.target.value,
      id: event.target.id
    });
  };

  const handleClickShowPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    preventDefault(event);
    setShowPassword((prevState) => !prevState);
  };

  // const handleMouseDownPassword = (
  //   event: React.MouseEvent<HTMLButtonElement>
  // ) => {
  //   // preventDefault(event);
  // };

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

          {error && (
            <Alert
              severity="error"
              sx={{
                mb: 3
              }}>
              Invalid email or password
            </Alert>
          )}

          {/* autoComplete="off"
            noValidate */}
          <Box component={'form'} onSubmit={signinHandler}>
            <MHFormControl
              id="email"
              type="email"
              label="Email address"
              placeholder="Enter your email"
              onChange={inputChangeHandler}
              startAdornment={
                <InputAdornment>
                  <MailIcon width="1rem" />
                </InputAdornment>
              }
              required
              autoFocus
            />

            <MHFormControl
              id="password"
              type={showPassword ? 'text' : 'password'}
              label="Password"
              placeholder="Password"
              onChange={inputChangeHandler}
              startAdornment={
                <InputAdornment>
                  <LockIcon width="1.2rem" />
                </InputAdornment>
              }
              endAdornment={
                <InputAdornment>
                  <IconButton onClick={handleClickShowPassword}>
                    {showPassword ? (
                      <VisibilityOffIcon width="1rem" height="1rem" />
                    ) : (
                      <VisibilityIcon width="1rem" height="1rem" />
                    )}
                  </IconButton>
                </InputAdornment>
              }
              required
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

            <MHButton sx={{}} type="submit" loading={loading}>
              Sign in
            </MHButton>
          </Box>
        </Box>
      </Paper>
    </React.Fragment>
  );
};

export default SignIn;
