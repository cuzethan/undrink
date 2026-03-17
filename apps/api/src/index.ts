import express, { application } from "express";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";
import auth from "./utils/auth";
import routerIndex from "./routerIndex";

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

app.use("/api", routerIndex);

app.get("/", (req, res) => {
  res.json({ message: "Hello, world!" });
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`API listening on http://0.0.0.0:${port}`);
});

