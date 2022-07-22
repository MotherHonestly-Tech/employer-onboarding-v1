import React from 'react';
import { Route, Switch } from 'react-router-dom';

import AuthNavigator from './AuthNavigator';
import Interests from '../pages/Onboarding/Interests';

import { FnComponent } from '../models/component.model';
import DashboardNavigator from './DashboardNavigator';
import AuthContext from '../store/context/auth-context';
import NotFound from '../pages/Not-Found/404';

const AppNavigator: FnComponent<{}> = (props) => {
  const authCtx = React.useContext(AuthContext);

  return (
    <React.Fragment>
      <Switch>
        <Route path="/organization/onboarding" component={Interests} />

        <Route path="/organization">
          <DashboardNavigator />
        </Route>

        <Route path="/404" exact>
          <NotFound />
        </Route>

        <Route path="/">
          <AuthNavigator />
        </Route>
      </Switch>
    </React.Fragment>
  );
};

export default AppNavigator;
