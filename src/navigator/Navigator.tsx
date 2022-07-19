import React from 'react';
import { Route, Switch } from 'react-router-dom';

import AuthNavigator from './AuthNavigator';
import Interests from '../pages/Onboarding/Interests';

import { FnComponent } from '../models/component.model';
import DashboardNavigator from './DashboardNavigator';

const AppNavigator: FnComponent<{}> = (props) => {
  return (
    <React.Fragment>
      <Switch>
        <Route path="/organization/onboarding" component={Interests} />

        <Route path="/organization">
          <DashboardNavigator />
        </Route>

        <Route path="/">
          <AuthNavigator />
        </Route>
      </Switch>
    </React.Fragment>
  );
};

export default AppNavigator;
