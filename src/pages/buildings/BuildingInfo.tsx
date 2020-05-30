import React, { useContext, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";

import BuildingData from "pages/buildings/buildingInfo/BuildingData";
import BuildingStatus from "pages/buildings/buildingInfo/BuildingStatus";
import BuildingPower from "pages/buildings/buildingInfo/BuildingPower";
import BuildingGas from "pages/buildings/buildingInfo/BuildingGas";
import BuildingWater from "pages/buildings/buildingInfo/BuildingWater";
import BuildingBank from "pages/buildings/buildingInfo/BuildingBank";
import BuildingPdf from "pages/buildings/buildingInfo/BuildingPdf";
import UserContext from "UserContext";
import Form from "app/common/form/Form";
import Card from "app/common/cards/Card";
import Tab from "app/common/tabs/Tab";
import TabItemButton from "app/common/tabs/TabItemButton";
import TabItem from "app/common/tabs/TabItem";
import PageHeader from "app/common/headers/PageHeader";

const entity = "buildings";
const uri = process.env.REACT_APP_API_URL + "/api";

const BuildingInfo = () => {
  const manager = useContext(UserContext);
  let { id } = useParams();

  const [tabActiveData, setTabActiveData] = useState<boolean>(true);
  const [tabActiveStatus, setActiveStatus] = useState<boolean>(false);
  const [tabActivePower, setActivePower] = useState<boolean>(false);
  const [tabActiveGas, setActiveGas] = useState<boolean>(false);
  const [tabActiveWater, setActiveWater] = useState<boolean>(false);
  const [tabActiveBank, setActiveBank] = useState<boolean>(false);
  const [tabActivePdf, setActivePdf] = useState<boolean>(false);

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
    return data;
  };

  const { data } = useQuery<any, [string, string | undefined]>(
    [entity, id],
    fetchData
  );

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      admin: { value: string };
      reciever: { value: string };
    };
    const admin = target.admin.value;
    const reciever = target.reciever.value;

    console.log("admin = " + admin);
    console.log("reciever = " + reciever);
  };

  const tabActivate = (reference: string) => {
    if (reference === "data") {
      setTabActiveData(true);
      setActiveBank(false);
      setActivePower(false);
      setActiveGas(false);
      setActiveWater(false);
      setActiveStatus(false);
      setActivePdf(false);
    }

    if (reference === "status") {
      setActiveStatus(true);
      setTabActiveData(false);
      setActiveBank(false);
      setActivePower(false);
      setActiveGas(false);
      setActiveWater(false);
      setActivePdf(false);
    }

    if (reference === "power") {
      setActivePower(true);
      setActiveBank(false);
      setActiveWater(false);
      setActiveGas(false);
      setTabActiveData(false);
      setActiveStatus(false);
      setActivePdf(false);
    }

    if (reference === "gas") {
      setActiveGas(true);
      setTabActiveData(false);
      setActiveBank(false);
      setActivePower(false);
      setActiveWater(false);
      setActiveStatus(false);
      setActivePdf(false);
    }

    if (reference === "water") {
      setActiveWater(true);
      setActiveBank(false);
      setActivePower(false);
      setActiveGas(false);
      setTabActiveData(false);
      setActiveStatus(false);
      setActivePdf(false);
    }

    if (reference === "bank") {
      setActiveBank(true);
      setTabActiveData(false);
      setActivePower(false);
      setActiveGas(false);
      setActiveWater(false);
      setActiveStatus(false);
      setActivePdf(false);
    }

    if (reference === "pdf") {
      setActivePdf(true);
      setActivePower(false);
      setActiveBank(false);
      setActiveWater(false);
      setActiveGas(false);
      setTabActiveData(false);
      setActiveStatus(false);
    }
  };

  return (
    <React.Fragment>
      <Form
        formElements={
          <React.Fragment>
            <PageHeader returnUrl="/buildings">
              <li className="breadcrumb-item active" aria-current="page">
                <Link to="/buildings">Κτίρια</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                {data.address.street} {data.address.streetnumber},
                {data.address.area}
              </li>
            </PageHeader>
            <Card
              cardBody={
                <React.Fragment>
                  <Tab
                    tabListItems={
                      <React.Fragment>
                        <TabItemButton
                          reference="data"
                          message="Βασικά Στοιχεία Κτηρίου"
                          activeTabButton={tabActiveData}
                          tabOnClick={() => tabActivate("data")}
                        />
                        <TabItemButton
                          reference="status"
                          message="Κατάσταση"
                          activeTabButton={tabActiveStatus}
                          tabOnClick={() => tabActivate("status")}
                        />
                        <TabItemButton
                          reference="power"
                          message="ΔΕΗ"
                          activeTabButton={tabActivePower}
                          tabOnClick={() => tabActivate("power")}
                        />
                        <TabItemButton
                          reference="gas"
                          message="Φυσικό Αέριο"
                          activeTabButton={tabActiveGas}
                          tabOnClick={() => tabActivate("gas")}
                        />
                        <TabItemButton
                          reference="water"
                          message="ΕΥΔΑΠ"
                          activeTabButton={tabActiveWater}
                          tabOnClick={() => tabActivate("water")}
                        />
                        <TabItemButton
                          reference="bank"
                          message="Τράπεζα/Αιτιολογία"
                          activeTabButton={tabActiveBank}
                          tabOnClick={() => tabActivate("bank")}
                        />
                        <TabItemButton
                          reference="pdf"
                          message="Ιστορικό Αρχείων"
                          activeTabButton={tabActivePdf}
                          tabOnClick={() => tabActivate("pdf")}
                        />
                      </React.Fragment>
                    }
                    content={
                      <React.Fragment>
                        <TabItem
                          active={true}
                          tabId="data"
                          item={
                            <BuildingData
                              admin={data.createdBy}
                              address={data.address}
                            />
                          }
                        />
                        <TabItem
                          tabId="status"
                          item={
                            <BuildingStatus
                              startDate={new Date()}
                              endDate={new Date()}
                            />
                          }
                        />
                        <TabItem tabId="power" item={<BuildingPower />} />
                        <TabItem tabId="gas" item={<BuildingGas />} />
                        <TabItem tabId="water" item={<BuildingWater />} />
                        <TabItem tabId="bank" item={<BuildingBank />} />
                        <TabItem tabId="pdf" item={<BuildingPdf />} />
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
