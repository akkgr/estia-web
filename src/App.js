import React from "react";
import { Admin, Resource, ListGuesser } from "react-admin";
import restProvider from "ra-data-simple-rest";

import { BuildingList } from "./components/BuildingList";

function App() {
  return (
    <Admin dataProvider={restProvider("http://localhost:5000/api")}>
      <Resource name="buildings" list={BuildingList} />
      <Resource name="fees" list={ListGuesser} />
      <Resource name="users" list={ListGuesser} />
      <Resource name="statistics" list={ListGuesser} />
    </Admin>
  );
}

export default App;
