import React from "react";
import Checkbox from "app/common/form/Checkbox";
import TextInput from "app/common/form/TextInput";
import TextArea from "app/common/form/TextArea";

const BuildingWater = () => {
  return (
    <React.Fragment>
      <div className="row mt-3">
        <div className="col-md-3 mb-3">
          <TextInput
            label="Αρ. μετρητή ΕΥΔΑΠ :"
            name="codeWater"
            placeholder="Αρ. μετρητή ΕΥΔΑΠ ..."
          />
        </div>

        <div className="col-md-3 mb-3">
          <TextInput
            label="Αρ. μητρώου :"
            name="codeId"
            placeholder="Αρ. μητρώου.."
          />
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-md-3 mb-3">
          <TextArea name="brandNameWater" label="Επωνυμία :" rows={4} placeholder="Επωνυμία..." />
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-md-4 mb-3">
          <Checkbox name="receiveWater" label="Παραλαβή λογ. στο γραφείο" required={true} />
        </div>
      </div>
    </React.Fragment>
  );
};

export default BuildingWater;
