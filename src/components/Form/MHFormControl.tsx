import * as React from 'react';

import FormControlUnstyled, {
  useFormControlUnstyledContext
} from '@mui/base/FormControlUnstyled';
import { styled } from '@mui/system';
import clsx from 'clsx';

import MHTextInput from './MHTextInput';

type InputProps = {
  label: string;
  startAdornment?: React.ReactNode;
  placeholder: string;
  type: string;
  name?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  fullWidth?: boolean;
  multiline?: boolean;
  rows?: number;
  rowsMax?: number;
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
        fontSize: '0.875rem'
      }}>
      This field is required.
    </p>
  ) : null;
})``;

export default function MHFormControl(props: InputProps) {
  const { label, startAdornment, placeholder, type } = props;

  return (
    <FormControlUnstyled defaultValue="" required className="mb-5">
      <Label>{label}</Label>
      <MHTextInput
        id="outlined-start-adornment"
        startAdornment={startAdornment}
        placeholder={placeholder}
        type={type}
      />
      <HelperText />
    </FormControlUnstyled>
  );
}
