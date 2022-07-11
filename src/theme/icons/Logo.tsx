import Box from '@mui/material/Box';

import { ReactComponent as MHLogo } from '../../logo.svg';

export default function MHLogoIcon() {
  return (
    <Box
      component={'div'}
      sx={{
        position: 'absolute',
        top: 70,
        left: 0,
        right: 0,
      }}>
      <MHLogo className="mx-auto" />
    </Box>
  );
}
