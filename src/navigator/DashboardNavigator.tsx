import React from "react";
import { Switch, Route, useRouteMatch, Redirect } from "react-router-dom";
import Startup from "../components/Dashboard/Startup";

import Layout from "../components/Layout/Layout";
import ArticlesPage from "../components/Resources/Articles/ArticlesPage";
import EventsPage from "../components/Resources/Events/EventsPage";
import PodcastsPage from "../components/Resources/Podcasts/PodcastsPage";
import ToolkitsPage from "../components/Resources/Toolkits/ToolkitsPage";
import ViewToolkit from "../components/Resources/Toolkits/ViewToolkit";
import VideosPage from "../components/Resources/Videos/VideosPage";
import Coaching from "../pages/Dashboard/Coaching";
import Dashboard from "../pages/Dashboard/Dashboard";
import Merchants from "../pages/Dashboard/Merchants";
import Resources from "../pages/Dashboard/Resources";
import Wallet from "../pages/Dashboard/Wallet";
import AuthContext from "../store/context/auth-context";

const DashboardNavigator = () => {
  const authCtx = React.useContext(AuthContext);
  const { path } = useRouteMatch();

  if (!authCtx.user) {
    return <Startup />;
  }

  if (!authCtx.isOnboarded(authCtx.user)) {
    return (
      <Redirect
        to={{
          pathname: "/onboarding/employee",
          state: { from: { pathname: "/dashboard" } },
        }}
      />
    );
  }

  return (
    <React.Fragment>
      <Layout>
        <Switch>
          <Route path={`${path}/dashboard`} exact>
            <Dashboard />
          </Route>
          <Route path={`${path}/wallet`} exact>
            <Wallet title="Wallet" />
          </Route>
          <Route path={`${path}/merchants`} exact>
            <Merchants />
          </Route>
          <Route path={`${path}/resources`} exact>
            <Resources />
          </Route>
          <Route path={`${path}/coaching`} exact>
            <Coaching />
          </Route>
          <Route path={`${path}/resources/toolkits`} exact>
            <ToolkitsPage />
          </Route>
          <Route path={`${path}/resources/toolkits/:slug`} exact>
            <ViewToolkit />
          </Route>
          <Route path={`${path}/resources/videos`} exact>
            <VideosPage />
          </Route>
          <Route path={`${path}/resources/events`} exact>
            <EventsPage />
          </Route>
          <Route path={`${path}/resources/articles`} exact>
            <ArticlesPage />
          </Route>
          <Route path={`${path}/resources/podcasts`} exact>
            <PodcastsPage />
          </Route>
        </Switch>
      </Layout>
    </React.Fragment>
  );
};

export default DashboardNavigator;
