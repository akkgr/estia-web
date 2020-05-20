import React from "react";
import { Form, Input } from "antd";
import { Person } from "../app/models/Person";

interface PersonFormProps {
  formName: string;
  data: Person;
}

export const PersonForm = ({ data, formName }: PersonFormProps) => {
  return (
    <Form name={formName} layout={"vertical"} initialValues={data}>
      <Form.Item label="Επώνυμο" name="lastName" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Όνομα" name="firstName" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item
        label="Τηλέφωνο"
        name="telephone"
        rules={[{ required: false }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="Κινητό" name="mobile" rules={[{ required: false }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Email" name="email" rules={[{ required: false }]}>
        <Input />
      </Form.Item>
    </Form>
  );
};
