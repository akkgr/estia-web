import React from "react";
import SelectInputSearch from "app/common/form/SelectInputSearch";
import TextInput from "app/common/form/TextInput";
import Checkbox from "app/common/form/Checkbox";
export const HeatingTypes = [
  { value: "Κεντρική Θέρμανση", label: "Κεντρική Θέρμανση" },
  { value: "Αυτόνομη - Πετρέλαιο", label: "Αυτόνομη - Πετρέλαιο" },
  { value: "Αυτόνομη - Φυσικό Αέριο", label: "Αυτόνομη - Φυσικό Αέριο" },
];

interface IProps {
  litersPerCm?: string;
  setHeatingType?: any;
  caloriesCounter: boolean;
  closedApartmentParticipation: number;
}

const BuildingHeating: React.FC<IProps> = ({
  litersPerCm,
  setHeatingType,
  caloriesCounter,
  closedApartmentParticipation,
}) => {
  return (
    <React.Fragment>
      <div className="row mt-5">
        <div className="col-md-4 mb-3">
          <SelectInputSearch
            label="Τύπος Θέρμανσης :"
            setValueSelect={setHeatingType}
            name="heatingType"
            className="custom-select"
            options={HeatingTypes}
          />
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-md-3 mb-3" style={{ marginLeft: "20px" }}>
          <Checkbox
            label="Θερμοώρες"
            name="caloriesCounter"
            checked={caloriesCounter}
            required={true}
            invalidMessage="Συμπληρώστε τις Θερμοώρες"
          />
        </div>

        <div className="col-md-3 mb-3">
          <TextInput
            type="number"
            label="Συμμετοχή Κλειστών :"
            name="closedApartmentParticipation"
            value={closedApartmentParticipation}
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
            name="litersPerCm"
            min={0}
            value={litersPerCm}
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
            min={0}
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
