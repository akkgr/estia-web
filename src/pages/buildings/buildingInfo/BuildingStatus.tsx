import React, { useState } from "react";
import Checkbox from "app/common/form/Checkbox";
import { DateTimePicker } from "app/common/form/DateTimePicker";

interface IDates {
  startDate: Date;
  endDate: Date;
}

const BuildingStatus: React.FC<IDates> = ({ startDate, endDate }) => {
  const [newStartDate, setStartDate] = useState(startDate);
  const [newEndDate, setEndDate] = useState(endDate);

  return (
    <React.Fragment>
      <div className="row mt-3">
        <div className="col-md-4 mb-3">
          <Checkbox id="manage" label="Διαχείρηση" required={false} />
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-md-4 mb-3">
          <Checkbox id="active" label="Ενεργή" required={false} />
        </div>
      </div>

      {/* <div>{JSON.stringify(startDate)}</div>
      <div>{JSON.stringify(endDate)}</div> */}
      <div className="row mt-3">
        <div className="col-md-2 mb-3">
          <DateTimePicker
            label="Ημερομηνία Παραλαβής :"
            startDate={newStartDate}
            selected={newStartDate}
            setStartDate={setStartDate}
            showMonthDropdown={true}
            useShortMonthInDropdown={true}
          />
        </div>
        <div className="invalid-feedback">
          Παρακαλώ εισάγετε έγκυρη Ημερομηνία Παράλαβής
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-md-3 mb-3">
          <DateTimePicker
            label="Ημερομηνία Παράδοσης :"
            startDate={newEndDate}
            setStartDate={setEndDate}
            showMonthDropdown={true}
            useShortMonthInDropdown={true}
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
