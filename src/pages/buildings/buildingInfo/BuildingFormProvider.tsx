import React from "react";
import TextInput from "app/common/form/TextInput";
import TextArea from "app/common/form/TextArea";
import Checkbox from "app/common/form/Checkbox";
import { toast } from "react-toastify";
interface IProviderProps {
  setData: any;
  row?: any;
  data: any;
  setOpenForm: any;
  providerType: any;
}

const BuildingFormProvider: React.FC<IProviderProps> = ({
  setData,
  row,
  data,
  providerType,
  setOpenForm,
}) => {
  console.log(row);
  return (
    <React.Fragment>
      {/* <div>{JSON.stringify(providerPower)}</div> */}
      <form
        onSubmit={(e: React.SyntheticEvent) => {
          e.preventDefault();
          const target = e.target as typeof e.target & {
            providerType: { value: any };
            providerName: { value: string };
            contractNumber: { value: string };
            counterNumber: { value: string };
            paymentCode: { value: string };
            connectionNumber: { value: string };
            office: { value: boolean };
          };
          const providerName = target.providerName.value; // typechecks!
          const contractNumber = target.contractNumber.value; // typechecks!
          const counterNumber = target.counterNumber.value;
          const paymentCode = target.paymentCode.value;
          const connectionNumber = target.connectionNumber.value;
          const office = target.office.value;
          const submitedData = {
            providerType: providerType,
            providerName: providerName,
            contractNumber: contractNumber,
            counterNumber: counterNumber,
            paymentCode: paymentCode,
            connectionNumber: connectionNumber,
            office: office,
          };

          if (row.providerName !== "") {
            const existing = data.find(
              (f: any) => f.providerName === providerName
            );
            const replaced = data.slice();
            console.log("replaced" + replaced);
            replaced.splice(data.indexOf(existing), 1, submitedData);
            setData(replaced);
          } else {
            const existing = data.find(
              (f: any) => f.providerName === providerName
            );
            if (existing) {
              toast.error(
                "Ο ίδιος πάροχος υπάρχει ήδη.Ο πάροχος πρέπει να έχει μοναδικό όνομα!"
              );
            } else {
              setData([...data, submitedData]);
            }
          }
          setOpenForm(false);
        }}
        key={row.providerName}
      >
        <div className="row">
          <div className="col-md-3 mb-3">
            <TextInput
              type="text"
              label="Πάροχος :"
              name="providerName"
              value={row.providerName}
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
              name="contractNumber"
              value={row.contractNumber}
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
              name="counterNumber"
              value={row.counterNumber}
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
              name="paymentCode"
              value={row.paymentCode}
              placeholder="Κωδικός Ηλεκτρ. Πληρωμής..."
              required={true}
              // validMessage="Έγκυρος Κωδικός Ηλεκτρ. Πληρωμής"
              invalidMessage="Συμπληρώστε τον Κωδικό Ηλεκτρ. Πληρωμής"
            />
          </div>

          <div className="col-md-3 mb-3">
            <TextInput
              label={
                row.providerType === 3
                  ? "Αριθμός Σύνδεσης :"
                  : "Αριθμός Παροχής :"
              }
              name="connectionNumber"
              value={row.connectionNumber}
              placeholder={
                row.providerType === 3
                  ? "Αριθμός Σύνδεσης :"
                  : "Αριθμός Παροχής :"
              }
              required={true}
              // validMessage="Έγκυρος Αριθμός Παροχής"
              invalidMessage={
                row.providerType === 3
                  ? "Συμπληρώστε τον Αριθμό Σύνδεσης"
                  : "Συμπληρώστε τον Αριθμό Παροχής"
              }
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
              name="office"
              checked={row.office}
              label="Παραλαβή λογ. στο γραφείο"
              required={true}
            />
          </div>
        </div>
        <div>
          <input type="submit" value="ΠΡΟΣΘΗΚΗ" className="btn btn-primary" />
        </div>
      </form>
    </React.Fragment>
  );
};

export default BuildingFormProvider;
