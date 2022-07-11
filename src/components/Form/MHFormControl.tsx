import * as React from 'react';

import FormControlUnstyled, {
  useFormControlUnstyledContext
} from '@mui/base/FormControlUnstyled';
import { styled } from '@mui/system';
import clsx from 'clsx';

import MHTextInput from './MHTextInput';


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
      <p
        className={clsx(
          className,
          error || showRequiredError ? 'invalid' : ''
        )}>
        {children}
        {/* {required ? ' *' : ''} */}
      </p>
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

  return showRequiredError ? <p {...props}>This field is required.</p> : null;
})`
  font-size: 0.875rem;
`;

export default function MHFormControl(props: {
  label: string;
  startAdornment?: React.ReactNode;
  placeholder: string;
}) {
  const { label, startAdornment, placeholder } = props;

  return (
    <FormControlUnstyled defaultValue="">
      <Label>{label}</Label>
      <MHTextInput startAdornment={startAdornment} placeholder={placeholder} />
      <HelperText />
    </FormControlUnstyled>
  );
}
