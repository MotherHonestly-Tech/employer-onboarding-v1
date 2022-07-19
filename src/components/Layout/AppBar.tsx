import * as React from 'react';

import Box from '@mui/material/Box';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

import MHPrimaryLogo from '../../theme/icons/MHPrimaryLogo';

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBarStyled = styled(MuiAppBar, {
  shouldForwardProp: (prop: any) => prop !== 'open'
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1000,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}));

const AppBar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBarStyled position="fixed" open={true}>
        <Toolbar>
          <Box aria-label="menu" sx={{ mr: 2 }}>
            <MHPrimaryLogo />
          </Box>

          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBarStyled>
    </Box>
  );
};

export default AppBar;
