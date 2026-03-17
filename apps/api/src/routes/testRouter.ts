import { Router } from "express";
import { pool } from "../utils/auth";
const testRouter = Router();

testRouter.post("/", (req, res) => {
    res.json({ message: "Test route works" });
});

testRouter.get("/test", (req, res) => {
    pool.query("SELECT * FROM test", (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(result.rows);
        }
    });
});

testRouter.post("/test", (req, res) => {
    pool.query("SELECT * FROM test", (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(result.rows);
        }
    });
});

export default testRouter;