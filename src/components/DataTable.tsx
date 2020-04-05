import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useQuery } from "react-query";
import { Table, notification, Form, Input } from "antd";
import { EditOutlined } from "@ant-design/icons";

import UserContext from "../UserContext";

const { Search } = Input;

const uri = process.env.REACT_APP_API_URL + "/api";

type DataTableProps = {
  entity: string;
  columns: any[];
  filterFn: any;
};

export const DataTable = ({ entity, columns, filterFn }: DataTableProps) => {
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState(10);
  const [total, setTotal] = useState(0);
  const [sort, setSort] = useState(["id", "ASC"]);
  const [filter, setFilter] = useState({});
  const [form] = Form.useForm();
  const [columnsWithActions, setColumnsWithActions] = useState<any[]>([]);
  const manager = useContext(UserContext);

  useEffect(() => {
    if (!columns.length) return;
    const actions = {
      key: "action",
      title: "",
      align: "center",
      render: (_: string, record: any) => (
        <span>
          <Link to={`/${entity}/${record.id}`}>
            <EditOutlined />
          </Link>
        </span>
      ),
    };
    setColumnsWithActions([...columns, actions]);
  }, [entity, columns]);

  const fetchData = async (
    key: string,
    uri: string,
    page: number,
    rows: number,
    sort: string[],
    filter: {}
  ) => {
    const s = JSON.stringify(sort);
    const f = JSON.stringify(filter);
    const user = await manager.getUser();
    if (!user) {
      manager.signinRedirect();
    }
    const { data } = await axios.get(
      `${uri}/${key}?sort=${s}&page=[${page},${rows}]&filter=${f}`,
      {
        headers: {
          Authorization: `Bearer ${user?.access_token}`,
        },
      }
    );
    setTotal(data.count);
    return data.data;
  };

  const { status, data, isFetching } = useQuery<
    any,
    [string, string, number, number, string[], {}]
  >([entity, uri, page, rows, sort, filter], fetchData, {
    retry: 1,
    refetchOnWindowFocus: false,
    onError: (error: any) =>
      notification["error"]({
        message: "Σφάλμα !!!",
        description: error.message,
        duration: 10,
      }),
  });

  const handleTableChange = (pagination: any, _: any, sorting: any) => {
    setPage(pagination.current);
    setRows(pagination.pageSize);
    if (!sorting.columnKey) sorting.columnKey = "id";
    setSort([sorting.columnKey, sorting.order !== "ascend" ? "DESC" : "ASC"]);
  };

  const onSearch = (values: any) => {
    if (values.filter) {
      setFilter(filterFn(values.filter));
    } else {
      setFilter({});
    }
  };

  return (
    <>
      <Form
        form={form}
        name="horizontal_login"
        layout="inline"
        onFinish={onSearch}
      >
        <Form.Item
          name="filter"
          wrapperCol={{ sm: 24 }}
          style={{ width: "100%", marginRight: 0 }}
        >
          <Search
            enterButton
            onSearch={() => form.submit()}
            placeholder="search"
          />
        </Form.Item>
      </Form>
      <Table
        columns={columnsWithActions}
        rowKey={(record) => record.id}
        dataSource={data}
        pagination={{
          defaultCurrent: 1,
          total: total,
          pageSize: rows,
          showSizeChanger: true,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} items`,
        }}
        loading={status === "loading" || isFetching}
        onChange={handleTableChange}
      />
    </>
  );
};
