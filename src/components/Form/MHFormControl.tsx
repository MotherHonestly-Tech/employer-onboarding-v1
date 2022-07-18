import * as React from 'react';

import FormControlUnstyled, {
  FormControlUnstyledState,
  useFormControlUnstyledContext
} from '@mui/base/FormControlUnstyled';
import { styled } from '@mui/system';
import clsx from 'clsx';

import MHTextInput from './MHTextInput';

type InputProps = {
  id: string;
  label: string;
  startAdornment?: React.ReactNode;
  placeholder: string;
  type: string;
  name?: string;
  value?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  fullWidth?: boolean;
  multiline?: boolean;
  rows?: number;
  rowsMax?: number;
  email?: boolean;
  min?: number;
  max?: number;
  minLength?: number;
  maxLength?: number;
};

const Label = styled(
  ({
    children,
    className
  }: {
    children?: React.ReactNode;
    className?: string;
  }) => {
    const formControlContext = useFormControlUnstyledContext();
    const [dirty, setDirty] = React.useState(false);

    React.useEffect(() => {
      if (formControlContext?.filled) {
        setDirty(true);
      }
    }, [formControlContext]);

    if (formControlContext === undefined) {
      return <p>{children}</p>;
    }

    const { error, required, filled } = formControlContext;
    const showRequiredError = dirty && required && !filled;

    return (
      <label
        className={clsx(
          className,
          error || showRequiredError ? 'invalid' : ''
        )}>
        {children}
        {/* {required ? ' *' : ''} */}
      </label>
    );
  }
)`
  font-size: 0.875rem;
  margin-bottom: 4px;

  &.invalid {
    color: red;
  }
`;

const HelperText = styled((props: {}) => {
  const formControlContext = useFormControlUnstyledContext();
  const [dirty, setDirty] = React.useState(false);

  React.useEffect(() => {
    if (formControlContext?.filled) {
      setDirty(true);
    }
  }, [formControlContext]);

  if (formControlContext === undefined) {
    return null;
  }

  const { required, filled } = formControlContext;
  const showRequiredError = dirty && required && !filled;

  return showRequiredError ? (
    <p
      {...props}
      className={clsx('invalid')}
      style={{
        color: 'red',
        fontSize: '0.875rem'
      }}>
      This field is required.
    </p>
  ) : null;
})``;

const MHFormControl = React.forwardRef((props: InputProps, ref) => {
  const controlRef = React.useRef<HTMLInputElement>(null);
  const {
    id,
    type,
    label,
    required,
    placeholder,
    startAdornment,
    onChange
  } = props;


  React.useImperativeHandle(ref, () => ({
    focus: () => {
      (controlRef.current as HTMLInputElement).focus();
    }
  }));

  return (
    <FormControlUnstyled
      defaultValue=""
      required={required}
      className="mb-5"
      >
      <Label>{label}</Label>
      <MHTextInput
        id={id}
        startAdornment={startAdornment}
        placeholder={placeholder}
        type={type}
        onChange={(event) => onChange(event)}
        ref={controlRef}
      />
      <HelperText />
    </FormControlUnstyled>
  );
});

export default MHFormControl;
