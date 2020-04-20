import React from "react";
import { useHistory } from "react-router-dom";
import { Form, Button, Tooltip, Row, Col, Breadcrumb } from "antd";
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
    <>
      <Form name="actionsForm" layout={"vertical"} className="actionsBar">
        <Row gutter={[0, 0]}>
          <Col flex="auto">
            <Breadcrumb className="breadcrumb">{children}</Breadcrumb>
          </Col>
          <Col flex="42px">
            <Form.Item style={{ margin: "0 0" }}>
              <Tooltip title="Αποθήκευση">
                <Button
                  type="primary"
                  htmlType="submit"
                  shape="circle"
                  icon={<SaveOutlined />}
                />
              </Tooltip>
            </Form.Item>
          </Col>
          <Col flex="42px">
            <Form.Item style={{ margin: "0 0" }}>
              <Tooltip title="Ακύρωση">
                <Button
                  htmlType="button"
                  onClick={cancel}
                  shape="circle"
                  icon={<UndoOutlined />}
                />
              </Tooltip>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
};
