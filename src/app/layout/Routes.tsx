import React, { lazy } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

const Dashboard = lazy(() => import("pages/Dashboard"));
const BuildingList = lazy(() => import("pages/buildings/BuildingList"));
const NewBuilding = lazy(() => import("pages/buildings/NewBuilding"));
const BuildingForm = lazy(() => import("pages/buildings/BuildingForm"));
const Ratings = lazy(() => import("pages/buildings/Ratings"));
const BuildingInfo = lazy(() => import("pages/buildings/BuildingInfo"));

const NewApartment = lazy(() => import("pages/apartments/NewApartment"));

const ApartmentForm = lazy(() => import("pages/apartments/ApartmentForm"));

const Callback = lazy(() => import("pages/Callback"));
const BuildingList1 = lazy(() =>
  import("components/admin/buildings/BuildingList1")
);
const NotFound = lazy(() => import("app/layout/NotFound"));
const Silent = lazy(() => import("pages/Silent"));
const BuildingPay = lazy(() => import("pages/buildings/BuildingPay"));

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

      <Route exact path="/buildings/new" component={NewBuilding} />

      <Route exact path="/buildings/:id" component={BuildingForm} />

      <Route exact path="/buildings/:id/ratings" component={Ratings} />

      <Route exact path="/buildings/:id/info" component={BuildingInfo} />
      <Route exact path="/buildings/:id/payments" component={BuildingPay} />

      <Route exact path="/buildings/:id/try" component={BuildingList1} />
      <Route
        exact
        path="/buildings/:id/apartments/new"
        component={NewApartment}
      />

      <Route
        exact
        path="/buildings/:id1/apartments/:id2"
        component={ApartmentForm}
      />

      <Route exact path="/callback" component={Callback} />

      <Route exact path="/callback" component={Silent} />

      <Route component={NotFound} />
    </Switch>
  );
}

export default Routes;
