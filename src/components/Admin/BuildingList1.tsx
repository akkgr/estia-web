import React, { useState, useEffect, useContext, useCallback } from "react";
import axios from "axios";
import UserContext from "../../UserContext";
const uri = process.env.REACT_APP_API_URL + "/api";
const BuildingList1 = () => {
  const manager = useContext(UserContext);
  // const sort = (
  //   ascending: boolean,
  //   columnClassName: string,
  //   tableId?: string
  // ) => {
  //   var tbody = document
  //     .getElementById(tableId)
  //     .getElementsByTagName("tbody")[0];
  //   var rows = tbody.getElementsByTagName("tr");

  //   var unsorted = true;

  //   while (unsorted) {
  //     unsorted = false;

  //     for (var r = 0; r < rows.length - 1; r++) {
  //       var row = rows[r];
  //       var nextRow = rows[r + 1];

  //       var value = row.getElementsByClassName(columnClassName)[0].innerHTML;
  //       var nextValue = nextRow.getElementsByClassName(columnClassName)[0]
  //         .innerHTML;

  //       value = value.replace(",", ""); // in case a comma is used in float number
  //       nextValue = nextValue.replace(",", "");

  //       if (!isNaN(value)) {
  //         value = parseFloat(value);
  //         nextValue = parseFloat(nextValue);
  //       }

  //       if (ascending ? value > nextValue : value < nextValue) {
  //         tbody.insertBefore(nextRow, row);
  //         unsorted = true;
  //       }
  //     }
  //   }
  // };

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
          <td className="street">{dummy.address.street}</td>
          <td className="number">{dummy.address.streetnumber}</td>
          <td className="area">{dummy.address.area}</td>
        </tr>
      );
    });
  };

  return (
    <div className="table-responsive">
      <table className="table table-bordered" id="content-table">
        <thead>
          <tr>
            <th scope="col" className="street">
              Οδός
              {/* <button onClick={() => sort(true, "street", "content-table")}>
                asc
              </button>
              <button onClick={() => sort(false, "street", "content-table")}>
                desc
              </button> */}
            </th>
            <th scope="col" className="number">
              Αριθμός{" "}
              {/* <button onClick={() => sort(true, "number", "content-table")}>
                asc
              </button>
              <button onClick={() => sort(false, "number", "content-table")}>
                desc
              </button> */}
            </th>
            <th scope="col" className="area">
              Περιοχή
              {/* <button onClick={() => sort(true, "area", "content-table")}>
                asc
              </button>
              <button onClick={() => sort(false, "area", "content-table")}>
                desc
              </button> */}
            </th>
          </tr>
        </thead>
        <tbody>{renderrow()}</tbody>
      </table>
    </div>
  );
};

export default BuildingList1;
