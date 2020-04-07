import { useEffect } from "react";

import { notification } from "antd";
import Oidc from "oidc-client";

const Silent = () => {
  useEffect(() => {
    new Oidc.UserManager({}).signinSilentCallback().catch(function (e) {
      notification["error"]({
        message: "Σφάλμα !!!",
        description: e.message,
        duration: 10,
      });
    });
  }, []);

  return null;
};

export default Silent;
