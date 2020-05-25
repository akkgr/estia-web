import React, { useContext } from "react";
import UserContext from "UserContext";
import Agent from "app/api/Agent";

const uri = process.env.REACT_APP_API_URL + "/api";

const BuildingQueries = () => {
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

  return { fetchBuildings };
};
export default BuildingQueries;

// const { data } = await agent.get(
//   `${uri}/${key}?sort=${s}&page=[${page},${rows}]&filter=${f}`,
//   {
//     headers: {
//       Authorization: `Bearer ${user?.access_token}`,
//     },
//   }
// );
