import React from "react";
import TextInput from "../../../../app/common/form/TextInput";
import { Apartment } from "../../../../app/models/Apartment";

interface GeneralInfoForm {
  data: any;
}

const GeneralInfoForm: React.FC<GeneralInfoForm> = ({ data }) => {
  return (
    <div className="row">
      <div className="row">
        <div className="col">
          <div className="row">
            <div className="col">
              <TextInput
                type="number"
                label="A/A:"
                name="position"
                value={data?.position}
                required={true}
                readOnly={true}
                disable={true}
              />
            </div>
            <div className="col">
              <TextInput
                type="text"
                label="Διαμέρισμα:"
                name="title"
                value={data?.title}
                required={true}
                readOnly={true}
                disable={true}
              />
            </div>
          </div>
        </div>
        <div className="col">
          <TextInput
            type="number"
            label="Κοινό:"
            name="common"
            value={data?.common}
            required={true}
          />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <TextInput
            type="number"
            label="Ιδιοκτήτες:"
            name="owners"
            value={data?.owners}
            required={true}
          />
        </div>
        <div className="col">
          <TextInput
            type="number"
            label="Lift:"
            name="lift"
            value={data?.lift}
            required={true}
          />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <TextInput
            type="number"
            label="heat:"
            name="heat"
            value={data?.heat}
            required={true}
          />
        </div>
      </div>
    </div>
  );
};

export default GeneralInfoForm;
