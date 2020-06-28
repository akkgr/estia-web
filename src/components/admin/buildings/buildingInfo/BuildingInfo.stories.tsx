import React from "react";
import { action } from "@storybook/addon-actions";
import { MemoryRouter } from "react-router-dom";
import BuildingInfo from "../BuildingInfo";

export default {
  component: BuildingInfo,
  title: "components/admin/buildings/BuildingInfo",
  decorators: [(getStory: any) => <MemoryRouter>{getStory()}</MemoryRouter>],
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
};

export const BuildingData = {
  address: {
    area: "Χανιά",
    street: "Αριδαία",
    streetNumber: "2342342",
    postalCode: "41335",
    country: "Ελλάδα",
    lat: 0,
    lng: 0,
  },
  active: false,
  management: false,
  managementStart: "1900-01-03T22:15:36Z",
  managementEnd: "2024-01-03T22:00:00Z",
  reserve: 1,
  heatingType: 2,
  caloriesCounter: false,
  closedApartmentParticipation: 0,
  litersPerCm: 0,
  bankReason: "Reason",
  providers: [
    {
      providerType: 1,
      providerName: "ΔΕΥΑΛ",
      customerName: "thisCustomer",
      contractNumber: "134514512341",
      connectionNumber: "3234",
      counterNumber: "15",
      paymentCode: "56598526599",
      interval: 0,
      day: 1,
      office: false,
    },
  ],
  managers: [],
  id: "5e9dd45e7fd9793bb0b5562f",
  createdOn: "2020-04-20T16:57:02.309Z",
  createdBy: "admin",
  updatedOn: "2020-06-28T21:43:02.69Z",
  updatedBy: "admin",
  deleted: false,
  deletedOn: "2020-06-02T13:10:01.456Z",
  deletedBy: "admin",
};

export const actionsData = {
  mutate: action("saveBuilding"),
};

export const CreateNewBuilding = () => {
  return <BuildingInfo id={undefined} data={null} {...actionsData} />;
};

export const UpdateBuilding = () => {
  return (
    <BuildingInfo
      id="5e9dd3947fd9793bb0b5562c"
      data={BuildingData}
      {...actionsData}
    />
  );
};
