import React, { useContext, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";

import BuildingData from "pages/buildings/buildingInfo/BuildingData";
import BuildingOtherInfo from "pages/buildings/buildingInfo/BuildingOtherInfo";
import BuildingHeating from "pages/buildings/buildingInfo/BuildingHeating";
import BuildingProvider from "pages/buildings/buildingInfo/BuildingProvider";
import BuildingPdf from "pages/buildings/buildingInfo/BuildingPdf";
import UserContext from "UserContext";
import Form from "app/common/form/Form";
import Card from "app/common/cards/Card";
import Tab from "app/common/tabs/Tab";
import TabItemButton from "app/common/tabs/TabItemButton";
import TabItem from "app/common/tabs/TabItem";
import PageHeader from "app/common/headers/PageHeader";
import { ProviderType } from "app/models/Provider";

const entity = "buildings";
const uri = process.env.REACT_APP_API_URL + "/api";

const BuildingInfo = () => {
  const manager = useContext(UserContext);
  let { id } = useParams();

  const [tabActiveData, setTabActiveData] = useState<boolean>(true);
  const [tabActiveHeating, setActiveHeating] = useState<boolean>(false);
  const [tabActiveProvider, setActiveProvider] = useState<boolean>(false);
  // const [tabActivePower, setActivePower] = useState<boolean>(false);
  // const [tabActiveGas, setActiveGas] = useState<boolean>(false);
  // const [tabActiveWater, setActiveWater] = useState<boolean>(false);
  // const [tabActivePhone, setActivePhone] = useState<boolean>(false);
  const [tabActiveOtherInfo, setActiveOtherInfo] = useState<boolean>(false);
  const [tabActivePdf, setActivePdf] = useState<boolean>(false);

  const [disableSaveButton, setDisableSaveButton] = useState<boolean>();

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
    //const admin = target.admin.value;
    //const reciever = target.reciever.value;

    // console.log("admin = " + admin);
    // console.log("reciever = " + reciever);
  };

  const tabActivate = (reference: string) => {
    if (reference === "data") {
      setTabActiveData(true);
      setActiveOtherInfo(false);
      setActiveProvider(false);
      setActivePdf(false);
      setActiveHeating(false);
    }

    if (reference === "heating") {
      setTabActiveData(false);
      setActiveHeating(true);
      setActiveOtherInfo(false);
      setActiveProvider(false);
      setActivePdf(false);
    }

    if (reference === "provider") {
      setActiveProvider(true);
      setActiveOtherInfo(false);
      setTabActiveData(false);
      setActivePdf(false);
      setActiveHeating(false);
    }

    if (reference === "otherInfo") {
      setActiveOtherInfo(true);
      setTabActiveData(false);
      setActiveProvider(false);
      setActivePdf(false);
      setActiveHeating(false);
    }

    if (reference === "pdf") {
      setActivePdf(true);
      setActiveProvider(false);
      setActiveOtherInfo(false);
      setTabActiveData(false);
      setActiveHeating(false);
    }
  };

  const TestDataProvidersElecticity = [
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
    {
      providerType: ProviderType.Water,
      providerName: "ΕΥΔΑΠ",
      customerName: "thisCustomer",
      contractNumber: "124324435342",
      connectionNumber: "sdfswf234324",
      counterNumber: "bgdnb3567567243",
      paymentCode: "pay6734765476",
      interval: 0,
      day: 1,
      office: true,
    },
    {
      providerType: ProviderType.Gas,
      providerName: "Nrg",
      customerName: "thisCustomer",
      contractNumber: "47568967876",
      connectionNumber: "gfhngfj234324",
      counterNumber: "co456745634",
      paymentCode: "pay676575676",
      interval: 0,
      day: 1,
      office: true,
    },
    {
      providerType: ProviderType.Telecommunications,
      providerName: "Cosmote",
      customerName: "thisCustomer",
      contractNumber: "1435234237",
      connectionNumber: "dsf43534",
      counterNumber: "co3fdhd435243",
      paymentCode: "pay45y45g76",
      interval: 0,
      day: 1,
      office: true,
    },
  ];

  return (
    <React.Fragment>
      <div>data = {JSON.stringify(data)}</div>
      <Form
        formElements={
          <React.Fragment>
            <PageHeader
              returnUrl="/buildings"
              disableSubmitButton={disableSaveButton}
            >
              <li className="breadcrumb-item active" aria-current="page">
                <Link to="/buildings">Κτίρια</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                {data.address.street} {data.address.streetNumber},{" "}
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
                          reference="provider"
                          message="Στοιχεία Παρόχων"
                          activeTabButton={tabActiveProvider}
                          tabOnClick={() => tabActivate("provider")}
                        />
                        <TabItemButton
                          reference="otherInfo"
                          message="Διάφορες Πληροροφορίες"
                          activeTabButton={tabActiveOtherInfo}
                          tabOnClick={() => tabActivate("otherInfo")}
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
                        <TabItem
                          tabId="provider"
                          item={
                            <BuildingProvider
                              provider={TestDataProvidersElecticity}
                            />
                          }
                        />
                        <TabItem
                          tabId="otherInfo"
                          item={
                            <BuildingOtherInfo bankReason={data.bankReason} />
                          }
                        />
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
