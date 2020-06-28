import React, { useState, useCallback } from "react";
import ApartmentsQueries from "./ApartmentsQueries";
import { useQuery, queryCache } from "react-query";
import ApartmentsList from "components/admin/apartments/ApartmentsList";
const Apartments = (buildingId: any) => {
  const entity = "buildings/" + buildingId.buildingId + "/apartments";
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState(10);
  // const [total, setTotal] = useState(0);
  const [sort, setSort] = useState(["id", "ASC"]);
  const [filter, setFilter] = useState({});

  const { deleteApartment, fetchApartments } = ApartmentsQueries(
    buildingId.buildingId,
    "apartments"
  );

  const memoizedCallback = useCallback(
    async (id: string) => {
      await deleteApartment(id);
      queryCache.refetchQueries([entity, page, rows, filter]);
    },
    [entity, page, rows, filter, deleteApartment]
  );

  const { status, data, isFetching } = useQuery<
    any,
    [string, number, number, string[], {}]
  >([entity, page, rows, sort, filter], fetchApartments);

  return (
    <ApartmentsList
      entity={entity}
      page={page}
      setPage={setPage}
      rows={rows}
      setRows={setRows}
      setSort={setSort}
      setFilter={setFilter}
      memoizedCallback={memoizedCallback}
      data={data}
      isFetching={isFetching}
      status={status}
    />
  );
};

export default Apartments;
