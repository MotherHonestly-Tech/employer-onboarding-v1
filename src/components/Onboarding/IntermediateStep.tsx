import React from 'react';

import { SelectOption } from '@mui/base';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import { MHSelect } from '../Form/MHSelect';
import Label from '../Form/Label';
import MHButton from '../Button/MHButton';
import MHFormControl from '../Form/MHFormControl';
import useInput from '../../hooks/use-input';

import * as utils from '../../utils/utils';
import * as validators from '../../utils/validators';
import * as constants from '../../utils/constants';
import OnboardingContext, {
  EmployerOnboarding
} from '../../store/context/onboarding-context';

const IntermediateStep = (props: {
  activeIndex: number;
  onNext: () => void;
  onPrevious: (e: React.MouseEvent) => void;
}) => {
  const onboardingCtx = React.useContext(OnboardingContext);

  const {
    value: enteredDomain,
    valid: enteredDomainIsValid,
    error: enteredDomainHasError,
    onChange: domainInputChangeHandler,
    onBlur: domainInputBlurHandler,
    markAsTouched: markDomainInputAsTouched
  } = useInput([]);

  const {
    value: enteredEmployeeSize,
    valid: enteredEmployeeSizeIsValid,
    error: enteredEmployeeSizeHasError,
    onChange: employeeSizeInputChangeHandler,
    onBlur: employeeSizeInputBlurHandler,
    markAsTouched: markEmployeeSizeInputAsTouched
  } = useInput([
    {
      validator: (value: string) => validators.required(value)
    }
  ]);

  const {
    value: enteredStateOfIncorporation,
    valid: enteredStateOfIncorporationIsValid,
    error: enteredStateOfIncorporationHasError,
    onChange: stateOfIncorporationInputChangeHandler,
    onBlur: stateOfIncorporationInputBlurHandler
  } = useInput([{ validator: (value: string) => validators.required(value) }]);

  const {
    value: enteredBusinessType,
    valid: enteredBusinessTypeIsValid,
    error: enteredBusinessTypeHasError,
    onChange: businessTypeInputChangeHandler,
    onBlur: businessTypeInputBlurHandler
  } = useInput([
    {
      validator: (value: string) => validators.required(value)
    }
  ]);

  const {
    value: enteredRegion,
    valid: enteredRegionIsValid,
    error: enteredRegionHasError,
    onChange: regionInputChangeHandler,
    onBlur: regionInputBlurHandler,
    markAsTouched: markRegionInputAsTouched
  } = useInput([{ validator: (value: string) => validators.required(value) }]);

  const {
    value: enteredBusinessPhone,
    valid: enteredBusinessPhoneIsValid,
    error: enteredBusinessPhoneHasError,
    onChange: businessPhoneInputChangeHandler,
    onBlur: businessPhoneInputBlurHandler,
    markAsTouched: markPhoneInputAsTouched
  } = useInput([{ validator: (value: string) => validators.required(value) }]);

  const {
    value: enteredBusinessAddress,
    valid: enteredBusinessAddressIsValid,
    error: enteredBusinessAddressHasError,
    onChange: businessAddressInputChangeHandler,
    onBlur: businessAddressInputBlurHandler,
    markAsTouched: markBusinessAddressInputAsTouched
  } = useInput([{ validator: (value: string) => validators.required(value) }]);

  const {
    value: enteredZipCode,
    valid: enteredZipCodeIsValid,
    error: enteredZipCodeHasError,
    onChange: zipCodeInputChangeHandler,
    onBlur: zipCodeInputBlurHandler,
    markAsTouched: markZipCodeInputAsTouched
  } = useInput([{ validator: (value: string) => validators.required(value) }]);

  const {
    value: enteredCity,
    valid: enteredCityIsValid,
    error: enteredCityHasError,
    onChange: cityInputChangeHandler,
    onBlur: cityInputBlurHandler,
    markAsTouched: markCityInputAsTouched
  } = useInput([{ validator: (value: string) => validators.required(value) }]);

  const {
    value: enteredState,
    valid: enteredStateIsValid,
    error: enteredStateHasError,
    onChange: stateInputChangeHandler,
    onBlur: stateInputBlurHandler,
    markAsTouched: markStateInputAsTouched
  } = useInput([{ validator: (value: string) => validators.required(value) }]);

  let formIsValid =
    enteredDomainIsValid &&
    enteredEmployeeSizeIsValid &&
    enteredStateOfIncorporationIsValid &&
    enteredBusinessTypeIsValid &&
    enteredRegionIsValid &&
    enteredBusinessPhoneIsValid &&
    enteredBusinessAddressIsValid &&
    enteredZipCodeIsValid &&
    enteredCityIsValid &&
    enteredStateIsValid;

  const { states, employer, updateEmployerData } = onboardingCtx;
  const { onNext, onPrevious } = props;

  React.useEffect(() => {
    console.log(employer);
    window.scrollTo(0, 0);
    if (!employer) return;

    resetForm();
  }, []);

  function resetForm() {
    console.log(employer);
    domainInputChangeHandler(employer?.domain || '');
    employeeSizeInputChangeHandler(
      employer?.employeeSize ? String(employer?.employeeSize) : ''
    );
    stateOfIncorporationInputChangeHandler(
      employer?.stateOfIncorporation || ''
    );
    businessTypeInputChangeHandler(employer?.businessType || '');
    regionInputChangeHandler(employer?.region || '');
    businessPhoneInputChangeHandler(employer?.businessPhone || '');
    businessAddressInputChangeHandler(employer?.businessAddress || '');
    zipCodeInputChangeHandler(employer?.zipCode || '');
    cityInputChangeHandler(employer?.city || '');
    stateInputChangeHandler(employer?.state || '');
  }

  const markFormAsTouched = function () {
    markDomainInputAsTouched();
    markEmployeeSizeInputAsTouched();
    markRegionInputAsTouched();
    markPhoneInputAsTouched();
    markBusinessAddressInputAsTouched();
    markZipCodeInputAsTouched();
    markCityInputAsTouched();
    markStateInputAsTouched();
  };

  const patchEmployerData = () => {
    updateEmployerData({
      ...(employer as EmployerOnboarding),
      domain: enteredDomain,
      employeeSize: +utils.parseAmount(enteredEmployeeSize),
      region: enteredRegion,
      stateOfIncorporation: enteredStateOfIncorporation,
      businessType: enteredBusinessType,
      businessPhone: enteredBusinessPhone,
      businessAddress: enteredBusinessAddress,
      zipCode: enteredZipCode,
      city: enteredCity,
      state: enteredState
    });
  };

  function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!formIsValid) {
      markFormAsTouched();
      return;
    }

    patchEmployerData();
    onNext();
  }

  function previousStepHandler(e: React.MouseEvent) {
    e.preventDefault();
    patchEmployerData();
    onPrevious(e);
  }

  return (
    <React.Fragment>
      <Box component={'form'} onSubmit={submitHandler}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <MHFormControl
              id="domain"
              type="text"
              label="Domain"
              placeholder="unilever.mhatwork.com"
              value={enteredDomain}
              onChange={domainInputChangeHandler}
              onBlur={domainInputBlurHandler}
              disabled
            />
          </Grid>
          <Grid item xs={6}>
            <MHFormControl
              id="employeeSize"
              type="number"
              label="No of employees"
              placeholder="No of employees"
              value={enteredEmployeeSize}
              onChange={employeeSizeInputChangeHandler}
              onBlur={employeeSizeInputBlurHandler}
              precision={0}
              autoComplete="off"
              error={utils.resolveErrorMessage(enteredEmployeeSizeHasError)(
                'Please enter number of employees'
              )}
              required
            />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <MHSelect
              label="State of Incorporation"
              placeholder="Select State of Incorporation"
              options={states}
              value={enteredStateOfIncorporation}
              onChange={(val) =>
                stateOfIncorporationInputChangeHandler(val as string)
              }
              onBlur={stateOfIncorporationInputBlurHandler}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <MHSelect
              label="Business Type"
              placeholder="Select Business Type"
              options={constants.BUSINESS_TYPES_OPTIONS}
              value={enteredBusinessType}
              onChange={(val) => businessTypeInputChangeHandler(val as string)}
              onBlur={businessTypeInputBlurHandler}
              required
            />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <MHFormControl
              id="region"
              type="text"
              label="Region"
              placeholder="Region"
              value={enteredRegion}
              onChange={regionInputChangeHandler}
              onBlur={regionInputBlurHandler}
              error={utils.resolveErrorMessage(enteredRegionHasError)(
                "Please enter your company's region"
              )}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <MHFormControl
              id="businessPhone"
              type="text"
              label="Business phone no."
              placeholder="Business phone no."
              value={enteredBusinessPhone}
              onChange={businessPhoneInputChangeHandler}
              onBlur={businessPhoneInputBlurHandler}
              error={utils.resolveErrorMessage(enteredBusinessPhoneHasError)(
                'Please provide your business phone number'
              )}
              required
            />
          </Grid>
        </Grid>

        <MHFormControl
          id="businessAddress"
          type="text"
          label="Business address"
          placeholder="Business address"
          value={enteredBusinessAddress}
          onChange={businessAddressInputChangeHandler}
          onBlur={businessAddressInputBlurHandler}
          error={utils.resolveErrorMessage(enteredBusinessAddressHasError)(
            'Please provide your business address'
          )}
          multiline
          required
        />

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <MHFormControl
              id="zipCode"
              type="text"
              label="Zip Code"
              placeholder="Zip Code"
              value={enteredZipCode}
              onChange={zipCodeInputChangeHandler}
              onBlur={zipCodeInputBlurHandler}
              error={utils.resolveErrorMessage(enteredZipCodeHasError)('Please provide your business zip code')}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <MHFormControl
              id="city"
              type="text"
              label="City"
              placeholder="City"
              value={enteredCity}
              onChange={cityInputChangeHandler}
              onBlur={cityInputBlurHandler}
              error={utils.resolveErrorMessage(enteredCityHasError)('Please provide your business location')}
              required
            />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <MHSelect
              label="State"
              placeholder="Select State"
              options={states}
              value={enteredState}
              onChange={(val) => stateInputChangeHandler(val as string)}
              onBlur={stateInputBlurHandler}
              required
            />
          </Grid>
        </Grid>
        {/* <MHSelect
          label={'I identify as...'}
          placeholder="I identify as..."
          options={constants.IDENTITY_OPTIONS}
          value={enteredIdentity}
          onChange={(val) => identityInputChangeHandler(val as string)}
          onBlur={identityInputBlurHandler}
          error={identityErrorTip}
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
              error={dateErrorTip}
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
          label={'Race/Ethnicity'}
          placeholder="Race/Ethnicity"
          options={constants.RACE_OPTIONS}
          value={enteredRace}
          onChange={(val) => {
            raceInputChangeHandler(val as string);
          }}
          onBlur={raceInputBlurHandler}
          error={raceErrorTip}
        /> */}

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
