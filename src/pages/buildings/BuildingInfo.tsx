import React from "react";
import BuildingData from "./buildingInfo/BuildingData";
// import CustomPageΗeader from "app/common/headers/CustomPageHeader";
import BuildingStatus from "./buildingInfo/BuildingStatus";
import BuildingPower from "./buildingInfo/BuildingPower";
import BuildingGas from "./buildingInfo/BuildingGas";
import BuildingWater from "./buildingInfo/BuildingWater";
import TextInput from "app/common/form/TextInput";

export const BuildingInfo: React.FC = () => {
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
              </ul>

              <div className="tab-content">
                <div className="tab-pane  active" id="1a">
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
              </div>
            </div>
          </div>
          <div className="card-footer text-center">
            <button className="btn btn-primary" type="submit">
              Υποβολή
            </button>
          </div>
        </div>

        {/* <div className="form-row">
          <div className="col-md-4 mb-3">
            <TextInput
              label="Στοιχεία Κτηρίου"
              name="test"
              value={name}
              idElement="validationCustom01"
              placeholder="Something"
              required={true}
            />
          </div>

          <div className="col-md-4 mb-3">
            <TextInput
              label="Στοιχεία Διαχειριστή"
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
              label="Στοιχεία Παραλαμβάνοντος"
              name="reciever"
              value="Τζιβράς Τζέρι"
              placeholder="Στοιχεία Παραλαμβάνοντος..."
              required={true}
              readOnly={true}
              disable={true}
            />
          </div>
        </div> */}

        {/* <BuildingData />

        <BuildingStatus /> */}

        {/* <div className="form-row">
          <div className="col-md-4 mb-3">
            <RadioInput
              label="Είδος Θέρμανσης"
              choices={trype_heading}
              type="radio"
              name="heating"
              required={true}
            />
            <div className="invalid-feedback">
              Παρακαλώ επιλέξτε είδος θέρμανσης
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <Checkbox label="Θερμοώρες" required={false} />
          </div>
          <div className="col-md-1 mb-3"></div>
          <TextArea
            label="Σχόλια"
            rows={3}
            placeholder="Εδώ μπορείτε να προσθέσετε σχόλια"
          />
        </div>

        <h2>Κατάσταση</h2>
        <div className="form-row">
          <div className="col-md-4 mb-3">
            <Checkbox label="Διαχείρηση" required={false} />
          </div>
          <div className="col-md-4 mb-3">
            <Checkbox label="Ενεργή" required={false} />
          </div>
        </div>

        <h2>Τράπεζα/Αιτιολογία</h2>
        <div className="form-row">
          <div className="col-md-2 mb-3">
            <TextInput
              label="Τράπεζα/Αιτιολογία"
              name="bank"
              value="ESTIACITYSERVICES"
              placeholder="Τράπεζα/Αιτιολογία..."
              idElement="validationCustom05"
              required={true}
            />
            <div className="invalid-feedback">
              Παρακαλώ εισάγετε έγκυρο Αποθεματικό
            </div>
          </div>
        </div>

        <h2>ΔΕΗ</h2>
        <div className="form-row">
          <div className="col-md-2 mb-3">
            <TextInput
              label="Αριθμός Μετρητή"
              name="counter"
              value="999999999"
              placeholder="Αριθμός Μετρητή..."
              idElement="validationCustom05"
              required={true}
            />
            <div className="invalid-feedback">
              Παρακαλώ εισάγετε έγκυρο Αριθμό Μετρητή
            </div>
          </div>

          <div className="col-md-1 mb-3">
            <TextArea label="Επωνυμία" rows={3} placeholder="Επωνυμία..." />
          </div>

          <div className="col-md-2 mb-3">
            <TextInput
              label="Αριθμός Παροχής"
              name="receiver"
              value="999999999"
              placeholder="Αριθμός Παροχής..."
              idElement="validationCustom06"
              required={true}
            />
            <div className="invalid-feedback">
              Παρακαλώ εισάγετε έγκυρο Αριθμό Παροχής
            </div>

            <div className="col-md-2 mb-3">
              <TextInput
                label="Κωδικος Ηλεκτρ. Παροχής"
                name="code"
                value="999999999"
                placeholder="Κωδικός Ηλεκτρ. Παροχής..."
                idElement="validationCustom07"
                required={true}
              />
              <div className="invalid-feedback">
                Παρακαλώ εισάγετε έγκυρο Αριθμό Κωδικό Ηλεκτρ. Παροχής
              </div>
            </div>

            <div className="col-md-6 mb-3">
              <Checkbox label="Παραλαβή λογ. στο γραφείο" required={true} />
            </div>
          </div>
        </div>

        <h2>ΕΥΔΑΠ</h2>
        <div className="form-row">

        </div> */}

        {/* <div className="form-row">
          <div className="col-md-2 mb-3">
            <DatePicker
              dateFormat="dd/MM/yyyy"
              startDate={startDate}
              onChange={handleChangeHandler}
            />
            <div className="invalid-feedback">
              Παρακαλώ εισάγετε έγκυρο Αποθεματικό
            </div>
          </div>
        </div> */}
      </form>
    </React.Fragment>
  );
};
