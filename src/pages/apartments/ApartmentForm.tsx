import React, { useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery, useMutation, queryCache } from "react-query";
import axios from "axios";
import {
  Form,
  Input,
  notification,
  InputNumber,
  Skeleton,
} from "antd";

import UserContext from "../../UserContext";
import { ActionsForm } from "../../components/ActionsForm";
import { PersonTitleWithMobile } from "../../models/Person";
import { PersonForm } from "../../components/PersonForm";

const uri = process.env.REACT_APP_API_URL + "/api";
const entity = "apartments";

export const ApartmentForm = () => {
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
        <ActionsForm returnUrl={`/buildings/${id1}`}>
            <li className="breadcrumb-item " aria-current="page"> <Link to="/buildings">Κτίρια</Link></li>
            <li className="breadcrumb-item " aria-current="page"> <Link to={`/buildings/${id1}`}>{`${data?.buildingTitle}`}</Link></li>
            <li className="breadcrumb-item " aria-current="page"> {`${data?.title}`}</li>
        </ActionsForm>
        <div className="row slideanim">
        <div className="col-lg">
          <div className="card shadow mb-4">
            <div className="card-header py-3" style={{backgroundColor: '#3aafa9'}}>
              <h6 className="m-0 font-weight-bold " style={{color: '#17252a'}}>Γενικές πληροφορίες</h6>
            </div>
            <div className="card-body" style={{backgroundColor: '#def2f1'}}>
            {/* <div className="row "> */}
            <Form name="appartmentForm" layout={"horizontal"} initialValues={data}>
              <div className="col-lg-6">
                <Form.Item
                label="Α/Α"
                name="position"
                rules={[{ required: true }]}
              >
                <InputNumber />
              </Form.Item>
                  </div> 
                  <div className="col-lg-6">
                  <Form.Item
                label="Διαμέρισμα"
                name="title"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
               </div>
              </Form>
                {/* </div> */}
                

              </div>
            </div>
          

        </div>
        </div>
        <div className="row slideanim">

        <div className="col-lg-6">
          <div className="card shadow mb-4">
            <div className="card-header py-3" style={{backgroundColor: '#3aafa9'}}>
              <h6 className="m-0 font-weight-bold " style={{color: '#17252a'}}>Ιδιοκτήτης</h6>
            </div>
            <div className="card-body" style={{backgroundColor: '#def2f1'}}>
            <PersonForm formName="ownerForm" data={data?.owner} />
            </div>
          </div>

        </div>

        <div className="col-lg-6">
          <div className="card shadow mb-4" >
          <div className="card-header py-3" style={{backgroundColor: '#3aafa9'}}>
              <h6 className="m-0 font-weight-bold " style={{color: '#17252a'}}>Ένοικος</h6>
            </div>
            <div className="card-body" style={{backgroundColor: '#def2f1'}}>
            <PersonForm formName="residentForm" data={data?.resident} />
            </div>
          </div>
        </div>
        </div>
        <div className="row">
            <div className="col-sm">
              <div className="card border-primary shadow h-100 py-2">
                <div className="card-body">
                  <div className="row align-items-center">
                    <div className="col mr-2">
                      <div className="text-xs font-weight-bold text-primary mb-1">Κοινόχρηστα</div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <div className="text-xs">Χιλιοστά:</div>
                      <form className="user">                 
                       <input type="text" className="form-control form-control-user" id="exampleRepeatPassword" placeholder="Χιλιοστά..."></input>
                        </form>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <div className="text-xs ">Ποσοστά:</div>
                      <form className="user">                 
                       <input type="text" className="form-control form-control-user" id="exampleRepeatPassword" placeholder="Ποσοστά.."></input>
                        </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm">
              <div className="card border-primary shadow h-100 py-2">
                <div className="card-body">
                  <div className="row align-items-center">
                    <div className="col mr-2">
                      <div className="text-xs font-weight-bold text-primary mb-1">Ασανσέρ</div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <div className="text-xs">Χιλιοστά:</div>
                      <form className="user">                 
                       <input type="text" className="form-control form-control-user" id="exampleRepeatPassword" placeholder="Χιλιοστά..."></input>
                        </form>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <div className="text-xs ">Ποσοστά:</div>
                      <form className="user">                 
                       <input type="text" className="form-control form-control-user" id="exampleRepeatPassword" placeholder="Ποσοστά.."></input>
                        </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm">
              <div className="card border-primary shadow h-100 py-2">
                <div className="card-body">
                  <div className="row align-items-center">
                    <div className="col mr-2">
                      <div className="text-xs font-weight-bold text-primary mb-1">Ιδιοκτήτες</div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <div className="text-xs">Χιλιοστά:</div>
                      <form className="user">                 
                       <input type="text" className="form-control form-control-user" id="exampleRepeatPassword" placeholder="Χιλιοστά..."></input>
                        </form>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <div className="text-xs ">Ποσοστά:</div>
                      <form className="user">                 
                       <input type="text" className="form-control form-control-user" id="exampleRepeatPassword" placeholder="Ποσοστά.."></input>
                        </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </div>
            <br />
            <div className="row">
            <div className="col-sm">
              <div className="card border-primary shadow h-100 py-2">
                <div className="card-body">
                  <div className="row align-items-center">
                    <div className="col mr-2">
                      <div className="text-xs font-weight-bold text-primary mb-1">Boiler</div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <div className="text-xs">Χιλιοστά:</div>
                      <form className="user">                 
                       <input type="text" className="form-control form-control-user" id="exampleRepeatPassword" placeholder="Χιλιοστά..."></input>
                        </form>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <div className="text-xs ">Ποσοστά:</div>
                      <form className="user">                 
                       <input type="text" className="form-control form-control-user" id="exampleRepeatPassword" placeholder="Ποσοστά.."></input>
                        </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm">
              <div className="card border-primary shadow h-100 py-2">
                <div className="card-body">
                  <div className="row align-items-center">
                    <div className="col mr-2">
                      <div className="text-xs font-weight-bold text-primary mb-1">Θέρμανση</div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <div className="text-xs">Χιλιοστά:</div>
                      <form className="user">                 
                       <input type="text" className="form-control form-control-user" id="exampleRepeatPassword" placeholder="Χιλιοστά..."></input>
                        </form>
                    </div>
                    <div className="col">
                      <div className="text-xs ">Ποσοστά:</div>
                      <form className="user">                 
                       <input type="text" className="form-control form-control-user" id="exampleRepeatPassword" placeholder="Ποσοστά.."></input>
                        </form>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <div className="text-xs">E1:</div>
                      <form className="user">                 
                       <input type="text" className="form-control form-control-user" id="exampleRepeatPassword" placeholder="E1..."></input>
                        </form>
                    </div>
                    <div className="col">
                      <div className="text-xs ">F1:</div>
                      <form className="user">                 
                       <input type="text" className="form-control form-control-user" id="exampleRepeatPassword" placeholder="F1.."></input>
                        </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm">
              <div className="card border-primary shadow h-100 py-2">
                <div className="card-body">
                  <div className="row align-items-center">
                    <div className="col mr-2">
                      <div className="text-xs font-weight-bold text-primary mb-1">Άλλα έξοδα</div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <div className="text-xs">Χιλιοστά:</div>
                      <form className="user">                 
                       <input type="text" className="form-control form-control-user" id="exampleRepeatPassword" placeholder="Χιλιοστά..."></input>
                        </form>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <div className="text-xs ">Ποσοστά:</div>
                      <form className="user">                 
                       <input type="text" className="form-control form-control-user" id="exampleRepeatPassword" placeholder="Ποσοστά.."></input>
                        </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </Form.Provider>
    </Skeleton>
  );
};
