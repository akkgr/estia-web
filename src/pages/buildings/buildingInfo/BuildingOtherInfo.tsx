import React from "react";
import TextInput from "app/common/form/TextInput";

const BuildingOtherInfo = () => {
  return (
    <React.Fragment>
      <div className="row mt-5">
        <div className="col-md-4 mb-3">
          <TextInput
            type="text"
            label="Τοποθεσία :"
            name="location"
            placeholder="Τοποθεσία ..."
            invalidMessage="Συμπληρώστε την Τοποθεσία"
            required={true}
          />
        </div>

        <div className="col-md-4 mb-3">
          <TextInput
            type="text"
            label="Αιτιολογία :"
            name="bankReason"
            placeholder="Αιτιολογία ..."
            invalidMessage="Συμπληρώστε την Αιτιολογία"
            required={true}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default BuildingOtherInfo;
