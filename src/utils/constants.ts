import { SelectOption } from '@mui/base';

export const drawerWidth: number = 240;

export const RELATIONSHIP_STATUS_OPTIONS: SelectOption<string>[] = [
  {
    value: 'single',
    label: 'Single'
  },
  {
    value: 'married',
    label: 'Married'
  },
  {
    value: 'committed',
    label: 'Committed'
  }
];

export const QUANTITY_OPTIONS: SelectOption<string>[] = [
  {
    value: '0',
    label: '0'
  },
  {
    value: '1',
    label: '1'
  },
  {
    value: '2',
    label: '2'
  },
  {
    value: '3',
    label: '3'
  },
  {
    value: '4',
    label: '4'
  },
  {
    value: '5+',
    label: '5+'
  }
];

export const BOOL_OPTIONS: SelectOption<string>[] = [
  {
    value: 'yes',
    label: 'Yes'
  },
  {
    value: 'no',
    label: 'No'
  }
];

export const IDENTITY_OPTIONS: SelectOption<string>[] = [
  {
    value: 'she/her',
    label: 'She/Her'
  },
  {
    value: 'he/him',
    label: 'He/Him'
  },
  {
    value: 'they/them',
    label: 'They/Them'
  },
  {
    value: 'other',
    label: 'Other'
  }
];

export const CARE_RESPONSIBILITY_OPTIONS: SelectOption<string>[] = [
  {
    value: 'self',
    label: 'Self'
  },
  {
    value: 'child',
    label: 'Child'
  },
  {
    value: 'parent',
    label: 'Parent'
  },
  {
    value: 'extended_family',
    label: 'Extended family'
  },
  {
    value: 'family_of_choice',
    label: 'Family of choice'
  },
  {
    value: 'household',
    label: 'Household'
  },
  {
    value: 'pet',
    label: 'Pet'
  },
];
