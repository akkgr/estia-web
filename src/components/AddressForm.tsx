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
      <Row gutter={[8, 0]}>
        <Col span={16}>
          <Form.Item label="Οδός" name="street" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="Αριθός"
            name="streetnumber"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={16}>
          <Form.Item label="Περιοχή" name="area" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="Τ.Κ."
            name="postalCode"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};
