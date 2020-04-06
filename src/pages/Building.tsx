import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import { Form, Skeleton, Input, notification } from "antd";

import UserContext from "../UserContext";
import { Address } from "../components/Address";

const uri = process.env.REACT_APP_API_URL + "/api";
const entity = "buildings";

const formLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};

export const Building = () => {
  const manager = useContext(UserContext);
  const [form] = Form.useForm();
  let { id } = useParams();

  const fetchData = async (key: string, id: string | undefined) => {
    const user = await manager.getUser();
    if (!user) {
      manager.signinRedirect();
    }
    const { data } = await axios.get(`${uri}/${key}/${id}`, {
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
    retry: 1,
    refetchOnWindowFocus: false,
    onError: (error: any) =>
      notification["error"]({
        message: "Σφάλμα !!!",
        description: error.message,
        duration: 10,
      }),
  });

  return (
    <>
      <Skeleton active loading={status === "loading" || isFetching}>
        <Address data={data?.address} />
      </Skeleton>
    </>
  );
};
