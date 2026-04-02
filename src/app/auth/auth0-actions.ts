/* eslint-disable @typescript-eslint/no-explicit-any */
import { LogoutOptions, RedirectLoginOptions } from '@auth0/auth0-angular';

export const auth0Login: RedirectLoginOptions<any> = {
  appState: {
    target: '/',
  },
  authorizationParams: {
    prompt: 'login',
  },
};

export const auth0SignUp: RedirectLoginOptions<any> = {
  appState: {
    target: '/',
  },
  authorizationParams: {
    prompt: 'login',
    screen_hint: 'signup',
  },
};

export const auth0Logout: LogoutOptions = {
  logoutParams: {
    returnTo: globalThis.window.document.location.origin,
  },
};
