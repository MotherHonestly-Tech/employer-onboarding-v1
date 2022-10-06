import React from 'react';
import { useLocation } from 'react-router-dom';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Slide from '@mui/material/Slide';

import Steps from '../../components/Steps/Steps';
import InitialStep from '../../components/Onboarding/InitialStep';
import IntermediateStep from '../../components/Onboarding/IntermediateStep';
import FinalStep from '../../components/Onboarding/FinalStep';
import Layout from '../../components/Layout/Layout';
import SummaryStep from '../../components/Onboarding/SummaryStep';
import BackdropLoader from '../../components/UI/BackdropLoader';
import useHttp from '../../hooks/use-http';

import MHLogoIcon from '../../theme/icons/MHLogo';
import { theme } from '../../theme/mui/dashboard.theme';
import OnboardingContext, {
  EmployerOnboarding
} from '../../store/context/onboarding-context';
import geoData from '../../data/georef-united-states-of-america-state.json';
import NotificationContext from '../../store/context/notifications.context';
import { getURLWithQueryParams } from '../../utils/utils';
import { HttpResponse } from '../../models/api.interface';

const STEPS = [
  'About you',
  'Employer Details',
  'Billing Information',
  'Billing  Summary'
];

const Onboarding = () => {
  const [activeStepIndex, setActiveStepIndex] = React.useState(0);
  const [completed, setCompleted] = React.useState(false);
  const onboardingCtx = React.useContext(OnboardingContext);

  const notificationCtx = React.useContext(NotificationContext);
  const { pushNotification } = notificationCtx;

  const { loading, error, sendHttpRequest: onboardEmployer } = useHttp();

  let ActiveFormComponent: React.ElementType | null = null;

  switch (activeStepIndex) {
    case 0:
      ActiveFormComponent = InitialStep;
      break;
    case 1:
      ActiveFormComponent = IntermediateStep;
      break;
    case 2:
      ActiveFormComponent = FinalStep;
      break;
    case 3:
      ActiveFormComponent = SummaryStep;
      break;
    case 4:
      ActiveFormComponent = SummaryStep;
      break;
    default:
      ActiveFormComponent = InitialStep;
      break;
  }

  const nextStepHandler = () => {
    console.log(activeStepIndex);
    setActiveStepIndex((prevIndex) =>
      prevIndex < STEPS.length - 2 ? prevIndex + 1 : prevIndex
    );

    if (activeStepIndex === STEPS.length - 2) {
      setCompleted(true);
    }
    window.scrollTo(0, 0);
  };

  const previousStepHandler = (event: React.MouseEvent) => {
    setCompleted(false);
    setActiveStepIndex((prevIndex) => prevIndex - 1);
    window.scrollTo(0, 0);
  };

  const { employer, configureStates, updateEmployerData } = onboardingCtx;
  const employerData = React.useMemo(() => employer, [employer]);

  React.useEffect(() => {
    configureStates(geoData);

    // localStorage.setItem('onboardingToken', token);
  }, []);

  React.useEffect(() => {
    if (!employerData) {
      return;
    }

    const token = localStorage.getItem('oToken');

    const payload = {
      employerToken: token,
      employerRefId: employerData.employerRefId,
      employeeEmail: employerData.employeeEmail,
      firstName: employerData.firstName,
      lastName: employerData.lastName,
      numberOfEligibleEmployee: employerData.employeeSize,
      stateOfIncorporation: employerData.stateOfIncorporation,
      businessType: employerData.businessType,
      mailingAddress: employerData.businessAddress,
      telephoneNumber: employerData.businessPhone,
      zipCode: employerData.zipCode,
      city: employerData.city,
      region: employerData.region,
      state: employerData.state,
      monthlyAllocation: employerData.monthlyAllocation,
      fundPerEmployeePerQuarter: employerData.quarterlyAllocation
    };

    if (completed) {
      onboardEmployer(
        process.env.REACT_APP_API_BASE_URL + 'employee/dashboard/employee',
        {
          method: 'POST',
          body: JSON.stringify(payload)
        },
        (response) => {
          setActiveStepIndex((prevIndex) => prevIndex + 1);
        }
      );
    }
  }, [completed]);

  React.useEffect(() => {
    if (completed && error) {
      setCompleted(false);
      pushNotification({
        type: 'error',
        message: error ? error.message : 'An unexpected error occured'
      });
    }
  }, [error]);

  const location = useLocation();
  const queryParams = React.useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );

  const token = queryParams.get('token');

  const {
    loading: fetchingEmployer,
    error: errorGettingEmployer,
    sendHttpRequest: getEmployer
  } = useHttp();

  React.useEffect(() => {
    getEmployer(
      getURLWithQueryParams(
        process.env.REACT_APP_API_BASE_URL +
          'employer/dashboard/employer/correspondent',
        {
          ...(token && { token: token })
        }
      ),
      {
        method: 'GET'
      },
      (response: HttpResponse<any>) => {
        localStorage.setItem('oToken', token as string);
        updateEmployerData({
          employerToken: token,
          employerRefId: response.data.employerRefId,
          customerId: response.data.customerId
        } as EmployerOnboarding);
      }
    );
  }, []);

  React.useEffect(() => {
    if (errorGettingEmployer) {
      setCompleted(false);
      pushNotification({
        type: 'error',
        message: errorGettingEmployer.message
      });
    }
  }, [errorGettingEmployer]);

  if (fetchingEmployer) {
    return <BackdropLoader />;
  }

  if (errorGettingEmployer) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="80vh">
        <Typography variant="body1" align="center" fontSize="1.5rem">
          An unexpected error occured
        </Typography>
      </Box>
    );
  }

  return (
    <React.Fragment>
      {loading && <BackdropLoader />}
      <Layout
        onboardingSteps={<Steps steps={STEPS} activeStep={activeStepIndex} />}>
        <Grid container spacing={0} sx={{ minHeight: '100vh' }}>
          {activeStepIndex < 3 && (
            <Grid
              item
              xs={6}
              position="sticky"
              height="100vh"
              sx={{
                top: 0
              }}>
              <Box
                component="div"
                position="relative"
                sx={{
                  overflow: 'hidden',
                  pt: 10,
                  width: '70%',
                  mx: 'auto'
                }}>
                <Typography
                  variant="h1"
                  fontSize="3rem"
                  align="center"
                  gutterBottom>
                  Work-Life Care is for your Entire Workforce
                </Typography>
                <Typography
                  variant="body1"
                  fontSize="1rem"
                  align="center"
                  gutterBottom>
                  MH’s caregiving and work solutions help your employees live
                  happier lives & improves their productivity at lower costs to
                  you.
                </Typography>
              </Box>
            </Grid>
          )}

          <Grid
            item
            xs={activeStepIndex > 2 ? 12 : 6}
            sx={{
              backgroundColor: theme.palette.common.white,
              position: 'relative'
            }}
            py={6}>
            <Stack direction="column" mx="auto" px={6}>
              {ActiveFormComponent && (
                <Slide direction="left" in mountOnEnter unmountOnExit>
                  <Box>
                    <ActiveFormComponent
                      activeIndex={activeStepIndex}
                      onNext={nextStepHandler}
                      onPrevious={previousStepHandler}
                    />
                  </Box>
                </Slide>
              )}
            </Stack>
          </Grid>
        </Grid>
      </Layout>
    </React.Fragment>
  );
};

export default Onboarding;
