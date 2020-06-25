import React from "react";
import { Person } from "../../../../app/models/Person";
import TextInputLabel from "app/common/form/TextInputLabel";
interface PersonFormProps {
  formName: string;
  uniqueName: string;
  data: Person;
}

export const PersonForm = ({ data, uniqueName, formName }: PersonFormProps) => {
  return (
    <div id={formName} key={formName}>
      <TextInputLabel
        type="text"
        label="Επώνυμο :"
        name={`${uniqueName}LastName`}
        value={data?.lastName || ""}
        required={true}
        invalidMessage="Συμπληρώστε το Επώνυμο"
      />
      <TextInputLabel
        type="text"
        label="Όνομα :"
        name={`${uniqueName}FirstName`}
        value={data?.firstName || ""}
        required={true}
        invalidMessage="Συμπληρώστε το Όνομα"
      />
      <TextInputLabel
        type="text"
        label="Τηλέφωνο :"
        name={`${uniqueName}Telephone`}
        value={data?.telephone || ""}
        required={true}
        invalidMessage="Συμπληρώστε το Τηλέφωνο"
      />
      <TextInputLabel
        type="text"
        label="Κινητό :"
        name={`${uniqueName}Mobile`}
        value={data?.mobile || ""}
        required={true}
        invalidMessage="Συμπληρώστε το Κινητό"
      />
      <TextInputLabel
        type="text"
        label="Email :"
        name={`${uniqueName}Email`}
        value={data?.email || ""}
        required={true}
        invalidMessage="Συμπληρώστε το Email"
      />
      <TextInputLabel
        type="text"
        label="ΑΦΜ :"
        name={`${uniqueName}Afm`}
        value={data?.afm || ""}
        required={true}
        invalidMessage="Συμπληρώστε το ΑΦΜ"
      />
      <TextInputLabel
        type="text"
        label="ΔΟΥ :"
        name={`${uniqueName}Doy`}
        value={data?.doy || ""}
        required={true}
        invalidMessage="Συμπληρώστε την ΔΟΥ"
      />
    </div>
  );
};
