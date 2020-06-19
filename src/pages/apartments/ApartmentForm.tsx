import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery, useMutation, queryCache } from "react-query";
import { useHistory } from "react-router-dom";
import { ActionsForm } from "components/ActionsForm";
import { PersonForm } from "components/admin/apartments/apartmentForm/PersonForm";
import TextInput from "app/common/form/TextInput";
import Cards from "app/common/views/Cards";
import ApartmentsQueries from "components/admin/apartments/ApartmentsQueries";

const ApartmentForm = () => {
  let { id1, id2 } = useParams();
  let { id } = useParams();
  const history = useHistory();
  const { saveApartment, data, entity } = ApartmentsQueries(
    !id ? id2 : id,
    !id ? "apartments" : "buildings"
  );
  // const [mutate] = useMutation(saveApartment, {
  //   onSuccess: (data) => queryCache.setQueryData([entity, id2], data),
  // });

  // const update = (input: any) => {
  //   mutate(input);
  // };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      position: { value: number };
      title: { value: string };
      common: { value: string };
      owners: { value: string };
      lift: { value: string };
      heat: { value: string };
      ownerLastName: { value: string };
      ownerFirstName: { value: string };
      ownerTelephone: { value: string };
      ownerMobile: { value: string };
      ownerEmail: { value: string };
      residentLastName: { value: string };
      residentFirstName: { value: string };
      residentTelephone: { value: string };
      residentMobile: { value: string };
      residentEmail: { value: string };
    };
    const UpdatedData = {
      ...data,
      position: target.position.value,
      title: target.title.value,
      common: target.common.value,
      owners: target.owners.value,
      lift: target.lift.value,
      heat: target.heat.value,
      owner: {
        firstName: target.ownerFirstName.value,
        lastName: target.ownerLastName.value,
        telephone: target.ownerTelephone.value,
        mobile: target.ownerMobile.value,
        email: target.ownerEmail.value,
      },
      resident: {
        firstName: target.residentFirstName.value,
        lastName: target.residentLastName.value,
        telephone: target.residentTelephone.value,
        mobile: target.residentMobile.value,
        email: target.residentEmail.value,
      },
    };
    const NewData = {
      position: target.position.value,
      title: target.title.value,
      common: target.common.value,
      owners: target.owners.value,
      lift: target.lift.value,
      heat: target.heat.value,
      owner: {
        firstName: target.ownerFirstName.value,
        lastName: target.ownerLastName.value,
        telephone: target.ownerTelephone.value,
        mobile: target.ownerMobile.value,
        email: target.ownerEmail.value,
      },
      resident: {
        firstName: target.residentFirstName.value,
        lastName: target.residentLastName.value,
        telephone: target.residentTelephone.value,
        mobile: target.residentMobile.value,
        email: target.residentEmail.value,
      },
    };
    if (!id) {
      await saveApartment(UpdatedData);
    } else {
      await saveApartment(NewData);
    }
    history.goBack();
  };

  return (
    <form onSubmit={handleSubmit} className="was-validated" noValidate>
      <ActionsForm returnUrl={`/buildings/${id1}`} showSubmitButton={true}>
        {data.buildingTitle === undefined ? (
          <li className="breadcrumb-item " aria-current="page">
            <Link to="/buildings">Νέο Κτίριο</Link>
          </li>
        ) : (
          <div>
            <li className="breadcrumb-item " aria-current="page">
              <Link to="/buildings">Κτίρια</Link>
            </li>
            <li className="breadcrumb-item " aria-current="page">
              <Link to={`/buildings/${id1}`}>{`${data.buildingTitle}`}</Link>
            </li>
            <li className="breadcrumb-item " aria-current="page">
              {`${data.title}`}
            </li>
          </div>
        )}
      </ActionsForm>
      <div className="row slideanim">
        <div className="col-lg">
          <Cards
            header={"Γενικές πληροφορίες"}
            body={
              <div className="row">
                <div className="row">
                  <div className="col">
                    <div className="row">
                      <div className="col">
                        <TextInput
                          type="text"
                          label="A/A:"
                          name="position"
                          value={data?.position}
                          required={true}
                          readOnly={true}
                          disable={true}
                        />
                      </div>
                      <div className="col">
                      
                        <TextInput
                          type="text"
                          label="Διαμέρισμα:"
                          name="title"
                          value={data?.title}
                          required={true}
                          readOnly={true}
                          disable={true}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    <TextInput
                      type="text"
                      label="Κοινό:"
                      name="common"
                      value={data?.common}
                      required={true}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <TextInput
                      type="text"
                      label="Ιδιοκτήτες:"
                      name="owners"
                      value={data?.owners}
                      required={true}
                    />
                  </div>
                  <div className="col">
                    <TextInput
                      type="text"
                      label="Lift:"
                      name="lift"
                      value={data?.lift}
                      required={true}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <TextInput
                      type="text"
                      label="heat:"
                      name="heat"
                      value={data?.heat}
                      required={true}
                    />
                  </div>
                </div>
              </div>
            }
          />
        </div>
      </div>
      {/* NEED TO SEPERATE TWO FORMS  HAS SAME VALUES*/}
      <div className="row slideanim">
        <div className="col-lg-6">
          <Cards
            header={"Ιδιοκτήτης"}
            body={
              <PersonForm
                formName="ownerForm"
                uniqueName="owner"
                data={data?.owner}
              />
            }
          />
        </div>
        <div className="col-lg-6">
          <Cards
            header={"Ένοικος"}
            body={
              <PersonForm
                formName="residentForm"
                uniqueName="resident"
                data={data?.resident}
              />
            }
          />
        </div>
      </div>
    </form>
  );
};

export default ApartmentForm;
