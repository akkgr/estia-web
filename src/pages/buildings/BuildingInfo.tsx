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
import BuildingPdf from "./buildingInfo/BuildingPdf";

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

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    // const form = event.target.elements.test.value;
    // console.log(form);

    const target = e.target as typeof e.target & {
      admin: { value: string };
      reciever: { value: string };
    };
    const admin = target.admin.value;
    const reciever = target.reciever.value;

    console.log("admin = " + admin);
    console.log("reciever = " + reciever);
  };

  const [tabClassNameData, setTabClassNameData] = useState("nav-link active");
  const [tabClassNameStatus, setTabClassNameStatus] = useState("nav-link");
  const [tabClassNamePower, setTabClassNamePower] = useState("nav-link");
  const [tabClassNameGas, setTabClassNameGas] = useState("nav-link");
  const [tabClassNameWater, setTabClassNameWater] = useState("nav-link");
  const [tabClassNameBank, setTabClassNameBank] = useState("nav-link");
  const [tabClassNamePdf, setTabClassNamePdf] = useState("nav-link");

  const tabOnClickData = () => {
    setTabClassNameData("nav-link active");
    setTabClassNameBank("nav-link");
    setTabClassNamePower("nav-link");
    setTabClassNameGas("nav-link");
    setTabClassNameWater("nav-link");
    setTabClassNameStatus("nav-link");
    setTabClassNamePdf("nav-link");
  };
  const tabOnClickStatus = () => {
    setTabClassNameStatus("nav-link active");
    setTabClassNameData("nav-link ");
    setTabClassNameBank("nav-link");
    setTabClassNamePower("nav-link");
    setTabClassNameGas("nav-link");
    setTabClassNameWater("nav-link");
    setTabClassNamePdf("nav-link");
  };
  const tabOnClickBank = () => {
    setTabClassNameBank("nav-link active");
    setTabClassNameData("nav-link");
    setTabClassNamePower("nav-link");
    setTabClassNameGas("nav-link");
    setTabClassNameWater("nav-link");
    setTabClassNameStatus("nav-link");
    setTabClassNamePdf("nav-link");
  };
  const tabOnClickGas = () => {
    setTabClassNameGas("nav-link active");
    setTabClassNameData("nav-link ");
    setTabClassNameBank("nav-link");
    setTabClassNamePower("nav-link");
    setTabClassNameWater("nav-link");
    setTabClassNameStatus("nav-link");
    setTabClassNamePdf("nav-link");
  };
  const tabOnClickWater = () => {
    setTabClassNameWater("nav-link active");
    setTabClassNameBank("nav-link");
    setTabClassNamePower("nav-link");
    setTabClassNameGas("nav-link");
    setTabClassNameData("nav-link");
    setTabClassNameStatus("nav-link");
    setTabClassNamePdf("nav-link");
  };
  const tabOnClickPower = () => {
    setTabClassNamePower("nav-link active");
    setTabClassNameBank("nav-link");
    setTabClassNameWater("nav-link");
    setTabClassNameGas("nav-link");
    setTabClassNameData("nav-link");
    setTabClassNameStatus("nav-link");
    setTabClassNamePdf("nav-link");
  };
  const tabOnClickPdf = () => {
    setTabClassNamePdf("nav-link active");
    setTabClassNamePower("nav-link");
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
                {data.address.street} {data.address.streetnumber},
                {data.address.area}
              </li>
            </ActionsForm>
            <Card
              cardBody={
                <React.Fragment>
                  <Tab
                    tabListItems={
                      <React.Fragment>
                        <TabItemButton
                          reference="data"
                          message="Βασικά Στοιχεία Κτηρίου"
                          tabClassName={tabClassNameData}
                          tabOnClick={tabOnClickData}
                        />
                        <TabItemButton
                          reference="status"
                          message="Κατάσταση"
                          tabClassName={tabClassNameStatus}
                          tabOnClick={tabOnClickStatus}
                        />
                        <TabItemButton
                          reference="power"
                          message="ΔΕΗ"
                          tabClassName={tabClassNamePower}
                          tabOnClick={tabOnClickPower}
                        />
                        <TabItemButton
                          reference="gas"
                          message="Φυσικό Αέριο"
                          tabClassName={tabClassNameGas}
                          tabOnClick={tabOnClickGas}
                        />
                        <TabItemButton
                          reference="water"
                          message="ΕΥΔΑΠ"
                          tabClassName={tabClassNameWater}
                          tabOnClick={tabOnClickWater}
                        />
                        <TabItemButton
                          reference="bank"
                          message="Τράπεζα/Αιτιολογία"
                          tabClassName={tabClassNameBank}
                          tabOnClick={tabOnClickBank}
                        />
                        <TabItemButton
                          reference="pdf"
                          message="Ιστορικό Αρχείων"
                          tabClassName={tabClassNamePdf}
                          tabOnClick={tabOnClickPdf}
                        />
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
                        <TabItem
                          active={true}
                          tabId="data"
                          item={<BuildingData admin={data.createdBy} address={data.address} />}
                        />
                        {/* <div className="tab-pane fade show active" id="data">
                          <br />
                          <BuildingData admin={data.createdBy} address={data.address} />
                        </div> */}
                        <div className="tab-pane fade show " id="status">
                          <br />
                          <BuildingStatus
                            startDate={new Date()}
                            endDate={new Date()}
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
                        <div className="tab-pane fade show" id="pdf">
                          <br />
                          <BuildingPdf />
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
