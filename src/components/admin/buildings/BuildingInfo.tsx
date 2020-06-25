import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery, useMutation, queryCache } from "react-query";
import { useHistory } from "react-router-dom";
import BuildingData from "components/admin/buildings/buildingInfo/BuildingData";
import BuildingOtherInfo from "components/admin/buildings/buildingInfo/BuildingOtherInfo";
import BuildingHeating from "components/admin/buildings/buildingInfo/BuildingHeating";
import BuildingProvider from "components/admin/buildings/buildingInfo/BuildingProvider";
import BuildingPdf from "components/admin/buildings/buildingInfo/BuildingPdf";
import Card from "app/common/cards/Card";
import Tab from "app/common/tabs/Tab";
import TabItemButton from "app/common/tabs/TabItemButton";
import TabItem from "app/common/tabs/TabItem";
import PageHeader from "app/common/headers/PageHeader";
import { HeatingType } from "app/models/Building";
import { AddressTitle } from "app/models/Address";
import { toast } from "react-toastify";
import BuildingStatus from "./buildingInfo/BuildingStatus";
import BuildingQueries from "components/admin/buildings/BuildingQueries";
import styles from "components/admin/admin.module.css";
const entity = "buildings";

const BuildingInfo = () => {
  let { id } = useParams();
  const history = useHistory();
  const [tabActiveData, setTabActiveData] = useState(true);
  const [tabActiveHeating, setActiveHeating] = useState(false);
  const [tabActiveProvider, setActiveProvider] = useState(false);
  const [tabActiveStatus, setActiveStatus] = useState(false);
  const [tabActiveOtherInfo, setActiveOtherInfo] = useState(false);
  const [tabActivePdf, setActivePdf] = useState(false);

  const [disableSaveButton, setDisableSaveButton] = useState(false);
  const { fetchBuildingData, saveBuilding } = BuildingQueries(id);
  const { data } = useQuery<any, [string, string | undefined]>(
    [entity, id],
    fetchBuildingData
  );

  const [dataProvider, setDataProvider] = useState(data?.providers || []); //data.providers
  const [startDate, setStartDate] = useState(
    data !== null ? new Date(data.managementStart) : new Date()
  );
  const [endDate, setEndDate] = useState(
    data !== null ? new Date(data.managementEnd) : new Date()
  );
  const [heatingType, setHeatingType] = useState(
    data !== null ? data.heatingType : "Κεντρική Θέρμανση"
  );

  const [mutate] = useMutation(saveBuilding, {
    onSuccess: (newData) =>
      queryCache.setQueryData([id], (prev: any) => [...prev, newData]),
    onSettled: () => queryCache.refetchQueries([id], data),
  });
  const handleSubmit = async (e: React.SyntheticEvent | any) => {
    e.preventDefault();
    e.stopPropagation();
    const form = e.target;
    const isValid = form.checkValidity();
    if (!isValid) {
      e.target.className += " was-validated";
      return toast.info("Δέν έχει συμπληρωθεί σωστά η φόρμα");
    }
    const HeatingTypeSelect = () => {
      if (heatingType === "Κεντρική Θέρμανση") {
        return HeatingType.Central;
      } else if (heatingType === "Αυτόνομη - Πετρέλαιο") {
        return HeatingType.Oil;
      } else if (heatingType === "Αυτόνομη - Φυσικό Αέριο") {
        return HeatingType.Gas;
      } else {
        return heatingType;
      }
    };
    const target = e.target as typeof e.target & {
      area: { value: string };
      street: { value: string };
      streetNumber: { value: string };
      postalCode: { value: string };
      active: { value: string };
      management: { value: string };
      reserve: { value: number };
      startDate: { value: any };
      heatingType: { value: number };
      closedApartmentParticipation: { value: number };
      caloriesCounter: { value: string };
      litersPerCm: { value: number };
      bankReason: { value: string };
      providers: { value: any }; //array
    };
    const area = target.area.value;
    const street = target.street.value;
    const streetNumber = target.streetNumber.value;
    const postalCode = target.postalCode.value;
    const active = JSON.parse(target.active.value);
    const management = JSON.parse(target.management.value);
    const reserve = Number(target.reserve.value);
    const closedApartmentParticipation = Number(
      target.closedApartmentParticipation.value
    );
    const caloriesCounter = JSON.parse(target.caloriesCounter.value);
    const litersPerCm = Number(target.litersPerCm.value);
    const bankReason = target.bankReason.value;
    if (area === "" || street === "" || !streetNumber || !postalCode) {
      toast.error("Η φόρμα εμφάνισε προβλήματα");
      return false;
    }
    if (id === undefined) {
      await mutate({
        address: {
          area: area,
          street: street,
          streetNumber: streetNumber,
          postalCode: postalCode,
          country: "Ελλάδα",
          lat: 0,
          lng: 0,
        },
        active: active,
        management: management,
        reserve: reserve,
        managementStart: new Date(startDate.toISOString()),
        managementEnd: new Date(endDate.toISOString()),
        closedApartmentParticipation: closedApartmentParticipation,
        heatingType: HeatingTypeSelect(),
        caloriesCounter: caloriesCounter,
        litersPerCm: litersPerCm,
        bankReason: bankReason,
        providers: dataProvider,
        managers: [],
      });
    } else {
      await mutate({
        ...data,
        address: {
          area: area,
          street: street,
          streetNumber: streetNumber,
          postalCode: postalCode,
          country: "Ελλάδα",
          lat: 0,
          lng: 0,
        },
        active: active,
        management: management,
        reserve: reserve,
        managementStart: new Date(startDate.toISOString()),
        managementEnd: new Date(endDate.toISOString()),
        closedApartmentParticipation: closedApartmentParticipation,
        heatingType: HeatingTypeSelect(),
        caloriesCounter: caloriesCounter,
        litersPerCm: litersPerCm,
        bankReason: bankReason,
        providers: dataProvider,
        managers: [],
      });
    }
    history.goBack();
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
      <form onSubmit={handleSubmit} className="needs-validation" noValidate>
        <React.Fragment>
          <PageHeader
            returnUrl="/buildings"
            disableSubmitButton={disableSaveButton}
          >
            <li className="breadcrumb-item" aria-current="page">
              <Link to="/buildings" className="text-primary">
                {data ? "Κτίριo" : "Νέο Κτίριο"}
              </Link>
            </li>
            {data ? (
              <li className="breadcrumb-item active" aria-current="page">
                {AddressTitle(data?.address)}
              </li>
            ) : (
              ""
            )}
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
                        item={<BuildingData data={data ? data : null} />}
                      />
                      <TabItem
                        tabId="heating"
                        item={
                          <BuildingHeating
                            data={data ? data : null}
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
                            data={data ? data : null}
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
                          <BuildingOtherInfo bankReason={data?.bankReason} />
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
