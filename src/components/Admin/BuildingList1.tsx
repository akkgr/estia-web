import React, { useState, useEffect, useContext, useCallback } from "react";
import axios from "axios";
import UserContext from "../../UserContext";
const uri = process.env.REACT_APP_API_URL + "/api";
const BuildingList1 = () => {
  const manager = useContext(UserContext);
  // const fetchData = async (
  //   ) => {
  //     const user = await manager.getUser();
  //     if (!user || user?.expired) {
  //       manager.signinRedirect();
  //     }
  //     const { data } = await axios.get(
  //       `${uri}/${key}?sort=${s}&page=[${page},${rows}]&filter=${f}`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${user?.access_token}`,
  //         },
  //       }
  //     );
  //     console.log("data.data:" + data.data);
  //     setTotal(data.count);
  //     return data.data;
  //   };
  console.log("has run");
  const dummyData = [
    {
      address: {
        area: "Αθήνα",
        street: "Νάξος",
        streetnumber: 45,
      },
      id: 23424323423,
    },
    {
      address: {
        area: "θερμοπυλών",
        street: "Ηράκλειο",
        streetnumber: 89,
      },
      id: 23424312312312245,
    },
  ];
  const renderrow = () => {
    return dummyData.map(function (dummy) {
      return (
        <tr key={dummy.id}>
          <td>{dummy.address.street}</td>
          <td>{dummy.address.streetnumber}</td>
          <td>{dummy.address.area}</td>
        </tr>
      );
    });
  };

  return (
    <div className="table-responsive">
      <table className="table table-bordered table-hover" id="dataTable">
        <thead>
          <tr>
            <th scope="col">Οδός</th>
            <th scope="col">Αριθμός</th>
            <th scope="col">Περιοχή</th>
          </tr>
          <tbody>{renderrow()}</tbody>
        </thead>
      </table>
    </div>
  );
};

export default BuildingList1;
