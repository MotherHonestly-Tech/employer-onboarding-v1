import React from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import { SelectOption } from '@mui/base';

import MHFormControl from '../Form/MHFormControl';
import MHButton from '../../components/Button/MHButton';
import useInput from '../../hooks/use-input';

import * as validators from '../../utils/validators';
import OnboardingContext, {
  EmployerOnboarding
} from '../../store/context/onboarding-context';

const InitialStep = React.forwardRef(
  (props: { activeIndex: number; onNext: () => void }, ref) => {
    const onboardingCtx = React.useContext(OnboardingContext);

    const {
      value: enteredFirstName,
      valid: enteredFirstNameIsValid,
      error: enteredFirstNameHasError,
      onChange: firstNameInputChangeHandler,
      onBlur: firstNameInputBlurHandler,
      markAsTouched: markFirstNameInputAsTouched
    } = useInput([
      {
        validator: (value: string) => validators.required(value)
      }
    ]);

    const {
      value: enteredLastName,
      valid: enteredLastNameIsValid,
      error: enteredLastNameHasError,
      onChange: lastNameInputChangeHandler,
      onBlur: lastNameInputBlurHandler,
      markAsTouched: markLastNameInputAsTouched
    } = useInput([
      {
        validator: (value: string) => validators.required(value)
      }
    ]);

    const {
      value: enteredEmail,
      valid: enteredEmailIsValid,
      error: enteredEmailHasError,
      onChange: emailInputChangeHandler,
      onBlur: emailInputBlurHandler,
      markAsTouched: markEmailInputAsTouched
    } = useInput([
      {
        validator: (value: string) => validators.required(value)
      },
      {
        validator: (value: string) => validators.email(value)
      }
    ]);

    let formIsValid =
      enteredFirstNameIsValid && enteredLastNameIsValid && enteredEmailIsValid;

    const { employer, updateEmployerData } = onboardingCtx;
    const { activeIndex, onNext } = props;

    // to set the values of the form when component is mounted
    React.useEffect(() => {
      window.scrollTo(0, 0);

      if (!employer) return;

      firstNameInputChangeHandler(employer.firstName || '');
      lastNameInputChangeHandler(employer.lastName || '');
      emailInputChangeHandler(employer.employeeEmail || '');
    }, []);

    let firstNameErrorTip = enteredFirstNameHasError
      ? 'Please enter your first name'
      : undefined;

    let lastNameErrorTip = enteredLastNameHasError
      ? 'Please enter your last name'
      : undefined;

    let emailErrorTip = enteredEmailHasError
      ? 'Please enter a valid work email'
      : undefined;

    const preventDefault = (e: React.SyntheticEvent) => {
      e.preventDefault();
    };

    function submitHandler(e: React.SyntheticEvent<HTMLFormElement>) {
      preventDefault(e);

      if (!formIsValid) {
        markFirstNameInputAsTouched();
        markLastNameInputAsTouched();
        markEmailInputAsTouched();
        return;
      }

      updateEmployerData({
        firstName: enteredFirstName,
        lastName: enteredLastName,
        employeeEmail: enteredEmail
      } as EmployerOnboarding);
      onNext();
    }

    React.useImperativeHandle(ref, () => ({}));

    return (
      <React.Fragment>
        <Box component={'form'} onSubmit={submitHandler}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <MHFormControl
                id="firstName"
                type="text"
                label="First Name"
                placeholder="First Name"
                value={enteredFirstName}
                onChange={firstNameInputChangeHandler}
                onBlur={firstNameInputBlurHandler}
                error={firstNameErrorTip}
                required
              />
            </Grid>

            <Grid item xs={6}>
              <MHFormControl
                id="lastName"
                type="text"
                label="Last Name"
                placeholder="Last Name"
                value={enteredLastName}
                onChange={lastNameInputChangeHandler}
                onBlur={lastNameInputBlurHandler}
                error={lastNameErrorTip}
                required
              />
            </Grid>
          </Grid>

          <MHFormControl
            id="zipCode"
            type="text"
            label="Work Email"
            placeholder="mail@domain"
            value={enteredEmail}
            onChange={emailInputChangeHandler}
            onBlur={emailInputBlurHandler}
            error={emailErrorTip}
            required
          />

          <Stack spacing={2} mt={3}>
            <MHButton type="submit">{'Next'}</MHButton>
          </Stack>
        </Box>
      </React.Fragment>
    );
  }
);

export default InitialStep;

// // to update employee context data when form is submitted
// React.useEffect(() => {

// }, [activeIndex, updateEmployee, employeeOnboarding, formIsValid]);
// if form is valid, call the submit handler passed in props
// pass down activeIndex from parent and when it changes in useeffect, update ctx
// call function in useeffect cleanup to update ctx when component is destroyed/unmounted
