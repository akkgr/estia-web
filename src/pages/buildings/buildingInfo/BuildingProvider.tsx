import React, { useState } from "react";
import BuildingPower from "pages/buildings/buildingInfo/BuildingPower";
import BuildingGas from "pages/buildings/buildingInfo/BuildingGas";
import BuildingPhone from "pages/buildings/buildingInfo/BuildingPhone";
import BuildingWater from "pages/buildings/buildingInfo/BuildingWater";
import SelectInputSearch from "app/common/form/SelectInputSearch";
interface IProvider {
  provider: any;
}
const choices = [
  { label: "Power", value: "Power" },
  { label: "Gas", value: "Gas" },
  { label: "Water", value: "Water" },
  { label: "Phone", value: "Phone" },
];

const BuildingProvider: React.FC<IProvider> = ({ provider }) => {
  const [valueSelect, setValueSelect] = useState("");
  const handleBuildingChange = (valueSelect: string) => {
    if (valueSelect === "Power") {
      return <BuildingPower providerPower={provider[0]} />;
    } else if (valueSelect === "Gas") {
      return <BuildingGas providerGas={provider[2]} />;
    } else if (valueSelect === "Water") {
      return <BuildingWater providerWater={provider[1]} />;
    } else if (valueSelect === "Phone") {
      return <BuildingPhone providerPhone={provider[3]} />;
    } else {
      return <div />;
    }
  };
  return (
    <React.Fragment>
      <SelectInputSearch
        label="Επιλογή παρόχων:"
        className="custom-select"
        options={choices}
        setValueSelect={setValueSelect}
      />
      {handleBuildingChange(valueSelect)}
    </React.Fragment>
  );
};

export default BuildingProvider;
