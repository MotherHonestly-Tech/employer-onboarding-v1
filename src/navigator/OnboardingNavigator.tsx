import React from 'react';
import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom';

import Startup from '../components/Dashboard/Startup';
import Interests from '../pages/Onboarding/Interests';
import Onboarding from '../pages/Onboarding/Onboarding';
import AuthContext from '../store/context/auth-context';
import { OnboardingContextProvider } from '../store/context/onboarding-context';

const OnboardingNavigator = () => {
  const { path } = useRouteMatch();
  const authCtx = React.useContext(AuthContext);

  if (!authCtx.user) {
    // console.log('authCtx.user', authCtx.user);
    return <Startup />;
  }
  
  console.log(authCtx.isOnboarded);

  if (authCtx.isOnboarded) {
    return (
      <Redirect
        to={{
          pathname: '/organization/dashboard',
          state: { from: { pathname: '/onboarding' } }
        }}
      />
    );
  }

  return (
    <Switch>
      <Route path={`${path}/employee`}>
        <OnboardingContextProvider>
          <Onboarding />
        </OnboardingContextProvider>
      </Route>
      <Route path={`${path}/interests`}>
        <Interests />
      </Route>

      <Route path={`${path}`}>
        <Redirect to={`${path}/employee`} />
      </Route>
    </Switch>
  );
};

export default OnboardingNavigator;
