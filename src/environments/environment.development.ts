export const environment = {
  production: false,
  apiServerUrl: import.meta.env['NG_APP_API_SERVER_URL'],
  auth: {
    domain: import.meta.env['NG_APP_AUTH_DOMAIN'],
    clientId: import.meta.env['NG_APP_AUTH_CLIENT_ID'],
    cacheLocation: import.meta.env['NG_APP_AUTH_CACHE_LOCATION'],
    useRefreshTokens: import.meta.env['NG_APP_AUTH_USE_REFRESH_TOKENS'] === 'true',
    authorizationParams: {
      audience: import.meta.env['NG_APP_AUTH_AUDIENCE'],
      redirect_uri: import.meta.env['NG_APP_AUTH_CALLBACK_URL'],
    },
    httpInterceptor: {
      allowedList: [`${import.meta.env['NG_APP_API_SERVER_URL']}/api/*`],
    },
  },
};
