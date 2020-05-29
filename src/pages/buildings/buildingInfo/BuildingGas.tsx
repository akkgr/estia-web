import React from "react";
import TextInput from "app/common/form/TextInput";
import TextArea from "app/common/form/TextArea";
import Checkbox from "app/common/form/Checkbox";

const BuildingGas = () => {
  return (
    <React.Fragment>
      <div className="row mt-3">
        <div className="col-md-3 mb-3">
          <TextInput
            label="Κωδικός πελάτη :"
            name="codeCustomer"
            placeholder="Κωδικός πελάτη.."
          />
        </div>

        <div className="col-md-3 mb-3">
          <TextInput
            label="Κωδικός πληρωμής :"
            name="codePayment"
            placeholder="Κωδικός πληρωμής.."
          />
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-md-3 mb-3">
          <TextArea name="brandNameGas" label="Επωνυμία :" rows={4} placeholder="Επωνυμία..." />
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-md-6 mb-3">
          <Checkbox name="receiveGas" label="Παραλαβή λογ. στο γραφείο" required={true} />
        </div>
      </div>
    </React.Fragment>
  );
};

export default BuildingGas;