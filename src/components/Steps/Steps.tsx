import React from 'react';

import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel, { stepLabelClasses } from '@mui/material/StepLabel';
import StepConnector, {
  stepConnectorClasses
} from '@mui/material/StepConnector';
import { StepIconProps } from '@mui/material/StepIcon';
import { styled } from '@mui/material/styles';

import { FnComponent } from '../../models/component.model';
import { Typography } from '@mui/material';

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  //   [`&.${stepConnectorClasses.alternativeLabel}`]: {
  //     top: 22
  //   },
  //   [`&.${stepConnectorClasses.active}`]: {
  //     [`& .${stepConnectorClasses.line}`]: {
  //       backgroundImage:
  //         'linear-gradient(95deg, rgba(242, 236, 44, 1) 0%,rgba(242, 236, 44, 1) 5%,rgb(40,64,74) 100%)'
  //     }
  //   },
  //   [`&.${stepConnectorClasses.completed}`]: {
  //     [`& .${stepConnectorClasses.line}`]: {
  //       backgroundImage:
  //         'linear-gradient( 95deg,rgba(242, 236, 44, 1) 0%,rgba(242, 236, 44, 1) 5%,rgb(40,64,74) 100%)'
  //     }
  //   },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderRadius: 1
  }
}));

const ColorlibStepIconRoot = styled('div')<{
  ownerState: { completed?: boolean; active?: boolean };
}>(({ theme, ownerState }) => ({
  backgroundColor: '#CBCBCB',
  padding: 0,
  zIndex: 1,
  color: '#FFFFFF',
  width: 25,
  height: 25,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  fontFamily: 'Area-Normal-Bold',
  ...(ownerState.active && {
    backgroundColor: theme.palette.primary.main,
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)'
  }),
  ...(ownerState.completed && {
    // backgroundColor: theme.palette.primary.main
  })
}));

function ColorlibStepIcon(props: StepIconProps) {
  const { active, completed, className } = props;

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}>
      {props.icon}
    </ColorlibStepIconRoot>
  );
}

const Steps: FnComponent<{ activeStep: number; steps: string[] }> = ({
  activeStep,
  steps
}) => {
  return (
    <Stepper
      activeStep={activeStep}
      connector={<ColorlibConnector />}
      sx={{ height: 64 }}>
      {steps.map((label, index) => {
        const stepProps: { completed?: boolean } = {};
        const labelProps: {
          optional?: React.ReactNode;
        } = {};

        return (
          <Step
            key={label}
            {...stepProps}
            sx={{
              height: 80,
              position: 'relative',
              mr: 7
            }}>
            <StepLabel
              StepIconComponent={ColorlibStepIcon}
              {...labelProps}
              sx={{
                height: '100%',
                justifyContent: 'center',
                '&::after': {
                  ...(activeStep === index && {
                    position: 'absolute',
                    bottom: 0,
                    content: '""',
                    display: 'block',
                    height: '2px',
                    backgroundColor: 'primary.main',
                    width: '100%'
                  })
                }
              }}>
              <Typography
                variant="body2"
                fontFamily="Area-Normal-Bold"
                fontSize="12"
                color={activeStep === index ? 'primary.main' : '#CBCBCB'}>
                {label}
              </Typography>
            </StepLabel>
          </Step>
        );
      })}
    </Stepper>
  );
};

export default Steps;
