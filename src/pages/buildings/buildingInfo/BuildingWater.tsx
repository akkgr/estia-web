import React from "react";
import Checkbox from "app/common/form/Checkbox";
import TextInput from "app/common/form/TextInput";
import TextArea from "app/common/form/TextArea";
import { Provider } from "app/models/Provider";

interface IProviderWater {
  providerWater: Provider;
}

const BuildingWater: React.FC<IProviderWater> = ({ providerWater }) => {
  return (
    <React.Fragment>
      {/* <div>{JSON.stringify(providerWater)}</div> */}
      <div className="row">
        <div className="col-md-3 mb-3">
          <TextInput
            type="text"
            label="Πάροχος :"
            name="providerNameWater"
            value={providerWater.providerName}
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
            name="contractNumberWater"
            value={providerWater.contractNumber}
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
            name="counterNumberWater"
            value={providerWater.counterNumber}
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
            name="paymentCodeWater"
            value={providerWater.paymentCode}
            placeholder="Κωδικός Ηλεκτρ. Πληρωμής..."
            required={true}
            // validMessage="Έγκυρος Κωδικός Ηλεκτρ. Πληρωμής"
            invalidMessage="Συμπληρώστε τον Κωδικό Ηλεκτρ. Πληρωμής"
          />
        </div>

        <div className="col-md-3 mb-3">
          <TextInput
            label="Αριθμός Παροχής :"
            name="connectionNumberWater"
            value={providerWater.connectionNumber}
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
            name="officeWater"
            checked={providerWater.office}
            label="Παραλαβή λογ. στο γραφείο"
            required={true}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default BuildingWater;
