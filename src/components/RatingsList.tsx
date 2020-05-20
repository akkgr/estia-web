import React from "react";
import { DataTable } from "./DataTable";

const columns = [
  {
    key: "position",
    title: "A/A",
    dataIndex: "position",
    sorter: (a: any, b: any) => a.position - b.position,
  },
  {
    key: "title",
    title: "Διαμέρισμα",
    dataIndex: "title",
    sorter: (a: any, b: any) => ("" + a.title).localeCompare(b.title),
  },
  {
    key: "owner",
    title: "Ιδιοκτήτης",
    sorter: (a: any, b: any) =>
      `${a.owner?.lastname || ""} ${a.owner?.firstname || ""}`.localeCompare(
        `${b.owner?.lastName || ""} ${b.owner?.firstName || ""}`
      ),
    render: (record: any) =>
      `${record.owner?.lastName || ""} ${record.owner?.firstName || ""}`,
  },
  {
    key: "resident",
    title: "Ένοικος",
    sorter: (a: any, b: any) =>
      `${a.resident?.lastname || ""} ${
        a.resident?.firstname || ""
      }`.localeCompare(
        `${b.resident?.lastName || ""} ${b.resident?.firstName || ""}`
      ),
    render: (record: any) =>
      `${record.resident?.lastName || ""} ${record.resident?.firstName || ""}`,
  },
];

const filterFn = (value: any) => {
  return {
    $or: [
      { "address.street": { $regex: `${value}`, $options: "i" } },
      {
        "address.streetnumber": {
          $regex: `${value}`,
          $options: "i",
        },
      },
      { "address.area": { $regex: `${value}`, $options: "i" } },
    ],
  };
};

export const RatingsList = (props: any) => {
  return (
    <div>
       {/* <DataTable
        entity={`buildings/${props.data.id}/apartments`}
        columns={columns}
        filterFn={filterFn}
      /> */}
    
      <div className="table-responsive">
        <table className="table table-bordered table-hover" id="dataTable" >
          <thead>
            <tr>
              <th>Διαμέρισμα</th>
              <th>Κοινόχρηστα</th>
              <th>Ασανσέρ</th>
              <th>Ιδιοκτήτες</th>
              <th>Boiler</th>
              <th>Θέρμανση</th>
              <th>Άλλα έξοδα</th>
            </tr>
          </thead>
          <tfoot>
          <tr>
              <th>Σύνολο</th>
              <th>1000</th>
              <th>1000</th>
              <th>1000</th>
              <th>1000</th>
              <th>1000</th>
              <th>1000</th>
            </tr>
          </tfoot>
          <tbody >
            <tr>
              <td>A1</td>
              <td>107.00</td>
              <td>170.00</td>
              <td>56.00</td>
              <td>102.00</td>
              <td>102.00</td>
              <td>1.00</td>
            </tr>
            <tr>
              <td>Β1</td>
              <td>130.00</td>
              <td>170.00</td>
              <td>56.00</td>
              <td>102.00</td>
              <td>102.00</td>
              <td>1.00</td>
            </tr>
            <tr>
              <td>Γ1</td>
              <td>160.00</td>
              <td>170.00</td>
              <td>56.00</td>
              <td>102.00</td>
              <td>102.00</td>
              <td>1.00</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
 
   
    
  );
};
