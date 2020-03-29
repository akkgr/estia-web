import React from "react";
import { Admin, Resource } from "react-admin";
import restProvider from "ra-data-simple-rest";

import { BuildingList } from "./components/BuildingList";

function App() {
  return (
    <Admin dataProvider={restProvider("http://localhost:5000/api")}>
      <Resource name="buildings" list={BuildingList} />
    </Admin>
  );
}

export default App;
