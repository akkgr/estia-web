import React from "react";
import { Form, Input, } from "antd";
import { Address } from "../models/Address";

interface AddressFormProps {
  formName: string;
  data: Address;
}

export const AddressForm = ({ data, formName }: AddressFormProps) => {
  return (
    <>
    <Form name={formName} layout={"vertical"} initialValues={data}>
      <div>{JSON.stringify(data)}</div>
      <div>{JSON.stringify(formName)}</div>
      
      <div className="row">

        <div className="col">
          <div className="card shadow mb-4">
            <div className="card-header py-3" style={{backgroundColor: '#3aafa9'}}>
              <h6 className="m-0 font-weight-bold " style={{color: '#17252a'}}>Γενικές πληροφορίες κτιρίου</h6>
            </div>
            <div className="card-body" style={{backgroundColor: '#def2f1'}}>
           <div className='row'>
             <div className= "col">
              <Form.Item label="Οδός" name="street" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
             </div>
             <div className= "col">
               <Form.Item
                  label="Αριθός"
                  name="streetnumber"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
                  </div>
                  <div className= "col">
                    <Form.Item label="Περιοχή" name="area" rules={[{ required: true }]}>
                  <Input />
                </Form.Item>
                  </div>
                  <div className= "col">
                      <Form.Item
                  label="Τ.Κ."
                  name="postalCode"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
                  </div>
            </div>
            <button className="btn btn-primary" type="submit">Πληροφορίες Κτηρίου</button>
            </div>
          </div>
        </div>
      </div>
      </Form>
    </>
  );
};
