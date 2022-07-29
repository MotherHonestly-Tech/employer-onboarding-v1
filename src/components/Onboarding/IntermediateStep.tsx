import React from 'react';
import ReactDOM from 'react-dom';

import { SelectOption } from '@mui/base';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import { MHSelect } from '../Form/MHSelect';
import Label from '../Form/Label';
import MHButton from '../Button/MHButton';
import useInput from '../../hooks/use-input';

import * as validators from '../../utils/validators';
import * as constants from '../../utils/constants';
import OnboardingContext from '../../store/context/onboarding-context';

const generateDateOptions = () => {
  let dateOptions: SelectOption<string>[] = [];
  for (let i = 1; i <= 31; i++) {
    dateOptions = dateOptions.concat({
      value: i.toString(),
      label: i.toString()
    });
  }

  return dateOptions;
};

const generateMonthOptions = (): SelectOption<string>[] => {
  const monthOptions: SelectOption<string>[] = new Array(12)
    .fill(0)
    .map((_, i) => {
      return {
        value: (i + 1).toString(),
        label: new Date(new Date(2022, i, 1).toISOString()).toLocaleString(
          'default',
          {
            month: 'long'
          }
        )
      };
    });

  return monthOptions;
};

const generateYearOptions = () => {
  const yearOptions: SelectOption<string>[] = [];
  for (let i = new Date().getFullYear() - 16; i >= 1900; i--) {
    yearOptions.push({
      value: i.toString(),
      label: i.toString()
    });
  }
  return yearOptions;
};

const IntermediateStep = (props: {
  activeIndex: number;
  onNext: () => void;
  onPrevious: (e: React.MouseEvent) => void;
}) => {
  const onboardingCtx = React.useContext(OnboardingContext);

  const {
    value: enteredIdentity,
    valid: enteredIdentityIsValid,
    onChange: identityInputChangeHandler,
    onBlur: identityInputBlurHandler
  } = useInput([
    {
      validator: (value: string) => validators.required(value)
    }
  ]);

  const {
    value: enteredDate,
    valid: enteredDateIsValid,
    onChange: dateInputChangeHandler,
    onBlur: dateInputBlurHandler
  } = useInput([
    {
      validator: (value: string) => validators.required(value)
    }
  ]);

  const {
    value: enteredMonth,
    valid: enteredMonthIsValid,
    onChange: monthInputChangeHandler,
    onBlur: monthInputBlurHandler
  } = useInput([{ validator: (value: string) => validators.required(value) }]);

  const {
    value: enteredYear,
    valid: enteredYearIsValid,
    onChange: yearInputChangeHandler,
    onBlur: yearInputBlurHandler
  } = useInput([
    {
      validator: (value: string) => validators.required(value)
    }
  ]);

  const {
    value: enteredPetBoolQ,
    valid: enteredPetBoolQIsValid,
    onChange: petBoolQInputChangeHandler,
    onBlur: petBoolQInputBlurHandler
  } = useInput([{ validator: (value: string) => validators.required(value) }]);

  const {
    value: enteredNumberOfPets,
    valid: enteredNumberOfPetsIsValid,
    onChange: numberOfPetsInputChangeHandler,
    onBlur: numberOfPetsInputBlurHandler
  } = useInput([{ validator: (value: string) => validators.required(value) }]);

  let formIsValid = false;

  if (
    enteredIdentityIsValid &&
    enteredDateIsValid &&
    enteredMonthIsValid &&
    enteredYearIsValid &&
    enteredPetBoolQIsValid
  ) {
    if (enteredPetBoolQ === 'yes' && !enteredNumberOfPetsIsValid) {
      formIsValid = false;
    } else {
      formIsValid = true;
    }
  }

  const { employee, updateEmployee } = onboardingCtx;
  const { onNext, onPrevious } = props;

  React.useEffect(() => {
    window.scrollTo(0, 0);

    if (!employee) return;

    identityInputChangeHandler(employee.identity || '');
    dateInputChangeHandler(
      employee.dateOfBirth
        ? String(new Date(employee.dateOfBirth as Date).getDate())
        : ''
    );
    monthInputChangeHandler(
      employee.dateOfBirth
        ? String(new Date(employee.dateOfBirth as Date).getMonth() + 1)
        : ''
    );
    yearInputChangeHandler(
      employee.dateOfBirth
        ? String(new Date(employee.dateOfBirth as Date).getFullYear())
        : ''
    );
    petBoolQInputChangeHandler(employee.petBoolQ || '');
    numberOfPetsInputChangeHandler(String(employee.numberOfPets) || '');
  }, []);

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

  function updateEmployeeData() {
    updateEmployee({
      identity: enteredIdentity,
      dateOfBirth: new Date(
        parseInt(enteredYear),
        parseInt(enteredMonth) - 1,
        parseInt(enteredDate)
      ),
      petBoolQ: enteredPetBoolQ,
      numberOfPets: enteredNumberOfPets
    });
  }

  function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!formIsValid) return;

    updateEmployeeData();
    onNext();
  }

  function previousStepHandler(e: React.MouseEvent) {
    e.preventDefault();
    updateEmployeeData();
    onPrevious(e);
  }

  return (
    <React.Fragment>
      <Box component={'form'} onSubmit={submitHandler}>
        <MHSelect
          label={'I identify as...'}
          placeholder="I identify as..."
          options={constants.IDENTITY_OPTIONS}
          value={enteredIdentity}
          onChange={(val) => identityInputChangeHandler(val as string)}
          onBlur={identityInputBlurHandler}
        />

        <Label>Date of Birth</Label>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <MHSelect
              placeholder="Date"
              options={generateDateOptions()}
              value={enteredDate}
              onChange={(val) => dateInputChangeHandler(val as string)}
              onBlur={dateInputBlurHandler}
              popperWidth={'120px'}
            />
          </Grid>
          <Grid item xs={4}>
            <MHSelect
              placeholder="Month"
              options={generateMonthOptions()}
              value={enteredMonth}
              onChange={(val) => monthInputChangeHandler(val as string)}
              onBlur={monthInputBlurHandler}
              popperWidth="fit-content"
            />
          </Grid>
          <Grid item xs={4}>
            <MHSelect
              placeholder="Year"
              options={generateYearOptions()}
              value={enteredYear}
              onChange={(val) => yearInputChangeHandler(val as string)}
              onBlur={yearInputBlurHandler}
              popperWidth="120px"
            />
          </Grid>
        </Grid>

        <MHSelect
          label={'Do you have pets?'}
          placeholder="Do you have any pets?"
          options={constants.BOOL_OPTIONS}
          value={enteredPetBoolQ}
          onChange={(val) => {
            numberOfPetsInputChangeHandler('');
            petBoolQInputChangeHandler(val as string);
          }}
          onBlur={petBoolQInputBlurHandler}
          renderValue={renderPetsQSelectValue}
        />

        {enteredPetBoolQ === 'yes' && (
          <MHSelect
            label={'How many pets do you have?'}
            placeholder="How many pets?"
            options={constants.QUANTITY_OPTIONS}
            value={enteredNumberOfPets}
            onChange={(val) => numberOfPetsInputChangeHandler(val as string)}
            onBlur={numberOfPetsInputBlurHandler}
            renderValue={renderPetsSelectValue}
          />
        )}

        <Stack spacing={2} mt={3}>
          <MHButton type="submit">{'Next'}</MHButton>

          <MHButton
            type="button"
            variant="outlined"
            onClick={previousStepHandler}>
            Previous
          </MHButton>
        </Stack>
      </Box>
    </React.Fragment>
  );
};

export default IntermediateStep;
