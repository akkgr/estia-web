import React from "react";
import { DataTable } from "../components/DataTable";

const entity = "buildings";

const columns = [
  {
    key: "address.street",
    title: "Οδός",
    dataIndex: ["address", "street"],
    sorter: true,
  },
  {
    key: "address.streetnumber",
    title: "Αριθμός",
    dataIndex: ["address", "streetnumber"],
    sorter: true,
  },
  {
    key: "address.area",
    title: "Περιοχή",
    dataIndex: ["address", "area"],
    sorter: true,
  },
];

const filterFn = (value: any) => {
  return {
    $or: [
      { "address.street": { $regex: `${value}`, $options: "i" } },
      {
        "address.streetnumber": {
          $regex: `${value}`,
          $options: "i",
        },
      },
      { "address.area": { $regex: `${value}`, $options: "i" } },
    ],
  };
};

export const BuildingList = () => {
  return <DataTable entity={entity} columns={columns} filterFn={filterFn} />;
};
