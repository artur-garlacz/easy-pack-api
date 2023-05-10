import { Knex } from 'knex';

/**
 * Configuration for the database connection.
 */
export type ConfigDBData = Knex.Config;

export interface ConfigAuthData {
  /** The JWKS URI to use. */
  jwksuri: string;

  /** The Auth audience to use. */
  audience?: string;

  /** The Auth token Issuer to use. */
  tokenIssuer: string;

  /** The Auth provider Issuer to use. */
  authProvider: string;
}

export interface ConfigAuthorizationData {
  baseUrl: string;
  serviceClientToken: string;
}

export interface ConfigData {
  env: string;

  auth: ConfigAuthData;

  db: ConfigDBData;

  logLevel: string;

  newRelicKey?: string;
}
