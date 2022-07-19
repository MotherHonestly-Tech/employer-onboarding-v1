import React from 'react';

import InputUnstyled, {
  InputUnstyledProps,
  inputUnstyledClasses
} from '@mui/base/InputUnstyled';
import { useFormControlUnstyledContext } from '@mui/base/FormControlUnstyled';
import { styled } from '@mui/system';
import clsx from 'clsx';

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
    margin-bottom: 8px;
    transition: all 0.4s ease-in;

    .Mui-focused > &.MuiInput-root.MuiInput-formControl {
      border: 1px solid ${grey[500]};
    }

    &:hover {
      border-color: ${grey[300]};
    }
  `
);

const StyledInputElement = styled(
  React.forwardRef(
    (
      {
        children,
        className,
        type,
        onChange,
        ...others
      }: {
        children?: React.ReactNode;
        className?: string;
        type: string;
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => {};
      },
      ref
    ) => {
      const inputRef = React.useRef<HTMLInputElement>(null);
      const cursorPosition = React.useRef<{
        start: number | null;
        end: number | null;
      }>({
        start: 0,
        end: 0
      });

      React.useEffect(() => {
        if (
          inputRef &&
          inputRef.current &&
          (type === 'password' || type === 'text')
        ) {
          inputRef.current.setSelectionRange(cursorPosition.current.end, cursorPosition.current.end) 
          // = cursorPosition.current.start;
          // inputRef.current.selectionEnd = cursorPosition.current.end;
        }
      });

      const setCursorPosition = (
        event: React.ChangeEvent<HTMLInputElement>
      ) => {
        cursorPosition.current = {
          start: event.target.selectionStart,
          end: event.target.selectionEnd
        };
        onChange && onChange(event);
      };

      React.useImperativeHandle(ref, () => {
        return {
          focus: () => (inputRef.current as HTMLInputElement).focus()
        };
      });

      return (
        <input
          className={clsx(className)}
          onChange={setCursorPosition}
          type={type}
          ref={inputRef}
          {...others}
        />
      );
    }
  )
)`
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

const MHTextInput = React.forwardRef((props: InputUnstyledProps, ref) => {
  const { components, ...others } = props;
  const inputRef = React.useRef<HTMLInputElement>(null);
  const formControlContext = useFormControlUnstyledContext();

  React.useEffect(() => {
    // console.log(inputRef);
  }, []);

  React.useImperativeHandle(ref, () => ({
    inputEl: inputRef.current as HTMLInputElement
  }));

  if (formControlContext === undefined) {
    return null;
  }

  const { onChange, onFocus, onBlur } = formControlContext;

  return (
    <React.Fragment>
      <InputUnstyled
        components={{
          Root: StyledInputRoot,
          Input: StyledInputElement,
          ...components
        }}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        ref={inputRef}
        {...others}
      />
    </React.Fragment>
  );
});

export default MHTextInput;
