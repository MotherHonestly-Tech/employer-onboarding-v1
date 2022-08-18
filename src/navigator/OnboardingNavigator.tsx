import React from 'react';
import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom';

import Startup from '../components/Dashboard/Startup';
import Interests from '../pages/Onboarding/Interests';
import Onboarding from '../pages/Onboarding/Onboarding';

import AuthContext from '../store/context/auth-context';
import { OnboardingContextProvider } from '../store/context/onboarding-context';
import { User } from '../models/user.model';

const OnboardingNavigator = () => {
  const { path } = useRouteMatch();
  const authCtx = React.useContext(AuthContext);

  const { user, isOnboarded } = authCtx;

  if (!authCtx.user) {
    // console.log('authCtx.user', authCtx.user);
    return <Startup />;
  }

  const userIsOnboarded = () => isOnboarded(user as User);

  // <Redirect
  //   to={{
  //     pathname: '/organization/dashboard',
  //     state: { from: { pathname: '/onboarding' } }
  //   }}
  // />;

  return (
    <Switch>
      <Route path={`${path}/employee`}>
        <OnboardingContextProvider>
          <Onboarding isOnboarded={userIsOnboarded} />
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
