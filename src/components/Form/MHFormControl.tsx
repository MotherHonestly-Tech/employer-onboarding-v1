import * as React from 'react';

import FormControlUnstyled, {
  FormControlUnstyledState,
  useFormControlUnstyledContext
} from '@mui/base/FormControlUnstyled';
import { styled } from '@mui/system';
import clsx from 'clsx';

import MHTextInput from './MHTextInput';
import { theme } from '../../theme/mui/dashboard.theme';

type InputProps = {
  id: string;
  label?: string;
  startAdornment?: React.ReactElement;
  endAdornment?: React.ReactElement;
  placeholder: string;
  type: string;
  name?: string;
  value?: string;
  autoFocus?: boolean;
  dirty?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  fullWidth?: boolean;
  multiline?: boolean;
  rows?: number;
  minRows?: number;
  maxRows?: number;
  email?: boolean;
  min?: number;
  max?: number;
  minLength?: number;
  maxLength?: number;
  readOnly?: boolean;
  precision?: number;
  autoComplete?: string;
};

const Label = styled(
  ({
    children,
    className,
    required
  }: {
    children?: React.ReactNode;
    className?: string;
    required?: boolean;
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

    const { error, required: requiredField, filled } = formControlContext;
    const showRequiredError = dirty && required && !filled;

    return (
      <label
        className={clsx(className, error || showRequiredError ? 'invalid' : '', required && 'required')}
        style={{
          fontSize: 12,
          color: '#194049',
          marginBottom: '10px',
          display: 'block',
          // fontFamily: 'Area-Normal-Bold'
        }}>
        {children}
        {/* {required ? ' *' : ''} */}
      </label>
    );
  }
)`
  font-size: 0.8rem;
  font-family: Area-Normal-Semibold;
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
        fontSize: '0.7rem'
      }}>
      This field is required.
    </p>
  ) : null;
})`
  font-size: 0.7rem;
`;

const ErrorTip = (props: { error: string }) => {
  const formControlContext = useFormControlUnstyledContext();

  if (formControlContext === undefined) {
    return null;
  }

  const { filled } = formControlContext;

  return props.error ? (
    <p
      className={clsx('invalid')}
      style={{
        color: theme.palette.error.main,
        fontSize: '0.7rem'
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
    disabled,
    startAdornment,
    endAdornment,
    autoFocus,
    error,
    multiline,
    rows,
    minRows,
    maxRows,
    min,
    max,
    onChange,
    onBlur,
    precision,
    autoComplete
  } = props;

  return (
    <FormControlUnstyled
      defaultValue=""
      value={value}
      // required={required}
      disabled={disabled}
      style={{
        marginBottom: '1.25rem'
      }}>
      {label && <Label required={required}>{label}</Label>}
      <MHTextInput
        id={id}
        startAdornment={startAdornment}
        endAdornment={endAdornment}
        placeholder={placeholder}
        type={type}
        autoComplete={autoComplete}
        onChange={onChange}
        onBlur={onBlur}
        autoFocus={autoFocus}
        multiline={multiline}
        rows={rows}
        minRows={minRows}
        maxRows={maxRows}
        precision={precision}
        componentsProps={{
          input: {
            min: min,
            max: max
          }
        }}
        style={{
          marginBottom: '0.5rem',
          borderColor: error ? theme.palette.error.main : ''
        }}
      />
      <HelperText />
      <ErrorTip error={error!} />
    </FormControlUnstyled>
  );
};

export default MHFormControl;
