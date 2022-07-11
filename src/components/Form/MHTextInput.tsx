import React from 'react';

import InputUnstyled, { InputUnstyledProps, inputUnstyledClasses } from '@mui/base/InputUnstyled';
import { styled } from '@mui/system';

const grey = {
  50: '#F3F6F9',
  100: '#E7EBF0',
  200: '#E0E3E7',
  300: '#CDD2D7',
  400: '#B2BAC2',
  500: '#A0AAB4',
  600: '#6F7E8C',
  700: '#3E5060',
  800: '#2D3843',
  900: '#1A2027'
};

const StyledInputRoot = styled('div')(
  ({ theme }) => `
    display: flex;
    font-weight: 400;
    border: 1px solid #EEEEEE;
    align-items: center;
    justify-content: center;
    margin-bottom: 16px;
  
    &.${inputUnstyledClasses.focused} {
      outline: 3px solid #EEEEEE;
    }
  
    &:hover {
      border-color: #EEEEEE;
    }
  `
);

const StyledInputElement = styled('input')(
  ({ theme }) => `
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    flex-grow: 1;
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    background: inherit;
    border: none;
    border-radius: inherit;
    padding: 12px 12px;
    outline: 0;
  `
);

const MHTextInput = (props: InputUnstyledProps) => {
  const { components, ...others } = props;
  return (
    <React.Fragment>
      <InputUnstyled
        components={{
          Root: StyledInputRoot,
          Input: StyledInputElement,
          ...components
        }}
        {...others}
      />
    </React.Fragment>
  );
};

export default MHTextInput;
