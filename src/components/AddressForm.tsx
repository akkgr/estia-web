import React from "react";
import { Form, Input, Row, Col } from "antd";
import { Address } from "../models/Address";

interface AddressFormProps {
  formName: string;
  data: Address;
}

export const AddressForm = ({ data, formName }: AddressFormProps) => {
  return (
    <Form name={formName} layout={"vertical"} initialValues={data}>
      <div>{JSON.stringify(data)}</div>
      <div>{JSON.stringify(formName)}</div>
      <Row gutter={[8, 0]}>
        <Col span={10}>
          <Form.Item label="Οδός" name="street" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={3}>
          <Form.Item
            label="Αριθός"
            name="streetnumber"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Περιοχή" name="area" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={3}>
          <Form.Item
            label="Τ.Κ."
            name="postalCode"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <button className="btn btn-primary" type="submit">Πληροφορίες Κτηρίου</button>
      </Row>
    </Form>
  );
};
