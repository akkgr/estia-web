import React from "react";
import { UserManager, Log } from "oidc-client";

const config = {
  authority: "http://localhost:4000",
  client_id: "js",
  redirect_uri: "http://localhost:3000/callback", // where to redirect to after login
  response_type: "code",
  scope: "openid profile estiaApi",
  post_logout_redirect_uri: "http://localhost:3000/", // where to redirect to after logout
  loadUserInfo: true,
  silent_redirect_uri: "http://localhost:3000/silent",
  automaticSilentRenew: true,
  monitorAnonymousSession: true,
  revokeAccessTokenOnSignout: true,
};

const userManager = new UserManager(config);
Log.logger = console;
Log.level = Log.INFO;

const UserContext = React.createContext(userManager);

export default UserContext;
