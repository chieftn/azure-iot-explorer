import * as Msal from 'msal';

let authResponse: Msal.AuthResponse | undefined;
let authError: Msal.AuthError | undefined;

const config: Msal.Configuration = {
  auth: {
    authority: 'https://login.microsoftonline.com/common',
    clientId: 'c9d0ec1d-3630-477b-ae58-83585222d684',
    redirectUri: window.location.origin
  },
  cache: {
    storeAuthStateInCookie: true
  }
};

const authenticationParameters: Msal.AuthenticationParameters = {
  scopes: [
    'openid',
    'profile',
    'User.read'
  ]
};

export const executeLoginRedirect = () => {
    msalInstance.loginRedirect(authenticationParameters);
};

export const executeLogout = () => {
    msalInstance.logout();
};

export const getLoginRedirectResponse = (): Msal.AuthResponse | undefined => {
  return authResponse;
};

export const getLoginRedirectError = (): Msal.AuthError | undefined => {
  return authError;
};

export const executeLoginRedirectCallback = (error: Msal.AuthError, response: Msal.AuthResponse) => {
    authResponse = response;
    authError = error;
};

export const msalInstance = new Msal.UserAgentApplication(config);
msalInstance.handleRedirectCallback(executeLoginRedirectCallback);
