import { getCompanyData } from "./index";
import { config } from "dotenv";
config();

jest.setTimeout(30000);

test("getCompanyData", async () => {
  const { endpoints } = await getCompanyData({
    clientId: process.env.CLIENT_ID ?? "",
    clientSecret: process.env.CLIENT_SECRET ?? "",
  });
  console.log(`File: index.test.ts,`, `Line: 10 => `, endpoints.length);

  // expect(endpoints).
});
