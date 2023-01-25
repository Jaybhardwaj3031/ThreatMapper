// TODO: see if this is released https://github.com/OpenAPITools/openapi-generator/pull/13825
// otherwilse there is a bug which needs some manual fixes everytime we regenerate

import {
  AuthenticationApi,
  CloudNodesApi,
  Configuration,
  TopologyApi,
  UserApi,
} from '@/api/generated';
import storage from '@/utils/storage';

const configuration = new Configuration({
  basePath: `${window.location.protocol}//${window.location.host}`,
  accessToken: () => {
    return storage.getAuth()?.accessToken ?? '';
  },
});

export function getAuthenticationApiClient() {
  const authenticationApi = new AuthenticationApi(configuration);
  return {
    login: authenticationApi.login.bind(authenticationApi),
    refreshAccessToken: authenticationApi.authTokenRefresh.bind(authenticationApi),
  };
}

export function getUserApiClient() {
  const userApi = new UserApi(configuration);
  return {
    registerUser: userApi.registerUser.bind(userApi),
  };
}

export function getTopologyApiClient() {
  const topologyApi = new TopologyApi(configuration);
  return {
    getHostsTopologyGraph: topologyApi.getHostsTopologyGraph.bind(topologyApi),
  };
}

export function getCloudNodesApi() {
  const cloudNodesApi = new CloudNodesApi(configuration);
  return {
    listCloudNodeAccount: cloudNodesApi.listCloudNodeAccount.bind(cloudNodesApi),
  };
}
