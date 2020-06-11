import React from "react";
import Checkbox from "app/common/form/Checkbox";
import { DateTimePicker } from "app/common/form/DateTimePicker";

interface IDates {
  startDate: Date;
  endDate: Date;
  setStartDate: any;
  setEndDate: any;
  management: boolean;
  active: boolean;
}

const BuildingStatus: React.FC<IDates> = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  management,
  active,
}) => {
  return (
    <React.Fragment>
      <div className="row mt-5" style={{ marginLeft: "10px" }}>
        <div className="col-md-2 mb-3">
          <Checkbox
            name="management"
            label="Διαχείρηση"
            checked={management}
            required={true}
          />
        </div>
        <div className="col-md-2 mb-3">
          <Checkbox
            name="active"
            label="Ενεργή"
            checked={active}
            required={true}
          />
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-md-2 mb-3">
          <DateTimePicker
            label="Ημερομηνία Παραλαβής :"
            startDate={startDate}
            selected={startDate}
            setStartDate={setStartDate}
            name="startDate"
          />
        </div>
        {/* <div classNameName="invalid-feedback">
          Παρακαλώ εισάγετε έγκυρη Ημερομηνία Παράλαβής
        </div> */}

        <div className="col-md-2 mb-3">
          <DateTimePicker
            label="Ημερομηνία Παράδοσης :"
            startDate={endDate}
            selected={endDate}
            setStartDate={setEndDate}
            name="endDate"
          />
        </div>

        {/* <div classNameName="invalid-feedback">
            Παρακαλώ εισάγετε έγκυρη Ημερομηνία Παράδοσης
          </div> */}
      </div>
    </React.Fragment>
  );
};

export default BuildingStatus;
