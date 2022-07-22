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
  endAdornment?: React.ReactNode;
  placeholder: string;
  type: string;
  name?: string;
  value?: string;
  autoFocus?: boolean;
  dirty?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
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
        fontSize: '0.85rem'
      }}>
      This field is required.
    </p>
  ) : null;
})`
  font-size: 0.75rem;
`;

const ErrorTip = (props: { error: string }) => {
  const formControlContext = useFormControlUnstyledContext();

  if (formControlContext === undefined) {
    return null;
  }

  const { filled } = formControlContext;

  return props.error && filled ? (
    <p
      className={clsx('invalid')}
      style={{
        color: 'red',
        fontSize: '0.85rem'
      }}>
      {props.error}
    </p>
  ) : null;
};

const MHFormControl = (props: InputProps) => {
  const {
    id,
    type,
    value,
    label,
    required,
    placeholder,
    startAdornment,
    endAdornment,
    autoFocus,
    error,
    onChange,
    onBlur
  } = props;

  return (
    <FormControlUnstyled defaultValue="" value={value} required={required} className="mb-5">
      <Label>{label}</Label>
      <MHTextInput
        id={id}
        startAdornment={startAdornment}
        endAdornment={endAdornment}
        placeholder={placeholder}
        type={type}
        onChange={onChange}
        onBlur={onBlur}
        autoFocus={autoFocus}
        className="mb-2"
      />
      <HelperText />
      <ErrorTip error={error as string} />
    </FormControlUnstyled>
  );
};

export default MHFormControl;
