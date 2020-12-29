import axios, { AxiosRequestConfig } from "axios";
import { Agent } from "https";
import qs from "qs";

type GetTokenInput = {
  clientId: string;
  clientSecret: string;
};

type TokenResponse = {
  access_token: string;
  errorCode: string;
  expires_in: number;
  message: string;
  refresh_token: string;
  token_type: string;
  trackingId: string;
};

export async function getToken({
  clientId,
  clientSecret,
}: GetTokenInput): Promise<TokenResponse> {
  const uri = `https://id.sophos.com/api/v2/oauth2/token`;

  const options: AxiosRequestConfig = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };

  const formData = qs.stringify({
    grant_type: "client_credentials",
    client_id: clientId,
    client_secret: clientSecret,
    scope: "token",
  });

  const { data } = await axios.post<TokenResponse>(uri, formData, options);
  return data;
}
