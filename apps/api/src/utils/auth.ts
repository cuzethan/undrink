import { betterAuth } from "better-auth";
import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  // eslint-disable-next-line no-console
  console.warn(
    "DATABASE_URL is not set. Better Auth will not be able to persist users until this is configured."
  );
}

export const pool = new Pool(
  databaseUrl
    ? {
        connectionString: databaseUrl,
      }
    : undefined
);

const auth = betterAuth({
  database: pool,
  emailAndPassword: {
    enabled: true,
  },
  // We'll add Google and other providers later.
});

export default auth;