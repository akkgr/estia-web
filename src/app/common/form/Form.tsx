import React from "react";

interface IForm {
  sumbit: (event: any) => void;
  formElements: any;
}

const Form: React.FC<IForm> = ({ sumbit, formElements }) => {
  return (
    <React.Fragment>
      <form className="needs-validation" noValidate onSubmit={sumbit}>
        {formElements}
      </form>
    </React.Fragment>
  );
};

export default Form;