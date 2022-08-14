import React from 'react';

import Checkbox from '@mui/material/Checkbox';
import { styled } from '@mui/material/styles';

import { FnComponent } from '../../models/component.model';
import { isHexColorBright } from '../../utils/utils';

const InterestUnChecked = styled(({ label, ...props }: any) => (
  <div {...props}>{label}</div>
))(({ theme }) => ({
  backgroundColor: '#F2F2F2',
  color: '#B6B6B6',
  padding: '0.8rem 1.7rem'
}));

const InterestChecked = styled(InterestUnChecked)(
  ({ theme, fill }) => ({
    backgroundColor: fill || '#F7DAA0',
    color: !isHexColorBright(fill) ? theme.palette.common.white : '#194049'
  })
);

const MHInterestCheckbox: FnComponent<{
  label: string;
  fill: string;
  value: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = (props) => {
  const label = { inputProps: { 'aria-label': props.label } };

  return (
    <Checkbox
      {...label}
      value={props.value}
      onChange={props.onChange}
      disableRipple
      icon={<InterestUnChecked {...props} />}
      checkedIcon={<InterestChecked {...props} />}></Checkbox>
  );
};

export default MHInterestCheckbox;
