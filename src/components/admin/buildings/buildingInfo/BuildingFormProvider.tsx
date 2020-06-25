import React, { useRef, useState } from "react";
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
  const [office, setOffice] = useState<any>(row.office);
  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(office);
    const submitedData = {
      providerType: providerType,
      providerName: providerName.current.value,
      customerName: "thisCustomer", //need import in form field
      contractNumber: contractNumber.current.value,
      counterNumber: counterNumber.current.value,
      paymentCode: paymentCode.current.value,
      connectionNumber: connectionNumber.current.value,
      office: office,
      interval: 0, //need import in form field
      day: 1, //need import in form field
    };

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
      <div
        key={row.providerName}
        id={row.providerName}
        className={validation === true ? "was-validated" : "needs-validation"}
      >
        <div className="container">
          <div className="row">
            <div className="col">
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

            <div className="col">
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

            <div className="w-100"></div>

            <div className="col">
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

            <div className="col">
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

            <div className="w-100"></div>

            <div className="col">
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
            <div className="col">
              <div className=" custom-checkbox mb-3">
                <input
                  id="office"
                  type="checkbox"
                  value={office}
                  className="custom-control-input"
                  name="office"
                  required={true}
                  onClick={() => setOffice(!office)}
                />
                <label
                  className="custom-control-label"
                  htmlFor="office"
                  style={{ marginLeft: "25px" }}
                >
                  Παραλαβή λογ. στο γραφείο
                  {validation === true ? (
                    <div className="invalid-feedback">Συμπληρώστε το πεδίο</div>
                  ) : (
                    <div />
                  )}
                </label>
              </div>
            </div>

            <div className="w-100"></div>

            <div className="col-md-6 offset-md-3">
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
      </div>
    </React.Fragment>
  );
};

export default BuildingFormProvider;
