import React from 'react';

import InputUnstyled, {
  InputUnstyledProps,
  inputUnstyledClasses
} from '@mui/base/InputUnstyled';
import { useFormControlUnstyledContext } from '@mui/base/FormControlUnstyled';
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
    transition: all 0.4s ease-in;

    .Mui-focused > &.MuiInput-root.MuiInput-formControl {
      border: 1px solid ${grey[500]};
    }

    &.MuiInput-root.Mui-focused {
      border: 1px solid ${grey[300]};
    }

    &:hover {
      border-color: ${grey[300]};
    }
  `
);

const StyledInputElement = styled('input')`
  display: block;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  flex-grow: 1;
  color: ${grey[900]};
  background: inherit;
  border: none;
  border-radius: inherit;
  padding: 12px 12px;
  outline: 0;
`;

const MHTextInput = React.forwardRef((props: InputUnstyledProps, ref: React.ForwardedRef<HTMLDivElement>) => {
  const { components, ...others } = props;

  React.useEffect(() => {
    // console.log(inputRef);
  }, []);

  // const { onChange, onFocus, onBlur } = formControlContext;

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange && props.onChange(event);
    // onChange && onChange(event);
  };

  const inputBlurHandler = (event: React.FocusEvent<HTMLInputElement>) => {
    props.onBlur && props.onBlur(event);
    // onBlur && onBlur();
  }

  return (
    <React.Fragment>
      <InputUnstyled
        components={{
          Root: StyledInputRoot,
          Input: StyledInputElement,
          ...components
        }}
        onChange={inputChangeHandler}
        onBlur={inputBlurHandler}
        ref={ref}
        {...others}
      />
    </React.Fragment>
  );
});

export default MHTextInput;
