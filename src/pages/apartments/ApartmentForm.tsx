import React, { useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery, useMutation, queryCache } from "react-query";
import axios from "axios";
import { Form, Input, InputNumber, Skeleton } from "antd";

import UserContext from "UserContext";
import { ActionsForm } from "components/ActionsForm";
import { PersonForm } from "components/PersonForm";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TextArea from "antd/lib/input/TextArea";
import Cards from "app/common/views/Cards";

const uri = process.env.REACT_APP_API_U;
const entity = "apartments";

export const ApartmentForm = () => {
  const manager = useContext(UserContext);
  let { id1, id2 } = useParams();

  const notify = (text: any) =>
    toast.error(
      <div>
        <p>Σφάλμα !</p>
        <p>{text}</p>
      </div>,
      {
        position: "top-right",
        autoClose: 6000,
      }
    );

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
      // notification["error"]({
      //   message: "Σφάλμα !!!",
      //   description:
      //     "Η σύνδεση σας έχει λήξει. Παρακαλώ ξανά συνδεθείτε για να συνεχίσετε.",
      //   duration: 10,
      // });
      notify(
        "Η σύνδεση σας έχει λήξει. Παρακαλώ ξανά συνδεθείτε για να συνεχίσετε."
      );
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
  >([entity, id2], fetchData);

  const [mutate] = useMutation(updateData, {
    onSuccess: (data) => queryCache.setQueryData([entity, id2], data),
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
        <ToastContainer />
        <ActionsForm returnUrl={`/buildings/${id1}`}>
          <li className="breadcrumb-item " aria-current="page">
            {" "}
            <Link to="/buildings">Κτίρια</Link>
          </li>
          <li className="breadcrumb-item " aria-current="page">
            {" "}
            <Link to={`/buildings/${id1}`}>{`${data?.buildingTitle}`}</Link>
          </li>
          <li className="breadcrumb-item " aria-current="page">
            {" "}
            {`${data?.title}`}
          </li>
        </ActionsForm>
        <div className="row slideanim">
          <div className="col-lg">
            <Cards
              header={"Γενικές πληροφορίες"}
              body={
                <Form
                  name="appartmentForm"
                  layout={"horizontal"}
                  initialValues={data}
                >
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

        {/* <div className="row">
          <div className="col-sm">
            <div className="card border-primary shadow h-100 py-2">
              <div className="card-body">
                <div className="row align-items-center">
                  <div className="col mr-2">
                    <div className="text-xs font-weight-bold text-primary mb-1">
                      Κοινόχρηστα
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <div className="text-xs">Χιλιοστά:</div>
                    <form className="user">
                      <input
                        type="text"
                        className="form-control form-control-user"
                        id="exampleRepeatPassword"
                        placeholder="Χιλιοστά..."
                      ></input>
                    </form>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <div className="text-xs ">Ποσοστά:</div>
                    <form className="user">
                      <input
                        type="text"
                        className="form-control form-control-user"
                        id="exampleRepeatPassword"
                        placeholder="Ποσοστά.."
                      ></input>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </Form.Provider>
    </Skeleton>
  );
};
