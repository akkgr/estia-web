import React, { useContext } from "react";
import { useHistory, Link, useParams } from "react-router-dom";
import { useMutation, queryCache, useQuery } from "react-query";
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
} from "antd";
import UserContext from "../../UserContext";
import { PersonForm } from "../../components/PersonForm";

const formLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { span: 24 },
};

const uri = process.env.REACT_APP_API_URL + "/api";
const parentEntity = "buildings";
const entity = "apartments";

export const NewApartment = () => {
  const [form] = Form.useForm();
  const history = useHistory();
  const manager = useContext(UserContext);
  let { id } = useParams();

  const onReset = () => {
    history.push(`/buildings/${id}`);
  };

  const onFinish = (values: any) => {
    update(values);
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
  >([parentEntity, id], fetchData, {
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
      queryCache.setQueryData([parentEntity, data.id], data);
      history.push(`/buildings/${data.buildingId}/apartments/${data.id}`);
    },
    onError: (error: any) =>
      notification["error"]({
        message: "Σφάλμα !!!",
        description: error.message,
        duration: 10,
      }),
  });

  const update = (input: any) => {
    input.buildingId = id;
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
        <Form.Item label="Διαμέρισμα" name="title" rules={[{ required: true }]}>
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
