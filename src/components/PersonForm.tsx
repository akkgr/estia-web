import React from "react";
import { Form, Input } from "antd";
import { Person } from "../app/models/Person";
import TextInput from "app/common/form/TextInput";
interface PersonFormProps {
  formName: string;
  data: Person;
}

export const PersonForm = ({ data, formName }: PersonFormProps) => {
  return (
    <div id={formName} key={formName}>
      <TextInput
        type="text"
        label="Επώνυμο :"
        name="lastName"
        value={data.lastName}
        placeholder="Επώνυμο..."
        required={true}
        invalidMessage="Συμπληρώστε το Επώνυμο"
      />
      <TextInput
        type="text"
        label="Όνομα :"
        name="firstName"
        value={data.firstName}
        placeholder="Όνομα..."
        required={true}
        invalidMessage="Συμπληρώστε το Όνομα"
      />
      <TextInput
        type="text"
        label="Τηλέφωνο :"
        name="telephone"
        value={data.telephone}
        placeholder="Τηλέφωνο..."
        required={true}
        invalidMessage="Συμπληρώστε το Τηλέφωνο"
      />
      <TextInput
        type="text"
        label="Κινητό :"
        name="mobile"
        value={data.mobile}
        placeholder="Κινητό..."
        required={true}
        invalidMessage="Συμπληρώστε το Κινητό"
      />
      <TextInput
        type="text"
        label="Email :"
        name="email"
        value={data.email}
        placeholder="Email..."
        required={true}
        invalidMessage="Συμπληρώστε το Email"
      />
    </div>
  );
};
