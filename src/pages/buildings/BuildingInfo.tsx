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
import Card from "app/common/cards/Card";
import Tab from "app/common/tabs/Tab";
import TabItemButton from "app/common/tabs/TabItemButton";
import TabItem from "app/common/tabs/TabItem";
import PageHeader from "app/common/headers/PageHeader";
import { HeatingType } from "app/models/Building";
import { Building } from "app/models/Building";
import { ProviderType } from "app/models/Provider";
import { toast } from "react-toastify";
import BuildingStatus from "./buildingInfo/BuildingStatus";

const entity = "buildings";
const uri = process.env.REACT_APP_API_URL + "/api";

const BuildingInfo: React.FC<{ provider: Building }> = ({ provider }) => {
  const manager = useContext(UserContext);
  let { id } = useParams();

  const [tabActiveData, setTabActiveData] = useState<boolean>(true);
  const [tabActiveHeating, setActiveHeating] = useState<boolean>(false);
  const [tabActiveProvider, setActiveProvider] = useState<boolean>(false);
  const [tabActiveStatus, setActiveStatus] = useState<boolean>(false);
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
  const [dataProvider, setDataProvider] = useState([
    {
      providerType: ProviderType.Electricity,
      providerName: "ΔΕΗ",
      customerName: "thisCustomer", //need import in form field
      contractNumber: "1243245798237",
      connectionNumber: "wqf234324",
      counterNumber: "co34241243",
      paymentCode: "pay6768976",
      interval: 0, //need import in form field
      day: 1, //need import in form field
      office: true,
    },
  ]); //data.providers
  const [startDate, setStartDate] = useState(new Date(data.managementStart));
  const [endDate, setEndDate] = useState(new Date(data.managementEnd));
  const [heatingType, setHeatingType] = useState(data.heatingType);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const HeatingTypeSelect = () => {
      if (heatingType === "Κεντρική Θέρμανση") {
        return HeatingType.Central;
      } else if (heatingType === "Αυτόνομη - Πετρέλαιο") {
        return HeatingType.Oil;
      } else {
        return HeatingType.Gas;
      }
    };
    const target = e.target as typeof e.target & {
      area: { value: string };
      street: { value: string };
      streetNumber: { value: number };
      postalCode: { value: any }; //need string
      active: { value: boolean };
      management: { value: boolean };
      reserve: { value: number };
      startDate: { value: any };
      heatingType: { value: number };
      closedApartmentParticipation: { value: number };
      caloriesCounter: { value: boolean };
      litersPerCm: { value: number };
      bankReason: { value: string };
      providers: { value: any }; //array
      createdBy: { value: string };
    };
    const area = target.area.value;
    const street = target.street.value;
    const streetNumber = target.streetNumber.value;
    const postalCode = target.postalCode.value;
    const active = target.active.value;
    const management = target.management.value;
    const reserve = target.reserve.value;
    const closedApartmentParticipation =
      target.closedApartmentParticipation.value;
    const caloriesCounter = target.caloriesCounter.value;
    const litersPerCm = target.litersPerCm.value;
    const bankReason = target.bankReason.value;
    const createdBy = target.createdBy.value;

    if (
      area === "" ||
      street === "" ||
      !streetNumber ||
      !postalCode ||
      !reserve
    ) {
      toast.error("Η φόρμα εμφάνισε προβλήματα");
      return false;
    }
    const submitedData = {
      address: {
        area: area,
        street: street,
        streetNumber: streetNumber,
        postalCode: postalCode,
      },
      active: active,
      management: management,
      reserve: reserve,
      managementStart: startDate,
      managementEnd: endDate,
      closedApartmentParticipation: closedApartmentParticipation,
      heatingType: HeatingTypeSelect(),
      caloriesCounter: caloriesCounter,
      litersPerCm: litersPerCm,
      bankReason: bankReason,
      providers: dataProvider,
      createdBy: createdBy,
    };
    console.log("submitedData" + JSON.stringify(submitedData));
  };

  const tabActivate = (reference: string) => {
    if (reference === "data") {
      setTabActiveData(true);
      setActiveOtherInfo(false);
      setActiveProvider(false);
      setActivePdf(false);
      setActiveHeating(false);
      setActiveStatus(false);
    }

    if (reference === "heating") {
      setTabActiveData(false);
      setActiveHeating(true);
      setActiveOtherInfo(false);
      setActiveProvider(false);
      setActivePdf(false);
      setActiveStatus(false);
    }

    if (reference === "provider") {
      setActiveProvider(true);
      setActiveOtherInfo(false);
      setTabActiveData(false);
      setActivePdf(false);
      setActiveHeating(false);
      setActiveStatus(false);
    }

    if (reference === "status") {
      setActiveStatus(true);
      setActiveOtherInfo(false);
      setTabActiveData(false);
      setActiveProvider(false);
      setActivePdf(false);
      setActiveHeating(false);
    }
    if (reference === "otherInfo") {
      setActiveOtherInfo(true);
      setTabActiveData(false);
      setActiveProvider(false);
      setActivePdf(false);
      setActiveHeating(false);
      setActiveStatus(false);
    }

    if (reference === "pdf") {
      setActivePdf(true);
      setActiveProvider(false);
      setActiveOtherInfo(false);
      setTabActiveData(false);
      setActiveHeating(false);
      setActiveStatus(false);
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
                        reference="status"
                        message="Κατάσταση"
                        activeTabButton={tabActiveStatus}
                        tabOnClick={() => tabActivate("status")}
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
                            createdBy={data.createdBy}
                            reserve={data.reserve}
                            address={data.address}
                            startDate={startDate}
                            setStartDate={setStartDate}
                            setEndDate={setEndDate}
                            endDate={endDate}
                          />
                        }
                      />
                      <TabItem
                        tabId="heating"
                        item={
                          <BuildingHeating
                            closedApartmentParticipation={
                              data.closedApartmentParticipation
                            }
                            caloriesCounter={data.caloriesCounter}
                            litersPerCm={data.litersPerCm}
                            setHeatingType={setHeatingType}
                          />
                        }
                      />
                      <TabItem
                        tabId="provider"
                        item={
                          <BuildingProvider
                            data={dataProvider}
                            setData={setDataProvider}
                          />
                        }
                      />
                      <TabItem
                        tabId="status"
                        item={
                          <BuildingStatus
                            active={data.active}
                            management={data.management}
                            startDate={startDate}
                            setStartDate={setStartDate}
                            setEndDate={setEndDate}
                            endDate={endDate}
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
      </form>
    </React.Fragment>
  );
};

export default BuildingInfo;
