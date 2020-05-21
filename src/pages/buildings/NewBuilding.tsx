import React, { useContext, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { useMutation, queryCache } from "react-query";
import axios from "axios";
import { Form, notification } from "antd";
import UserContext from "UserContext";
import { AddressForm } from "components/AddressForm";
import { NewAddress } from "app/models/Address";
import { ActionsForm } from "components/ActionsForm";

const uri = process.env.REACT_APP_API_URL + "/api";
const entity = "buildings";

export const NewBuilding = () => {
  const [id, setId] = useState<string | undefined>()
  const history = useHistory();
  const manager = useContext(UserContext);

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
    const { data } = await axios.post(`${uri}/${entity}`, input, {
      headers: {
        Authorization: `Bearer ${user?.access_token}`,
      },
    });
    return data;
  };

  const [mutate] = useMutation(updateData, {
    onSuccess: (data) => {
      queryCache.setQueryData([entity, data.id], data);
      setId(data.id)
      history.push(`/buildings/${data.id}`);
    },
  });

  const updateAddress = (input: any) => {
    mutate(input);
  };

  return (
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
          Νέο Κτίριο
        </li>
      </ActionsForm>
      <AddressForm formName="addressForm" data={NewAddress()} id={id} />
    </Form.Provider>
  );
};
