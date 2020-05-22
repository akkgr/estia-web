import React from "react";
import SelectInputSearch from "app/common/form/SelectInputSearch";
import TextInput from "app/common/form/TextInput";
import RadioInput from "app/common/form/RadioInput";
import Checkbox from "app/common/form/Checkbox";

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
  { id: 4, value: "Αθήνα" },
];

export const trype_heading = ["ΚΕΝΤΡΙΚΗ", "ΦΥΣΙΚΟ ΑΕΡΙΟ", "ΑΥΤΟΝΟΜΗ"];

interface IBuildingData {
  address: any
}


const BuildingData: React.FC<IBuildingData> = ({address}) => {
  return (
    <React.Fragment>
      <div className="row">
        <div className="col-md-3 mb-3">
          <SelectInputSearch
            label="Περιοχή :"
            className="custom-select"
            options={Cities}
          />
        </div>

        <div className="col-md-3 mb-3">
          <TextInput
            label="Οδός :"
            name="state"
            value={address.street}
            placeholder="Οδός..."
            idElement="validationCustom03"
            required={true}
          />
          <div className="invalid-feedback">
            Παρακαλώ εισάγετε μια έγκυρη διεύθυνση
          </div>
        </div>

        <div className="col-md-2 mb-1">
          <TextInput
            label="Αριθμός :"
            name="number"
            value={address.streetnumber}
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
            label="ΤΚ :"
            name="zip"
            value={address.postalCode}
            placeholder="ΤΚ"
            idElement="validationCustom05"
            required={true}
          />
          <div className="invalid-feedback">Παρακαλώ εισάγετε έγκυρο ΤΚ</div>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-md-2 mb-3">
          <TextInput
            label="Αποθεματικό :"
            name="reserve"
            value="1000$"
            placeholder="Αποθεματικό..."
            idElement="validationCustom04"
            required={true}
          />
          <div className="invalid-feedback">
            Παρακαλώ εισάγετε έγκυρο Αποθεματικό
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <TextInput
            label="Συμμετοχή Κλειστών :"
            name="closed"
            placeholder="Συμμετοχή Κλειστών..."
            idElement="validationCustom04"
            required={false}
          />
        </div>

        <div className="col-md-3 mb-3">
          <TextInput
            label="Πετρέλαιο Δεξαμενής :"
            name="oil"
            placeholder="Πετρέλαιο Δεξαμενής..."
            idElement="validationCustom04"
            required={false}
          />
        </div>

        <div className="col-md-3 mb-3">
          <TextInput
            label="Λίτρα Πετρ. ανά cm :"
            name="oil"
            placeholder="Λίτρα Πετρ. ανά cm..."
            idElement="validationCustom04"
            required={false}
          />
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-md-5 mb-3">
          <Checkbox id="energy" label="Θερμοώρες" required={false} />
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-md-4 mb-3">
          <RadioInput
            label="Είδος Θέρμανσης :"
            choices={trype_heading}
            type="radio"
            name="heating"
            required={true}
          />
          <div className="invalid-feedback">
            Παρακαλώ επιλέξτε είδος θέρμανσης
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default BuildingData;
