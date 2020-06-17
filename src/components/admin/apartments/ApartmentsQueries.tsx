import Agent from "app/api/Agent";

const ApartmentsQueries = (id: string) => {
  const entity = "apartments";
  const parentEntity = "buildings";
  const { Apartments } = Agent();
  const fetchApartments = async (key: string, id1: string | undefined) => {
    const data = await Apartments.data(key, id1);
    return data;
  };

  const updateApartments = async (input: any) => {
    const data = await Apartments.update(entity, id, input);
    return data;
  };

  const newudpateApartments = async (input: any) => {
    const data = await Apartments.new_update(entity, input);
    return data;
  };

  return {
    fetchApartments,
    updateApartments,
    newudpateApartments,
    entity,
    parentEntity,
  };
};

export default ApartmentsQueries;
