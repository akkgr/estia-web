import React, { useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery, useMutation, queryCache } from "react-query";
import axios from "axios";
import { Skeleton, notification, Form } from "antd";

import UserContext from "../../UserContext";
import { AddressForm } from "../../components/AddressForm";
import { AppartmentList } from "../../components/AppartmentList";
import { AddressTitle } from "../../app/models/Address";
import { ActionsForm } from "../../components/ActionsForm";

const uri = process.env.REACT_APP_API_URL + "/api";
const entity = "buildings";

export const BuildingForm = () => {
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
    return data;
  };

  const updateData = async (input: any) => {
    const user = await manager.getUser();
    if (!user || user?.expired) {
      notification["error"]({
        message: "Σφάλμα !!!",
        description:
          "Η σύνδεση σας έχει λήξει. Παρακαλώ ξανά συνδεθείτε για να συνεχίσετε.",
        duration: 10,
      });
    }
    const { data } = await axios.put(`${uri}/${entity}/${id}`, input, {
      headers: {
        Authorization: `Bearer ${user?.access_token}`,
      },
    });
    return data;
  };

  const { status, data, isFetching } = useQuery<
    any,
    [string, string | undefined]
  >([entity, id], fetchData);

  const [mutate] = useMutation(updateData, {
    onSuccess: (data) => queryCache.setQueryData([entity, id], data),
  });

  const updateAddress = (input: any) => {
    const newData = { ...data, address: input };
    mutate(newData);
  };

  return (
    <Skeleton active loading={status === "loading" || isFetching}>
      <Form.Provider
        onFormFinish={(name, { values, forms }) => {
          const { addressForm } = forms;
          addressForm.validateFields().then((values) => updateAddress(values));
        }}
      >
        <ActionsForm returnUrl="/buildings">
          <li className="breadcrumb-item active" aria-current="page">
            <Link to="/buildings">Κτίρια</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {data ? AddressTitle(data.address) : ""}
          </li>
        </ActionsForm>
        <AddressForm formName="addressForm" data={data?.address} />
        <Link to={`${id}/ratings`}>Ποσοστά </Link>
        <AppartmentList data={data}></AppartmentList>
      </Form.Provider>
    </Skeleton>
  );
};
