import React from "react";
import TextInput from "app/common/form/TextInput";
import TextArea from "app/common/form/TextArea";
import Checkbox from "app/common/form/Checkbox";
import { Provider } from "app/models/Provider";

interface IProviderPhone {
  providerPhone: Provider
}

const BuildingPhone: React.FC<IProviderPhone> = ({ providerPhone }) => {
  return (
    <React.Fragment>
      {/* <div>{JSON.stringify(providerPower)}</div> */}
      <div className="row">
        <div className="col-md-3 mb-3">
          <TextInput
            type="text"
            label="Πάροχος :"
            name="providerNamePhone"
            value={providerPhone.providerName}
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
            name="contractNumberPhone"
            value={providerPhone.contractNumber}
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
            name="counterNumberPhone"
            value={providerPhone.counterNumber}
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
            name="paymentCodePhone"
            value={providerPhone.paymentCode}
            placeholder="Κωδικός Ηλεκτρ. Πληρωμής..."
            required={true}
            // validMessage="Έγκυρος Κωδικός Ηλεκτρ. Πληρωμής"
            invalidMessage="Συμπληρώστε τον Κωδικό Ηλεκτρ. Πληρωμής"
          />
        </div>

        <div className="col-md-3 mb-3">
          <TextInput
            label="Αριθμός Σύνδεσης :"
            name="connectionNumberPhone"
            value={providerPhone.connectionNumber}
            placeholder="Αριθμός Σύνδεσης..."
            required={true}
            // validMessage="Έγκυρος Αριθμός Παροχής"
            invalidMessage="Συμπληρώστε τον Αριθμό Σύνδεσης"
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
            checked={providerPhone.office}
            label="Παραλαβή λογ. στο γραφείο"
            required={true}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default BuildingPhone;
