import React from "react";
import SelectInputSearch from "app/common/form/SelectInputSearch";
import TextInput from "app/common/form/TextInput";
import Checkbox from "app/common/form/Checkbox";
import { Building } from "app/models/Building";
export const HeatingTypes = [
  { value: 0, label: "Κεντρική Θέρμανση" },
  { value: 1, label: "Αυτόνομη - Πετρέλαιο" },
  { value: 2, label: "Αυτόνομη - Φυσικό Αέριο" },
];

interface IProps {
  data: Building;
  setHeatingType?: any;
  heatingType?: number;
}

const BuildingHeating: React.FC<IProps> = ({
  data,
  setHeatingType,
  heatingType,
}) => {
  return (
    <React.Fragment>
      <div className="row">
        <div className="col-md-4 mb-3">
          <SelectInputSearch
            defaultvalue={{
              value: heatingType,
              label:
                heatingType === 0
                  ? "Κεντρική Θέρμανση"
                  : heatingType === 1
                  ? "Αυτόνομη - Πετρέλαιο"
                  : "Αυτόνομη - Φυσικό Αέριο",
            }}
            label="Τύπος Θέρμανσης :"
            setValueSelect={setHeatingType}
            value={heatingType}
            name="heatingType"
            className="custom-select"
            options={HeatingTypes}
          />
        </div>
        <div className="col-md-9 mb-10">
          <Checkbox
            label="Θερμοώρες"
            name="caloriesCounter"
            checked={data?.caloriesCounter}
            invalidMessage="Συμπληρώστε τις Θερμοώρες"
          />
        </div>
      </div>

      <div className="row mt-2">
        <div className="col-md-3 mb-3">
          <TextInput
            type="number"
            label="Συμμετοχή Κλειστών :"
            name="closedApartmentParticipation"
            value={data?.closedApartmentParticipation}
            // min={0}
            placeholder="Συμμετοχή Κλειστών..."
            required={true}
            prepend="%"
            // validMessage="Έγκυρη Περιοχή"
            invalidMessage="Συμπληρώστε το ποσοστό συμμετοχής των κλειστών διαμερισμάτων στην Κενρική Θέρμανση"
          />
        </div>
        <div className="col-md-3 mb-3">
          <TextInput
            type="number"
            label="Λίτρα Πετρ. ανά cm :"
            name="litersPerCm"
            min={0}
            value={data?.litersPerCm}
            placeholder="Λίτρα Πετρ. ανά cm..."
            required={true}
            invalidMessage="Συμπληρώστε τα Λίτρα Πετρ. ανά cm"
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default BuildingHeating;
