export type Endpoint = {
  id: string;
  type: "computer" | "server" | "securityVm";
  tenant: {
    id: string;
  };
  hostname: string;
  health: {
    overall: "good" | "suspicious" | "bad" | "unknown";
    threats: {
      status: "good" | "suspicious" | "bad" | "unknown";
    };
    services: {
      status: "good" | "suspicious" | "bad" | "unknown";
      serviceDetails: [
        {
          name: string;
          status: "running" | "stopped" | "missing";
        },
      ];
    };
  };
  os: {
    isServer: boolean;
    platform: "windows" | "linux" | "macOS";
    name: string;
    majorVersion: number;
    minorVersion: number;
    build: number;
  };
  ipv4Addresses: string[];
  ipv6Addresses: string[];
  macAddresses: string[];
  group: {
    name: string;
  };
  associatedPerson?: {
    name: string;
    viaLogin: string;
    id: string;
  };
  tamperProtectionEnabled: boolean;
  assignedProducts: [
    {
      code: string;
      version: string;
      status: "installed" | "notInstalled";
    },
  ];
  capabilities: string[];
  lastSeenAt: string;
};

export type GetEndpointsResponse = {
  items: Array<Endpoint>;
  pages: {
    fromKey?: string;
    nextKey?: string;
    size: number;
    maxSize: number;
    total?: number;
    items?: number;
  };
};
