import React from 'react';

import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { SelectOption } from '@mui/base';
import { styled } from '@mui/material/styles';

import MHFormControl from '../Form/MHFormControl';
import MHButton from '../Button/MHButton';
import InputAdornment from '../Form/InputAdornment';
import useInput from '../../hooks/use-input';

import * as validators from '../../utils/validators';
import OnboardingContext, {
  EmployerOnboarding
} from '../../store/context/onboarding-context';
import {
  addDaysToDate,
  constructBillingDateFormat,
  formatAmount,
  parseAmount,
  resolveErrorMessage
} from '../../utils/utils';
import { ReactComponent as DollarIcon } from '../../static/svg/dollar.svg';

const SelectTag = styled('span')(
  ({ theme }) => `
  border-radius: 3px;
  background: #EBE5F1;
  padding: 4px 9px;
  display: inline-block;
  color: ${theme.palette.primary.main};
`
);

const GridItem = styled(Box)(({ theme }) => ({
  // ...theme.typography.body2,
  backgroundColor: '#ffffff',
  padding: theme.spacing(3),
  color: theme.palette.text.secondary,
  // flex: '1 1 auto',
  display: 'flex',
  justifyContent: 'center'
}));

const FinalStep = (props: {
  activeIndex: number;
  onNext: () => void;
  onPrevious: (e: React.MouseEvent) => void;
}) => {
  const onboardingCtx = React.useContext(OnboardingContext);
  const [monthlyAllocation, setMonthlyAllocation] = React.useState(0);
  const [quarterlyAllocation, setQuarterlyAllocation] = React.useState(0);

  const {
    value: enteredAllocation,
    valid: enteredAllocationIsValid,
    error: enteredAllocationHasError,
    onChange: allocationInputChangeHandler,
    onBlur: allocationInputBlurHandler,
    markAsTouched: markAllocationInputAsTouched
  } = useInput([
    {
      validator: (value: string) => validators.required(value)
    }
  ]);

  const { employer, updateEmployerData } = onboardingCtx;
  const { activeIndex, onNext, onPrevious } = props;

  React.useEffect(() => {
    window.scrollTo(0, 0);
    if (!employer) {
      return;
    }

    const emAllocation = employer.allocationPerEmployee
      ? employer.allocationPerEmployee.toString()
      : '';

    allocationInputChangeHandler(emAllocation);
    computeAllocation(+parseAmount(emAllocation));
  }, []);

  const computeAllocation = (allocation: number) => {
    const employeePopulation =
      employer && employer?.employeeSize ? employer.employeeSize : 0;
    const allocationPerMonth = employeePopulation * allocation;
    setMonthlyAllocation(allocationPerMonth);
    setQuarterlyAllocation(allocationPerMonth * 3);
  };

  function submitHandler(e: React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!enteredAllocationIsValid) {
      markAllocationInputAsTouched();
      return;
    }

    updateEmployerData({
      allocationPerEmployee: +parseAmount(enteredAllocation),
      monthlyAllocation: monthlyAllocation,
      quarterlyAllocation: quarterlyAllocation
    } as EmployerOnboarding);

    console.warn(employer);
    onNext();
  }

  function previousStepHandler(e: React.MouseEvent) {
    e.preventDefault();

    updateEmployerData({
      allocationPerEmployee: +parseAmount(enteredAllocation),
      monthlyAllocation: monthlyAllocation,
      quarterlyAllocation: quarterlyAllocation
    } as EmployerOnboarding);
    onPrevious(e);
  }

  return (
    <React.Fragment>
      <Box component={'form'} onSubmit={submitHandler}>
        <MHFormControl
          id="allocation"
          type="number"
          label={'Work Life Care Funds Per Employee Per Month ($)'}
          placeholder="Amount ($)"
          value={enteredAllocation}
          onChange={(e) => {
            allocationInputChangeHandler(e);
            computeAllocation(+parseAmount(e.target.value));
          }}
          onBlur={allocationInputBlurHandler}
          precision={2}
          startAdornment={
            <InputAdornment>
              <DollarIcon width="1rem" />
            </InputAdornment>
          }
          autoComplete="off"
          error={resolveErrorMessage(enteredAllocationHasError)(
            'Please enter your allocation per employee'
          )}
        />

        <Typography variant="body2" fontFamily="Area-Normal-Bold">
          Total Number of Employees: {employer?.employeeSize}
        </Typography>

        <Stack
          direction="row"
          alignItems={'center'}
          justifyContent="space-evenly"
          border={1}
          borderColor="#BBBBBB"
          divider={
            <Divider
              orientation="vertical"
              variant="middle"
              flexItem
              sx={{
                height: '60px',
                alignSelf: 'center'
              }}
            />
          }
          spacing={2}
          overflow="hidden"
          my={4}>
          <GridItem>
            <Box>
              <Typography variant="body2" fontSize={12} color="primary">
                Monthly Total Allocation
              </Typography>
              <Typography
                variant="body1"
                fontSize={24}
                fontFamily="Area-Normal-Black"
                color="primary">
                {formatAmount(monthlyAllocation)}
              </Typography>
            </Box>
          </GridItem>
          <GridItem>
            <Box>
              <Typography variant="body2" fontSize={12} color="primary">
                Allocation for a quarter
              </Typography>
              <Typography
                variant="body1"
                fontSize={24}
                fontFamily="Area-Normal-Black"
                color="primary">
                {formatAmount(quarterlyAllocation)}
              </Typography>
            </Box>
          </GridItem>
        </Stack>

        <Box bgcolor="#F5F5F5" p={2} mt={2}>
          <Typography variant="body1" align="center" color="primary.main">
            Quarterly billing starting from period dated{' '}
            <Typography
              component="span"
              fontFamily={'Area-Normal-Black'}
              color="primary.main">
              {constructBillingDateFormat(new Date())}
            </Typography>{' '}
            to{' '}
            <Typography
              component="span"
              fontFamily={'Area-Normal-Black'}
              color="primary.main">
              {constructBillingDateFormat(addDaysToDate(new Date(), 90))}
            </Typography>
          </Typography>
        </Box>

        {/* <MHMultiSelect
          label="Care Responsibilities"
          placeholder="What are your care responsibilities?"
          options={constants.CARE_RESPONSIBILITY_OPTIONS}
          value={careResponsibilites as string[]}
          onChange={careResInputChangeHandler}
          onBlur={() => {}}
          renderValue={renderValue}
        /> */}

        <Stack spacing={2} mt={3}>
          <MHButton type="submit">{'Complete'}</MHButton>

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

export default FinalStep;
