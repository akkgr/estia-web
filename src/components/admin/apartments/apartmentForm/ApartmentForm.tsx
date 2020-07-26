import React from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { ActionsForm } from "app/common/headers/ActionsForm";
import { PersonForm } from "components/admin/apartments/apartmentForm/PersonForm";
import Cards from "app/common/cards/Cards";
import { Apartment } from "app/models/Apartment";
import { toast } from "react-toastify";
import GeneralInfoForm from "components/admin/apartments/apartmentForm/GeneralInfoForm";

interface IProps {
  id: any;
  id1: any;
  onSave: any | null;
  data: any;
}

const ApartmentForm: React.FC<IProps> = ({ id, id1, onSave, data }) => {
  const history = useHistory();

  const handleSubmit = async (e: React.SyntheticEvent | any) => {
    e.preventDefault();
    e.stopPropagation();
    const form = e.target;
    const isValid = form.checkValidity();
    if (!isValid) {
      e.target.className += " was-validated";
      return toast.info("Δέν έχει συμπληρωθεί σωστά η φόρμα");
    }
    const target = e.target as typeof e.target & {
      title: { value: string };
      position: { value: number };
      residentLastName: { value: string };
      residentFirstName: { value: string };
      residentTelephone: { value: string };
      residentMobile: { value: string };
      residentEmail: { value: string };
      residentAfm: { value: string };
      residentDoy: { value: string };
      ownerLastName: { value: string };
      ownerFirstName: { value: string };
      ownerTelephone: { value: string };
      ownerMobile: { value: string };
      ownerEmail: { value: string };
      ownerAfm: { value: string };
      ownerDoy: { value: string };
      common: { value: number };
      lift: { value: number };
      ei: { value: number };
      fi: { value: number };
      owners: { value: number };
      special: { value: number };
      special1: { value: number };
      special2: { value: number };
      special3: { value: number };
      special4: { value: number };
      heat: { value: number };
    };
    const UpdatedData = {
      ...data,
      // position: Number(target.position.value),
      title: target.title.value,
      resident: {
        firstName: target.residentFirstName.value,
        lastName: target.residentLastName.value,
        telephone: target.residentTelephone.value,
        mobile: target.residentMobile.value,
        email: target.residentEmail.value,
        afm: target.residentAfm.value,
        doy: target.residentDoy.value,
        roleType: 0,
      },
      owner: {
        firstName: target.ownerFirstName.value,
        lastName: target.ownerLastName.value,
        telephone: target.ownerTelephone.value,
        mobile: target.ownerMobile.value,
        email: target.ownerEmail.value,
        afm: target.ownerAfm.value,
        doy: target.ownerDoy.value,
        roleType: 0,
      },
      common: Number(target.common.value),
      lift: Number(target.lift.value),
      ei: Number(target.ei.value),
      fi: Number(target.fi.value),
      owners: Number(target.owners.value),
      special: Number(target.special.value),
      special1: Number(target.special1.value),
      special2: Number(target.special2.value),
      special3: Number(target.special3.value),
      special4: Number(target.special4.value),
      heat: Number(target.heat.value),
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
        afm: target.residentAfm.value,
        doy: target.residentDoy.value,
        roleType: 0,
      },
      owner: {
        firstName: target.ownerFirstName.value,
        lastName: target.ownerLastName.value,
        telephone: target.ownerTelephone.value,
        mobile: target.ownerMobile.value,
        email: target.ownerEmail.value,
        afm: target.ownerAfm.value,
        doy: target.ownerDoy.value,
        roleType: 0,
      },
      closed: false,
      infoType: 0,
      common: Number(target.common.value),
      lift: Number(target.lift.value),
      ei: Number(target.ei.value),
      fi: Number(target.fi.value),
      owners: Number(target.owners.value),
      special: Number(target.special.value),
      special1: Number(target.special1.value),
      special2: Number(target.special2.value),
      special3: Number(target.special3.value),
      special4: Number(target.special4.value),
      heat: Number(target.heat.value),
      label: "",
    };
    if (id1) {
      await onSave(UpdatedData, id1);
    } else {
      await onSave(NewData);
    }
    history.goBack();
  };

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit} className="needs-validation" noValidate>
        <ActionsForm returnUrl={`/buildings/${id}`} showSubmitButton={true}>
          {id1 === undefined ? (
            <li className="breadcrumb-item" aria-current="page">
              <Link to="/buildings" className="text-primary">
                Νέο Κτίριο
              </Link>
            </li>
          ) : (
            <React.Fragment>
              <li className="breadcrumb-item" aria-current="page">
                <Link to="/buildings" className="text-primary">
                  Κτίριο
                </Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                <Link
                  to={`/buildings/${id}`}
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
