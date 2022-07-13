import React from 'react';

import Checkbox from '@mui/material/Checkbox';
import { styled } from '@mui/material/styles';

import { FnComponent } from '../../models/component.model';

const InterestUnChecked = styled(({ label, ...props }: any) => (
  <div {...props}>{label}</div>
))(({ theme }) => ({
  backgroundColor: '#F2F2F2',
  color: '#B6B6B6',
  padding: '0.8rem 1.7rem'
}));

const InterestChecked = styled(InterestUnChecked)(({ theme, fill, stroke }) => ({
  backgroundColor: fill || '#F7DAA0',
  color: stroke || '#77633B'
}));

const MHInterestCheckbox: FnComponent<{
  label: string;
  fill: string;
  stroke: string;
}> = (props) => {
  const label = { inputProps: { 'aria-label': props.label } };

  return (
    <Checkbox
      {...label}
      disableRipple
      icon={<InterestUnChecked {...props} />}
      checkedIcon={<InterestChecked {...props} />}></Checkbox>
  );
};

export default MHInterestCheckbox;
