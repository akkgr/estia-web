import React from "react";
import { useHistory } from "react-router-dom";

import ButtonSubmit from "app/common/buttons/ButtonSubmit";
import ButtonCancel from "app/common/buttons/ButtonCancel";
import ButtonDelete from "app/common/buttons/ButtonDelete";

import { AiOutlineSave as Save } from "react-icons/ai";
import { AiOutlineUndo as Cancel } from "react-icons/ai";
import { AiOutlineDelete as Delete } from "react-icons/ai";

interface IHeader {
  headerName?: string;
  subHeaderName?: string;
  returnUrl: string;
  disableSubmitButton?: boolean;
}

const PageΗeader: React.FC<IHeader> = ({
  returnUrl,
  children,
  disableSubmitButton
}) => {
  const history = useHistory();

  const cancel = (e: any) => {
    e.preventDefault();
    history.push(returnUrl);
  };

  return (
    <React.Fragment>
      <div className="row">
        <div className="col-10">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb" style={{ padding: "6px 15px" }}>
              {children}
            </ol>
          </nav>
        </div>
        <div className="col">
          <div className="row mx-auto">
            <div className="col-md-auto ">
              <ButtonSubmit
                message={<Save />}
                classname="btn btn-info"
                dataToggle="tooltip"
                dataPlacement="bottom"
                title="Αποθήκευση"
                disable={disableSubmitButton}
              />
            </div>
            <div className="col-md-auto">
              <ButtonCancel
                message={<Cancel />}
                onclick={(e) => cancel(e)}
                dataToggle="tooltip"
                dataPlacement="bottom"
                title="Ακύρωση"
              />
            </div>
            <div className="col-md-auto">
              <ButtonDelete
                message={<Delete />}
                onclick={(e) => e}
                dataToggle="tooltip"
                dataPlacement="bottom"
                title="Διαγραφή"
              />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default PageΗeader;
