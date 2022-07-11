import React from 'react';

import Button from '@mui/material/Button';

import { Component } from '../../models/component.model';

type Props = {
  disabled?: boolean;
  sx: object;
};

const MHButton: Component<Props> = (props) => {
  return (
    <Button
      color={'primary'}
      variant="contained"
      sx={{
        p: 1.8,
        ...props.sx
      }}
      size="large"
      disableElevation
      fullWidth>
      {props.children}
    </Button>
  );
};

export default MHButton;
