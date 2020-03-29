import React from "react";
import { Admin, Resource, ListGuesser } from "react-admin";
import restProvider from "ra-data-simple-rest";

function App() {
  return (
    <Admin dataProvider={restProvider("http://localhost:5000/api")}>
      <Resource name="buildings" list={ListGuesser} />
    </Admin>
  );
}

export default App;
