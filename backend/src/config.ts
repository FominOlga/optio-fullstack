import dotenv from "dotenv";

dotenv.config();

type DBConfig = {
  host: string;
  port?: number;
  dbName: string;
  user?: string;
  password?: string;
};

type Config = {
  db: DBConfig;
  port: number;
};

const dev: Config = {
  db: {
    host: process.env.DEV_DB_HOST || "127.0.0.1",
    port: Number(process.env.DEV_DB_PORT) || 27017,
    dbName: process.env.DEV_DB_NAME || "polly_dev",
  },
  port: Number(process.env.PORT) || 5050,
};

const test: Config = {
  db: {
    host: process.env.TEST_DB_HOST || "127.0.0.1",
    port: Number(process.env.TEST_DB_PORT) || 27017,
    dbName: process.env.TEST_DB_NAME || "polly_test",
  },
  port: Number(process.env.PORT) || 5001,
};

const production: Config = {
  db: {
    host: process.env.PROD_DB_HOST!,
    dbName: process.env.PROD_DB_NAME!,
    user: process.env.PROD_DB_USERNAME!,
    password: process.env.PROD_DB_PASSWORD!,
  },
  port: Number(process.env.PORT) || 80,
};

// Determine environment
const env = process.env.NODE_ENV || "dev";

const configMap: Record<string, Config> = {
  dev,
  test,
  production,
};

export default configMap[env];