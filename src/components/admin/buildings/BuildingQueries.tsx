import { useContext } from "react";
import UserContext from "UserContext";
import Agent from "app/api/Agent";
import axios from "axios";

const BuildingQueries = () => {
  const entity = "apartments";
  const { Buildings } = Agent();
  const fetchBuildings = async (
    key: string,
    page: number,
    rows: number,
    sort: string[],
    filter: {}
  ) => {
    const s = JSON.stringify(sort);
    const f = JSON.stringify(filter);
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    const { data } = await Buildings.view(key, page, rows, s, f);
    data.cancel = () => {
      source.cancel("Query was cancelled by React Query");
    };
    return data;
  };

  const fetchBuildingData =async(key:string,id:string |undefined)=>{
    const data =await Buildings.list_info(key,id);
    return data;
  }

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

  return { fetchBuildings, deleteBuildings,fetchBuildingData };
};
export default BuildingQueries;
