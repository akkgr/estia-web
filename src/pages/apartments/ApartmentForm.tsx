import React, { useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery, useMutation, queryCache } from "react-query";
import axios from "axios";
import {
  Form,
  Input,
  Breadcrumb,
  notification,
  Row,
  Col,
  InputNumber,
  Skeleton,
  Card,
} from "antd";

import UserContext from "../../UserContext";
import { PersonForm } from "../../components/PersonForm";
import { ActionsForm } from "../../components/ActionsForm";

const uri = process.env.REACT_APP_API_URL + "/api";
const entity = "apartments";

export const ApartmentForm = () => {
  const [form] = Form.useForm();
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
    mutate(input);
  };

  return (
    <Skeleton active loading={status === "loading" || isFetching}>
      <Form.Provider
        onFormFinish={async (name, { values, forms }) => {
          const { appartmentForm, ownerForm, residentForm } = forms;
          try {
            await ownerForm.validateFields();
            await residentForm.validateFields();
            const owner = ownerForm.getFieldsValue();
            const resident = residentForm.getFieldsValue();
            const appartment = appartmentForm.getFieldsValue();
            update({
              ...data,
              ...appartment,
              owner: owner,
              resident: resident,
            });
          } catch {}
        }}
      >
        <ActionsForm returnUrl={`/buildings/${id1}`}>
          <Breadcrumb.Item>
            <Link to="/buildings">Κτίρια</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to={`/buildings/${id1}`}>{`${data?.buildingTitle}`}</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>{`${data?.title}`}</Breadcrumb.Item>
        </ActionsForm>

        <Form
          form={form}
          name="appartmentForm"
          layout={"vertical"}
          initialValues={data}
        >
          <Row gutter={[8, 0]}>
            <Col span={6}>
              <Form.Item
                label="Α/Α"
                name="position"
                rules={[{ required: true }]}
              >
                <InputNumber />
              </Form.Item>
            </Col>
            <Col span={18}>
              <Form.Item
                label="Διαμέρισμα"
                name="title"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </Form>

        <Row>
          <Col span={12}>
            <Card title="Ιδιοκτήτης" bordered={false}>
              <PersonForm formName="ownerForm" data={data?.owner} />
            </Card>
          </Col>
          <Col span={12}>
            <Card title="Ένοικος" bordered={false}>
              <PersonForm formName="residentForm" data={data?.resident} />
            </Card>
          </Col>
        </Row>
      </Form.Provider>
    </Skeleton>
  );
};
