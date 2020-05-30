import React from "react";
import SelectInputSearch from "app/common/form/SelectInputSearch";
import TextInput from "app/common/form/TextInput";

export const HeatingTypes = [
  { id: 1, value: "Κεντρική Θέρμανση" },
  { id: 2, value: "Αυτόνομη - Πετρέλαιο" },
  { id: 3, value: "Αυτόνομη - Φυσικό Αέριο" },
];

const BuildingHeating = () => {
  return (
    <React.Fragment>
      <div className="row mt-5">
        <div className="col-md-4 mb-3">
          <SelectInputSearch
            label="Τύπος Θέρμανσης :"
            // value={address.area}
            name="heatingType"
            className="custom-select"
            options={HeatingTypes}
          />
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-md-3 mb-3">
          <TextInput
            type="number"
            label="Θερμοώρες :"
            name="energy"
            // min={0}
            // value={address.area}
            placeholder="Θερμοώρες ..."
            required={true}
            // validMessage="Έγκυρη Περιοχή"
            invalidMessage="Συμπληρώστε τις Θερμοώρες"
          />
        </div>

        <div className="col-md-3 mb-3">
          <TextInput
            type="number"
            label="Συμμετοχή Κλειστών :"
            name="closedPercent"
            // min={0}
            placeholder="Συμμετοχή Κλειστών..."
            required={true}
            prepend="%"
            // validMessage="Έγκυρη Περιοχή"
            invalidMessage="Συμπληρώστε το ποσοστό συμμετοχής των κλειστών διαμερισμάτων στην Κενρική Θέρμανση"
          />
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-md-3 mb-3">
          <TextInput
            type="number"
            label="Λίτρα Πετρ. ανά cm :"
            name="oilPerCm"
            // min={0}
            placeholder="Λίτρα Πετρ. ανά cm..."
            required={true}
            invalidMessage="Συμπληρώστε τα Λίτρα Πετρ. ανά cm"
          />
        </div>

        <div className="col-md-3 mb-3">
          <TextInput
            type="number"
            label="Πετρέλαιο Δεξαμενής :"
            name="oilInTank"
            // min={0}
            placeholder="Πετρέλαιο Δεξαμενής..."
            required={true}
            invalidMessage="Συμπληρώστε το Πετρέλαιο Δεξαμενής"
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default BuildingHeating;
