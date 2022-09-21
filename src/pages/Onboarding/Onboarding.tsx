import React from 'react';
import { Redirect, useHistory } from 'react-router-dom';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Slide from '@mui/material/Slide';

import Steps from '../../components/Steps/Steps';
import InitialStep from '../../components/Onboarding/InitialStep';
import IntermediateStep from '../../components/Onboarding/IntermediateStep';
import FinalStep from '../../components/Onboarding/FinalStep';
import BackdropLoader from '../../components/UI/BackdropLoader';
import useHttp from '../../hooks/use-http';

import MHLogoIcon from '../../theme/icons/MHLogo';
import { theme } from '../../theme/mui/dashboard.theme';
import OnboardingContext from '../../store/context/onboarding-context';
import { HttpResponse } from '../../models/api.interface';
import { constructDateFormat } from '../../utils/utils';
import geoData from '../../data/georef-united-states-of-america-state.json';
import Layout from '../../components/Layout/Layout';
import SummaryStep from '../../components/Onboarding/SummaryStep';

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

  const history = useHistory();

  const { loading, error, sendHttpRequest: onboardEmployee } = useHttp();

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
    setActiveStepIndex((prevIndex) =>
      prevIndex < STEPS.length - 1 ? prevIndex + 1 : prevIndex
    );

    if (activeStepIndex === STEPS.length - 1) {
      setCompleted(true);
    }
  };

  const previousStepHandler = (event: React.MouseEvent) => {
    setActiveStepIndex((prevIndex) => prevIndex - 1);
  };

  const { employee, configureStates } = onboardingCtx;

  const empData = React.useMemo(() => employee, [employee]);

  React.useEffect(() => {
    configureStates(geoData);
  }, []);

  React.useEffect(() => {
    if (completed) {
    }
  }, [completed]);

  if (error) {
    setCompleted(false);
  }

  return (
    <React.Fragment>
      {loading && <BackdropLoader />}
      <Layout
        onboardingSteps={<Steps steps={STEPS} activeStep={activeStepIndex} />}>
        {!completed && (
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
                    height: '100vh',
                    overflow: 'hidden',
                    pt: 10,
                    width: '70%',
                    mx: 'auto'
                  }}>
                  <Typography variant="h1" align="center" gutterBottom>
                    We're looking forward to speaking with you soon.
                  </Typography>
                  <Typography variant="body1" align="center" gutterBottom>
                    In the meantime, claim your account and start your
                    application. It takes 5 minutes.
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
              <Stack
                direction="column"
                mx="auto"
                px={6}>
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
        )}
      </Layout>
    </React.Fragment>
  );
};

export default Onboarding;
