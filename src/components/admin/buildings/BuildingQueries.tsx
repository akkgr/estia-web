import { useContext } from "react";
import UserContext from "UserContext";
import Agent from "app/api/Agent";

const BuildingQueries = (entity: string) => {
  const manager = useContext(UserContext);
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
    const user = await manager.getUser();
    if (!user || user?.expired) {
      manager.signinRedirect();
    }

    const { data } = await Buildings.view(key, page, rows, s, f);
    return data;
  };

  const deleteBuildings = async (id: string) => {
    await Buildings.delete(entity, id);
  };

  return { fetchBuildings, deleteBuildings };
};
export default BuildingQueries;
