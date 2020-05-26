import React, { useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery, useMutation, queryCache } from "react-query";
import axios from "axios";
import { Skeleton, Form } from "antd";

import UserContext from "UserContext";
import { AddressTitle } from "app/models/Address";
import { ActionsForm } from "components/ActionsForm";
import { RatingsList } from "components/RatingsList";

const uri = process.env.REACT_APP_API_URL + "/api";
const entity = "buildings";

const Ratings = () => {
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
          <li className="breadcrumb-item active" aria-current="page">
            Ποσοστά
          </li>
        </ActionsForm>
        <RatingsList data={data}></RatingsList>
      </Form.Provider>
    </Skeleton>
  );
};

export default Ratings;
