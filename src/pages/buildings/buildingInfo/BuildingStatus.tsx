import React from "react";
import Checkbox from "app/common/form/Checkbox";
import TextInput from "app/common/form/TextInput";

const BuildingStatus = () => {
  return (
    <React.Fragment>
      <div className="row mt-3">
        <div className="col-md-4 mb-3">
          <Checkbox label="Διαχείρηση" required={false} />
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-md-4 mb-3">
          <Checkbox label="Ενεργή" required={false} />
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-md-2 mb-3">
          <TextInput
            label="Ημερομηνία Παραλαβής :"
            name="startDate"
            value="21/05/2020"
            placeholder="Ημερομηνία Παραλαβής..."
            idElement="validationCustom04"
            required={true}
          />
          <div className="invalid-feedback">
            Παρακαλώ εισάγετε έγκυρη Ημερομηνία Παραλαβή
          </div>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-md-2 mb-3">
          <TextInput
            label="Ημερομηνία Παράδοσης"
            name="endDate"
            value="22/05/2020"
            placeholder="Ημερομηνία Παράδοσης..."
            idElement="validationCustom04"
            required={true}
          />
          <div className="invalid-feedback">
            Παρακαλώ εισάγετε έγκυρη Ημερομηνία Παράδοσης
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default BuildingStatus;
