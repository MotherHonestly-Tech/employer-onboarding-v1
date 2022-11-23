import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Onboarding from '../pages/Onboarding/Onboarding';
import DwollaPaymentSuccess from '../pages/Onboarding/DwollaPaymentSuccess';
import ConsultantOnboarding from '../pages/Consultant/ConsultantOnboarding';
import NotFound from '../pages/Error/404';

import { FnComponent } from '../models/component.model';
import { OnboardingContextProvider } from '../store/context/onboarding-context';

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
                state: { from: routeProps.location },
                search:
                  'token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRob3JpemVkIjp0cnVlLCJlbWFpbCI6Im9kZWxhZGV0dW5qaUBnbWFpbC5jb20iLCJlbXBsb3llclJlZklkIjozOTcwNTcxNDQsImV4cCI6IjIwMjMtMDItMDFUMTg6MjY6MTQuOTM4NDY5MTE3WiIsInJvbGUiOiJFTVBMT1lFUl9BRE1JTiIsInR5cGUiOiJFTVBMT1lFUkRBU0hCT0FSRCIsInVzZXIiOjM5NzA1NzE0NH0.zU2RqJZQjwaCypiz6BK2Y5s1l_j0u8pOGBjevZEk7P8'
              }}
            />
          )}
          exact
        />

        {/* <Route path={`/onboarding`} component={Onboarding} exact /> */}
        <Route path={`/onboarding`} exact>
          <OnboardingContextProvider>
            <Onboarding />
          </OnboardingContextProvider>
        </Route>

        <Route path={`/employer/allocation`} exact>
          <DwollaPaymentSuccess />
        </Route>

        <Route path={'/consultant/onboarding'} exact>
          <ConsultantOnboarding />
        </Route>

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
