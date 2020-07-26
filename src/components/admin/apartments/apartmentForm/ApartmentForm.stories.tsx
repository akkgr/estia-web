import React from "react";
import { action } from "@storybook/addon-actions";
import { MemoryRouter } from "react-router-dom";
import ApartmentForm from "./ApartmentForm";

export default {
  component: ApartmentForm,
  title: "components/admin/apartments/ApartmentForm",
  decorators: [(getStory: any) => <MemoryRouter>{getStory()}</MemoryRouter>],
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
};

export const ApartmentData = {
  buildingId: "13412341234",
  closed: false,
  common: 3123123,
  ei: 312312,
  fi: 1231,
  heat: 12312,
  id: null,
  infoType: 0,
  label: "",
  lift: 31231,
  owner: {
    afm: "123",
    doy: "123123",
    email: "21312",
    firstName: "123123",
    lastName: "231",
    mobile: "123123",
    roleType: 0,
    telephone: "123",
  },
  owners: 1231,
  position: 0,
  resident: {
    afm: "12321",
    doy: "12321",
    email: "123",
    firstName: "12312",
    lastName: "12312",
    mobile: "12312",
    roleType: 0,
    telephone: "123123",
  },
  special: 31231,
  special1: 1231,
  special2: 12313,
  special3: 13123,
  special4: 123,
  title: "Α1",
  buildingTitle: "Α1",
};
export const actionsData = {
  onSave: action("saveApartment"),
};

export const CreateNewApartment = () => {
  return (
    <ApartmentForm
      id="5e9dd3947fd9793bb0b5562c"
      id1={undefined}
      data={undefined}
      {...actionsData}
    />
  );
};

export const UpdateApartment = () => {
  return (
    <ApartmentForm
      id="5e9dd3947fd9793bb0b5562c"
      id1="5e9dd3ac7fd9793bb0b5562d"
      data={ApartmentData}
      {...actionsData}
    />
  );
};
