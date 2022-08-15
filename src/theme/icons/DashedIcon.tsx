import React from 'react';

import Box from '@mui/material/Box';

import { FnComponent } from '../../models/component.model';

const DashedIcon: FnComponent<{ sx: object }> = ({ sx, children }) => {
  return (
    <Box
      component="div"
      width={30}
      height={30}
      display={'flex'}
      borderRadius={(theme) => 1.5}
      borderColor={(theme) => theme.palette.primary.main}
      border={2}
      bgcolor="transparent"
      mx="auto"
      justifyContent="center"
      alignItems="center"
      overflow="hidden"
      sx={{
        borderStyle: 'dashed',
        ...sx
      }}>
      {children}
    </Box>
  );
};

export default DashedIcon;
