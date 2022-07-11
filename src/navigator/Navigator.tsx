import React from 'react';
import { Route, Switch } from 'react-router-dom';

import AuthNavigator from './AuthNavigator';
import { Component } from '../models/component.model';

const AppNavigator: Component<{}> = (props) => {
  return (
    <React.Fragment>
      <Switch>
        <Route path="/">
          <AuthNavigator />
        </Route>

        <Route path="/dashboard" exact></Route>
      </Switch>
    </React.Fragment>
  );
};

export default AppNavigator;
