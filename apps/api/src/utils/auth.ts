import { betterAuth } from "better-auth";
import { username } from "better-auth/plugins";
import { expo } from "@better-auth/expo";
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

export const auth = betterAuth({
  database: pool,
  emailAndPassword: {
    enabled: true,
  },
  trustedOrigins: [
    process.env.FRONTEND_SCHEME_URL as string,
    ...(process.env.NODE_ENV === "development" ? [
      "exp://",                     
      "exp://**",                    // Trust all Expo URLs (wildcard matching)
      "exp://192.168.*.*:*/**",      // Trust 192.168.x.x IP range with any port and path
    ] : []),
  ],
  plugins: [
    username(),
    expo()
  ]
  // We'll add Google and other providers later.
});
