import React from "react";
import TextInput from "app/common/form/TextInput";
import TextArea from "app/common/form/TextArea";
import Checkbox from "app/common/form/Checkbox";

const BuildingPhone = () => {
  return (
    <React.Fragment>
      <div className="row mt-5">
        <div className="col-md-3 mb-3">
          <TextInput
            type="text"
            label="Πάροχος :"
            name="phoneSupplier"
            value="Cosmote"
            placeholder="Πάροχος..."
            required={true}
            // validMessage="Έγκυρος Αριθμός Μετρητή"
            invalidMessage="Συμπληρώστε τον Πάροχο"
          />
        </div>

        <div className="col-md-3 mb-3">
          <TextInput
            type="text"
            label="Αριθμός Σύνδεσης :"
            name="connectionPhoneId"
            // value="ΔΕΗ"
            placeholder="Αριθμός Σύνδεσης..."
            required={true}
            // validMessage="Έγκυρος Αριθμός Μετρητή"
            invalidMessage="Συμπληρώστε τον Αριθμός Σύνδεσης"
          />
        </div>
      </div>

      <div className="row mt-5">
        

        <div className="col-md-3 mb-3">
          <TextInput
            type="text"
            label="Αριθμός Συμβολαίου :"
            name="contractPhoneId"
            // value="999999999"
            placeholder="Αριθμός Συμβολαίου..."
            required={true}
            // validMessage="Έγκυρος Αριθμός Παροχής"
            invalidMessage="Συμπληρώστε τον Αριθμό Συμβολαίου"
          />
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-md-3 mb-3">
          <TextArea
            name="brandNamePhone"
            label="Επωνυμία :"
            rows={4}
            placeholder="Επωνυμία..."
          />
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-md-4 mb-3">
          <Checkbox
            name="receiveDeskPhone"
            label="Παραλαβή λογ. στο γραφείο"
            required={true}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default BuildingPhone;
