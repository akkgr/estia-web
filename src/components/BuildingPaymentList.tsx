import React from "react";
import SelectInputSearch from "app/common/form/SelectInputSearch";

const Year = [
  {
    value: "2020",
    label: "2020",
  },
  {
    value: "2019",
    label: "2019",
  },
  { value: "2018", label: "2018" },
];

export const BuildingPaymentList = (props: any) => {
  return (
    <div>
      <SelectInputSearch
        label="Επιλογή έτους:"
        className="custom-select"
        options={Year}
      />
      <br />
      {/* <DataTable
        entity={`buildings/${props.data.id}/apartments`}
        columns={columns}
        filterFn={filterFn}
      /> */}
    </div>
  );
};
