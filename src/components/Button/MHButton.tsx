import React from 'react';

import Button, { buttonClasses, ButtonProps } from '@mui/material/Button';
import { styled } from '@mui/system';

import LoadingIndicator from '../UI/LoadingIndicator';
import { FnComponent } from '../../models/component.model';

type MHButtonProps = {
  disabled?: boolean;
  variant?: 'text' | 'outlined' | 'contained' | undefined;
  type?: 'button' | 'submit' | 'reset' | undefined;
  loading?: boolean;
  fullWidth?: boolean;
  onClick?: (e: React.MouseEvent) => void;
};

// not working, dashboard theme takes precedence over styling here
const StyledButton = styled(Button)(
  ({ theme }) => `
    &.${buttonClasses.outlined}:hover {
      background: grey,
    }`
);

const MHButton: FnComponent<MHButtonProps & ButtonProps> = ({
  sx,
  variant,
  children,
  type,
  loading,
  disabled,
  fullWidth,
  onClick,
  ...props
}) => {
  const buttonClickHandler = (e: React.MouseEvent) => {
    onClick && onClick(e);
  };

  return (
    <Button
      color={'primary'}
      type={type || 'button'}
      variant={variant || 'contained'}
      sx={{
        p: 1.6,
        ...sx
      }}
      size="large"
      disabled={loading || disabled}
      onClick={buttonClickHandler}
      fullWidth={fullWidth}
      disableElevation
      {...props}>
      {loading ? <LoadingIndicator /> : children}
    </Button>
  );
};

export default MHButton;