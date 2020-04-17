import React, { useContext } from "react";
import { useHistory, Link, useParams } from "react-router-dom";
import { useMutation, queryCache, useQuery } from "react-query";
import axios from "axios";
import { Form, Input, Button, Space, Breadcrumb, notification } from "antd";
import UserContext from "../../UserContext";

const formLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const uri = process.env.REACT_APP_API_URL + "/api";
const entity = "buildings";

export const NewApartment = () => {
  const [form] = Form.useForm();
  const history = useHistory();
  const manager = useContext(UserContext);
  let { id } = useParams();

  const onReset = () => {
    history.push(`/buildings/${id}`);
  };

  const onFinish = (values: any) => {
    updateAddress(values);
  };

  const fetchData = async (key: string, id: string | undefined) => {
    const user = await manager.getUser();
    if (!user || user?.expired) {
      manager.signinRedirect();
    }
    const { data } = await axios.get(`${uri}/${key}/${id}`, {
      headers: {
        Authorization: `Bearer ${user?.access_token}`,
      },
    });
    return data;
  };

  const { status, data, isFetching } = useQuery<
    any,
    [string, string | undefined]
  >([entity, id], fetchData, {
    retry: false,
    refetchOnWindowFocus: false,
    onError: (error: any) =>
      notification["error"]({
        message: "Σφάλμα !!!",
        description: error.message,
        duration: 10,
      }),
  });

  const updateData = async (input: any) => {
    const user = await manager.getUser();
    if (!user || user?.expired) {
      notification["error"]({
        message: "Σφάλμα !!!",
        description:
          "Η σύνδεση σας έχει λήξει. Παρακαλώ ξανά συνδεθείτε για να συνεχίσετε.",
        duration: 10,
      });
    }
    const { data } = await axios.post(`${uri}/${entity}`, input, {
      headers: {
        Authorization: `Bearer ${user?.access_token}`,
      },
    });
    return data;
  };

  const [mutate] = useMutation(updateData, {
    onSuccess: (data) => {
      queryCache.setQueryData([entity, data.id], data);
      history.push(`/buildings/${data.id}`);
    },
    onError: (error: any) =>
      notification["error"]({
        message: "Σφάλμα !!!",
        description: error.message,
        duration: 10,
      }),
  });

  const updateAddress = (input: any) => {
    mutate(input);
  };

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <Breadcrumb className="breadcrumb">
        <Breadcrumb.Item>
          <Link to="/buildings">Κτίρια</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link
            to={`/buildings/${id}`}
          >{`${data?.address?.street} ${data?.address?.streetnumber}`}</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Νέο Διαμέρισμα</Breadcrumb.Item>
      </Breadcrumb>
      <Form
        form={form}
        layout={"horizontal"}
        {...formLayout}
        onFinish={onFinish}
      >
        <Form.Item label="Οδός" name="street" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="Αριθός"
          name="streetnumber"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Περιοχή" name="area" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Τ.Κ." name="postalCode" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Space>
            <Button type="primary" htmlType="submit">
              Add
            </Button>
            <Button htmlType="button" onClick={onReset}>
              Cancel
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Space>
  );
};
