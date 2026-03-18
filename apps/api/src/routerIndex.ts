import { Router } from "express";

import testRouter from "./routes/testRouter";

const router = Router();

router.use("/test", testRouter);

export default router;