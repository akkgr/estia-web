import React from "react";
import Oidc from "oidc-client";

const config = {
  authority: "http://localhost:4000",
  client_id: "js",
  redirect_uri: "http://localhost:3000/callback",
  response_type: "code",
  scope: "openid profile estiaApi",
  post_logout_redirect_uri: "http://localhost:3000/",
};

const userManager = new Oidc.UserManager(config);

const UserContext = React.createContext(userManager);

export default UserContext;
