import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import Startup from '../components/Dashboard/Startup';

import Interests from '../pages/Onboarding/Interests';

import AuthContext from '../store/context/auth-context';

const OnboardingNavigator = () => {
  const { path } = useRouteMatch();
  const authCtx = React.useContext(AuthContext);

  console.log(authCtx);

  if (!authCtx.user?.firstName && !authCtx.user?.lastName) {
    console.log('authCtx.user', authCtx.user);
    return <Startup />;
  }

  return (
    <Switch>
      <Route path={`${path}`}>
        <Interests />
      </Route>
    </Switch>
  );
};

export default OnboardingNavigator;
