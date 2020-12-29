import { getEndpoints } from "./endpoint";
import { getTenantInfo } from "./tenant";
import { getToken } from "./token";

type Params = { clientId: string; clientSecret: string };

/** get token and query for endpoints */
export async function getCompanyData({ clientId, clientSecret }: Params) {
  const { access_token } = await getToken({
    clientId,
    clientSecret,
  });

  const {
    apiHosts: { dataRegion },
    id,
  } = await getTenantInfo({ token: access_token });

  const endpoints = await getEndpoints({
    dataRegion,
    accessToken: access_token,
    xTenantId: id,
  });

  return {
    endpoints,
  };
}
