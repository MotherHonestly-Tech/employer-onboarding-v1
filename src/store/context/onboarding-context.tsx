import React from 'react';

export type EmployeeOnboarding = {
  firstName: string;
  lastName: string;
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
  employee: Partial<EmployeeOnboarding> | null;
  updateEmployee: (emp: Partial<EmployeeOnboarding>) => void;
};

const OnboardingContext = React.createContext<OnboardingCtxType>({
  employee: null,
  updateEmployee: (emp: Partial<EmployeeOnboarding>) => {}
});

export const OnboardingContextProvider = ({
  children
}: {
  children: React.ReactNode;
}) => {
  const [employee, setEmployee] = React.useState<Partial<
    EmployeeOnboarding
  > | null>(null);

  const updateEmployee = 
    (empDetails: Partial<EmployeeOnboarding>) => {
      setEmployee((prevState) => ({
        ...prevState,
        ...empDetails
      }));
    }

  const contextValue: OnboardingCtxType = {
    employee: employee,
    updateEmployee: updateEmployee
  };

  return (
    <OnboardingContext.Provider value={contextValue}>
      {children}
    </OnboardingContext.Provider>
  );
};

export default OnboardingContext;
