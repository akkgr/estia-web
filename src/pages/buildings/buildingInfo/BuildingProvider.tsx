import React, { useState, useEffect } from "react";
import BuildingFormProvider from "pages/buildings/buildingInfo/BuildingFormProvider";
import SelectInputSearch from "app/common/form/SelectInputSearch";
import BootstrapTable from "react-bootstrap-table-next";
import { BsTrashFill, BsPencilSquare, BsPlusCircle } from "react-icons/bs";
import { ProviderType } from "app/models/Provider";

const choices = [
  { label: "Electricity", value: "Electricity" },
  { label: "Gas", value: "Gas" },
  { label: "Water", value: "Water" },
  { label: "Telecommunications", value: "Telecommunications" },
];
interface IProps {
  data: any;
  setData: any;
}
const BuildingProvider: React.FC<IProps> = ({ data, setData }) => {
  const [valueSelect, setValueSelect] = useState("");
  useEffect(() => {
    setOpenForm(false);
  }, [valueSelect]);
  const [openForm, setOpenForm] = useState(false);

  const dataElectricity = data.filter(
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
  const [newProvider, setnewProvider] = useState(false);
  const [editProvider, seteditProvider] = useState(false);

  const handleEditProvider = (row: any) => {
    setOpenForm(true);
    seteditProvider(true);
    setnewProvider(false);
    setRowEdit(row);
  };
  const handleNewProvider = () => {
    setOpenForm(true);
    setnewProvider(true);
    seteditProvider(false);
  };

  const handleDeleteProvider = (providerName: string) => {
    const newData = data.filter((d: any) => d.providerName !== providerName);
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
              onClick={() => handleNewProvider()}
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
            onClick={() => handleEditProvider(row)}
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

  const handleProviderChange = (valueSelect: string) => {
    if (valueSelect !== "") {
      const dataChoiceSelect = () => {
        if (valueSelect === "Electricity") {
          return dataElectricity;
        } else if (valueSelect === "Gas") {
          return dataGas;
        } else if (valueSelect === "Water") {
          return dataWater;
        } else {
          return dataTelecommunications;
        }
      };
      const ProviderChoiceSelect = () => {
        if (valueSelect === "Electricity") {
          return ProviderType.Electricity;
        } else if (valueSelect === "Gas") {
          return ProviderType.Gas;
        } else if (valueSelect === "Water") {
          return ProviderType.Water;
        } else {
          return ProviderType.Telecommunications;
        }
      };
      const newdata = {
        providerType: ProviderChoiceSelect(),
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
      return (
        <div className="row">
          {" "}
          <div className="col">
            <BootstrapTable
              bootstrap4
              noDataIndication={() => "Ο πίνακας είναι άδειος"}
              keyField="providerName"
              columns={columns}
              data={dataChoiceSelect()}
              wrapperClasses="table-responsive"
            />
          </div>
          <div className="col">
            {editProvider && openForm && (
              <BuildingFormProvider
                setData={setData}
                row={rowEdit}
                providerType={ProviderChoiceSelect()}
                data={data}
                setOpenForm={setOpenForm}
              />
            )}
            {newProvider && openForm && (
              <BuildingFormProvider
                setData={setData}
                row={newdata}
                providerType={ProviderChoiceSelect()}
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
      {handleProviderChange(valueSelect)}
    </React.Fragment>
  );
};

export default BuildingProvider;
