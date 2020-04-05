import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { notification } from "antd";
import Oidc from "oidc-client";

const Callback = () => {
  const history = useHistory();

  useEffect(() => {
    new Oidc.UserManager({ response_mode: "query" })
      .signinRedirectCallback()
      .then(function () {
        history.push("/dashboard");
      })
      .catch(function (e) {
        notification["error"]({
          message: "Σφάλμα !!!",
          description: e.message,
          duration: 10,
        });
      });
  }, [history]);

  return null;
};

export default Callback;
