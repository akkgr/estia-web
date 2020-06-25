import React from "react";
import TextInput from "../../../../app/common/form/TextInput";
import { Apartment } from "../../../../app/models/Apartment";
import TextInputLabel from "app/common/form/TextInputLabel";
interface GeneralInfoForm {
  data: any;
}

const GeneralInfoForm: React.FC<GeneralInfoForm> = ({ data }) => {
  return (
    <div>
      <div className="row">
        <div className="col-sm-2">
          <TextInputLabel
            type="number"
            label="A/A:"
            name="position"
            value={data?.position}
            required={true}
            readOnly={true}
            disable={true}
          />
        </div>
        <div className="col-sm-3">
          <TextInputLabel
            type="text"
            label="Διαμέρισμα:"
            name="title"
            value={data?.title}
            required={true}
          />
        </div>
        <div className="col-sm-3">
          <TextInputLabel
            type="number"
            label="Κοινόχρηστα:"
            name="common"
            value={data?.common}
            required={true}
            step="any"
          />
        </div>
        <div className="col-sm-2">
          <TextInputLabel
            type="number"
            label="Ασανσέρ:"
            name="lift"
            value={data?.lift}
            required={true}
            step="any"
          />
        </div>
      </div>

      <div className="row">
        <div className="col-sm-3">
          <TextInputLabel
            type="number"
            label="Θέρμανση:"
            name="heat"
            value={data?.heat}
            required={true}
            step="any"
          />
        </div>
        <div className="col-sm-2">
          <TextInputLabel
            type="number"
            label="EI:"
            name="ei"
            value={data?.ei}
            required={true}
            step="any"
          />
        </div>
        <div className="col-sm-2">
          <TextInputLabel
            type="number"
            label="FI:"
            name="fi"
            value={data?.fi}
            required={true}
            step="any"
          />
        </div>
        <div className="col-sm-3">
          <TextInputLabel
            type="number"
            label="Ιδιοκτήτες:"
            name="owners"
            value={data?.owners}
            required={true}
            step="any"
          />
        </div>
        <div className="col-sm-3">
          <TextInputLabel
            type="number"
            label="Άλλα Έξοδα:"
            name="special"
            value={data?.special}
            step="any"
          />
        </div>
      </div>
      <div className="row">
        <div className="col-sm-3">
          <TextInputLabel
            type="number"
            label="Άλλα Έξοδα 1:"
            name="special1"
            value={data?.special1}
            step="any"
          />
        </div>
        <div className="col-sm-3">
          <TextInputLabel
            type="number"
            label="Άλλα Έξοδα 2:"
            name="special2"
            value={data?.special2}
            step="any"
          />
        </div>
        <div className="col-sm-3">
          <TextInputLabel
            type="number"
            label="Άλλα Έξοδα 3:"
            name="special3"
            value={data?.special3}
            step="any"
          />
        </div>
        <div className="col-sm-3">
          <TextInputLabel
            type="number"
            label="Άλλα Έξοδα 4:"
            name="special4"
            value={data?.special4}
            step="any"
          />
        </div>
      </div>
    </div>
  );
};

export default GeneralInfoForm;
