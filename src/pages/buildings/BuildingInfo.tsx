import React, { useContext, useState } from "react";
import BuildingData from "./buildingInfo/BuildingData";
import BuildingStatus from "./buildingInfo/BuildingStatus";
import BuildingPower from "./buildingInfo/BuildingPower";
import BuildingGas from "./buildingInfo/BuildingGas";
import BuildingWater from "./buildingInfo/BuildingWater";
import TextInput from "app/common/form/TextInput";
import BuildingBank from "./buildingInfo/BuildingBank";
import axios from "axios";
import { ActionsForm } from "components/ActionsForm";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "react-query";
import UserContext from "UserContext";
import Form from "app/common/form/Form";
import Card from "app/common/cards/Card";
import Tab from "app/common/tabs/Tab";
import TabItemButton from "app/common/tabs/TabItemButton";
import TabItem from "app/common/tabs/TabItem";

const entity = "buildings";
const uri = process.env.REACT_APP_API_URL + "/api";

const BuildingInfo = () => {
  const [address, setAddress] = useState<any>({});
  const [admin, setAdmin] = useState<string>("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

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
    setAddress(data.address);
    setAdmin(data.createdBy);
    setStartDate(data.createdOn);
    setEndDate(data.updatedOn);
    return data;
  };

  const { data } = useQuery<any, [string, string | undefined]>(
    [entity, id],
    fetchData
  );

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const form = event.target.elements.test.value;
    console.log(form);
  };

  const [tabClassNameData, setTabClassNameData] = useState("nav-link active");
  const [tabClassNameStatus, setTabClassNameStatus] = useState("nav-link");
  const [tabClassNamePower, setTabClassNamePower] = useState("nav-link");
  const [tabClassNameGas, setTabClassNameGas] = useState("nav-link");
  const [tabClassNameWater, setTabClassNameWater] = useState("nav-link");
  const [tabClassNameBank, setTabClassNameBank] = useState("nav-link");
  const tabOnClickData = () => {
    setTabClassNameData("nav-link active");
    setTabClassNameBank("nav-link");
    setTabClassNamePower("nav-link");
    setTabClassNameGas("nav-link");
    setTabClassNameWater("nav-link");
    setTabClassNameStatus("nav-link");
  };
  const tabOnClickStatus = () => {
    setTabClassNameStatus("nav-link active");
    setTabClassNameData("nav-link ");
    setTabClassNameBank("nav-link");
    setTabClassNamePower("nav-link");
    setTabClassNameGas("nav-link");
    setTabClassNameWater("nav-link");
  };
  const tabOnClickBank = () => {
    setTabClassNameBank("nav-link active");
    setTabClassNameData("nav-link");
    setTabClassNamePower("nav-link");
    setTabClassNameGas("nav-link");
    setTabClassNameWater("nav-link");
    setTabClassNameStatus("nav-link");
  };
  const tabOnClickGas = () => {
    setTabClassNameGas("nav-link active");
    setTabClassNameData("nav-link ");
    setTabClassNameBank("nav-link");
    setTabClassNamePower("nav-link");
    setTabClassNameWater("nav-link");
    setTabClassNameStatus("nav-link");
  };
  const tabOnClickWater = () => {
    setTabClassNameWater("nav-link active");
    setTabClassNameBank("nav-link");
    setTabClassNamePower("nav-link");
    setTabClassNameGas("nav-link");
    setTabClassNameData("nav-link");
    setTabClassNameStatus("nav-link");
  };
  const tabOnClickPower = () => {
    setTabClassNamePower("nav-link active");
    setTabClassNameBank("nav-link");
    setTabClassNameWater("nav-link");
    setTabClassNameGas("nav-link");
    setTabClassNameData("nav-link");
    setTabClassNameStatus("nav-link");
  };

  return (
    <React.Fragment>
      <Form
        formElements={
          <React.Fragment>
            <ActionsForm returnUrl="/buildings">
              <li className="breadcrumb-item active" aria-current="page">
                <Link to="/buildings">Κτίρια</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                {address.street} {address.streetnumber}, {address.area}
              </li>
            </ActionsForm>
            <Card
              cardHeader={
                <React.Fragment>
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
                </React.Fragment>
              }
              cardBody={
                <React.Fragment>
                  <Tab
                    tabListItems={
                      <React.Fragment>
                        {/* <TabItemButton
                          active={true}
                          reference="#data"
                          message="Βασικά Στοιχεία Κτηρίου"
                        /> */}
                        <li className="nav-item">
                          <a
                            className={tabClassNameData}
                            data-toggle="tab"
                            href="#data"
                            onClick={() => tabOnClickData()}
                          >
                            Βασικά Στοιχεία Κτιρίου
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className={tabClassNameStatus}
                            data-toggle="tab"
                            href="#status"
                            onClick={() => tabOnClickStatus()}
                          >
                            Κατάσταση
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className={tabClassNamePower}
                            data-toggle="tab"
                            href="#power"
                            onClick={() => tabOnClickPower()}
                          >
                            ΔΕΗ
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className={tabClassNameGas}
                            data-toggle="tab"
                            href="#gas"
                            onClick={() => tabOnClickGas()}
                          >
                            Φυσικό Αέριο
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className={tabClassNameWater}
                            data-toggle="tab"
                            href="#water"
                            onClick={() => tabOnClickWater()}
                          >
                            ΕΥΔΑΠ
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className={tabClassNameBank}
                            data-toggle="tab"
                            href="#bank"
                            onClick={() => tabOnClickBank()}
                          >
                            Τράπεζα/Αιτιολογία
                          </a>
                        </li>

                        {/* <TabItemButton reference="#status" message="Κατάσταση" />
                        <TabItemButton reference="#power" message="ΔΕΗ" />
                        <TabItemButton reference="#gas" message="Φυσικό Αέριο" />
                        <TabItemButton reference="#water" message="ΕΥΔΑΠ" /> */}
                        {/* <TabItemButton
                          reference="#bank"
                          message="Τράπεζα/Αιτιολογία"
                        /> */}
                      </React.Fragment>
                    }
                    content={
                      <React.Fragment>
                        {/* <TabItem
                          active={true}
                          tabId="data"
                          item={<BuildingData address={address} />}
                        />
                        <TabItem
                          tabId="status"
                          item={
                            <BuildingStatus
                              startDate={startDate}
                              endDate={endDate}
                            />
                          }
                        />
                        <TabItem tabId="power" item={<BuildingPower />} />
                        <TabItem tabId="gas" item={<BuildingGas />} />
                        <TabItem tabId="water" item={<BuildingWater />} />
                        <TabItem tabId="bank" item={<BuildingBank />} /> */}
                        <div className="tab-pane fade show active" id="data">
                          <br />
                          <BuildingData address={address} />
                        </div>
                        <div className="tab-pane fade show " id="status">
                          <br />
                          <BuildingStatus
                            startDate={startDate}
                            endDate={endDate}
                          />
                        </div>
                        <div className="tab-pane fade show" id="power">
                          <br />
                          <BuildingPower />
                        </div>
                        <div className="tab-pane fade show" id="gas">
                          <br />
                          <BuildingGas />
                        </div>
                        <div className="tab-pane fade show" id="water">
                          <br />
                          <BuildingWater />
                        </div>
                        <div className="tab-pane fade show" id="bank">
                          <br />
                          <BuildingBank />
                        </div>
                      </React.Fragment>
                    }
                  />
                </React.Fragment>
              }
            />
          </React.Fragment>
        }
        sumbit={handleSubmit}
      />
    </React.Fragment>
  );
};

export default BuildingInfo;
