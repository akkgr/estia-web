import React, { useState } from "react";
import BuildingData from "./buildingInfo/BuildingData";
import BuildingStatus from "./buildingInfo/BuildingStatus";
import BuildingPower from "./buildingInfo/BuildingPower";
import BuildingGas from "./buildingInfo/BuildingGas";
import BuildingWater from "./buildingInfo/BuildingWater";
import TextInput from "app/common/form/TextInput";
import BuildingBank from "./buildingInfo/BuildingBank";

export const BuildingInfo: React.FC = () => {
  const [startDate, setStartDate] = useState(new Date());

  const handleChangeHandler = (date: Date) => {
    console.log("date" + date);
    setStartDate(date);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const form = event.target.elements.test.value;
    console.log(form);
  };
  return (
    <React.Fragment>
      <form className="needs-validation" noValidate onSubmit={handleSubmit}>
        <div className="card">
          <div className="card-header text-center">
            <div className="row mt-3">
              <div className="col-md-4 mb-3">
                <TextInput
                  label="Στοιχεία Κτηρίου :"
                  name="test"
                  value="ΑΓ. ΦΑΝΟΥΡΙΟΥ 15A Παγκράτι"
                  idElement="validationCustom01"
                  placeholder="Something"
                  required={true}
                />
              </div>

              <div className="col-md-4 mb-3">
                <TextInput
                  label="Στοιχεία Διαχειριστή  :"
                  name="admin"
                  value="Βαγγέλης Χαυλής"
                  placeholder="Στοιχεία Διαχειριστή..."
                  required={true}
                  readOnly={true}
                  disable={true}
                />
              </div>
              <div className="col-md-4 mb-3">
                <TextInput
                  label="Στοιχεία Παραλαμβάνοντος :"
                  name="reciever"
                  value="Τζιβράς Τζέρι"
                  placeholder="Στοιχεία Παραλαμβάνοντος..."
                  required={true}
                  readOnly={true}
                  disable={true}
                />
              </div>
            </div>
          </div>
          <div className="card-body">
            <div id="exTab1">
              <ul className="nav nav-pills">
                <li className="active">
                  <a
                    style={{ margin: "20px" }}
                    className="btn btn-primary"
                    role="button"
                    href="#1a"
                    data-toggle="tab"
                  >
                    Βασικά Στοιχεία Κτηρίου
                  </a>
                </li>
                <li>
                  <a
                    style={{ margin: "20px" }}
                    className="btn btn-primary"
                    role="button"
                    href="#2a"
                    data-toggle="tab"
                  >
                    Κατάσταση
                  </a>
                </li>
                <li>
                  <a
                    style={{ margin: "20px" }}
                    className="btn btn-primary"
                    role="button"
                    href="#3a"
                    data-toggle="tab"
                  >
                    ΔΕΗ
                  </a>
                </li>
                <li>
                  <a
                    style={{ margin: "20px" }}
                    className="btn btn-primary"
                    role="button"
                    href="#4a"
                    data-toggle="tab"
                  >
                    Φυσικό Αέριο
                  </a>
                </li>
                <li>
                  <a
                    style={{ margin: "20px" }}
                    className="btn btn-primary"
                    role="button"
                    href="#5a"
                    data-toggle="tab"
                  >
                    ΕΥΔΑΠ
                  </a>
                </li>
                <li>
                  <a
                    style={{ margin: "20px" }}
                    className="btn btn-primary"
                    role="button"
                    href="#6a"
                    data-toggle="tab"
                  >
                    Τράπεζα/Αιτιολογία
                  </a>
                </li>
              </ul>

              <div className="tab-content clearfix">
                <div className="tab-pane active" id="1a">
                  <BuildingData />
                </div>
                <div className="tab-pane" id="2a">
                  <BuildingStatus />
                </div>
                <div className="tab-pane" id="3a">
                  <BuildingPower />
                </div>
                <div className="tab-pane" id="4a">
                  <BuildingGas />
                </div>
                <div className="tab-pane" id="5a">
                  <BuildingWater />
                </div>
                <div className="tab-pane" id="6a">
                  <BuildingBank />
                </div>
              </div>
            </div>
          </div>
          <div className="card-footer">
            <div className="row">
              <div className="col-md-8 mb-3">
                <button type="button" className="btn btn-warning">Ακύρωση</button>
              </div>

              <div className="col-md-4 mb-3">
                <button className="btn btn-primary" type="submit">
                  Υποβολή
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </React.Fragment>
  );
};
