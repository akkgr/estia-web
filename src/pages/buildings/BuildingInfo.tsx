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
import { toast } from "react-toastify";

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

  const [disableSaveButton, setDisableSaveButton] = useState<boolean>(false);

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
      area: { value: string };
      street: { value: string };
      streetNumber: { value: number };
      postalCode: { value: any }; //need string
      management: { value: string };
      reserve: { value: number };
    };
    const area = target.area.value;
    const street = target.street.value;
    const streetNumber = target.streetNumber.value;
    const postalCode = target.postalCode.value;
    const management = target.management.value;
    const reserve = target.reserve.value;
    if (
      area === "" ||
      street === "" ||
      !streetNumber ||
      !postalCode ||
      management === "" ||
      !reserve
    ) {
      toast.error("Η φόρμα εμφάνισε προβλήματα");
      return false;
    }
    const submitedData = {
      area: area,
      street: street,
      streetNumber: streetNumber,
      postalCode: postalCode,
      management: management,
      reserve: reserve,
    };
    console.log("submitedData" + JSON.stringify(submitedData));
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

  return (
    <React.Fragment>
      <div>data = {JSON.stringify(data)}</div>
      <form onSubmit={handleSubmit} className="was-validated" noValidate>
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
                            reserve={data.reserve}
                            address={data.address}
                            startDate={new Date(data.managementStart)}
                            endDate={new Date(data.managementEnd)}
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
                      <TabItem tabId="provider" item={<BuildingProvider />} />
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
      </form>
    </React.Fragment>
  );
};

export default BuildingInfo;
