import React from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation, queryCache } from "react-query";
import BuildingQueries from "./BuildingQueries";
import BuildingInfo from "./BuildingInfo";

const EditBuilding = () => {
  let { id } = useParams();
  const entity = "buildings";
  const { fetchBuildingData, saveBuilding } = BuildingQueries(id);

  const { data } = useQuery<any, [string, string | undefined]>(
    [entity, id],
    fetchBuildingData
  );

  const [mutate] = useMutation(saveBuilding, {
    // onSuccess: (newData) =>
    //   queryCache.setQueryData([id], (prev: any) => [...prev, newData]),
    onSuccess: () => queryCache.refetchQueries([id], data),
  });

  return <BuildingInfo id={id} data={data} mutate={mutate} />;
};

export default EditBuilding;
