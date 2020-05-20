import PropTypes from "prop-types";
import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import { BuildingList } from "./pages/buildings/BuildingList";
import { NewBuilding } from "./pages/buildings/NewBuilding";
import { BuildingForm } from "./pages/buildings/BuildingForm";
import { NewApartment } from "./pages/apartments/NewApartment";
import { ApartmentForm } from "./pages/apartments/ApartmentForm";
import Callback from "./pages/Callback";
import Silent from "./pages/Silent";
import { PersonForm } from "./components/PersonForm";
import { Ratings } from "./pages/buildings/Ratings";

function Routes(props: any) {
  return (
    <Switch>
      <Route exact path="/">
        <Redirect to="/dashboard" />
      </Route>
      <Route exact path="/dashboard">
        <Dashboard changeUser={props.changeUser} />
      </Route>
      <Route exact path="/buildings">
        <BuildingList></BuildingList>
      </Route>
      <Route exact path="/buildings/new">
        <NewBuilding></NewBuilding>
      </Route>
      <Route exact path="/buildings/:id">
        <BuildingForm></BuildingForm>
      </Route>
      <Route exact path="/buildings/:id/ratings">
        <Ratings></Ratings>
      </Route>
      <Route exact path="/buildings/:id/apartments/new">
        <NewApartment></NewApartment>
      </Route>
      <Route exact path="/buildings/:id1/apartments/:id2">
        <ApartmentForm></ApartmentForm>
      </Route>
      <Route exact path="/callback">
        <Callback></Callback>
      </Route>
      <Route exact path="/callback">
        <Silent></Silent>
      </Route>
    </Switch>
  );
}

Routes.propTypes = {
  changeUser: PropTypes.any,
};

export default Routes;
