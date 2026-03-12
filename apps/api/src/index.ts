import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./auth";

dotenv.config();

const app = express();
const port = process.env.PORT ?? "3000";

// Better Auth routes: handle /api/auth/* before JSON/body middleware
app.all("/api/auth/*", toNodeHandler(auth));

// JSON parsing and CORS for the rest of the API
app.use(
  cors({
    origin: "*", // tighten this later as needed
    credentials: true,
  })
);
app.use(express.json());

// Simple health check
app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`API listening on http://localhost:${port}`);
});

