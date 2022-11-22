import * as React from 'react';

import Box from '@mui/material/Box';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

import IconButtonUnstyled from '../Button/IconButtonStyled';
import MHPrimaryLogo from '../../theme/icons/MHPrimaryLogo';
import MHLogo from '../../theme/icons/MHLogo';

import { ReactComponent as OrgLogo } from '../../static/svg/unilever-logo.svg';

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBarStyled = styled(MuiAppBar, {
  shouldForwardProp: (prop: any) => prop !== 'open'
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.appBar,
  paddingBlock: 0,
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

const AppBar = ({ steps }: { steps: React.ReactElement }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBarStyled position="fixed" open={true}>
        <Toolbar disableGutters>
          <Box aria-label="menu" sx={{ ml: 5 }} flexGrow={1}>
            <MHLogo style={{ width: '3.4rem' }} />
          </Box>

          <Stack direction="row" alignItems="center" spacing={6} minHeight={80}>
            {steps}
          </Stack>
        </Toolbar>
      </AppBarStyled>
    </Box>
  );
};

export default AppBar;
