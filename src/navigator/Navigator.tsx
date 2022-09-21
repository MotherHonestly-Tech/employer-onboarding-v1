import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Onboarding from '../pages/Onboarding/Onboarding';
import NotFound from '../pages/Error/404';

import { FnComponent } from '../models/component.model';

const AppNavigator: FnComponent<{}> = (props) => {
  return (
    <React.Fragment>
      <Switch>
        <Route
          path="/"
          render={(routeProps) => (
            <Redirect
              to={{
                pathname: '/onboarding',
                state: { from: routeProps.location }
              }}
            />
          )}
          exact
        />

        <Route path={`/onboarding`} component={Onboarding} exact />

        <Route path="*">
          <NotFound />
        </Route>

        {/* <Route path="*">
          <Redirect to="/404" />
        </Route> */}
      </Switch>
    </React.Fragment>
  );
};

export default AppNavigator;
