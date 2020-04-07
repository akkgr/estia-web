import React from "react";
import { Form, Input, Collapse, Button, Space } from "antd";

const { Panel } = Collapse;

const formLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

export const Address = (props: any) => {
  const [form] = Form.useForm();
  const { data } = props;

  const onReset = () => {
    form.resetFields();
  };

  const onFinish = (values: any) => {
    props.update(values);
  };

  return (
    <>
      <Collapse expandIconPosition={"right"}>
        <Panel
          header={`Διεύθυνση: ${data.street} ${data.streetnumber}, ${data.area} ${data.postalCode}`}
          key="1"
        >
          <Form
            form={form}
            layout={"horizontal"}
            {...formLayout}
            initialValues={data}
            onFinish={onFinish}
          >
            <Form.Item label="Οδός" name="street" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item
              label="Αριθός"
              name="streetnumber"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item label="Περιοχή" name="area" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item
              label="Τ.Κ."
              name="postalCode"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item {...tailLayout}>
              <Space>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
                <Button htmlType="button" onClick={onReset}>
                  Reset
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Panel>
      </Collapse>
    </>
  );
};
