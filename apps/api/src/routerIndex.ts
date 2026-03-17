import { Router } from "express";

import authRouter from "./routes/authRouter";
import testRouter from "./routes/testRouter";

const router = Router();

router.use("/auth", authRouter);
router.use("/test", testRouter);

export default router;