import Agent from "app/api/Agent";
import { Building } from "app/models/Building";
const BuildingQueries = (id?: string) => {
  const entity = "buildings";
  const { Buildings } = Agent();

  const fetchBuildings = async (
    entity: string,
    page: number,
    rows: number,
    sort: string[],
    filter: {}
  ) => {
    const s = JSON.stringify(sort);
    const f = JSON.stringify(filter);
    // console.log("rows:", rows, " page:", page, " sort:", s);
    const data = await Buildings.list(entity, page, rows, s, f);
    return data;
  };

  const fetchBuildingData = async (key: string, id: string | undefined) => {
    if (id === "new" || !id || id === undefined) {
      return null;
    } else {
      const data = await Buildings.info(key, id);
      return data;
    }
  };

  const deleteBuilding = async (id: string) => {
    await Buildings.delete(entity, id);
  };

  const createBuilding = async (data: Building | any) => {
    try {
      console.log(data);
      const inserted = await Buildings.create(entity, data);
      if (inserted) {
        console.log("εγινε η εισαγωγή στην βάση");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const updateBuilding = async (data: Building) => {
    console.log("Updatedata", data);
    const inserted = await Buildings.update(entity, id, data);
    return inserted;
  };

  const saveBuilding = async (data: Building | any) => {
    return data.id ? await updateBuilding(data) : await createBuilding(data);
  };
  // const updateBuildings=async (input:any)=>{
  //   const CancelToken = axios.CancelToken;
  //   const source = CancelToken.source();
  //   const {data} =await Buildings.update(entity,input);
  //   data.cancel = () => {
  //     source.cancel("Query was cancelled by React Query");
  //   };
  //   return data;
  // }

  return { fetchBuildings, fetchBuildingData, saveBuilding, deleteBuilding };
};
export default BuildingQueries;
