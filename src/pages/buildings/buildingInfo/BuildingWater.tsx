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
            type="text"
            label="Αριθμός Παροχής :"
            name="codeWater"
            placeholder="Αριθμός Παροχής..."
            required={true}
            invalidMessage="Συμπληρώστε τον Αριθμό Παροχής"
          />
        </div>

        <div className="col-md-3 mb-3">
          <TextInput
            type="text"
            label="Αριθμός Μητρώου :"
            name="codeId"
            placeholder="Αριθμός Μητρώου.."
            required={true}
            invalidMessage="Συμπληρώστε τον Αριθμός Μητρώου"
          />
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-md-3 mb-3">
          <TextArea
            name="brandNameWater"
            label="Επωνυμία :"
            rows={4}
            placeholder="Επωνυμία..."
          />
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-md-4 mb-3">
          <Checkbox
            name="receiveWater"
            label="Παραλαβή λογ. στο γραφείο"
            required={true}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default BuildingWater;
