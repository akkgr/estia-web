import React, { useState } from "react";
import BuildingPower from "pages/buildings/buildingInfo/BuildingPower";
import SelectInputSearch from "app/common/form/SelectInputSearch";
import BootstrapTable from "react-bootstrap-table-next";
import { BsTrashFill, BsPencilSquare, BsPlusCircle } from "react-icons/bs";
import { ProviderType } from "app/models/Provider";
interface IProvider {
  provider?: any;
}
const choices = [
  { label: "Electricity", value: "Electricity" },
  { label: "Gas", value: "Gas" },
  { label: "Water", value: "Water" },
  { label: "Telecommunications", value: "Telecommunications" },
];
const newdata = {
  providerType: ProviderType.Electricity,
  providerName: "",
  customerName: "",
  contractNumber: "",
  connectionNumber: "",
  counterNumber: "",
  paymentCode: "",
  interval: 0,
  day: 1,
  office: false,
};
const BuildingProvider: React.FC<IProvider> = ({ provider }) => {
  const [valueSelect, setValueSelect] = useState("");
  const [openForm, setOpenForm] = useState(false);
  const [data, setData] = useState([
    {
      providerType: ProviderType.Electricity,
      providerName: "ΔΕΗ",
      customerName: "thisCustomer",
      contractNumber: "1243245798237",
      connectionNumber: "wqf234324",
      counterNumber: "co34241243",
      paymentCode: "pay6768976",
      interval: 0,
      day: 1,
      office: true,
    },
  ]);
  var dataElectricity = data.filter(
    (f: any) => f.providerType === ProviderType.Electricity
  );
  const dataGas = data.filter((f: any) => f.providerType === ProviderType.Gas);
  const dataWater = data.filter(
    (f: any) => f.providerType === ProviderType.Water
  );
  const dataTelecommunications = data.filter(
    (f: any) => f.providerType === ProviderType.Telecommunications
  );
  const [rowEdit, setRowEdit] = useState({});
  const [newElectricity, setnewElectricity] = useState(false);
  const [editElectricity, seteditElectricity] = useState(false);

  const handleEditElectricity = (row: any) => {
    setOpenForm(true);
    seteditElectricity(true);
    setnewElectricity(false);
    setRowEdit(row);
  };
  const handleNewElectricity = () => {
    setOpenForm(true);
    setnewElectricity(true);
    seteditElectricity(false);
  };

  const handleDeleteProvider = (providerName: string) => {
    const newData = data.filter((d) => d.providerName !== providerName);
    setData(newData);
  };
  const columns = [
    {
      dataField: "providerName",
      text: "Πάροχος",
    },
    {
      dataField: "Actions",
      text: "Ενέργειες",
      align: "center",
      headerFormatter: (column: any, colIndex: any) => {
        return (
          <div style={{ textAlign: "center" }}>
            <button
              type="button"
              className="btn btn-link"
              style={{ color: "green" }}
              onClick={() => handleNewElectricity()}
            >
              <BsPlusCircle />
            </button>
          </div>
        );
      },

      formatter: (cell: any, row: any) => (
        <React.Fragment>
          <button
            type="button"
            className="btn btn-link"
            onClick={() => handleEditElectricity(row)}
          >
            <BsPencilSquare />
          </button>
          <button
            type="button"
            className="btn btn-link"
            style={{ color: "red" }}
            onClick={() => handleDeleteProvider(row.providerName)}
          >
            <BsTrashFill />
          </button>
        </React.Fragment>
      ),
    },
  ];

  const handleBuildingChange = (valueSelect: string) => {
    if (valueSelect === "Electricity") {
      // return <BuildingPower providerPower={provider[0]} />;
      return (
        <div className="row">
          <div className="col">
            <BootstrapTable
              bootstrap4
              noDataIndication={() => "Ο πίνακας είναι άδειος"}
              keyField="providerName"
              columns={columns}
              data={dataElectricity}
              wrapperClasses="table-responsive"
            />
          </div>
          <div className="col">
            {editElectricity && openForm && (
              <BuildingPower
                setData={setData}
                row={rowEdit}
                providerType={ProviderType.Electricity}
                data={data}
                setOpenForm={setOpenForm}
              />
            )}
            {newElectricity && openForm && (
              <BuildingPower
                setData={setData}
                row={newdata}
                providerType={ProviderType.Electricity}
                data={data}
                setOpenForm={setOpenForm}
              />
            )}
          </div>
        </div>
      );
    } else if (valueSelect === "Gas") {
      return (
        <div className="row">
          <div className="col">
            <BootstrapTable
              bootstrap4
              noDataIndication={() => "Ο πίνακας είναι άδειος"}
              keyField="providerName"
              columns={columns}
              data={dataGas}
              wrapperClasses="table-responsive"
            />
          </div>
          <div className="col">
            {editElectricity && openForm && (
              <BuildingPower
                setData={setData}
                row={rowEdit}
                providerType={ProviderType.Gas}
                data={data}
                setOpenForm={setOpenForm}
              />
            )}
            {newElectricity && openForm && (
              <BuildingPower
                setData={setData}
                row={newdata}
                providerType={ProviderType.Gas}
                data={data}
                setOpenForm={setOpenForm}
              />
            )}
          </div>
        </div>
      );
    } else if (valueSelect === "Water") {
      return (
        <div className="row">
          <div className="col">
            <BootstrapTable
              bootstrap4
              noDataIndication={() => "Ο πίνακας είναι άδειος"}
              keyField="providerName"
              columns={columns}
              data={dataWater}
              wrapperClasses="table-responsive"
            />
          </div>
          <div className="col">
            {editElectricity && openForm && (
              <BuildingPower
                setData={setData}
                row={rowEdit}
                providerType={ProviderType.Water}
                data={data}
                setOpenForm={setOpenForm}
              />
            )}
            {newElectricity && openForm && (
              <BuildingPower
                setData={setData}
                row={newdata}
                providerType={ProviderType.Water}
                data={data}
                setOpenForm={setOpenForm}
              />
            )}
          </div>
        </div>
      );
    } else if (valueSelect === "Telecommunications") {
      return (
        <div className="row">
          <div className="col">
            <BootstrapTable
              bootstrap4
              noDataIndication={() => "Ο πίνακας είναι άδειος"}
              keyField="providerName"
              columns={columns}
              data={dataTelecommunications}
              wrapperClasses="table-responsive"
            />
          </div>
          <div className="col">
            {editElectricity && openForm && (
              <BuildingPower
                setData={setData}
                row={rowEdit}
                providerType={ProviderType.Telecommunications}
                data={data}
                setOpenForm={setOpenForm}
              />
            )}
            {newElectricity && openForm && (
              <BuildingPower
                setData={setData}
                row={newdata}
                providerType={ProviderType.Telecommunications}
                data={data}
                setOpenForm={setOpenForm}
              />
            )}
          </div>
        </div>
      );
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
