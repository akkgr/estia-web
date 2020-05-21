import React from "react";
import TextInput from "app/common/form/TextInput";
import TextArea from "app/common/form/TextArea";
import Checkbox from "app/common/form/Checkbox";

const BuildingPower = () => {
  return (
    <React.Fragment>
      <div className="row mt-3">
        <div className="col-md-2 mb-3">
          <TextInput
            label="Αριθμός Μετρητή :"
            name="counter"
            value="999999999"
            placeholder="Αριθμός Μετρητή..."
            idElement="validationCustom05"
            required={true}
          />
          <div className="invalid-feedback">
            Παρακαλώ εισάγετε έγκυρο Αριθμό Μετρητή
          </div>
        </div>

        <div className="col-md-2 mb-3">
          <TextInput
            label="Κωδικός Ηλεκτρ. Πληρωμής : "
            name="code"
            value="999999999"
            placeholder="Κωδικός Ηλεκτρ. Πληρωμής..."
            idElement="validationCustom05"
            required={true}
          />
          <div className="invalid-feedback">
            Παρακαλώ εισάγετε έγκυρο Αριθμό Μετρητή
          </div>
        </div>

        <div className="col-md-2 mb-3">
          <TextInput
            label="Αριθμός Παροχής :"
            name="receiver"
            value="999999999"
            placeholder="Αριθμός Παροχής..."
            idElement="validationCustom06"
            required={true}
          />
          <div className="invalid-feedback">
            Παρακαλώ εισάγετε έγκυρο Αριθμό Παροχής
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

export default BuildingPower;
