import { Injectable } from '@nestjs/common';
import { DEFAULT_CONFIG } from './config.default';

import { ConfigAuthData, ConfigData, ConfigDBData } from './config.interface';

/**
 * Provides a means to access the application configuration.
 */
@Injectable()
export class ConfigService {
  private config: ConfigData;

  constructor(data: ConfigData = DEFAULT_CONFIG) {
    this.config = data;
  }

  /**
   * Loads the config from environment variables.
   */
  public loadFromEnv() {
    this.config = this.parseConfigFromEnv(process.env);
  }

  private parseConfigFromEnv(env: NodeJS.ProcessEnv): ConfigData {
    return {
      env: env.NODE_ENV || DEFAULT_CONFIG.env,
      db: this.parseDbConfigFromEnv(env, DEFAULT_CONFIG.db),
      logLevel: env.LOG_LEVEL || DEFAULT_CONFIG.logLevel,
      auth: this.parseAuthConfigFromEnv(env),
    };
  }

  private parseAuthConfigFromEnv(env: NodeJS.ProcessEnv): ConfigAuthData {
    let jwksUrl =
      env.AUTH0_JWKS_URL || env.JWKS_URI || DEFAULT_CONFIG.auth.jwksuri;

    return {
      jwksuri: jwksUrl,
      audience:
        env.AUTH0_AUDIENCE_URL || env.AUDIENCE || DEFAULT_CONFIG.auth.audience,
      tokenIssuer:
        env.AUTH0_TOKEN_ISSUER_URL ||
        env.TOKEN_ISSUER ||
        DEFAULT_CONFIG.auth.tokenIssuer,
      authProvider: env.AUTH_PROVIDER || DEFAULT_CONFIG.auth.authProvider,
    };
  }

  private parseDbConfigFromEnv(
    env: NodeJS.ProcessEnv,
    defaultConfig: Readonly<ConfigDBData>,
  ): ConfigDBData {
    return {
      connection: env.DATABASE_URL || defaultConfig.connection,
    };
  }

  public get(): Readonly<ConfigData> {
    return this.config;
  }
}
