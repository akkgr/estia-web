import React from "react";
import SelectInputSearch from "app/common/form/SelectInputSearch";
import TextInput from "app/common/form/TextInput";
import RadioInput from "app/common/form/RadioInput";
import Checkbox from "app/common/form/Checkbox";

export const Cities = [
  { id: 1, value: "Παγκράτι" },
  { id: 2, value: "Μαρούσι" },
  { id: 3, value: "Πανόρμου" },
  { id: 4, value: "Αθήνα" },
];

export const trype_heading = ["ΚΕΝΤΡΙΚΗ", "ΦΥΣΙΚΟ ΑΕΡΙΟ", "ΑΥΤΟΝΟΜΗ"];

interface IBuildingData {
  address: any;
  admin?: string
}

const BuildingData: React.FC<IBuildingData> = ({ admin, address }) => {
  return (
    <React.Fragment>
      <div className="row">
        <div className="col-md-3 mb-3">
          <TextInput
            label="Στοιχεία Διαχειριστή  :"
            name="admin"
            value={admin}
            placeholder="Στοιχεία Διαχειριστή..."
            required={true}
            readOnly={true}
            disable={true}
          />
        </div>
        <div className="col-md-3 mb-3">
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
      <div className="row mt-3">
        <div className="col-md-3 mb-3">
          <SelectInputSearch
            label="Περιοχή :"
            value={address.area}
            name="area"
            className="custom-select"
            options={Cities}
          />
        </div>

        <div className="col-md-3 mb-3">
          <TextInput
            label="Οδός :"
            name="street"
            value={address.street}
            placeholder="Οδός..."
            required={true}
            validMessage="Έγκυρη Οδός"
            invalidMessage="Συμπληρώστε την Οδό"
          />
        </div>

        <div className="col-md-2 mb-1">
          <TextInput
            label="Αριθμός :"
            name="number"
            value={address.streetnumber}
            placeholder="Αριθμός"
            required={true}
            validMessage="Έγκυρος Αριθμός Οδού"
            invalidMessage="Συμπληρώστε τον Αριθμό της οδού"
          />
        </div>

        <div className="col-md-2 mb-3">
          <TextInput
            label="ΤΚ :"
            name="zip"
            value={address.postalCode}
            placeholder="ΤΚ"
            required={true}
            validMessage="Έγκυρος Ταχυδρομικός Κώδικας"
            invalidMessage="Συμπληρώστε τον Ταχυδρομικό Κώδικα"
          />
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-md-2 mb-3">
          <TextInput
            label="Αποθεματικό :"
            name="reserve"
            value="1000$"
            placeholder="Αποθεματικό..."
            required={true}
            validMessage="Έγκυρο Αποθεματικό"
            invalidMessage="Συμπληρώστε το Αποθεματικό"
          />
        </div>

        <div className="col-md-3 mb-3">
          <TextInput
            label="Συμμετοχή Κλειστών :"
            name="closed"
            placeholder="Συμμετοχή Κλειστών..."
          />
        </div>

        <div className="col-md-3 mb-3">
          <TextInput
            label="Πετρέλαιο Δεξαμενής :"
            name="oil"
            placeholder="Πετρέλαιο Δεξαμενής..."
          />
        </div>

        <div className="col-md-2 mb-3">
          <TextInput
            label="Λίτρα Πετρ. ανά cm :"
            name="oilPerCm"
            placeholder="Λίτρα Πετρ. ανά cm..."
          />
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-md-3 mb-3">
          <RadioInput
            label="Είδος Θέρμανσης :"
            choices={trype_heading}
            type="radio"
            name="heating"
            required={true}
          />
        </div>
      
        <div className="col-md-3 mb-3">
          <Checkbox name="energy" label="Θερμοώρες" />
        </div>
      </div>
    </React.Fragment>
  );
};

export default BuildingData;