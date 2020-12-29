import axios, { AxiosRequestConfig } from "axios";

type Params = { token: string };
type Response = {
  id: string; //"xxxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  idType: "tenant";
  apiHosts: {
    global: string; //"https://api.central.sophos.com",
    dataRegion: string; //"https://api-us01.central.sophos.com"
  };
};
export async function getTenantInfo({ token }: Params): Promise<Response> {
  const config: AxiosRequestConfig = {
    method: "get",
    url: `https://api.central.sophos.com/whoami/v1`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const { data } = await axios(config);

  return data;
}
