import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Onboarding from '../pages/Onboarding/Onboarding';
import DwollaPaymentSuccess from '../pages/Onboarding/DwollaPaymentSuccess';
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
                  '?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRob3JpemVkIjp0cnVlLCJlbWFpbCI6InR1bmppQG1vdGhlcmhvbmVzdGx5LmNvbSIsImVtcGxveWVyUmVmSWQiOjE5Mzk0NDYwNzcsImV4cCI6IjIwMjItMDktMjlUMDk6NDU6NDUuOTYwOTUwMVoiLCJyb2xlIjoiRW1wbG95ZWUiLCJ0eXBlIjoiRU1QTE9ZRVJEQVNIQk9BUkQiLCJ1c2VyIjowfQ.VMn1aRECFmV86jWSupKJUX3b9h94FFkdmj81bNz9Y1Y'
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
