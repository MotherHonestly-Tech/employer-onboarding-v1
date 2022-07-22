import * as React from 'react';

import Box from '@mui/material/Box';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { styled } from '@mui/material/styles';

import SearchField from '../Form/SearchField';
import MHPrimaryLogo from '../../theme/icons/MHPrimaryLogo';
import IconButtonUnstyled from '../Form/IconButtonUnstyled';
import { ReactComponent as BellIcon } from '../../static/svg/notification-bell.svg';
import { ReactComponent as CaretDownIcon } from '../../static/svg/caret-down.svg';

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
          <Box aria-label="menu" sx={{ mr: 2 }} flexGrow={1}>
            <MHPrimaryLogo className="mx-0" />
          </Box>

          <Stack direction="row" alignItems="center" spacing={6}>
            <SearchField />

            <BellIcon title="notification" width="1.3rem" />

            <IconButtonUnstyled>
              <Stack direction="row" alignItems="center" spacing={1.25}>
                <Avatar
                  alt="Remy Sharp"
                  src="https://res.cloudinary.com/mother-honestly/image/upload/v1657976885/christina-wocintechchat-com-0Zx1bDv5BNY-unsplash_dxhylh.png"
                  variant="rounded"
                  sx={{
               
                  }}
                />
                <Typography color="primary">Terry Parker</Typography>

                <CaretDownIcon />
              </Stack>
            </IconButtonUnstyled>
          </Stack>
        </Toolbar>
      </AppBarStyled>
    </Box>
  );
};

export default AppBar;
