import React from 'react';

import Button from '@mui/material/Button';

import LoadingIndicator from '../UI/LoadingIndicator';
import { FnComponent } from '../../models/component.model';

type Props = {
  sx: object;
  disabled?: boolean;
  variant?: 'text' | 'outlined' | 'contained' | undefined;
  type?: 'button' | 'submit' | 'reset' | undefined;
  loading?: boolean;
  fullWidth?: boolean;
  onClick?: () => void;
};

const MHButton: FnComponent<Props> = ({
  sx,
  variant,
  children,
  type,
  loading,
  disabled,
  fullWidth,
  onClick
}) => {
  const buttonClickHandler = () => {
    onClick && onClick();
  };

  return (
    <Button
      color={'primary'}
      type={type || 'button'}
      variant={variant || 'contained'}
      sx={{
        p: 1.8,
        ...sx
      }}
      size="large"
      disabled={loading || disabled}
      onClick={buttonClickHandler}
      fullWidth={fullWidth}
      disableElevation
      >
      {loading ? <LoadingIndicator /> : children}
    </Button>
  );
};

export default MHButton;
