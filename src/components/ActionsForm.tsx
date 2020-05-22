import React from "react";
import { useHistory } from "react-router-dom";
import { Form } from "antd";
import { SaveOutlined, UndoOutlined } from "@ant-design/icons";

interface ActionsFormProps {
  returnUrl: string;
}

export const ActionsForm = ({
  returnUrl,
  children,
}: React.PropsWithChildren<ActionsFormProps>) => {
  const history = useHistory();
  const cancel = () => {
    history.push(returnUrl);
  };

  return (
    <div className="row">
      <div className="col-11">
        <nav>
          <ol className="breadcrumb" style={{ padding: "6px 15px" }}>
            <li className="breadcrumb-item active" aria-current="page">
              {children}
            </li>
          </ol>
        </nav>
      </div>
      <div className="col ">
        <Form name="actionsForm">
          <div className="row mx-auto">
            <div className="col">
              <Form.Item>
                <button
                  className="btn btn-info"
                  type="submit"
                  data-toggle="tooltip"
                  data-placement="bottom"
                  title="Αποθήκευση"
                >
                  <SaveOutlined />
                </button>
              </Form.Item>
            </div>
            <div className="col">
              <Form.Item>
                <button
                  className="btn btn-danger"
                  type="button"
                  onClick={cancel}
                  data-toggle="tooltip"
                  data-placement="bottom"
                  title="Ακύρωση"
                >
                  <UndoOutlined />
                </button>
              </Form.Item>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};
