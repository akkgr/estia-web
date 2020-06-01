import { useContext } from "react";
import UserContext from "UserContext";
import Agent from "app/api/Agent";
import axios from "axios";

const BuildingQueries = () => {
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
    console.log("rows:", rows, " page:", page, " sort:", s);
    const data  = await Buildings.view(entity, page, rows, s, f);
    console.log("d.count:", data.count);
    return data;
  };

  const fetchBuildingData = async (key: string, id: string | undefined) => {
    const data = await Buildings.list_info(key, id);
    return data;
  };

  const deleteBuildings = async (id: string) => {
    await Buildings.delete(entity, id);
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

  return { fetchBuildings, deleteBuildings, fetchBuildingData };
};
export default BuildingQueries;
