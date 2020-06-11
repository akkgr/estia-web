import React from "react";
import TextInput from "app/common/form/TextInput";

interface IOtherInfo {
  bankReason: string;
}

const BuildingOtherInfo: React.FC<IOtherInfo> = ({ bankReason }) => {
  return (
    <React.Fragment>
      <div className="row mt-5">
        <div className="col-md-4 mb-3">
          <TextInput
            type="text"
            label="Τράπεζα/Αιτιολογία :"
            value={bankReason}
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
