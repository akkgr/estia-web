import React from "react";

export const RatingsList = (props: any) => {
  return (
    <div>
      <div className="table-responsive">
        <table className="table table-bordered table-hover" id="dataTable">
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
          <tbody>
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
