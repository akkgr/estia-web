import React from "react";
import { Table } from "antd";
import { Link } from "react-router-dom";
import { EditOutlined } from "@ant-design/icons";
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
    dataIndex: ["owner"],
    sorter: (a: any, b: any) =>
      `${a.owner?.lastname || ""} ${a.owner?.firstname || ""}`.localeCompare(
        `${b.owner?.lastname || ""} ${b.owner?.firstname || ""}`
      ),
    render: (record: any) =>
      `${record.owner?.lastname || ""} ${record.owner?.firstname || ""}`,
  },
  {
    key: "resident",
    title: "Ένοικος",
    dataIndex: "resident",
    sorter: (a: any, b: any) =>
      `${a.resident?.lastname || ""} ${
        a.resident?.firstname || ""
      }`.localeCompare(
        `${b.resident?.lastname || ""} ${b.resident?.firstname || ""}`
      ),
    render: (record: any) =>
      `${record.resident?.lastname || ""} ${record.resident?.firstname || ""}`,
  },
];

const actions = {
  key: "action",
  title: "",
  align: "center",
  render: (_: string, record: any) => (
    <span>
      <Link to={`/buildings/id/${record.id}`}>
        <EditOutlined />
      </Link>
    </span>
  ),
};

let tmp: any[];
tmp = [...columns, actions];

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
    // <Table
    //   columns={tmp}
    //   rowKey="position"
    //   dataSource={props.data}
    //   pagination={{ pageSize: 5 }}
    // />
  );
};
