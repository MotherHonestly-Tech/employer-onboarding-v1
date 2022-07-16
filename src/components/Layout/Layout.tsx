import React from 'react';

import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

import AppBar from './AppBar';
import Sidebar from './MainSidebar';

import { FnComponent } from '../../models/component.model';
import SecondarySidebar from './SecondarySidebar';

const Layout: FnComponent = (props) => {
  return (
    <Box>
      <AppBar />
      <Box component={'main'} sx={{ display: 'flex' }}>
        <Sidebar />

        <Box
          p={4}
          sx={{
            backgroundColor: (theme) => theme.palette.background.default,
            flexGrow: 1,
            overflow: 'auto'
          }}>
          <Toolbar />
          {props.children}
        </Box>

        <SecondarySidebar />
      </Box>
    </Box>
  );
};

export default Layout;
