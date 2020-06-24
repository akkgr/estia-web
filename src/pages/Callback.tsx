import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import Oidc from "oidc-client";

const Callback = () => {
  const history = useHistory();

  useEffect(() => {
    new Oidc.UserManager({ response_mode: "query" })
      .signinRedirectCallback()
      .then(() => {
        history.push("/dashboard");
      })
      .catch((error) => {
        return toast.error(error.message);
      });
  }, [history]);

  return null;
};

export default Callback;
