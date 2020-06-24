import React from "react";
import { useHistory } from "react-router-dom";
import { SaveOutlined, UndoOutlined } from "@ant-design/icons";

interface ActionsFormProps {
  returnUrl: string;
  showSubmitButton?: any;
}

export const ActionsForm: React.FC<ActionsFormProps> = ({
  returnUrl,
  children,
  showSubmitButton,
}) => {
  const history = useHistory();

  const cancel = (e: any) => {
    e.preventDefault();
    history.push(returnUrl);
  };

  return (
    <React.Fragment>
      <div className="row">
        <div className="col-11">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb" style={{ padding: "6px 15px" }}>
              {children}
            </ol>
          </nav>
        </div>
        <div className="col ">
          <div className="row mx-auto">
            {showSubmitButton && (
              <div className="col">
                <button
                  className="btn btn-info"
                  type="submit"
                  data-toggle="tooltip"
                  data-placement="bottom"
                  title="Αποθήκευση"
                >
                  <SaveOutlined />
                </button>
              </div>
            )}

            <div className="col">
              <button
                className="btn btn-danger"
                type="button"
                onClick={(e) => cancel(e)}
                data-toggle="tooltip"
                data-placement="bottom"
                title="Ακύρωση"
              >
                <UndoOutlined />
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
