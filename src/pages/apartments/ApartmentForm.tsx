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
  console.log("Newid" + id);
  const history = useHistory();
  const { saveApartment, fetchApartments, data, entity } = ApartmentsQueries(
    !id ? id2 : id,
    !id ? "apartments" : "buildings"
  );

  const [mutate] = useMutation(saveApartment, {
    // onSuccess: (data) => queryCache.setQueryData([!id ? id2 : id], data),
    onSuccess: () => queryCache.refetchQueries(data),
  });

  const update = (input: any) => {
    mutate(input);
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      position: { value: number };
      title: { value: string };
      common: { value: number };
      owners: { value: number };
      lift: { value: number };
      heat: { value: number };
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
    console.log(target.common.value);
    const UpdatedData = {
      ...data,
      position: new Number(target.position.value),
      title: target.title.value,
      common: new Number(target.common.value),
      owners: new Number(target.owners.value),
      lift: new Number(target.lift.value),
      heat: new Number(target.heat.value),
      owner: {
        firstName: target.ownerFirstName.value,
        lastName: target.ownerLastName.value,
        telephone: target.ownerTelephone.value,
        mobile: target.ownerMobile.value,
        email: target.ownerEmail.value,
        afm: "",
        doy: "",
        roleType: 0,
      },
      resident: {
        firstName: target.residentFirstName.value,
        lastName: target.residentLastName.value,
        telephone: target.residentTelephone.value,
        mobile: target.residentMobile.value,
        email: target.residentEmail.value,
        afm: "",
        doy: "",
        roleType: 0,
      },
    };

    const NewData = {
      id: null,
      buildingId: id,
      title: target.title.value,
      position: new Number(target.position.value),
      resident: {
        firstName: target.residentFirstName.value,
        lastName: target.residentLastName.value,
        telephone: target.residentTelephone.value,
        mobile: target.residentMobile.value,
        email: target.residentEmail.value,
        afm: "",
        doy: "",
        roleType: 0,
      },
      owner: {
        firstName: target.ownerFirstName.value,
        lastName: target.ownerLastName.value,
        telephone: target.ownerTelephone.value,
        mobile: target.ownerMobile.value,
        email: target.ownerEmail.value,
        afm: "",
        doy: "",
        roleType: 0,
      },
      closed: false,
      infoType: 0,
      common: new Number(target.common.value),
      lift: new Number(target.lift.value),
      ei: 0,
      fi: 0,
      owners: new Number(target.owners.value),
      special: 0,
      special1: 0,
      special2: 0,
      special3: 0,
      special4: 0,
      heat: new Number(target.heat.value),
      label: "",
      buildingTitle: "Νέο Κτίριο Δοκιμαστικό",
    };

    if (!id) {
      await update(UpdatedData);
    } else {
      await update(NewData);
    }
    history.goBack();
  };

  return (
    <form onSubmit={handleSubmit} className="was-validated" noValidate>
      <ActionsForm returnUrl={`/buildings/${id1}`} showSubmitButton={true}>
        {data.buildingTitle === undefined ? (
          <li className="breadcrumb-item" aria-current="page">
            <Link to="/buildings" className="text-primary">
              Νέο Κτίριο
            </Link>
          </li>
        ) : (
          <React.Fragment>
            <li className="breadcrumb-item" aria-current="page">
              <Link to="/buildings" className="text-primary">
                Κτίρια
              </Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              <Link
                to={`/buildings/${id1}`}
                className="text-info"
              >{`${data.buildingTitle}`}</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {`${data.title}`}
            </li>
          </React.Fragment>
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
                          type="number"
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
                      type="number"
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
                      type="number"
                      label="Ιδιοκτήτες:"
                      name="owners"
                      value={data?.owners}
                      required={true}
                    />
                  </div>
                  <div className="col">
                    <TextInput
                      type="number"
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
                      type="number"
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
