import React from "react";
import TextInput from "app/common/form/TextInput";
import TextArea from "app/common/form/TextArea";
import Checkbox from "app/common/form/Checkbox";
import { Provider } from "app/models/Provider";

interface IProviderGas {
  providerGas: Provider;
}


const BuildingGas: React.FC<IProviderGas> = ({ providerGas }) => {
  return (
    <React.Fragment>
      <div className="row">
        <div className="col-md-3 mb-3">
          <TextInput
            type="text"
            label="Πάροχος :"
            name="providerNameGas"
            value={providerGas.providerName}
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
            name="contractNumberGas"
            value={providerGas.contractNumber}
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
            name="counterNumberGas"
            value={providerGas.counterNumber}
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
            name="paymentCodeGas"
            value={providerGas.paymentCode}
            placeholder="Κωδικός Ηλεκτρ. Πληρωμής..."
            required={true}
            // validMessage="Έγκυρος Κωδικός Ηλεκτρ. Πληρωμής"
            invalidMessage="Συμπληρώστε τον Κωδικό Ηλεκτρ. Πληρωμής"
          />
        </div>

        <div className="col-md-3 mb-3">
          <TextInput
            label="Αριθμός Παροχής :"
            name="connectionNumberGas"
            value={providerGas.connectionNumber}
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
            name="brandNameGas"
            label="Επωνυμία :"
            rows={4}
            placeholder="Επωνυμία..."
          />
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-md-9 mb-3">
          <Checkbox
            name="officeGas"
            checked={providerGas.office}
            label="Παραλαβή λογ. στο γραφείο"
            required={true}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default BuildingGas;
