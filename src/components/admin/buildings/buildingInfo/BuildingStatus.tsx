import React from "react";
import Checkbox from "app/common/form/Checkbox";
import { DateTimePicker } from "app/common/form/DateTimePicker";
import { Building } from "app/models/Building";
interface IDates {
  startDate: Date;
  endDate: Date;
  setStartDate: any;
  setEndDate: any;
  data: Building;
}

const BuildingStatus: React.FC<IDates> = ({
  data,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}) => {
  return (
    <React.Fragment>
      <div className="row">
        <div className="col-md-2 mb-3">
          <Checkbox
            name="management"
            label="Διαχείρηση"
            checked={data?.management}
          />
        </div>
        <div className="col-md-2 mb-3">
          <Checkbox name="active" label="Ενεργή" checked={data?.active} />
        </div>
      </div>
      <div className="row">
        <div className="col-md-2 mb-3">
          <DateTimePicker
            label="Ημερομηνία Παραλαβής :"
            startDate={startDate}
            selected={startDate}
            setStartDate={setStartDate}
            name="startDate"
          />
        </div>
        <div className="col-md-2 mb-3">
          <DateTimePicker
            label="Ημερομηνία Παράδοσης :"
            startDate={endDate}
            selected={endDate}
            setStartDate={setEndDate}
            name="endDate"
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default BuildingStatus;
