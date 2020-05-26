import { useContext } from "react";
import UserContext from "UserContext";
import Agent from "app/api/Agent";
import axios from "axios";

const BuildingQueries = (entity: string) => {
  const { Buildings } = Agent();
  const manager = useContext(UserContext);
  const fetchBuildings = async (
    key: string,
    page: number,
    rows: number,
    sort: string[],
    filter: {}
  ) => {
    const user = await manager.getUser();
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

  const deleteBuildings = async (id: string) => {
    await Buildings.delete(entity, id);
  };

  return { fetchBuildings, deleteBuildings };
};
export default BuildingQueries;
