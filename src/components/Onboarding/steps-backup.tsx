import React from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import MHFormControl from '../Form/MHFormControl';
import { MHSelect } from '../Form/MHSelect';
import MHButton from '../../components/Button/MHButton';
import useInput from '../../hooks/use-input';

import * as validators from '../../utils/validators';
import * as constants from '../../utils/constants';
import { SelectOption } from '@mui/base';
import OnboardingContext, {
  EmployeeOnboarding
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
      value: enteredZipCode,
      valid: enteredZipCodeIsValid,
      error: enteredZipCodeHasError,
      onChange: zipCodeInputChangeHandler,
      onBlur: zipCodeInputBlurHandler,
      markAsTouched: markZipCodeInputAsTouched
    } = useInput([
      {
        validator: (value: string) => validators.required(value)
      }
    ]);

    const {
      value: enteredStatus,
      valid: enteredStatusIsValid,
      error: enteredStatusHasError,
      onChange: statusInputChangeHandler,
      onBlur: statusInputBlurHandler
    } = useInput([
      {
        validator: (value: string) => validators.required(value)
      }
    ]);

    const {
      value: enteredNumberOfKids,
      valid: enteredNumberOfKidsIsValid,
      error: enteredNumberOfKidsHasError,
      onChange: numberOfKidsInputChangeHandler,
      onBlur: numberOfKidsInputBlurHandler
    } = useInput([
      {
        validator: (value: string) => validators.required(value)
      }
    ]);

    const {
      value: enteredLivingParents,
      valid: enteredLivingParentsIsValid,
      error: enteredLivingParentsHasError,
      onChange: livingParentsInputChangeHandler,
      onBlur: livingParentsInputBlurHandler
    } = useInput([
      {
        validator: (value: string) => validators.required(value)
      }
    ]);

    let formIsValid = false;

    if (
      enteredFirstNameIsValid &&
      enteredLastNameIsValid &&
      enteredZipCodeIsValid &&
      enteredStatusIsValid &&
      enteredNumberOfKidsIsValid &&
      enteredLivingParentsIsValid
    ) {
      formIsValid = true;
    }

    const { employee, updateEmployee } = onboardingCtx;
    const { activeIndex, onNext } = props;

    // to set the values of the form when component is mounted
    React.useEffect(() => {
      if (!employee) return;

      firstNameInputChangeHandler(employee.firstName || '');
      lastNameInputChangeHandler(employee.lastName || '');
      zipCodeInputChangeHandler(employee.zipCode || '');
      statusInputChangeHandler(employee.relationshipStatus || '');
      numberOfKidsInputChangeHandler(employee.numberOfKids || '');
    //   livingParentsInputChangeHandler(employee.livingParents || '');
    }, []);

    function renderKidsSelectValue(option: SelectOption<string> | null) {
      if (!option) {
        return null;
      }

      return <span>{option?.value + ' kid(s)'}</span>;
    }

    function renderParentsSelectValue(option: SelectOption<string> | null) {
      let content = null;

      if (!option) {
        return content;
      }

      switch (option.value) {
        case 'yes':
          content = <span>{option.label} (I have living parents)</span>;
          break;
        case 'no':
          content = <span>{option.label} (I have no living parents)</span>;
          break;
        default:
          content = null;
          break;
      }

      return content;
    }

    let firstNameErrorTip = enteredFirstNameHasError
      ? 'Please enter your first name'
      : undefined;

    let lastNameErrorTip = enteredLastNameHasError
      ? 'Please enter your last name'
      : undefined;

    let zipCodeErrorTip = enteredZipCodeHasError
      ? 'Please enter your zip code'
      : undefined;

    const preventDefault = (e: React.SyntheticEvent) => {
      e.preventDefault();
    };

    function submitHandler(e: React.ChangeEvent<HTMLFormElement>) {
      e.preventDefault();

      if (!formIsValid) {
        markFirstNameInputAsTouched();
        markLastNameInputAsTouched();
        markZipCodeInputAsTouched();
        return;
      }

      updateEmployee({
        firstName: enteredFirstName,
        lastName: enteredLastName,
        zipCode: enteredZipCode,
        relationshipStatus: enteredStatus,
        numberOfKids: enteredNumberOfKids,
        // livingParents: enteredLivingParents
      });
      onNext();
    }

    function renderPetsQSelectValue(option: SelectOption<string> | null) {
        let content = null;
    
        if (!option) {
          return content;
        }
    
        switch (option.value) {
          case 'yes':
            content = <span>{option.label} (I have pets)</span>;
            break;
    
          case 'no':
            content = <span>{option.label} (No pets)</span>;
            break;
          default:
            content = null;
            break;
        }
        return content;
      }
    
      function renderPetsSelectValue(option: SelectOption<string> | null) {
        if (!option) {
          return null;
        }
        return <span>{option?.value + ' pet(s)'}</span>;
      }

    React.useImperativeHandle(ref, () => ({}));

    return (
      <React.Fragment>
        <Box component={'form'} onSubmit={submitHandler}>
          <MHFormControl
            id="firstName"
            type="text"
            label="First Name"
            placeholder="First Name"
            value={enteredFirstName}
            onChange={firstNameInputChangeHandler}
            onBlur={firstNameInputBlurHandler}
            error={firstNameErrorTip}
          />

          <MHFormControl
            id="lastName"
            type="text"
            label="Last Name"
            placeholder="Last Name"
            value={enteredLastName}
            onChange={lastNameInputChangeHandler}
            onBlur={lastNameInputBlurHandler}
            error={lastNameErrorTip}
          />

          <MHFormControl
            id="zipCode"
            type="text"
            label="Zip Code"
            placeholder="Zip Code"
            value={enteredZipCode}
            onChange={zipCodeInputChangeHandler}
            onBlur={zipCodeInputBlurHandler}
            error={zipCodeErrorTip}
          />

          <MHSelect
            label="Relationship"
            options={constants.RELATIONSHIP_STATUS_OPTIONS}
            placeholder="Relationship"
            value={enteredStatus}
            onChange={(val) => statusInputChangeHandler(val as string)}
            onBlur={statusInputBlurHandler}
          />

          <MHSelect
            label="Number of Kids"
            options={constants.QUANTITY_OPTIONS}
            placeholder="Number of Kids"
            value={enteredNumberOfKids}
            onChange={(val) => numberOfKidsInputChangeHandler(val as string)}
            onBlur={numberOfKidsInputBlurHandler}
            renderValue={renderKidsSelectValue}
          />

          <MHSelect
            label="Living Parents"
            options={constants.BOOL_OPTIONS}
            placeholder="Living Parents"
            value={enteredLivingParents}
            onChange={(val) => livingParentsInputChangeHandler(val as string)}
            onBlur={livingParentsInputBlurHandler}
            renderValue={renderParentsSelectValue}
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
