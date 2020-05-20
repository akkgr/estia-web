import React, { useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery, useMutation, queryCache } from "react-query";
import axios from "axios";
import { Skeleton, notification, Breadcrumb, Form } from "antd";

import UserContext from "../../UserContext";
import { AddressForm } from "../../components/AddressForm";
import { AddressTitle } from "../../models/Address";
import { ActionsForm } from "../../components/ActionsForm";
import { RatingsList } from "../../components/RatingsList";

const uri = process.env.REACT_APP_API_URL + "/api";
const entity = "buildings";

export const Ratings = () => {
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
          <Breadcrumb.Item>
            <Link to="/buildings">Κτίρια</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            {data ? AddressTitle(data.address) : ""}
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            Ποσοστά
          </Breadcrumb.Item>
        </ActionsForm>
        <RatingsList data={data}></RatingsList>
      </Form.Provider>
    </Skeleton>
  );
};
