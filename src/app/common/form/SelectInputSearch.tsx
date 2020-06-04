import React from "react";
import Select from "react-select";
interface SelectParams {
  label: string;
  name?: string;
  value?: string;
  options: Array<{ value: string; label: string }>;
  className: string;
  setValueSelect?: any;
  data_style?: string;
  data_live_search?: boolean;
  placeholder?: string;
}
//IF WE NEED TO USE SEARCH SELECT EASY WAY DEPENDENCY bootstrap-select AND EASY CONFIGURE OR CUSTOM SEARCH

//I MUST FIX ERROR WITH LIST KEYS
const SelectInputSearch: React.FC<SelectParams> = ({
  label,
  name,
  value,
  options,
  className,
  data_style,
  data_live_search,
  setValueSelect,
}) => {
  // const [valueSelect, setValueSelect] = useState(value);

  const handleChange = (myOption: any) => {
    setValueSelect(myOption.value);
  };

  return (
    <React.Fragment>
      <div className="form-group">
        <label>{label}</label>
        <Select options={options} onChange={handleChange} placeholder={label} />
      </div>
    </React.Fragment>
  );
};

export default SelectInputSearch;
