# Helper for work with Sophos API

### Complete [API Documentation Here](https://saostad.github.io/sophos-api-helper/modules.html)

### Quick Start

```ts
import { getTenantInfo, getToken, getEndpoints } from "sophos-api-helper";

const { access_token } = await getToken({
  clientId: USER,
  clientSecret: PASSWORD,
});

const {
  id: tenantId,
  apiHosts: { dataRegion },
} = await getTenantInfo({ token: access_token });

const sophosEndpoints = await getEndpoints({
  accessToken: access_token,
  dataRegion,
  xTenantId: tenantId,
});
```
