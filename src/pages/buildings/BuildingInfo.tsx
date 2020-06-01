import React, { useContext, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";

import BuildingData from "pages/buildings/buildingInfo/BuildingData";
import BuildingPower from "pages/buildings/buildingInfo/BuildingPower";
import BuildingGas from "pages/buildings/buildingInfo/BuildingGas";
import BuildingWater from "pages/buildings/buildingInfo/BuildingWater";
import BuildingOtherInfo from "pages/buildings/buildingInfo/BuildingOtherInfo";
import BuildingHeating from "pages/buildings/buildingInfo/BuildingHeating";
import BuildingPhone from "pages/buildings/buildingInfo/BuildingPhone";
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
  const [tabActiveHeating, setActiveHeating] = useState<boolean>(false);
  const [tabActiveStatus, setActiveStatus] = useState<boolean>(false);
  const [tabActivePower, setActivePower] = useState<boolean>(false);
  const [tabActiveGas, setActiveGas] = useState<boolean>(false);
  const [tabActiveWater, setActiveWater] = useState<boolean>(false);
  const [tabActiveOtherInfo, setActiveOtherInfo] = useState<boolean>(false);
  const [tabActivePhone, setActivePhone] = useState<boolean>(false);
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
      setActiveOtherInfo(false);
      setActivePower(false);
      setActiveGas(false);
      setActiveWater(false);
      setActiveStatus(false);
      setActivePhone(false);
      setActivePdf(false);
      setActiveHeating(false);
    }

    if (reference === "heating") {
      setTabActiveData(false);
      setActiveHeating(true);
      setActiveOtherInfo(false);
      setActivePower(false);
      setActiveGas(false);
      setActiveWater(false);
      setActiveStatus(false);
      setActivePhone(false);
      setActivePdf(false);
    }

    if (reference === "power") {
      setActivePower(true);
      setActiveOtherInfo(false);
      setActiveWater(false);
      setActiveGas(false);
      setTabActiveData(false);
      setActiveStatus(false);
      setActivePhone(false);
      setActivePdf(false);
      setActiveHeating(false);
    }

    if (reference === "gas") {
      setActiveGas(true);
      setTabActiveData(false);
      setActiveOtherInfo(false);
      setActivePower(false);
      setActiveWater(false);
      setActiveStatus(false);
      setActivePhone(false);
      setActivePdf(false);
      setActiveHeating(false);
    }

    if (reference === "water") {
      setActiveWater(true);
      setActiveOtherInfo(false);
      setActivePower(false);
      setActiveGas(false);
      setTabActiveData(false);
      setActiveStatus(false);
      setActivePhone(false);
      setActivePdf(false);
      setActiveHeating(false);
    }

    if (reference === "otherInfo") {
      setActiveOtherInfo(true);
      setTabActiveData(false);
      setActivePower(false);
      setActiveGas(false);
      setActiveWater(false);
      setActiveStatus(false);
      setActivePhone(false);
      setActivePdf(false);
      setActiveHeating(false);
    }

    if (reference === "phone") {
      setActiveOtherInfo(false);
      setTabActiveData(false);
      setActivePower(false);
      setActiveGas(false);
      setActiveWater(false);
      setActiveStatus(false);
      setActivePhone(true);
      setActivePdf(false);
      setActiveHeating(false);
    }

    if (reference === "pdf") {
      setActivePdf(true);
      setActivePower(false);
      setActiveOtherInfo(false);
      setActiveWater(false);
      setActiveGas(false);
      setTabActiveData(false);
      setActivePhone(false);
      setActiveStatus(false);
      setActiveHeating(false);
    }
  };

  return (
    <React.Fragment>
      <div>data = {JSON.stringify(data)}</div>
      <Form
        formElements={
          <React.Fragment>
            <PageHeader returnUrl="/buildings">
              <li className="breadcrumb-item active" aria-current="page">
                <Link to="/buildings">Κτίρια</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                {data.address.street} {data.address.streetNumber},
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
                          message="Βασικά Στοιχεία"
                          activeTabButton={tabActiveData}
                          tabOnClick={() => tabActivate("data")}
                        />
                        <TabItemButton
                          reference="heating"
                          message="Στοιχεία Θέρμανσης"
                          activeTabButton={tabActiveHeating}
                          tabOnClick={() => tabActivate("heating")}
                        />
                        <TabItemButton
                          reference="power"
                          message="Στοιχεία Λογαριασμού Ηλ. Ρεύματος"
                          activeTabButton={tabActivePower}
                          tabOnClick={() => tabActivate("power")}
                        />
                        <TabItemButton
                          reference="water"
                          message="Στοιχεία Λογαριασμού Ύδρευσης"
                          activeTabButton={tabActiveWater}
                          tabOnClick={() => tabActivate("water")}
                        />
                        <TabItemButton
                          reference="gas"
                          message="Στοιχεία Λογαριασμού Φυσικού Αερίου"
                          activeTabButton={tabActiveGas}
                          tabOnClick={() => tabActivate("gas")}
                        />
                        <TabItemButton
                          reference="otherInfo"
                          message="Διάφορες Πληροροφορίες"
                          activeTabButton={tabActiveOtherInfo}
                          tabOnClick={() => tabActivate("otherInfo")}
                        />
                        <TabItemButton
                          reference="phone"
                          message="Στοιχεία Λογαριασμού Τηλεφων. Γραμμής"
                          activeTabButton={tabActivePhone}
                          tabOnClick={() => tabActivate("phone")}
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
                              id={id}
                              admin={data.createdBy}
                              address={data.address}
                              startDate={new Date()}
                              endDate={new Date()}
                            />
                          }
                        />
                        <TabItem
                          tabId="heating"
                          item={
                            <BuildingHeating
                              litersPerCm={data.litersPerCm}
                              heatingType={data.heatingType}
                            />
                          }
                        />
                        <TabItem tabId="power" item={<BuildingPower />} />
                        <TabItem tabId="water" item={<BuildingWater />} />
                        <TabItem tabId="gas" item={<BuildingGas />} />
                        <TabItem
                          tabId="otherInfo"
                          item={<BuildingOtherInfo />}
                        />
                        <TabItem tabId="phone" item={<BuildingPhone />} />
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
