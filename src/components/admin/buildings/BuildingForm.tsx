import React from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "react-query";
import { AddressTitle } from "app/models/Address";
import { ActionsForm } from "app/common/headers/ActionsForm";
import Cards from "app/common/views/Cards";
import BuildingQueries from "components/admin/buildings/BuildingQueries";
import AppartmentList from "components/admin/apartments/ApartmentList";
const entity = "buildings";

const BuildingForm = () => {
  let { id } = useParams();
  const { fetchBuildingData } = BuildingQueries(id);
  const { status, data, isFetching } = useQuery<
    any,
    [string, string | undefined]
  >([entity, id], fetchBuildingData);

  return (
    <React.Fragment>
      <ActionsForm returnUrl="/buildings" showSubmitButton={false}>
        <li className="breadcrumb-item active" aria-current="page">
          <Link to="/buildings" className="text-primary">
            Κτίρια
          </Link>
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
      <AppartmentList buildingId={id} />
    </React.Fragment>
  );
};

export default BuildingForm;
