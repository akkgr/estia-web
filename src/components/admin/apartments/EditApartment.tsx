import React from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation, queryCache } from "react-query";
import ApartmentsQueries from "./ApartmentsQueries";
import ApartmentForm from "./ApartmentForm";
const EditApartment = () => {
  let { id1, id2 } = useParams();
  let { id } = useParams();
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
  return (
    <React.Fragment>
      <ApartmentForm id={id} id1={id1} id2={id2} mutate={mutate} data={data} />
    </React.Fragment>
  );
};

export default EditApartment;
