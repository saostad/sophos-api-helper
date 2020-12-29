import axios, { AxiosRequestConfig } from "axios";
import { Agent } from "https";
import type { Endpoint, GetEndpointsResponse } from "../typings/api/endpoints";

type GetEndpointsInput = {
  dataRegion: string;
  accessToken: string;
  xTenantId: string;
};

/** get endpoint objects records from api */
export async function getEndpoints({
  accessToken,
  dataRegion,
  xTenantId,
}: GetEndpointsInput): Promise<Endpoint[]> {
  return new Promise((resolveParent) => {
    const url = `${dataRegion}/endpoint/v1/endpoints`;
    const options: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
        "X-Tenant-ID": xTenantId,
      },
      params: {
        pageSize: 500,
      },
      httpsAgent: new Agent({ keepAlive: true }),
    };

    const endpointItems: Endpoint[] = [];

    async function getData(nextKey?: string): Promise<Endpoint[]> {
      return new Promise((resolve, reject) => {
        if (nextKey) {
          options.params["pageFromKey"] = nextKey;
        }

        axios
          .get<GetEndpointsResponse>(url, options)
          .then(({ data: { items, pages } }) => {
            endpointItems.push(...items);
            if (pages.nextKey) {
              getData(pages.nextKey).then((data) => {
                resolve(data);
              });
            } else {
              resolve(endpointItems);
            }
          })
          .catch(reject);
      });
    }
    getData().then((data) => {
      resolveParent(data);
    });
  });
}

type DeleteEndpointInput = {
  dataRegion: string;
  accessToken: string;
  xTenantId: string;
  endpointId: string;
};

export async function deleteEndpoint({
  dataRegion,
  accessToken,
  xTenantId,
  endpointId,
}: DeleteEndpointInput) {
  const url = `${dataRegion}/endpoint/v1/endpoints/${endpointId}`;

  const config: AxiosRequestConfig = {
    method: "delete",
    headers: {
      "X-Tenant-ID": xTenantId,
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const { data } = await axios.delete(url, config);
  return data;
}
