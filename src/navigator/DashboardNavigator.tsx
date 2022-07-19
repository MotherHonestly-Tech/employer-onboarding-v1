import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Layout from '../components/Layout/Layout';
import Coaching from '../pages/Dashboard/Coaching';
import Dashboard from '../pages/Dashboard/Dashboard';
import Merchants from '../pages/Dashboard/Merchants';
import Resources from '../pages/Dashboard/Resources';
import Wallet from '../pages/Dashboard/Wallet';

const DashboardNavigator = () => {
  return (
    <Layout>
      <Switch>
        <Route path="/organization/dashboard" exact>
          <Dashboard />
        </Route>
        <Route path="/organization/wallet" exact>
          <Wallet />
        </Route>
        <Route path="/organization/merchants" exact>
          <Merchants />
        </Route>
        <Route path="/organization/resources" exact>
          <Resources />
        </Route>
        <Route path="/organization/coaching" exact>
          <Coaching />
        </Route>
      </Switch>
    </Layout>
  );
};

export default DashboardNavigator;
