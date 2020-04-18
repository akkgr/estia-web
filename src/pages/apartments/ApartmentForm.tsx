import React, { useContext } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { useQuery, useMutation, queryCache } from "react-query";
import axios from "axios";
import {
  Form,
  Input,
  Button,
  Space,
  Breadcrumb,
  notification,
  Row,
  Col,
  InputNumber,
  Skeleton,
} from "antd";

import UserContext from "../../UserContext";
import { PersonForm } from "../../components/PersonForm";

const uri = process.env.REACT_APP_API_URL + "/api";
const entity = "apartments";

const formLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { span: 24 },
};

export const ApartmentForm = () => {
  const [form] = Form.useForm();
  const history = useHistory();
  const manager = useContext(UserContext);
  let { id1, id2 } = useParams();

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
    const { data } = await axios.put(`${uri}/${entity}/${id2}`, input, {
      headers: {
        Authorization: `Bearer ${user?.access_token}`,
      },
    });
    return data;
  };

  const { status, data, isFetching } = useQuery<
    any,
    [string, string | undefined]
  >([entity, id2], fetchData, {
    retry: false,
    refetchOnWindowFocus: false,
    onError: (error: any) =>
      notification["error"]({
        message: "Σφάλμα !!!",
        description: error.message,
        duration: 10,
      }),
  });

  const [mutate] = useMutation(updateData, {
    onSuccess: (data) => queryCache.setQueryData([entity, id2], data),
    onError: (error: any) =>
      notification["error"]({
        message: "Σφάλμα !!!",
        description: error.message,
        duration: 10,
      }),
  });

  const update = (input: any) => {
    const newData = { ...data, ...input };
    mutate(newData);
  };

  const onReset = () => {
    history.push(`/buildings/${id1}`);
  };

  const onFinish = (values: any) => {
    update(values);
  };

  return (
    <Skeleton active loading={status === "loading" || isFetching}>
      <Space direction="vertical" style={{ width: "100%" }}>
        <Breadcrumb className="breadcrumb">
          <Breadcrumb.Item>
            <Link to="/buildings">Κτίρια</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to={`/buildings/${id1}`}>{`${data?.buildingTitle}`}</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>{`${data?.title}`}</Breadcrumb.Item>
        </Breadcrumb>
        <Form
          form={form}
          layout={"horizontal"}
          {...formLayout}
          onFinish={onFinish}
          initialValues={data}
        >
          <Form.Item
            label="Διαμέρισμα"
            name="title"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Α/Α" name="position" rules={[{ required: true }]}>
            <InputNumber />
          </Form.Item>
          <Row>
            <Col span={12}>Ιδιοκτήτης</Col>
            <Col span={12}>Ένοικος</Col>
          </Row>
          <Row>
            <Col span={12}>
              <PersonForm entity="owner" />
            </Col>
            <Col span={12}>
              <PersonForm entity="resident" />
            </Col>
          </Row>
          <Form.Item {...tailLayout} style={{ float: "right" }}>
            <Space>
              <Button type="primary" htmlType="submit">
                Update
              </Button>
              <Button htmlType="button" onClick={onReset}>
                Cancel
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Space>
    </Skeleton>
  );
};
