import React from 'react';

import Stack from '@mui/material/Stack';

import { ReactComponent as ArrowLeftIcon } from '../../static/svg/arrow-left-lg.svg';
import { ReactComponent as ArrowRightIcon } from '../../static/svg/arrow-right-lg.svg';

const ArrowPanelBar = () => {
  return (
    <Stack direction="row" spacing={2}>
      <ArrowLeftIcon />
      <ArrowRightIcon />
    </Stack>
  );
};

export default ArrowPanelBar;
