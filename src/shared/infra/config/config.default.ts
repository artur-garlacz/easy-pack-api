import { ConfigData } from './config.interface';

export const DEFAULT_CONFIG: ConfigData = {
  env: 'production',
  db: {
    useNullAsDefault: true,
    connection: process.env.DATABASE_URL,
  },
  auth: {
    jwksuri: 'https://auth.example.io/.well-known/jwks.json',
    audience: 'https://example.com/v1',
    tokenIssuer: 'https://auth.example.io/',
    authProvider: 'auth0',
  },
  logLevel: 'info',
  newRelicKey: '',
};
