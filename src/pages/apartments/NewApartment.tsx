import React, { useContext } from "react";
import { useHistory, Link, useParams } from "react-router-dom";
import { useMutation, queryCache, useQuery } from "react-query";
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
import { AddressTitle } from "../../models/Address";
import { ActionsForm } from "../../components/ActionsForm";

const uri = process.env.REACT_APP_API_URL + "/api";
const parentEntity = "buildings";
const entity = "apartments";

export const NewApartment = () => {
  const [form] = Form.useForm();
  const history = useHistory();
  const manager = useContext(UserContext);
  let { id } = useParams();

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
              ...appartment,
              owner: owner,
              resident: resident,
            });
          } catch {}
        }}
      >
        <ActionsForm returnUrl={`/buildings/${id}`}>
          <Breadcrumb.Item>
            <Link to="/buildings">Κτίρια</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to={`/buildings/${id}`}>
              {data ? AddressTitle(data.address) : ""}
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Νέο Διαμέρισμα</Breadcrumb.Item>
        </ActionsForm>

        <Form form={form} name="appartmentForm" layout={"vertical"}>
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
