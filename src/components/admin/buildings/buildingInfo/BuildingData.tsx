import React from "react";
import TextInput from "app/common/form/TextInput";
import { Person } from "app/models/Person";
import { Building } from "app/models/Building";

const BuildingData: React.FC<{ data: Building }> = ({ data }) => {
  const handleManagersShow = (managers: Person[]) => {
    if (managers === undefined) {
      return "Δεν εχει οριστεί διαχειριστής";
    } else {
      if (managers.length > 0) {
        const manager = managers.map((m, index) => {
          console.log(m.fatherName);
          return `${m.lastName} ${m.firstName} (${m.mobile})`;
        });
        return manager;
      } else {
        return "Δεν υπάρχει διαχειριστής";
      }
    }
  };
  return (
    <React.Fragment>
      <div className="row">
        <div className="col-md-10 mb-3">
          <TextInput
            type="text"
            label="Στοιχεία Διαχειριστή:"
            name="managerShow"
            value={handleManagersShow(data?.managers)}
            required={true}
            readOnly={true}
            disable={true}
          />
        </div>
      </div>
      <div className="row mt-2">
        <div className="col-md-4 mb-3">
          <TextInput
            type="text"
            label="Περιοχή :"
            name="area"
            value={data?.address.area}
            placeholder="Περιοχή ..."
            required={true}
            // validMessage="Έγκυρη Περιοχή"
            invalidMessage="Συμπληρώστε την Περιοχή"
          />
        </div>

        <div className="col-md-4 mb-3">
          <TextInput
            type="text"
            label="Οδός :"
            name="street"
            value={data?.address.street}
            placeholder="Οδός..."
            required={true}
            // validMessage="Έγκυρη Οδός"
            invalidMessage="Συμπληρώστε την Οδό"
          />
        </div>

        <div className="col-md-2 mb-1">
          <TextInput
            type="text"
            label="Αριθμός :"
            name="streetNumber"
            value={data?.address.streetNumber}
            placeholder="Αριθμός"
            required={true}
            // validMessage="Έγκυρος Αριθμός Οδού"
            invalidMessage="Συμπληρώστε τον Αριθμό της οδού"
          />
        </div>
      </div>

      <div className="row mt-2">
        <div className="col-md-2 mb-3">
          <TextInput
            type="number"
            label="Αποθεματικό :"
            name="reserve"
            value={data?.reserve}
            placeholder="Αποθεματικό..."
            required={true}
            invalidMessage="Συμπληρώστε το Αποθεματικό"
          />
        </div>
        <div className="col-md-4 mb-3">
          <TextInput
            type="text"
            label="ΤΚ :"
            name="postalCode"
            value={data?.address.postalCode}
            placeholder="ΤΚ"
            required={true}
            // validMessage="Έγκυρος Ταχυδρομικός Κώδικας"
            invalidMessage="Συμπληρώστε τον Ταχυδρομικό Κώδικα"
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default BuildingData;
