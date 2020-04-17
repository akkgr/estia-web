import React, { useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery, useMutation, queryCache } from "react-query";
import axios from "axios";
import { Skeleton, notification, Space, Breadcrumb } from "antd";

import UserContext from "../../UserContext";
import { Address } from "../../components/Address";
import { AppartmentList } from "../../components/AppartmentList";

const uri = process.env.REACT_APP_API_URL + "/api";
const entity = "buildings";

export const Building = () => {
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
  >([entity, id], fetchData, {
    retry: false,
    refetchOnWindowFocus: false,
    onError: (error: any) =>
      notification["error"]({
        message: "Σφάλμα !!!",
        description: error.message,
        duration: 10,
      }),
  });

  const [mutate] = useMutation(updateData, {
    onSuccess: (data) => queryCache.setQueryData([entity, id], data),
    onError: (error: any) =>
      notification["error"]({
        message: "Σφάλμα !!!",
        description: error.message,
        duration: 10,
      }),
  });

  const updateAddress = (input: any) => {
    const newData = { ...data, address: input };
    mutate(newData);
  };

  return (
    <Skeleton active loading={status === "loading" || isFetching}>
      <Space direction="vertical" style={{ width: "100%" }}>
        <Breadcrumb className="breadcrumb">
          <Breadcrumb.Item>
            <Link to="/buildings">Κτίρια</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            {`${data?.address?.street} ${data?.address?.streetnumber}`}
          </Breadcrumb.Item>
        </Breadcrumb>
        <Address data={data?.address} update={updateAddress} />
        <AppartmentList data={data?.appartments}></AppartmentList>
      </Space>
    </Skeleton>
  );
};
