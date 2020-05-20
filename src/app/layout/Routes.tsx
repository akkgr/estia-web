import PropTypes from "prop-types";
import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Dashboard } from "pages/Dashboard";
import { BuildingList } from "pages/buildings/BuildingList";
import { NewBuilding } from "pages/buildings/NewBuilding";
import { BuildingForm } from "pages/buildings/BuildingForm";
import { NewApartment } from "pages/apartments/NewApartment";
import { ApartmentForm } from "pages/apartments/ApartmentForm";
import Callback from "pages/Callback";
import Silent from "pages/Silent";
import { BuildingInfo } from "pages/buildings/BuildingInfo";
import { Ratings } from "pages/buildings/Ratings";
import BuildingList1 from "components/Admin/BuildingList1";

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
    </Switch>
  );
}

Routes.propTypes = {
  changeUser: PropTypes.any,
};

export default Routes;
