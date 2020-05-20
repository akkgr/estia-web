import React from "react";
interface SelectParams {
  label: string;
  options: Array<{ id: number; value: string }>;
  className: string;
  data_style?: string;
  data_live_search?: boolean;
  props?: any;
  placeholder?: string;
}
//IF WE NEED TO USE SEARCH SELECT EASY WAY DEPENDENCY bootstrap-select AND EASY CONFIGURE OR CUSTOM SEARCH

//I MUST FIX ERROR WITH LIST KEYS
const SelectInputSearch: React.FC<SelectParams> = ({
  label,
  options,
  className,
  data_style,
  data_live_search,
  props,
}) => {
  return (
    <React.Fragment>
      <label>{label}</label>
      <select
        className={className}
        data-style={data_style}
        data-live-search={data_live_search}
        {...props}
      >
        {options.map((option) => {
          return (
            <option data-tokens={option.value} value={option.id}>
              {option.value}
            </option>
          );
        })}
      </select>
    </React.Fragment>
  );
};

export default SelectInputSearch;
