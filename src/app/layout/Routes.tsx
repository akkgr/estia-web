import React, { lazy } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

const Dashboard = lazy(() => import("components/dashboard/Dashboard"));
const BuildingForm = lazy(() =>
  import("components/admin/buildings/BuildingForm")
);
const EditBuilding = lazy(() =>
  import("components/admin/buildings/EditBuilding")
);

const EditApartment = lazy(() =>
  import("components/admin/apartments/EditApartment")
);

const Callback = lazy(() => import("auth/Callback"));
const BuildingList = lazy(() =>
  import("components/admin/buildings/BuildingList")
);
const NotFound = lazy(() => import("app/layout/NotFound"));
const Silent = lazy(() => import("auth/Silent"));
const BuildingPay = lazy(() =>
  import("components/admin/buildings/BuildingPay")
);

function Routes(props: any) {
  return (
    <Switch>
      <Route exact path="/">
        <Redirect to="/dashboard" />
      </Route>
      <Route exact path="/dashboard">
        <Dashboard changeUser={props.changeUser} />
      </Route>

      <Route exact path="/buildings" component={BuildingList} />

      <Route exact path="/buildings/new" component={EditBuilding} />

      <Route exact path="/buildings/:id" component={BuildingForm} />

      <Route exact path="/buildings/:id/info" component={EditBuilding} />
      <Route exact path="/buildings/:id/payments" component={BuildingPay} />

      <Route
        exact
        path="/buildings/:id/apartments/new"
        component={EditApartment}
      />

      <Route
        exact
        path="/buildings/:id/apartments/:id1"
        component={EditApartment}
      />

      <Route exact path="/callback" component={Callback} />

      <Route exact path="/silentrenew" component={Silent} />

      <Route component={NotFound} />
    </Switch>
  );
}

export default Routes;
