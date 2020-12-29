declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV?: "development" | "production";
    X_Tenant_ID?: string;
    TOKEN?: string;
  }
}
