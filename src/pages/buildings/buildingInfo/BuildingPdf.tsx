import React from "react";

const files = [
  { id: 1, date: "30/5/2020", value: "Αρχείο-1.pdf" },
  { id: 2, date: "30/5/2020", value: "Αρχείο-2.pdf" },
  { id: 3, date: "30/5/2020", value: "Αρχείο-3.pdf" },
  { id: 4, date: "30/5/2020", value: "Αρχείο-4.pdf" },
];

const BuildingPdf = () => {
  return (
    <React.Fragment>
      <div className="row mt-5">
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Α/Α</th>
              <th>Ημερομηνία</th>
              <th>Όνομα Αρχείου</th>
              <th>Ενέργεια</th>
            </tr>
          </thead>
          <tbody>
            {files.map((item: any, index?: any) => (
              <tr id={index} key={index}>
                <td>{item.id}</td>
                <td>{item.date}</td>
                <td>{item.value}</td>
                <td>
                  <span className="badge badge-primary badge-pill">
                    Προβολή
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
};

export default BuildingPdf;
