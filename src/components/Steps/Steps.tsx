import React from 'react';

import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepConnector, {
  stepConnectorClasses
} from '@mui/material/StepConnector';
import { StepIconProps } from '@mui/material/StepIcon';
import { styled } from '@mui/material/styles';

import { FnComponent } from '../../models/component.model';

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
  backgroundColor:
    theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
  padding: 0,
  zIndex: 1,
  color: '#fff',
  width: 35,
  height: 35,
  display: 'flex',
  borderRadius: '10%',
  justifyContent: 'center',
  alignItems: 'center',
  fontFamily: 'Gilroy-Regular',
  ...(ownerState.active && {
    backgroundImage:
      'linear-gradient( 136deg, rgba(2,98,89) 0%, rgba(2,98,89) 40%, rgb(40,64,74) 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)'
  }),
  ...(ownerState.completed && {
    backgroundImage:
      'linear-gradient( 136deg, rgba(2,98,89) 0%, rgba(2,98,89) 40%, rgb(40,64,74) 100%)'
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

const Steps: FnComponent<{ activeStep: number; steps: number[] }> = ({
  activeStep,
  steps
}) => {
  return (
    <Stepper activeStep={activeStep} connector={<ColorlibConnector />} sx={{mb: 3}}>
      {steps.map((label, index) => {
        const stepProps: { completed?: boolean } = {};
        const labelProps: {
          optional?: React.ReactNode;
        } = {};

        return (
          <Step key={label} {...stepProps}>
            <StepLabel
              StepIconComponent={ColorlibStepIcon}
              {...labelProps}></StepLabel>
          </Step>
        );
      })}
    </Stepper>
  );
};

export default Steps;
