import React, { useState, useEffect, useContext, useCallback } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useQuery, queryCache } from "react-query";
import {
  Table,
  notification,
  Form,
  Input,
  Space,
  Button,
  Popconfirm,
} from "antd";
import {
  EditOutlined,
  PlusCircleOutlined,
  MinusCircleOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";

import UserContext from "../UserContext";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const { Search } = Input;

const uri = process.env.REACT_APP_API_URL + "/api";

type DataTableProps = {
  entity: string;
  columns: any[];
  filterFn: any;
};

export const DataTable = ({ entity, columns, filterFn }: DataTableProps) => {
  const history = useHistory();
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState(10);
  const [total, setTotal] = useState(0);
  const [sort, setSort] = useState(["id", "ASC"]);
  const [filter, setFilter] = useState({});
  const [form] = Form.useForm();
  const [columnsWithActions, setColumnsWithActions] = useState<any[]>([]);
  const manager = useContext(UserContext);

  const notify = (text: any) =>
    toast.error(
    <div>
      <p>Σφάλμα !</p>
      <p>{text}</p>
    </div>, {
    position: "top-right",
    autoClose: 6000
  });

  const memoizedCallback = useCallback(
    async (id: string) => {
      try {
        const user = await manager.getUser();
        await axios.delete(`${uri}/${entity}/${id}`, {
          headers: {
            Authorization: `Bearer ${user?.access_token}`,
          },
        });
        queryCache.refetchQueries([entity, page, rows, sort, filter]);
      } catch (error) {
        // notification["error"]({
        //   message: "Σφάλμα !!!",
        //   description: error.message,
        //   duration: 10,
        // });
        notify(error.message)
      }
    },
    [entity, filter, manager, page, rows, sort]
  );

  useEffect(() => {
    if (!columns.length) return;
    const actions = {
      key: "action",
      title: (
        <Button
          type="link"
          icon={<PlusCircleOutlined style={{ color: "green" }} />}
          onClick={() => history.push(`/${entity}/new`)}
        />
      ),
      align: "center",
      render: (_: string, record: any) => (
        <Space>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => history.push(`/${entity}/${record.id}`)}
          />
          <Popconfirm
            title="Are you sure delete this record?"
            onConfirm={() => {
              memoizedCallback(record.id);
            }}
            okText="Yes"
            cancelText="No"
            icon={<QuestionCircleOutlined style={{ color: "red" }} />}
          >
            <MinusCircleOutlined style={{ color: "red" }} className="command" />
          </Popconfirm>
        </Space>
      ),
    };
    setColumnsWithActions([...columns, actions]);
  }, [entity, columns, history, memoizedCallback]);

  const fetchData = async (
    key: string,
    page: number,
    rows: number,
    sort: string[],
    filter: {}
  ) => {
    const s = JSON.stringify(sort);
    const f = JSON.stringify(filter);
    const user = await manager.getUser();
    if (!user || user?.expired) {
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
    console.log("data.data:" + JSON.stringify(data.data));
    setTotal(data.count);
    return data.data;
  };

  const { status, data, isFetching } = useQuery<
    any,
    [string, number, number, string[], {}]
  >([entity, page, rows, sort, filter], fetchData);

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
      <ToastContainer/>
      <Table
        size="small"
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
