import React from 'react';

import Box from '@mui/material/Box';

import { Component } from '../../models/component.model';

const RoundedLogoIcon: Component = (props) => {
  return (
    <Box
      component="div"
      sx={{
        borderRadius: '50%',
        width: 55,
        height: 55,
        backgroundColor: '#F1F1F1',
        border: 'none',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        mx: 'auto',
      }}>
      {props.children}
    </Box>
  );
};

export default RoundedLogoIcon;
