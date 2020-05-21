import React from "react";
import TextInput from "app/common/form/TextInput";

const BuildingBank = () => {
  return (
    <React.Fragment>
      <div className="row">
        <div className="col-md-4 mb-3">
          <TextInput
            label="Όνομα Τράπεζας/Αιτιολογίας :"
            name="bankName"
            value="ESTIACITYSERVICES"
            placeholder="Όνομα Τράπεζας/Αιτιολογίας ..."
            idElement="validationCustom05"
            required={true}
          />
          <div className="invalid-feedback">Παρακαλώ εισάγετε έγκυρο Όνομα Τράπεζας/Αιτιολογίας</div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default BuildingBank;
