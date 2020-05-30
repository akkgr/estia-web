import React from "react";
import TextInput from "app/common/form/TextInput";
import TextArea from "app/common/form/TextArea";
import Checkbox from "app/common/form/Checkbox";

const BuildingGas = () => {
  return (
    <React.Fragment>
      <div className="row mt-5">
        <div className="col-md-3 mb-3">
          <TextInput
            type="text"
            label="Κωδικός πελάτη :"
            name="codeCustomer"
            placeholder="Κωδικός πελάτη..."
            required={true}
            invalidMessage="Συμπληρώστε τον Κωδικό του Πελάτη"
          />
        </div>

        <div className="col-md-3 mb-3">
          <TextInput
            type="text"
            label="Κωδικός Ηλεκτρονικής πληρωμής :"
            name="codePayment"
            placeholder="Κωδικός Ηλεκτρονικής πληρωμής..."
            required={true}
            invalidMessage="Συμπληρώστε τον Κωδικό Ηλεκτρονικής πληρωμής"
          />
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-md-3 mb-3">
          <TextArea
            name="brandNameGas"
            label="Επωνυμία :"
            rows={4}
            placeholder="Επωνυμία..."
          />
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-md-6 mb-3">
          <Checkbox
            name="receiveGas"
            label="Παραλαβή λογ. στο γραφείο"
            required={true}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default BuildingGas;
