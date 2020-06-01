import React from "react";
import TextInput from "app/common/form/TextInput";
import TextArea from "app/common/form/TextArea";
import Checkbox from "app/common/form/Checkbox";

const BuildingPower = () => {
  return (
    <React.Fragment>
      <div className="row mt-5">
        <div className="col-md-3 mb-3">
          <TextInput
            type="text"
            label="Πάροχος :"
            name="powerSupplier"
            value="ΔΕΗ"
            placeholder="Πάροχος..."
            required={true}
            // validMessage="Έγκυρος Αριθμός Μετρητή"
            invalidMessage="Συμπληρώστε τον Πάροχο"
          />
        </div>

        <div className="col-md-3 mb-3">
          <TextInput
            type="text"
            label="Αριθμός Συμβολαίου :"
            name="contractId"
            // value="ΔΕΗ"
            placeholder="Αριθμός Συμβολαίου..."
            required={true}
            // validMessage="Έγκυρος Αριθμός Μετρητή"
            invalidMessage="Συμπληρώστε τον Αριθμό Συμβολαίου"
          />
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-md-3 mb-3">
          <TextInput
            type="text"
            label="Αριθμός Μετρητή :"
            name="counter"
            // value="999999999"
            placeholder="Αριθμός Μετρητή..."
            required={true}
            // validMessage="Έγκυρος Αριθμός Μετρητή"
            invalidMessage="Συμπληρώστε τον Αριθμό Μετρητή"
          />
        </div>

        <div className="col-md-3 mb-3">
          <TextInput
            type="text"
            label="Κωδικός Ηλεκτρ. Πληρωμής : "
            name="code"
            // value="999999999"
            placeholder="Κωδικός Ηλεκτρ. Πληρωμής..."
            required={true}
            // validMessage="Έγκυρος Κωδικός Ηλεκτρ. Πληρωμής"
            invalidMessage="Συμπληρώστε τον Κωδικό Ηλεκτρ. Πληρωμής"
          />
        </div>

        <div className="col-md-3 mb-3">
          <TextInput
            label="Αριθμός Παροχής :"
            name="receiveNumber"
            // value="999999999"
            placeholder="Αριθμός Παροχής..."
            required={true}
            // validMessage="Έγκυρος Αριθμός Παροχής"
            invalidMessage="Συμπληρώστε τον Αριθμό Παροχής"
          />
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-md-3 mb-3">
          <TextArea
            name="brandNamePower"
            label="Επωνυμία :"
            rows={4}
            placeholder="Επωνυμία..."
          />
        </div>

        <div className="col-md-9 mb-3">
          <Checkbox
            name="receiveDeskPower"
            label="Παραλαβή λογ. στο γραφείο"
            required={true}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default BuildingPower;
