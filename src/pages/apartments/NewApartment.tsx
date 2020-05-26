import React, { useContext } from "react";
import { useHistory, Link, useParams } from "react-router-dom";
import { useMutation, queryCache, useQuery } from "react-query";
import axios from "axios";
import { Form, Input, InputNumber, Skeleton } from "antd";
import UserContext from "UserContext";
import { PersonForm } from "components/PersonForm";
import { AddressTitle } from "app/models/Address";
import { ActionsForm } from "components/ActionsForm";
import Cards from "app/common/views/Cards";
import TextArea from "antd/lib/input/TextArea";

const uri = process.env.REACT_APP_API_URL + "/api";
const parentEntity = "buildings";
const entity = "apartments";

const NewApartment = () => {
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
  >([parentEntity, id], fetchData);

  const updateData = async (input: any) => {
    const user = await manager.getUser();
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
          <li className="breadcrumb-item " aria-current="page">
            <Link to="/buildings">Κτίρια</Link>
          </li>
          <li className="breadcrumb-item " aria-current="page">
            <Link to={`/buildings/${id}`}>
              {data ? AddressTitle(data.address) : ""}
            </Link>
          </li>
          <li className="breadcrumb-item " aria-current="page">
            Νέο Διαμέρισμα
          </li>
        </ActionsForm>
        <div className="row slideanim">
          <div className="col-lg">
            <Cards
              header={"Γενικές πληροφορίες"}
              body={
                <Form form={form} name="appartmentForm" layout={"horizontal"}>
                  <div className="row">
                    <div className="col">
                      <div className="row">
                        <div className="col">
                          <Form.Item
                            label="Α/Α"
                            name="position"
                            rules={[{ required: true }]}
                          >
                            <InputNumber />
                          </Form.Item>
                        </div>
                        <div className="col">
                          <Form.Item
                            label="Διαμέρισμα"
                            name="title"
                            rules={[{ required: true }]}
                          >
                            <Input />
                          </Form.Item>
                        </div>
                      </div>
                    </div>

                    <div className="col">
                      <Form.Item
                        label="Kλειστό"
                        name="title"
                        rules={[{ required: true }]}
                      >
                        <Input />
                      </Form.Item>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <Form.Item
                        label="Τρόπος επικοινωνίας"
                        name="position"
                        rules={[{ required: true }]}
                      >
                        <Input />
                      </Form.Item>
                    </div>
                    <div className="col">
                      <Form.Item
                        label="Υπεύθυνος"
                        name="title"
                        rules={[{ required: true }]}
                      >
                        <Input />
                      </Form.Item>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <Form.Item
                        label="Σχόλια"
                        name="position"
                        rules={[{ required: true }]}
                      >
                        <TextArea />
                      </Form.Item>
                    </div>
                  </div>
                </Form>
              }
            />
          </div>
        </div>

        <div className="row slideanim">
          <div className="col-lg-6">
            <Cards
              header={"Ιδιοκτήτης"}
              body={<PersonForm formName="ownerForm" data={data?.owner} />}
            />
          </div>

          <div className="col-lg-6">
            <Cards
              header={"Ένοικος"}
              body={
                <PersonForm formName="residentForm" data={data?.resident} />
              }
            />
          </div>
        </div>
      </Form.Provider>
    </Skeleton>
  );
};

export default NewApartment;
