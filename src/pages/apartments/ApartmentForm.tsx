import React from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery, useMutation, queryCache } from "react-query";
import { Skeleton } from "antd";
import { ActionsForm } from "components/ActionsForm";
import { PersonForm } from "components/PersonForm";
import TextInput from "app/common/form/TextInput";
import Cards from "app/common/views/Cards";
import ApartmentsQueries from "components/admin/apartments/ApartmentsQueries";

const ApartmentForm = () => {
  let { id1, id2 } = useParams();
  const { fetchApartments, updateApartments, entity } = ApartmentsQueries(id2);

  const { status, data, isFetching } = useQuery<
    any,
    [string, string | undefined]
  >([entity, id2], fetchApartments);
  console.log(data);
  const [mutate] = useMutation(updateApartments, {
    onSuccess: (data) => queryCache.setQueryData([entity, id2], data),
  });

  const update = (input: any) => {
    mutate(input);
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      position: { value: number };
      title: { value: string };
      common: { value: string };
      owners: { value: string };
      lift: { value: string };
      heat: { value: string };
      lastName: { value: string };
      firstName: { value: string };
      telephone: { value: string };
      mobile: { value: string };
      email: { value: string };
    };
    const position = target.position.value;
    const title = target.title.value;
    const common = target.common.value;
    const owners = target.owners.value;
    const lift = target.lift.value;
    const heat = target.heat.value;
    const lastName = target.lastName.value;
    const firstName = target.firstName.value;
    const telephone = target.telephone.value;
    const mobile = target.mobile.value;
    const email = target.email.value;
    const SubmitedData = {
      ...data,
      position: position,
      title: title,
      common: common,
      owners: owners,
      lift: lift,
      heat: heat,
      owner: {
        firstName: firstName,
        lastName: lastName,
        telephone: telephone,
        mobile: mobile,
        email: email,
      },
    };
    console.log(SubmitedData);
  };

  return (
    <Skeleton active loading={status === "loading" || isFetching}>
      <form onSubmit={handleSubmit} className="was-validated" noValidate>
        <ActionsForm returnUrl={`/buildings/${id1}`} showSubmitButton={true}>
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
                <div className="row">
                  <div className="row">
                    <div className="col">
                      <div className="row">
                        <div className="col">
                          <TextInput
                            type="text"
                            label="A/A:"
                            name="position"
                            value={data.position}
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
                            value={data.title}
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
                        value={data.common}
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
                        value={data.owners}
                        required={true}
                      />
                    </div>
                    <div className="col">
                      <TextInput
                        type="text"
                        label="Lift:"
                        name="lift"
                        value={data.lift}
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
                        value={data.heat}
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
      </form>
    </Skeleton>
  );
};

export default ApartmentForm;
