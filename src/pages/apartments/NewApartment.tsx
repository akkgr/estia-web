import React, { useContext } from "react";
import { useHistory, Link, useParams } from "react-router-dom";
import { useMutation, queryCache, useQuery } from "react-query";
import axios from "axios";
import { Form, Input, notification, InputNumber, Skeleton } from "antd";
import UserContext from "UserContext";
import { PersonForm } from "components/PersonForm";
import { AddressTitle } from "app/models/Address";
import { ActionsForm } from "components/ActionsForm";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
  >([parentEntity, id], fetchData);

  const notify = (text: any) =>
    toast.error(
    <div>
      <p>Σφάλμα !</p>
      <p>{text}</p>
    </div>, {
    position: "top-right",
    autoClose: 6000
  });

  const updateData = async (input: any) => {
    const user = await manager.getUser();
    if (!user || user?.expired) {
      // notification["error"]({
      //   message: "Σφάλμα !!!",
      //   description:
      //     "Η σύνδεση σας έχει λήξει. Παρακαλώ ξανά συνδεθείτε για να συνεχίσετε.",
      //   duration: 10,
      // });
      notify("Η σύνδεση σας έχει λήξει. Παρακαλώ ξανά συνδεθείτε για να συνεχίσετε.")
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
        <ToastContainer/>
        <div className="row slideanim">
          <div className="col-lg">
            <div className="card shadow mb-4">
              <div
                className="card-header py-3"
                style={{ backgroundColor: "#3aafa9" }}
              >
                <h6
                  className="m-0 font-weight-bold "
                  style={{ color: "#17252a" }}
                >
                  Γενικές πληροφορίες
                </h6>
              </div>
              <div className="card-body" style={{ backgroundColor: "#def2f1" }}>
                <Form form={form} name="appartmentForm" layout={"horizontal"}>
                  <div className="row ">
                    <div className="col-2">
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
                </Form>
              </div>
            </div>
          </div>
        </div>
        <div className="row slideanim">
          <div className="col-lg-6">
            <div className="card shadow mb-4">
              <div
                className="card-header py-3"
                style={{ backgroundColor: "#3aafa9" }}
              >
                <h6
                  className="m-0 font-weight-bold "
                  style={{ color: "#17252a" }}
                >
                  Ιδιοκτήτης
                </h6>
              </div>
              <div className="card-body" style={{ backgroundColor: "#def2f1" }}>
                <PersonForm formName="ownerForm" data={data?.owner} />
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="card shadow mb-4">
              <div
                className="card-header py-3"
                style={{ backgroundColor: "#3aafa9" }}
              >
                <h6
                  className="m-0 font-weight-bold "
                  style={{ color: "#17252a" }}
                >
                  Ένοικος
                </h6>
              </div>
              <div className="card-body" style={{ backgroundColor: "#def2f1" }}>
                <PersonForm formName="residentForm" data={data?.resident} />
              </div>
            </div>
          </div>
        </div>
      </Form.Provider>
    </Skeleton>
  );
};
