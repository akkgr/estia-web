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
            idElement="validationCustom05"
            required={false}
          />
          <div className="invalid-feedback">
            Παρακαλώ εισάγετε έγκυρο Αρ. μετρητή ΕΥΔΑΠ 
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <TextInput
            label="Αρ. μητρώου :"
            name="codeId"
            placeholder="Αρ. μητρώου.."
            idElement="validationCustom05"
            required={false}
          />
          <div className="invalid-feedback">
            Παρακαλώ εισάγετε έγκυρο Αρ. μητρώου
          </div>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-md-5 mb-3">
          <TextArea label="Επωνυμία :" rows={3} placeholder="Επωνυμία..." />
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-md-6 mb-3">
          <Checkbox label="Παραλαβή λογ. στο γραφείο" required={true} />
        </div>
      </div>
    </React.Fragment>
  );
};

export default BuildingWater;
