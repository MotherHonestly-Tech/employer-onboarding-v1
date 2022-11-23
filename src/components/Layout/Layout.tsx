import React from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';

import AppBar from './AppBar';

import { FnComponent } from '../../models/component.model';

const Layout: FnComponent<{
  children: React.ReactNode;
  onboardingSteps?: React.ReactElement;
}> = (props) => {
  return (
    <Box>
      <AppBar steps={props.onboardingSteps} />

      <Stack direction="row" component={'main'}>
        <Box
          sx={{
            backgroundColor: (theme) => '#fefefe',
            flexGrow: 1,
            overflow: 'auto',
            paddingBlockStart: 4,
            maxWidth: '100vw',
            overflowX: 'hidden'
          }}>
          <Toolbar />
          {props.children}
        </Box>
      </Stack>
    </Box>
  );
};

export default Layout;
