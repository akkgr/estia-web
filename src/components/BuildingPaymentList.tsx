import React from "react";
import DataTable from "./DataTable";
import SelectInputSearch from "app/common/form/SelectInputSearch";

const Year = [
  {
    value: '2020',
    label: '2020',
  },
  {
    value: '2019',
    label: '2019',
  },
  { value: '2018',
    label: '2018', },
];

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
    key: "title",
    title: "01",
  },
  {
    key: "title",
    title: "02",
  },
  {
    key: "title",
    title: "03",
  },
  {
    key: "title",
    title: "04",
  },
  {
    key: "title",
    title: "05",
  },
  {
    key: "title",
    title: "06",
  },
  {
    key: "title",
    title: "07",
  },
  {
    key: "title",
    title: "08",
  },
  {
    key: "title",
    title: "09",
  },
  {
    key: "title",
    title: "10",
  },
  {
    key: "title",
    title: "11",
  },
  {
    key: "title",
    title: "12",
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

export const BuildingPaymentList = (props: any) => {
  return (
    <div>
      <SelectInputSearch
        label="Επιλογή έτους:"
        className="custom-select"
        options={Year}
      />
      <br />
      <DataTable
        entity={`buildings/${props.data.id}/apartments`}
        columns={columns}
        filterFn={filterFn}
      />
    </div>
  );
};
