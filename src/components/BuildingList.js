import React, { useState } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { Table, Alert, notification } from "antd";

const openNotification = err => {
  notification["error"]({
    message: "Σφάλμα !!!",
    description: err.message,
    duration: 10
  });
};

const columns = [
  {
    title: "Οδός",
    dataIndex: ["address", "street"],
    sorter: true
  },
  {
    title: "Αριθμός",
    dataIndex: ["address", "streetnumber"],
    sorter: true
  },
  {
    title: "Περιοχή",
    dataIndex: ["address", "area"],
    sorter: true
  }
];

export const BuildingList = props => {
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState(5);
  const [total, setTotal] = useState(0);

  const fetchBuildings = async (key, page = 0, rows = 10) => {
    const { data } = await axios.get(
      `http://localhost:5000/api/buildings?sort=["id","ASC"]&page=[${page},${rows}]&filter={}`
    );
    setTotal(data.count);
    return data.data;
  };

  const { status, data, error, isFetching } = useQuery(
    ["buildings", page, rows],
    fetchBuildings,
    {
      retry: 1,
      refetchOnWindowFocus: false,
      onError: err => openNotification(err)
    }
  );

  const handleTableChange = (pagination, filters, sorter) => {
    setPage(pagination.current);
    setRows(pagination.pageSize);
    console.log(filters);
    console.log(sorter);
  };

  return (
    <>
      <h1>Κτίρια</h1>

      <Table
        columns={columns}
        rowKey={record => record.id}
        dataSource={data}
        pagination={{ defaultCurrent: 1, total: total, pageSize: rows }}
        loading={status === "loading" || isFetching}
        onChange={handleTableChange}
      />
    </>
  );
};
