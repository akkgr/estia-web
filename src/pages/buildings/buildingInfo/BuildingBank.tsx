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
            validMessage="Έγκυρο Όνομα Τράπεζας/Αιτιολογίας"
            invalidMessage="Συμπληρώστε το Όνομα Τράπεζας/Αιτιολογίας"
            required={true}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default BuildingBank;
