import React, { useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery, useMutation, queryCache } from "react-query";
import axios from "axios";
import { notification } from "antd";

import UserContext from "UserContext";
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
  const { fetchBuildingData } = BuildingQueries(id);
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
    <React.Fragment>
      <ActionsForm returnUrl="/buildings" showSubmitButton={false}>
        <li className="breadcrumb-item active" aria-current="page">
          <Link to="/buildings">Κτίρια</Link>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          {data ? AddressTitle(data.address) : ""}
        </li>
      </ActionsForm>
      <div className="row">
        <div className="col">
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
      <AppartmentList data={data}></AppartmentList>
    </React.Fragment>
  );
};

// const BuildingFormContainer=()=>{
//   const hook=BuildingQueries();
//   return <BuildingForm {...hook}/>;
// }

export default BuildingForm;
