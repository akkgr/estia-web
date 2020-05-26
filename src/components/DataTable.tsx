import React, { useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { useQuery, queryCache } from "react-query";
import { Table, Form, Input, Space, Button, Popconfirm } from "antd";
import {
  EditOutlined,
  PlusCircleOutlined,
  MinusCircleOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";

import BuildingQueries from "components/admin/buildings/BuildingQueries";

const { Search } = Input;

interface DataTableProps {
  entity: string;
  columns: any[];
  filterFn: any;
}

const DataTable: React.FC<DataTableProps> = ({ entity, columns, filterFn }) => {
  const history = useHistory();
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState(10);
  const [total, setTotal] = useState(0);
  const [sort, setSort] = useState(["id", "ASC"]);
  const [filter, setFilter] = useState({});
  const [form] = Form.useForm();
  const [columnsWithActions, setColumnsWithActions] = useState<any[]>([]);
  const { fetchBuildings, deleteBuildings } = BuildingQueries(entity);

  const memoizedCallback = useCallback(
    async (id: string) => {
      await deleteBuildings(id);
      queryCache.refetchQueries([data, entity, page, rows, sort, filter]);
    },
    [entity, filter, page, rows, sort]
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

  const { status, data, isFetching } = useQuery<
    any,
    [string, number, number, string[], {}]
  >([entity, page, rows, sort, filter], fetchBuildings);

  const handleTableChange = (pagination: any, _: any, sorting: any) => {
    setTotal(data.count);
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

export default DataTable;
