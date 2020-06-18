import React from "react";
import { Person } from "../../../../app/models/Person";
import TextInput from "../../../../app/common/form/TextInput";
interface PersonFormProps {
  formName: string;
  uniqueName: string;
  data: Person;
}

export const PersonForm = ({ data, uniqueName, formName }: PersonFormProps) => {
  return (
    <div id={formName} key={formName}>
      <TextInput
        type="text"
        label="Επώνυμο :"
        name={`${uniqueName}LastName`}
        value={data?.lastName || ""}
        placeholder="Επώνυμο..."
        required={true}
        invalidMessage="Συμπληρώστε το Επώνυμο"
      />
      <TextInput
        type="text"
        label="Όνομα :"
        name={`${uniqueName}FirstName`}
        value={data?.firstName || ""}
        placeholder="Όνομα..."
        required={true}
        invalidMessage="Συμπληρώστε το Όνομα"
      />
      <TextInput
        type="text"
        label="Τηλέφωνο :"
        name={`${uniqueName}Telephone`}
        value={data?.telephone || ""}
        placeholder="Τηλέφωνο..."
        required={true}
        invalidMessage="Συμπληρώστε το Τηλέφωνο"
      />
      <TextInput
        type="text"
        label="Κινητό :"
        name={`${uniqueName}Mobile`}
        value={data?.mobile || ""}
        placeholder="Κινητό..."
        required={true}
        invalidMessage="Συμπληρώστε το Κινητό"
      />
      <TextInput
        type="text"
        label="Email :"
        name={`${uniqueName}Email`}
        value={data?.email || ""}
        placeholder="Email..."
        required={true}
        invalidMessage="Συμπληρώστε το Email"
      />
    </div>
  );
};
