import { Router } from "express";
const authRouter = Router();

authRouter.get("/", (req, res) => {
    res.json({ message: "Auth route works" });
});

authRouter.post("/sign-up", (req, res) => {
    const { email, password } = req.body;
});

export default authRouter;