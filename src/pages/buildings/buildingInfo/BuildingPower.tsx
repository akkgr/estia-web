import React from "react";
import TextInput from "app/common/form/TextInput";
import TextArea from "app/common/form/TextArea";
import Checkbox from "app/common/form/Checkbox";
import { Provider } from "app/models/Provider";

interface IProviderPower {
  providerPower: Provider;
}

const BuildingPower: React.FC<IProviderPower> = ({ providerPower }) => {
  return (
    <React.Fragment>
      {/* <div>{JSON.stringify(providerPower)}</div> */}
      <div className="row">
        <div className="col-md-3 mb-3">
          <TextInput
            type="text"
            label="Πάροχος :"
            name="providerNamePower"
            value={providerPower.providerName}
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
            name="contractNumberPower"
            value={providerPower.contractNumber}
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
            name="counterNumberPower"
            value={providerPower.counterNumber}
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
            name="paymentCodePower"
            value={providerPower.paymentCode}
            placeholder="Κωδικός Ηλεκτρ. Πληρωμής..."
            required={true}
            // validMessage="Έγκυρος Κωδικός Ηλεκτρ. Πληρωμής"
            invalidMessage="Συμπληρώστε τον Κωδικό Ηλεκτρ. Πληρωμής"
          />
        </div>

        <div className="col-md-3 mb-3">
          <TextInput
            label="Αριθμός Παροχής :"
            name="connectionNumberPower"
            value={providerPower.connectionNumber}
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
      </div>

      <div className="row mt-3">
        <div className="col-md-9 mb-3">
          <Checkbox
            name="officePower"
            checked={providerPower.office}
            label="Παραλαβή λογ. στο γραφείο"
            required={true}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default BuildingPower;
