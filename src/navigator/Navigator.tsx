import React from 'react';
import { Route, Switch } from 'react-router-dom';

import AuthNavigator from './AuthNavigator';
import Interests from '../pages/Onboarding/Interests';
import { FnComponent } from '../models/component.model';

const AppNavigator: FnComponent<{}> = (props) => {
  return (
    <React.Fragment>
      <Switch>
        <Route path="/onboarding" component={Interests} />
        {/* <Route path="/dashboard" exact></Route> */}

        <Route path="/">
          <AuthNavigator />
        </Route>
      </Switch>
    </React.Fragment>
  );
};

export default AppNavigator;
