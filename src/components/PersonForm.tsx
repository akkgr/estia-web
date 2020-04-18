import React from "react";
import { Form, Input } from "antd";

export const PersonForm = (props: any) => {
  return (
    <>
      <Form.Item
        label="Επώνυμο"
        name={[props.entity, "lastName"]}
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Όνομα"
        name={[props.entity, "firstName"]}
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Τηλέφωνο"
        name={[props.entity, "telephone"]}
        rules={[{ required: false }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Κινητό"
        name={[props.entity, "mobile"]}
        rules={[{ required: false }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Email"
        name={[props.entity, "email"]}
        rules={[{ required: false }]}
      >
        <Input />
      </Form.Item>
    </>
  );
};
