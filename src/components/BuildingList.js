import React from "react";
import { List, Datagrid, TextField, EditButton } from "react-admin";

export const BuildingList = props => (
  <List {...props}>
    <Datagrid>
      <TextField source="address.street" />
      <TextField source="address.streetnumber" />
      <TextField source="address.area" />
      <EditButton />
    </Datagrid>
  </List>
);
