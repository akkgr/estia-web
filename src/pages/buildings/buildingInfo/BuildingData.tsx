import React, { useState } from "react";
import TextInput from "app/common/form/TextInput";
import { DateTimePicker } from "app/common/form/DateTimePicker";

interface IBuildingData {
  id: string;
  address: any;
  admin?: string;
  startDate: Date;
  endDate: Date;
  setStartDate:any;
  setEndDate:any;
  reserve: number;
}

const BuildingData: React.FC<IBuildingData> = ({
  id,
  admin,
  address,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  reserve,
}) => {
  return (
    <React.Fragment>
      <div className="row">
        <div className="col-md-3 mb-2">
          <TextInput
            type="text"
            label="Αναγνωριστικό Kτιρίου  :"
            name="buildId"
            value={id}
            required={true}
            readOnly={true}
            disable={true}
          />
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-md-2 mb-3">
          <TextInput
            type="text"
            label="Περιοχή :"
            name="area"
            value={address.area}
            placeholder="Περιοχή ..."
            required={true}
            // validMessage="Έγκυρη Περιοχή"
            invalidMessage="Συμπληρώστε την Περιοχή"
          />
        </div>

        <div className="col-md-2 mb-3">
          <TextInput
            type="text"
            label="Οδός :"
            name="street"
            value={address.street}
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
            value={address.streetNumber}
            placeholder="Αριθμός"
            required={true}
            // validMessage="Έγκυρος Αριθμός Οδού"
            invalidMessage="Συμπληρώστε τον Αριθμό της οδού"
          />
        </div>

        <div className="col-md-2 mb-3">
          <TextInput
            type="text"
            label="ΤΚ :"
            name="postalCode"
            value={address.postalCode}
            placeholder="ΤΚ"
            required={true}
            // validMessage="Έγκυρος Ταχυδρομικός Κώδικας"
            invalidMessage="Συμπληρώστε τον Ταχυδρομικό Κώδικα"
          />
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-md-2 mb-3">
          <TextInput
            type="text"
            label="Διαχείρηση :"
            name="management"
            value={admin}
            placeholder="Διαχείρηση..."
            required={true}
            // validMessage="Συμπληρώσατε τη Διαχείρηση"
            invalidMessage="Συμπληρώστε τη Διαχείρηση"
          />
        </div>
        <div className="col-md-2 mb-3">
          <TextInput
            type="number"
            label="Αποθεματικό :"
            name="reserve"
            value={reserve}
            placeholder="Αποθεματικό..."
            required={true}
            invalidMessage="Συμπληρώστε το Αποθεματικό"
          />
        </div>

        <div className="col-md-2 mb-3">
          <DateTimePicker
            label="Ημερομηνία Παραλαβής :"
            startDate={startDate}
            selected={startDate}
            setStartDate={setStartDate}
            name="startDate"
            showMonthDropdown={true}
            useShortMonthInDropdown={true}
          />
        </div>

        <div className="col-md-2 mb-3">
          <DateTimePicker
            label="Ημερομηνία Παράδοσης :"
            startDate={endDate}
            selected={endDate}
            setStartDate={setEndDate}
            name="startDate"
            showMonthDropdown={true}
            useShortMonthInDropdown={true}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default BuildingData;
