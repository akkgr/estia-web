import React, { useRef, useState } from "react";
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
  const [validation, setValidation] = useState(false);
  const providerName = useRef(row.providerName);
  const contractNumber = useRef(row.contractNumber);
  const counterNumber = useRef(row.counterNumber);
  const paymentCode = useRef(row.paymentCode);
  const connectionNumber = useRef(row.connectionNumber);
  const office = useRef(row.office);
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const submitedData = {
      providerType: providerType,
      providerName: providerName.current.value,
      contractNumber: contractNumber.current.value,
      counterNumber: counterNumber.current.value,
      paymentCode: paymentCode.current.value,
      connectionNumber: connectionNumber.current.value,
      office: office.current.value,
    };
    console.log("office", office);
    console.log(providerName.current.value);
    if (
      providerName.current.value === "" ||
      contractNumber.current.value === "" ||
      counterNumber.current.value === "" ||
      paymentCode.current.value === "" ||
      connectionNumber.current.value === ""
    ) {
      setValidation(true);
      return false;
    }
    if (row.providerName !== "") {
      const existing = data.find(
        (f: any) => f.providerName === providerName.current.value
      );
      const replaced = data.slice();
      console.log("replaced" + replaced);
      replaced.splice(data.indexOf(existing), 1, submitedData);
      setData(replaced);
    } else {
      const existing = data.find(
        (f: any) => f.providerName === providerName.current.value
      );
      console.log("existing:" + existing);
      if (existing) {
        toast.error(
          "Ο ίδιος πάροχος υπάρχει ήδη.Ο πάροχος πρέπει να έχει μοναδικό όνομα!"
        );
      } else {
        setData([...data, submitedData]);
      }
    }
    setOpenForm(false);
  };
  return (
    <React.Fragment>
      {/* <div>{JSON.stringify(providerPower)}</div> */}
      <div key={row.providerName} id={row.providerName}>
        <div className="row">
          <div className="col-md-3 mb-3">
            <input
              defaultValue={row.providerName}
              ref={providerName}
              type="text"
              placeholder="Πάροχος..."
              className="form-control"
              required={true}
            />
            {validation === true && (
              <div className="invalid-feedback">Συμπληρώστε τον Πάροχο</div>
            )}
          </div>

          <div className="col-md-3 mb-3">
            <input
              type="text"
              defaultValue={row.contractNumber}
              ref={contractNumber}
              name="contractNumber"
              placeholder="Αριθμός Συμβολαίου..."
              required={true}
              className="form-control"
            />
            {validation === true && (
              <div className="invalid-feedback">
                Συμπληρώστε τον Αριθμό Συμβολαίου
              </div>
            )}
          </div>

          <div className="row mt-3">
            <div className="col-md-3 mb-3">
              <input
                type="text"
                defaultValue={row.counterNumber}
                ref={counterNumber}
                name="counterNumber"
                placeholder="Αριθμός Μετρητή..."
                required={true}
                className="form-control"
              />
              {validation === true && (
                <div className="invalid-feedback">
                  Συμπληρώστε τον Αριθμό Μετρητή
                </div>
              )}
            </div>

            <div className="col-md-3 mb-3">
              <input
                type="text"
                defaultValue={row.paymentCode}
                ref={paymentCode}
                name="counterNumber"
                placeholder="Κωδικός Ηλεκτρ. Πληρωμής..."
                required={true}
                className="form-control"
              />
              {validation === true && (
                <div className="invalid-feedback">
                  Συμπληρώστε τον Κωδικό Ηλεκτρ. Πληρωμής
                </div>
              )}
            </div>

            <div className="col-md-3 mb-3">
              <input
                defaultValue={row.connectionNumber}
                ref={connectionNumber}
                placeholder={
                  row.providerType === 3
                    ? "Αριθμός Σύνδεσης :"
                    : "Αριθμός Παροχής :"
                }
                required={true}
                className="form-control"
              />
              {validation === true && (
                <div className="invalid-feedback">
                  {row.providerType === 3
                    ? "Συμπληρώστε τον Αριθμό Σύνδεσης"
                    : "Συμπληρώστε τον Αριθμό Παροχής"}
                </div>
              )}
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-md-9 mb-3">
              <div className=" custom-checkbox mb-3">
                <input
                  id="office"
                  type="checkbox"
                  defaultChecked={row.office}
                  className="custom-control-input"
                  name="office"
                  required={true}
                  ref={office}
                />
                <label className="custom-control-label" htmlFor="office">
                  Παραλαβή λογ. στο γραφείο
                  {validation === true ? (
                    <div className="invalid-feedback">Συμπληρώστε το πεδίο</div>
                  ) : (
                    <div />
                  )}
                </label>
              </div>
            </div>
          </div>
          <div>
            <input
              type="submit"
              value="ΠΡΟΣΘΗΚΗ"
              id="innerButton1"
              className="btn btn-primary"
              onClick={(e) => handleSubmit(e)}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default BuildingFormProvider;
