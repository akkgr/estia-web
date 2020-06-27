import React from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation, queryCache } from "react-query";
import ApartmentsQueries from "./ApartmentsQueries";
import ApartmentForm from "components/admin/apartments/apartmentForm/ApartmentForm";

const EditApartment = () => {
  let { id, id1 } = useParams();
  const { saveApartment, fetchApartmentData } = ApartmentsQueries(
    id1 ? id1 : id,
    id1 ? "apartments" : "buildings"
  );
  const { status, data, isFetching } = useQuery<any, [string]>(
    [id1 ? id1 : id],
    fetchApartmentData
  );

  const [mutate] = useMutation(saveApartment, {
    // onSuccess: (newData: any, id?: any) =>
    //   queryCache.setQueryData([id1 ? id1 : id], (prev: any) => [
    //     ...prev,
    //     newData,
    //   ]),
    onSuccess: () => queryCache.refetchQueries([id1 ? id1 : id], data),
  });
  return (
    <React.Fragment>
      <ApartmentForm id={id} id1={id1} mutate={mutate} data={data} />
    </React.Fragment>
  );
};

export default EditApartment;
