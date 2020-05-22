import React, { useContext, useState } from "react";
import BuildingData from "./buildingInfo/BuildingData";
import BuildingStatus from "./buildingInfo/BuildingStatus";
import BuildingPower from "./buildingInfo/BuildingPower";
import BuildingGas from "./buildingInfo/BuildingGas";
import BuildingWater from "./buildingInfo/BuildingWater";
import TextInput from "app/common/form/TextInput";
import BuildingBank from "./buildingInfo/BuildingBank";
import ButtonTab from "app/common/buttons/ButtonTab";
import axios from "axios";
import { ActionsForm } from "components/ActionsForm";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "react-query";
import UserContext from "UserContext";

const entity = "buildings";
const uri = process.env.REACT_APP_API_URL + "/api";

export const BuildingInfo = () => {

  const [address, setAddress] = useState<any>({});
  const [admin, setAdmin] = useState<string>("");
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())

  const manager = useContext(UserContext);
  let { id } = useParams();

  const fetchData = async (key: string, id: string | undefined) => {
    const user = await manager.getUser();
    if (!user || user?.expired) {
      manager.signinRedirect();
    }
    const { data } = await axios.get(`${uri}/${key}/${id}`, {
      headers: {
        Authorization: `Bearer ${user?.access_token}`,
      },
    });
    setAddress(data.address)
    setAdmin(data.createdBy)
    setStartDate(data.createdOn)
    setEndDate(data.updatedOn)
    return data;
  };

  const { data } = useQuery<
    any,
    [string, string | undefined]
  >([entity, id], fetchData);


  const handleSubmit = (event: any) => {
    event.preventDefault();
    const form = event.target.elements.test.value;
    console.log(form);
  };

  return (
    <React.Fragment>
      <form className="needs-validation" noValidate onSubmit={handleSubmit}>
        {/* <div>{JSON.stringify(id)}</div>
        <div>{JSON.stringify(data)}</div> */}
        <ActionsForm returnUrl="/buildings">
          <li className="breadcrumb-item active" aria-current="page">
            <Link to="/buildings">Κτίρια</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {address.street} {address.streetnumber}, {address.area}
          </li>
        </ActionsForm>
        <div className="card">
          <div className="card-header text-center">
            <div className="row mt-3">
              <div className="col-md-4 mb-3">
                <TextInput
                  label="Στοιχεία Διαχειριστή  :"
                  name="admin"
                  value={admin}
                  placeholder="Στοιχεία Διαχειριστή..."
                  required={true}
                  readOnly={true}
                  disable={true}
                />
              </div>
              <div className="col-md-4 mb-3">
                <TextInput
                  label="Στοιχεία Παραλαμβάνοντος :"
                  name="reciever"
                  value="Τζιβράς Τζέρι"
                  placeholder="Στοιχεία Παραλαμβάνοντος..."
                  required={true}
                  readOnly={true}
                  disable={true}
                />
              </div>
            </div>
          </div>
          <div className="card-body">
            <div id="exTab1">
              <ul className="nav nav-pills">
                <li className="active">
                  <ButtonTab href="#1a" message="Βασικά Στοιχεία Κτηρίου" />
                </li>
                <li>
                  <ButtonTab href="#2a" message="Κατάσταση" />
                </li>
                <li>
                  <ButtonTab href="#3a" message="ΔΕΗ" />
                </li>
                <li>
                  <ButtonTab href="#4a" message="Φυσικό Αέριο" />
                </li>
                <li>
                  <ButtonTab href="#5a" message="ΕΥΔΑΠ" />
                </li>
                <li>
                  <ButtonTab href="#6a" message="Τράπεζα/Αιτιολογία" />
                </li>
              </ul>

              <div className="tab-content">
                <div className="tab-pane  active" id="1a">
                  <BuildingData address={address}/>
                </div>
                <div className="tab-pane" id="2a">
                  <BuildingStatus startDate={startDate} endDate={endDate}/>
                </div>
                <div className="tab-pane" id="3a">
                  <BuildingPower />
                </div>
                <div className="tab-pane" id="4a">
                  <BuildingGas />
                </div>
                <div className="tab-pane" id="5a">
                  <BuildingWater />
                </div>
                <div className="tab-pane" id="6a">
                  <BuildingBank />
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </React.Fragment>
  );
};
