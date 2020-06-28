import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import BuildingData from "components/admin/buildings/buildingInfo/BuildingData";
import BuildingOtherInfo from "components/admin/buildings/buildingInfo/BuildingOtherInfo";
import BuildingHeating from "components/admin/buildings/buildingInfo/BuildingHeating";
import BuildingProvider from "components/admin/buildings/buildingInfo/BuildingProvider";
import BuildingPdf from "components/admin/buildings/buildingInfo/BuildingPdf";
import Card from "app/common/cards/Card";
import Tab from "app/common/tabs/Tab";
import TabItem from "app/common/tabs/TabItem";
import PageHeader from "app/common/headers/PageHeader";
import { AddressTitle } from "app/models/Address";
import { toast } from "react-toastify";
import BuildingStatus from "./buildingInfo/BuildingStatus";
import styles from "components/admin/admin.module.css";
const entity = "buildings";

interface BuildingProps {
  id: any;
  data: any;
  mutate: any | null;
}

const BuildingInfo: React.FC<BuildingProps> = ({ id, data, mutate }) => {
  const history = useHistory();

  const [disableSaveButton, setDisableSaveButton] = useState(false);

  const [dataProvider, setDataProvider] = useState(data?.providers || []); //data.providers
  const [startDate, setStartDate] = useState(
    data !== null ? new Date(data.managementStart) : new Date()
  );
  const [endDate, setEndDate] = useState(
    data !== null ? new Date(data.managementEnd) : new Date()
  );
  const [heatingType, setHeatingType] = useState(
    data !== null ? data.heatingType : 0
  );

  const handleSubmit = async (e: React.SyntheticEvent | any) => {
    e.preventDefault();
    e.stopPropagation();
    const form = e.target;
    const isValid = form.checkValidity();
    if (!isValid) {
      e.target.className += " was-validated";
      return toast.info("Δέν έχει συμπληρωθεί σωστά η φόρμα");
    }
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
        managementStart: new Date(startDate.toDateString()),
        managementEnd: new Date(endDate.toDateString()),
        closedApartmentParticipation: closedApartmentParticipation,
        heatingType: heatingType,
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
        heatingType: heatingType,
        caloriesCounter: caloriesCounter,
        litersPerCm: litersPerCm,
        bankReason: bankReason,
        providers: dataProvider,
        managers: [],
      });
    }
    history.goBack();
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
                      <li className="nav-item">
                        <button
                          className="nav-link"
                          data-toggle="tab"
                          data-target="#data"
                        >
                          Βασικά Στοιχεία
                        </button>
                      </li>
                      <li className="nav-item">
                        <button
                          className="nav-link"
                          data-toggle="tab"
                          data-target="#heating"
                        >
                          Στοιχεία Θέρμανσης
                        </button>
                      </li>
                      <li className="nav-item">
                        <button
                          className="nav-link"
                          data-toggle="tab"
                          data-target="#provider"
                        >
                          Στοιχεία Παρόχων
                        </button>
                      </li>
                      <li className="nav-item">
                        <button
                          className="nav-link"
                          data-toggle="tab"
                          data-target="#status"
                        >
                          Κατάσταση
                        </button>
                      </li>
                      <li className="nav-item">
                        <button
                          className="nav-link"
                          data-toggle="tab"
                          data-target="#otherInfo"
                        >
                          Διάφορες Πληροροφορίες
                        </button>
                      </li>
                      <li className="nav-item">
                        <button
                          className="nav-link"
                          data-toggle="tab"
                          data-target="#pdf"
                        >
                          Ιστορικό Αρχείων
                        </button>
                      </li>
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
                            heatingType={heatingType}
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
