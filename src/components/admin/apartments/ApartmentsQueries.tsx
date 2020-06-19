import React, { useEffect } from "react";
import { useQuery, useMutation, queryCache } from "react-query";
import Agent from "app/api/Agent";
import { Console } from "console";

const ApartmentsQueries = (id: string, key: string) => {
  const entity = "apartments";
  const parentEntity = "buildings";
  const { Apartments } = Agent();

  const fetchApartments = async (id1: string) => {
    const data = await Apartments.data(key, id1);
    return data;
  };
  const { status, data, isFetching } = useQuery<any, [string]>(
    [id],
    fetchApartments
  );

  const createApartment = async (data: any) => {
    try {
      console.log("create");
      console.log(entity);
      console.log(data);
      data.id = null;
      const inserted = await Apartments.create(entity, data);
      if (inserted) {
        console.log("εγινε η εισαγωγή στην βάση");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const updateApartments = async (input: any) => {
    console.log("update");
    console.log(input, id);
    const data = await Apartments.update(entity, id, input);
    return data;
  };
  const deleteApartment = async (id: string) => {
    await Apartments.delete(entity, id);
  };

  const saveApartment = async (data: any) => {
    return !data.id || data.id === "new"
      ? await createApartment(data)
      : await updateApartments(data);
  };

  return {
    fetchApartments,
    saveApartment,
    deleteApartment,
    data,
    entity,
    parentEntity,
  };
};

export default ApartmentsQueries;
