import React from "react";
import { Form, Input } from "antd";
import { Address } from "../app/models/Address";
import Cards from "app/common/views/Cards";

interface AddressFormProps {
  formName: string;
  data: Address;
  id: string | undefined;
}

export const AddressForm = ({ id, data, formName }: AddressFormProps) => {
  return (
    <React.Fragment>
      <Form name={formName} layout={"horizontal"} initialValues={data}>
        <div className="row">
          <div className="col">
            <Cards
              header={"Γενικές πληροφορίες κτιρίου"}
              body={
                <div className="row">
                  <div className="col">
                    <Form.Item
                      label="Οδός"
                      name="street"
                      rules={[{ required: true }]}
                    >
                      <Input />
                    </Form.Item>
                  </div>
                  <div className="col">
                    <Form.Item
                      label="Αριθός"
                      name="streetnumber"
                      rules={[{ required: true }]}
                    >
                      <Input />
                    </Form.Item>
                  </div>
                  <div className="col">
                    <Form.Item
                      label="Περιοχή"
                      name="area"
                      rules={[{ required: true }]}
                    >
                      <Input />
                    </Form.Item>
                  </div>
                  <div className="col">
                    <Form.Item
                      label="Τ.Κ."
                      name="postalCode"
                      rules={[{ required: true }]}
                    >
                      <Input />
                    </Form.Item>
                  </div>
                </div>
              }
            />
          </div>
        </div>
      </Form>
    </React.Fragment>
  );
};
