import Agent from "app/api/Agent";
import { Apartment } from "app/models/Apartment";
const ApartmentsQueries = (id: string, key: string) => {
  const entity = "apartments";
  const parentEntity = "buildings";
  const { Apartments } = Agent();

  const fetchApartments = async (
    entity: string,
    page: number,
    rows: number,
    sort: string[],
    filter: {}
  ) => {
    const s = JSON.stringify(sort);
    const f = JSON.stringify(filter);
    // console.log("rows:", rows, " page:", page, " sort:", s);
    const data = await Apartments.list(entity, page, rows, s, f);
    return data;
  };

  const fetchApartmentData = async (id1: string) => {
    const data: Apartment = await Apartments.data(key, id1);
    return data;
  };

  const createApartment = async (data: any) => {
    try {
      console.log("create");
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

  const updateApartments = async (input: Apartment) => {
    console.log("update");
    console.log(JSON.stringify(input));
    await Apartments.update(entity, id, input);
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
    fetchApartmentData,
    saveApartment,
    deleteApartment,
    entity,
    parentEntity,
  };
};

export default ApartmentsQueries;
