export default {
  testing: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: 'src/migrations',
    },
    seeds: {
      directory: 'src/seeds',
    },
  },
  local: {
    client: 'pg',
    connection:
      'postgresql://admin:admin@localhost:5432/easypack?schema=public&connect_timeout=500',
    migrations: {
      directory: 'src/migrations',
    },
    seeds: {
      directory: 'src/seeds',
    },
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: 'src/migrations',
    },
    seeds: {
      directory: 'src/seeds',
    },
  },
};
