import React from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery, useMutation, queryCache } from "react-query";
import { useHistory } from "react-router-dom";
import { ActionsForm } from "app/common/headers/ActionsForm";
import { PersonForm } from "components/admin/apartments/apartmentForm/PersonForm";
import Cards from "app/common/views/Cards";
import ApartmentsQueries from "components/admin/apartments/ApartmentsQueries";
import { Apartment } from "app/models/Apartment";
import GeneralInfoForm from "components/admin/apartments/apartmentForm/GeneralInfoForm";

const ApartmentForm = () => {
  let { id1, id2 } = useParams();
  let { id } = useParams();
  const history = useHistory();
  const { saveApartment, fetchApartmentData } = ApartmentsQueries(
    !id ? id2 : id,
    !id ? "apartments" : "buildings"
  );

  const { status, data, isFetching } = useQuery<any, [string]>(
    [!id ? id2 : id],
    fetchApartmentData
  );

  const [mutate] = useMutation(saveApartment, {
    onSuccess: (newData) =>
      queryCache.setQueryData([!id ? id2 : id], (prev: any) => [
        ...prev,
        newData,
      ]),
    onSettled: () => queryCache.refetchQueries([!id ? id2 : id], data),
  });

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
    const UpdatedData = {
      ...data,
      position: Number(target.position.value),
      title: target.title.value,
      common: Number(target.common.value),
      owners: Number(target.owners.value),
      lift: Number(target.lift.value),
      heat: Number(target.heat.value),
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
      position: Number(target.position.value),
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
      common: Number(target.common.value),
      lift: Number(target.lift.value),
      ei: 0,
      fi: 0,
      owners: Number(target.owners.value),
      special: 0,
      special1: 0,
      special2: 0,
      special3: 0,
      special4: 0,
      heat: Number(target.heat.value),
      label: "",
      buildingTitle: "Νέο Κτίριο Δοκιμαστικό",
    };

    if (!id) {
      await mutate(UpdatedData, id2);
    } else {
      await mutate(NewData);
    }
    history.goBack();
  };

  return (
    <React.Fragment>
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
              body={<GeneralInfoForm data={data ? data : null} />}
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
    </React.Fragment>
  );
};

export default ApartmentForm;
