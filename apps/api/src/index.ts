import express from "express";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./utils/auth";
import routerIndex from "./routerIndex";

const app = express();
const port = process.env.PORT ?? "3000";

// Express v5 requires named wildcard syntax for catch-all routes.
app.all("/api/auth/{*any}", toNodeHandler(auth));

app.use(
  cors({
    origin: "*", // replace with the mobile app's URL later
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

app.use(express.json());

app.use("/api", routerIndex);

app.get("/", (req, res) => {
  res.json({ message: "API IS RUNNING" });
});

app.listen(port, () => {
  console.log(`API listening on http://0.0.0.0:${port}`);
});

