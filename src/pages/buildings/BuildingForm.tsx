import React, { useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery, useMutation, queryCache } from "react-query";
import axios from "axios";
import { Skeleton, notification, Form } from "antd";

import UserContext from "UserContext";
import AddressForm from "components/AddressForm";
import { AddressTitle } from "app/models/Address";
import { ActionsForm } from "components/ActionsForm";
import Cards from "app/common/views/Cards";
import BuildingQueries from "components/admin/buildings/BuildingQueries";
import AppartmentList from "components/admin/apartments/ApartmentList";
const uri = process.env.REACT_APP_API_URL + "/api";
const entity = "buildings";

const BuildingForm = () => {
  const manager = useContext(UserContext);
  let { id } = useParams();
  const { fetchBuildingData } = BuildingQueries();
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
    const { data } = await axios.put(`${uri}/${entity}/${id}`, input, {
      headers: {
        Authorization: `Bearer ${user?.access_token}`,
      },
    });
    return data;
  };

  const { status, data, isFetching } = useQuery<
    any,
    [string, string | undefined]
  >([entity, id], fetchBuildingData);

  const [mutate] = useMutation(updateData, {
    onSuccess: (data) => queryCache.setQueryData([entity, id], data),
  });

  const updateAddress = (input: any) => {
    const newData = { ...data, address: input };
    mutate(newData);
  };

  return (
    <Skeleton active loading={status === "loading" || isFetching}>
      <Form.Provider
        onFormFinish={(name, { values, forms }) => {
          const { addressForm } = forms;
          console.log(values);
          addressForm.validateFields().then((values) => updateAddress(values));
        }}
      >
        <ActionsForm returnUrl="/buildings">
          <li className="breadcrumb-item active" aria-current="page">
            <Link to="/buildings">Κτίρια</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {data ? AddressTitle(data.address) : ""}
          </li>
        </ActionsForm>
        <div className="row">
          <div className="col-8">
            <AddressForm formName="addressForm" data={data?.address} id={id} />
            <br />
          </div>
          <div className="col-4">
            <Cards
              header={"Διαθέσιμες επιλογές"}
              body={
                <>
                  <div className="row">
                    <div className="col">
                      <Link to={`${id}/info`}>Πληροφορίες</Link>
                    </div>
                    <div className="col">
                      <Link to={`${id}/ratings`}>Ποσοστά</Link>
                    </div>
                    <div className="col">
                      <Link to={`${id}/payments`}>Πληρωμές</Link>
                    </div>
                  </div>
                  <br />
                </>
              }
            />
          </div>
        </div>
      </Form.Provider>
      <AppartmentList data={data}></AppartmentList>
    </Skeleton>
  );
};

// const BuildingFormContainer=()=>{
//   const hook=BuildingQueries();
//   return <BuildingForm {...hook}/>;
// }

export default BuildingForm;
