import React from "react";
import { useHistory } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";

const Auth0ProviderWithHistory = ({ children }) => {
  // console.log('process', process);
  // const domain = process.env.REACT_APP_AUTH0_DOMAIN;
  const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
  // const audience = process.env.REACT_APP_AUTH0_AUDIENCE;
  const history = useHistory();

  const onRedirectCallback = (appState) => {
    history.push(appState?.returnTo || window.location.pathname);
  };

  return ( 
    <Auth0Provider
      domain="dev-i-z1p8oy.au.auth0.com"
      clientId="yCk6dAdzFdPdJD98o1A7hQwQoOTXNgDR"
      audience="https://express.sample"
      redirectUri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithHistory;