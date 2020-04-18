import React from "react";
import { DataTable } from "./DataTable";

const columns = [
  {
    key: "position",
    title: "A/A",
    dataIndex: "position",
    sorter: (a: any, b: any) => a.position - b.position,
  },
  {
    key: "title",
    title: "Διαμέρισμα",
    dataIndex: "title",
    sorter: (a: any, b: any) => ("" + a.title).localeCompare(b.title),
  },
  {
    key: "owner",
    title: "Ιδιοκτήτης",
    sorter: (a: any, b: any) =>
      `${a.owner?.lastname || ""} ${a.owner?.firstname || ""}`.localeCompare(
        `${b.owner?.lastName || ""} ${b.owner?.firstName || ""}`
      ),
    render: (record: any) =>
      `${record.owner?.lastName || ""} ${record.owner?.firstName || ""}`,
  },
  {
    key: "resident",
    title: "Ένοικος",
    sorter: (a: any, b: any) =>
      `${a.resident?.lastname || ""} ${
        a.resident?.firstname || ""
      }`.localeCompare(
        `${b.resident?.lastName || ""} ${b.resident?.firstName || ""}`
      ),
    render: (record: any) =>
      `${record.resident?.lastName || ""} ${record.resident?.firstName || ""}`,
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

export const AppartmentList = (props: any) => {
  return (
    <DataTable
      entity={`buildings/${props.data.id}/apartments`}
      columns={columns}
      filterFn={filterFn}
    />
  );
};
