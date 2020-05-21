import React, { useState } from "react";
import Checkbox from "app/common/form/Checkbox";
import TextInput from "app/common/form/TextInput";
import { DateTimePicker } from "app/common/form/DateTimePicker";
const BuildingStatus = () => {
  const [startDate, setStartDate] = useState(new Date());
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
          <DateTimePicker
            startDate={startDate}
            setStartDate={setStartDate}
            showMonthDropdown={true}
            useShortMonthInDropdown={true}
          />
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-md-3 mb-3">
          <TextInput
            label="Ημερομηνία Παράδοσης :"
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
