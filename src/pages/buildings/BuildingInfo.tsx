import React, { useState, useRef } from "react";
import TextInput from "../../app/common/form/TextInput";
import SelectInputSearch from "../../app/common/form/SelectInputSearch";
import RadioInput from "../../app/common/form/RadioInput";
import TextArea from "../../app/common/form/TextArea";
import Checkbox from "../../app/common/form/Checkbox";
export const Cities = [
  {
    id: 1,
    value: "Παγκράτι",
  },
  {
    id: 2,
    value: "Μαρούσι",
  },
  { id: 3, value: "Πανόρμου" },
];

export const trype_heading = ["ΚΕΝΤΡΙΚΗ", "ΦΥΣΙΚΟ ΑΕΡΙΟ", "ΑΥΤΟΝΟΜΗ"];

export const BuildingInfo: React.FC = () => {
  const [name, setName] = useState("ΑΓ. ΦΑΝΟΥΡΙΟΥ 15A Παγκράτι");

  // const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const form = event.target.elements.test.value;
    console.log(form);
  };
  return (
    <React.Fragment>
      <h1>Πληροφορίες Κτηρίου</h1>
      <form className="needs-validation" noValidate onSubmit={handleSubmit}>
        <div className="form-row">
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
            />
          </div>
        </div>
        <div className="form-row">
          <div className="col-md-4 mb-3">
            <SelectInputSearch
              label="Περιοχή"
              className="custom-select"
              options={Cities}
            />
            <div className="invalid-feedback">Please provide a valid city.</div>
          </div>
          <div className="col-md-3 mb-3">
            <TextInput
              label="Οδός"
              name="state"
              value="Αγ.Φανουρίου"
              placeholder="Οδός..."
              idElement="validationCustom03"
              required={true}
            />
            <div className="invalid-feedback">
              Παρακαλώ εισάγετε μια έγκυρη διεύθυνση
            </div>
          </div>
          <div className="col-md-2 mb-3">
            <TextInput
              label="Αριθμός"
              name="number"
              value="15A"
              placeholder="Αριθμός"
              idElement="validationCustom04"
              required={true}
            />
            <div className="invalid-feedback">
              Παρακαλώ εισάγετε έγκυρο Αριθμό
            </div>
          </div>
          <div className="col-md-2 mb-3">
            <TextInput
              label="ΤΚ"
              name="zip"
              value="11528"
              placeholder="ΤΚ"
              idElement="validationCustom05"
              required={true}
            />
            <div className="invalid-feedback">Παρακαλώ εισάγετε έγκυρο ΤΚ</div>
          </div>
        </div>
        <div className="form-row">
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
          <div className="col-md-1 mb-3"></div>
          <TextArea
            label="Σχόλια"
            rows={3}
            placeholder="Εδώ μπορείτε να προσθέσετε σχόλια"
          />
          <div className="col-md-6 mb-3">
            <Checkbox label="Παραλαβή λογ. στο γραφείο" required={true} />
          </div>
        </div>

        <button className="btn btn-primary" type="submit">
          Submit form
        </button>
      </form>
    </React.Fragment>
  );
};
