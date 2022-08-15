import React from 'react';

import { SelectOption } from '@mui/base';

export type EmployeeOnboarding = {
  firstName: string;
  lastName: string;
  state: string;
  zipCode: string;
  relationshipStatus: string;
  householdSize: string;
  numberOfKids: string;
  identity: string;
  dateOfBirth: string | Date;
  race: string;
  jobTitle: string;
  position: string;
  department: string;
  careResponsibilities: string[];
};

type OnboardingCtxType = {
  states: SelectOption<string>[];
  employee: Partial<EmployeeOnboarding> | null;
  updateEmployee: (emp: Partial<EmployeeOnboarding>) => void;
  configureStates: (geoData: any) => void;
};

const OnboardingContext = React.createContext<OnboardingCtxType>({
  states: [],
  employee: null,
  updateEmployee: (emp: Partial<EmployeeOnboarding>) => {},
  configureStates: (geoData: any) => {}
});

export const OnboardingContextProvider = ({
  children
}: {
  children: React.ReactNode;
}) => {
  const [employee, setEmployee] = React.useState<Partial<
    EmployeeOnboarding
  > | null>(null);
  const [states, setStates] = React.useState<Array<SelectOption<string>>>([]);

  const configureStates = (geoData: Array<unknown>) => {
    const mappedStates = geoData
      .filter((item: any) => item.fields.ste_type === 'state')
      .map((item: any) => {
        return {
          value: item.fields.ste_name,
          label: item.fields.ste_name
        };
      })
      .sort((a, b) => {
        if (a.label < b.label) {
          return -1;
        }
        if (a.label > b.label) {
          return 1;
        }
        return 0;
      });
    setStates(mappedStates);
  };

  const updateEmployee = (empDetails: Partial<EmployeeOnboarding>) => {
    setEmployee((prevState) => ({
      ...prevState,
      ...empDetails
    }));
  };

  const contextValue: OnboardingCtxType = {
    states,
    employee: employee,
    configureStates,
    updateEmployee: updateEmployee
  };

  return (
    <OnboardingContext.Provider value={contextValue}>
      {children}
    </OnboardingContext.Provider>
  );
};

export default OnboardingContext;
