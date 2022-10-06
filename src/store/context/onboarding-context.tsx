import React from 'react';

import { SelectOption } from '@mui/base';

export type EmployerOnboarding = {
  customerId:                number;
  employerRefId:             number;
  employerToken:             string;
  employeeEmail:             string;
  firstName:                 string;
  lastName:                  string;
  domain:                    string;
  employeeSize:              number;
  stateOfIncorporation:      string;
  allocationPerEmployee:     number;
  monthlyAllocation:         number;
  quarterlyAllocation:       number;
  businessPhone:             string;
  businessAddress:           string;
  businessType:              string;
  region:                    string;
  city:                      string;
  zipCode:                   string;
  state:                     string;
};

type OnboardingCtxShape = {
  states: SelectOption<string>[];
  employer: EmployerOnboarding | null;
  updateEmployerData: (emp: EmployerOnboarding) => void;
  configureStates: (geoData: any) => void;
};

const OnboardingContext = React.createContext<OnboardingCtxShape>({
  states: [],
  employer: null,
  updateEmployerData: (emp: EmployerOnboarding) => {},
  configureStates: (geoData: any) => {}
});

export const OnboardingContextProvider = ({
  children
}: {
  children: React.ReactNode;
}) => {
  const [employer, setEmployer] = React.useState<
    EmployerOnboarding | null>(null);
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

  const updateEmployerData = (empDetails: EmployerOnboarding) => {
    setEmployer((prevState) => ({
      ...prevState,
      ...empDetails
    }));
  };

  const contextValue: OnboardingCtxShape = {
    states,
    employer: employer,
    updateEmployerData,
    configureStates
  };

  return (
    <OnboardingContext.Provider value={contextValue}>
      {children}
    </OnboardingContext.Provider>
  );
};

export default OnboardingContext;
