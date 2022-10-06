import { styled } from '@mui/system';
import clsx from 'clsx';

const Label = styled((props: any) => (
  <label
    {...props}
    className={clsx(props.className, props.required ? 'required' : '')}></label>
))(
  ({ theme }) => `
    font-family: Area-Normal-Semibold;
    width: 100%;
    min-width: 320px;
    margin-bottom: 4px;
    font-size: 12px;
    color: #A7A7A7;
    margin-bottom: 10px;
    display: block;
    ...({
        ...style
    })
  `
);

export default Label;
