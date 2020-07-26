import { useEffect } from "react";
import { toast } from "react-toastify";
import Oidc from "oidc-client";

const Silent = () => {
  useEffect(() => {
    new Oidc.UserManager({}).signinSilentCallback().catch((error) => {
      return toast.error(error.message);
    });
  }, []);

  return null;
};

export default Silent;
