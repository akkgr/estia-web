import React, { useState, useEffect } from "react";
interface SelectParams {
  label: string;
  name?: string;
  value?: string;
  options: Array<{ id: number; value: string }>;
  className: string;
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
}) => {
  const [valueSelect, setValueSelect] = useState<any>(value);

  const handleChange = (data: any) => {
    data.preventDefault();
    let { name, value } = data.target;
    setValueSelect(data);
    // console.log("value = " + data);
  };
  

  return (
    <React.Fragment>
      <div className="form-group">
        <label>{label}</label>
        <select
          // id={name}
          // key={name}
          className={className}
          // value={valueSelect}
          name={name}
          // data-style={data_style}
          // data-live-search={data_live_search}
          onChange={handleChange}
          value={valueSelect}
        >
          {options.map((option) => {
            return (
              <option
                data-tokens={option.value}
                value={option.id}
                key={option.id}
              >
                {option.value}
              </option>
            );
          })}
        </select>
      </div>
    </React.Fragment>
  );
};

export default SelectInputSearch;
